// One-off: converts the 3MF print file's mesh into a small web-ready GLB.
// The 3MF lives in assets/other/. Regenerate with:
//   unzip -p assets/other/fiat-124-spider.3mf 3D/Objects/object_30.model > /tmp/car.xml
//   node scripts/convert-car.mjs /tmp/car.xml public/models/car.glb
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { MeshoptSimplifier } from 'meshoptimizer';

const TARGET_TRIS = 80_000;

const [xmlPath, outPath] = process.argv.slice(2);
if (!xmlPath || !outPath) {
  console.error('usage: node convert-car.mjs <mesh.xml> <out.glb>');
  process.exit(1);
}

console.time('parse');
const xml = readFileSync(xmlPath, 'latin1');
const verts = [];
const vertRe = /<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"/g;
for (let m; (m = vertRe.exec(xml)); ) {
  // 3MF is z-up, glTF is y-up: (x, y, z) -> (x, z, -y)
  verts.push(+m[1], +m[3], -m[2]);
}
const tris = [];
const triRe = /<triangle v1="(\d+)" v2="(\d+)" v3="(\d+)"/g;
for (let m; (m = triRe.exec(xml)); ) {
  // v2/v3 swapped: the y->-z axis flip mirrors the mesh, reversing winding
  tris.push(+m[1], +m[3], +m[2]);
}
console.timeEnd('parse');
console.log(`${verts.length / 3} vertices, ${tris.length / 3} triangles`);

// The car sits diagonally on the print plate: find its true length axis via
// 2D PCA on the ground plane and rotate so the car points down -Z.
let cx = 0, cz = 0;
const n = verts.length / 3;
for (let i = 0; i < verts.length; i += 3) { cx += verts[i]; cz += verts[i + 2]; }
cx /= n; cz /= n;
let sxx = 0, sxz = 0, szz = 0;
for (let i = 0; i < verts.length; i += 3) {
  const dx = verts[i] - cx, dz = verts[i + 2] - cz;
  sxx += dx * dx; sxz += dx * dz; szz += dz * dz;
}
const theta = 0.5 * Math.atan2(2 * sxz, sxx - szz);
const cosT = Math.cos(theta), sinT = Math.sin(theta);
for (let i = 0; i < verts.length; i += 3) {
  const x = verts[i], z = verts[i + 2];
  // rotate principal axis onto X, then swap so length runs along Z
  const px = x * cosT + z * sinT;
  const pz = -x * sinT + z * cosT;
  verts[i] = pz;
  verts[i + 2] = px;
}

// center on origin (wheels at y=0), car length = 4.4 units
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < verts.length; i += 3) {
  for (let a = 0; a < 3; a++) {
    if (verts[i + a] < min[a]) min[a] = verts[i + a];
    if (verts[i + a] > max[a]) max[a] = verts[i + a];
  }
}
const size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
console.log('aligned size (w,h,l):', size.map((s) => s.toFixed(0)).join(' x '));
const scale = 4.4 / size[2];
const positions = new Float32Array(verts.length);
for (let i = 0; i < verts.length; i += 3) {
  positions[i] = (verts[i] - (min[0] + max[0]) / 2) * scale;
  positions[i + 1] = (verts[i + 1] - min[1]) * scale;
  positions[i + 2] = (verts[i + 2] - (min[2] + max[2]) / 2) * scale;
}

console.time('simplify');
await MeshoptSimplifier.ready;
const [simplified, err] = MeshoptSimplifier.simplify(
  new Uint32Array(tris),
  positions,
  3,
  TARGET_TRIS * 3,
  1e-2,
  []
);
console.timeEnd('simplify');
console.log(`simplified to ${simplified.length / 3} triangles (error ${err.toFixed(4)})`);

// drop unused vertices
const remap = new Uint32Array(positions.length / 3).fill(0xffffffff);
const outPos = [];
const outIdx = new Uint32Array(simplified.length);
let next = 0;
for (let i = 0; i < simplified.length; i++) {
  const v = simplified[i];
  if (remap[v] === 0xffffffff) {
    remap[v] = next++;
    outPos.push(positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2]);
  }
  outIdx[i] = remap[v];
}
const outPositions = new Float32Array(outPos);
console.log(`${next} vertices after compaction`);

// minimal GLB: positions + indices, no normals (computed at load time)
const pMin = [Infinity, Infinity, Infinity];
const pMax = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < outPositions.length; i += 3) {
  for (let a = 0; a < 3; a++) {
    if (outPositions[i + a] < pMin[a]) pMin[a] = outPositions[i + a];
    if (outPositions[i + a] > pMax[a]) pMax[a] = outPositions[i + a];
  }
}
const idxBytes = Buffer.from(outIdx.buffer);
const posBytes = Buffer.from(outPositions.buffer);
const pad4 = (n) => (4 - (n % 4)) % 4;
const bin = Buffer.concat([idxBytes, Buffer.alloc(pad4(idxBytes.length)), posBytes]);

const json = {
  asset: { version: '2.0', generator: 'convert-car.mjs' },
  buffers: [{ byteLength: bin.length }],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: idxBytes.length, target: 34963 },
    { buffer: 0, byteOffset: idxBytes.length + pad4(idxBytes.length), byteLength: posBytes.length, target: 34962 },
  ],
  accessors: [
    { bufferView: 0, componentType: 5125, count: outIdx.length, type: 'SCALAR' },
    { bufferView: 1, componentType: 5126, count: outPositions.length / 3, type: 'VEC3', min: pMin, max: pMax },
  ],
  meshes: [{ primitives: [{ attributes: { POSITION: 1 }, indices: 0 }] }],
  nodes: [{ mesh: 0 }],
  scenes: [{ nodes: [0] }],
  scene: 0,
};
let jsonBuf = Buffer.from(JSON.stringify(json));
jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(pad4(jsonBuf.length), 0x20)]);
const binPadded = Buffer.concat([bin, Buffer.alloc(pad4(bin.length))]);

const header = Buffer.alloc(12);
header.write('glTF', 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binPadded.length, 8);
const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonBuf.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binPadded.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4); // 'BIN'

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.concat([header, jsonHeader, jsonBuf, binHeader, binPadded]));
console.log(`wrote ${outPath} (${(12 + 8 + jsonBuf.length + 8 + binPadded.length) / 1e6}MB)`);
