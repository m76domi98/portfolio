import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SKILLS, CERTS, driveEnabled } from './Skills';

// Scroll-driven pursuit: you're behind the wheel of the chase car from the
// first frame (windshield frame + hood in view), no door reveal — the fled
// car drifts lane to lane ahead and skills fly in on the opposite roadside.
const END_FADE = 0.94;

// one stop per SKILLS group, plus a final stop for certifications
const TAG_SPAN = 0.15;
const STOP_START = 0.21;
const STOP_END = 0.9 - TAG_SPAN; // last stop fades out exactly as the end stamp fades in
const STOPS = [
  ...SKILLS.map((g) => ({ group: g.group, items: g.items.map((s) => s.name) })),
  { group: 'CERTIFICATIONS', items: CERTS },
];
const TAGS = STOPS.map((s, i) => ({
  ...s,
  at: STOP_START + (i * (STOP_END - STOP_START)) / (STOPS.length - 1),
  side: i % 2 ? 'R' : 'L',
}));

// car lane keyframes: holds the lane opposite each stop, swerves between them
const LANES = [
  [0, 0],
  ...TAGS.flatMap((t) => {
    const lane = t.side === 'L' ? 2.2 : -2.2;
    return [[t.at + 0.02, lane], [t.at + TAG_SPAN - 0.02, lane]];
  }),
  [TAGS[TAGS.length - 1].at + TAG_SPAN + 0.04, 0],
  [1, 0],
];

const smooth = (t) => t * t * (3 - 2 * t);

function laneX(p) {
  if (p <= LANES[0][0]) return LANES[0][1];
  for (let i = 1; i < LANES.length; i++) {
    if (p <= LANES[i][0]) {
      const [p0, x0] = LANES[i - 1];
      const [p1, x1] = LANES[i];
      return x0 + (x1 - x0) * smooth((p - p0) / (p1 - p0));
    }
  }
  return LANES[LANES.length - 1][1];
}

function radialTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function roadTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#101013';
  ctx.fillRect(0, 0, 256, 512);
  ctx.fillStyle = 'rgba(228,220,211,0.07)';
  for (let i = 0; i < 300; i++) {
    ctx.fillRect(Math.random() * 256, Math.random() * 512, 1.5, 1.5);
  }
  ctx.fillStyle = 'rgba(228,220,211,0.38)';
  ctx.fillRect(16, 0, 5, 512);
  ctx.fillRect(235, 0, 5, 512);
  ctx.fillRect(124, 40, 8, 190); // center dash: one per tile
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 40);
  return tex;
}

function ridgeTexture(seed) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0e0d0b';
  ctx.beginPath();
  ctx.moveTo(0, 128);
  let y = 70;
  for (let x = 0; x <= 1024; x += 16) {
    y = Math.min(110, Math.max(20, y + (Math.sin(x * seed) + Math.random() - 0.5) * 14));
    ctx.lineTo(x, y);
  }
  ctx.lineTo(1024, 128);
  ctx.closePath();
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x211f1c);
  scene.fog = new THREE.Fog(0x211f1c, 12, 95);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 300);
  camera.position.set(0, 1.6, 0);

  // no lights: the car is an inked silhouette, everything else is MeshBasic

  const roadTex = roadTexture();
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 400),
    new THREE.MeshBasicMaterial({ map: roadTex, fog: true })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.z = -190;
  scene.add(road);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshBasicMaterial({ color: 0x0b0b0d, fog: true })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.02, -190);
  scene.add(ground);

  for (const [z, s] of [[-140, 0.13], [-170, 0.07]]) {
    const ridge = new THREE.Mesh(
      new THREE.PlaneGeometry(360, 45),
      new THREE.MeshBasicMaterial({ map: ridgeTexture(s), transparent: true, fog: false })
    );
    ridge.position.set(0, 12, z);
    scene.add(ridge);
  }

  const moon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture('rgba(228,220,211,0.9)', 'rgba(228,220,211,0)'),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  moon.position.set(-30, 26, -130);
  moon.scale.setScalar(26);
  scene.add(moon);

  const lights = new THREE.Group();
  const glowTex = radialTexture('rgba(240,230,210,0.9)', 'rgba(240,230,210,0)');
  const poleGeo = new THREE.CylinderGeometry(0.07, 0.09, 5.6);
  const poleMat = new THREE.MeshBasicMaterial({ color: 0x060607, fog: true });
  const coneGeo = new THREE.ConeGeometry(2.2, 5.4, 12, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0xcfc0a0,
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
  for (let i = 0; i < 14; i++) {
    const g = new THREE.Group();
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2.8;
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glow.position.y = 5.7;
    glow.scale.setScalar(2.4);
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = 3.0;
    g.add(pole, glow, cone);
    g.position.set(i % 2 ? 5.6 : -5.6, 0, -8 - i * 16);
    lights.add(g);
  }
  scene.add(lights);

  const car = new THREE.Group();
  const tailTex = radialTexture('rgba(255,40,40,0.95)', 'rgba(255,40,40,0)');
  const tails = [];
  new GLTFLoader().load('/models/car.glb', (gltf) => {
    const src = /** @type {THREE.Mesh} */ (gltf.scene.children[0]);
    const geo = src.geometry;
    // inked-silhouette look from the reference: black body, pale edge halo
    const body = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x060608 }));
    const outline = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0x55503f, side: THREE.BackSide })
    );
    outline.scale.setScalar(1.02);
    car.add(outline, body);
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    for (const sx of [-1, 1]) {
      const t = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tailTex, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      t.position.set(sx * (box.max.x - 0.3), box.max.y * 0.5, box.max.z + 0.05);
      t.scale.setScalar(0.5);
      tails.push(t);
      car.add(t);
    }
  });
  car.position.set(0, 0, -9);
  scene.add(car);

  return { renderer, scene, camera, roadTex, lights, car, tails };
}

export default function SkillsDrive() {
  const [enabled] = useState(driveEnabled);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const hintRef = useRef(null);
  const stampRef = useRef(null);
  const fadeRef = useRef(null);
  const tagRefs = useRef([]);
  const threeRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const three = buildScene(canvasRef.current);
    threeRef.current = three;
    const { renderer, scene, camera, roadTex, lights, car, tails } = three;

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    let prevP = -1;
    let ticking = false;

    const update = () => {
      ticking = false;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      if (p === prevP) return;
      const scrubbing = prevP !== -1;
      prevP = p;

      if (hintRef.current) hintRef.current.style.opacity = p < 0.03 && scrubbing === false ? 1 : Math.max(0, 1 - p / 0.05);

      canvasRef.current.style.opacity = 1;
      {
        const x = laneX(p);
        const dxdp = (laneX(p + 0.01) - x) / 0.01; // lateral vs ~260 units/p forward
        const yaw = -Math.atan2(dxdp, 240) * 2.5; // exaggerated drift angle
        const travel = p * 260;
        roadTex.offset.y = travel / 10;
        lights.position.z = travel % 16;
        car.position.x = x;
        car.position.z = -9 - Math.max(0, p - 0.86) * 180; // pulls away at the end
        car.rotation.y = yaw;
        car.rotation.z = -yaw * 0.2;
        const flare = 0.5 + Math.min(0.5, Math.abs(yaw) * 1.4);
        for (const t of tails) t.scale.setScalar(flare);
        // chase car (us) tracks the fled car's lane a beat late, like we're steering to follow
        camera.position.x = x * 0.55;
        camera.lookAt(x * 0.75, 1, -13);
        renderer.render(scene, camera);
      }

      // roadside skill tags
      TAGS.forEach((tag, i) => {
        const el = tagRefs.current[i];
        if (!el) return;
        const t = (p - tag.at) / TAG_SPAN;
        const o = t <= 0 || t >= 1 ? 0 : Math.min(1, t / 0.18, (1 - t) / 0.18);
        const off = (1 - o) * (tag.side === 'L' ? -70 : 70);
        el.style.opacity = o;
        el.style.transform = `translate(${off}px, -50%) rotate(${tag.side === 'L' ? -2 : 2}deg)`;
      });

      if (stampRef.current) stampRef.current.style.opacity = Math.min(1, Math.max(0, (p - 0.9) / 0.05));
      if (fadeRef.current) fadeRef.current.style.opacity = Math.min(1, Math.max(0, (p - END_FADE) / (1 - END_FADE)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      resize();
      prevP = -1;
      onScroll();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const t = setTimeout(onScroll, 400); // first paint once the car has a chance to load
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <section ref={wrapRef} id="schematic" className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0 }} />

        {/* windshield frame + hood: sells "we're the ones chasing" */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-y-0 left-0 w-[7vw] bg-[#050506]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 42% 100%, 0 100%)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[7vw] bg-[#050506]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 58% 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[15vh] bg-[#050506]"
            style={{ clipPath: 'polygon(0% 100%, 0% 45%, 50% 5%, 100% 45%, 100% 100%)' }}
          />
          <div className="absolute left-1/2 bottom-0 h-[13vh] w-px -translate-x-1/2 bg-vellum/10" />
        </div>

        {TAGS.map((tag, i) => (
          <div
            key={tag.group}
            ref={(el) => (tagRefs.current[i] = el)}
            className={`absolute top-1/2 ${tag.side === 'L' ? 'left-10' : 'right-10'} w-[26rem] max-w-[38vw]`}
            style={{ opacity: 0, transform: 'translateY(-50%)' }}
          >
            <div className="border-2 border-crimson bg-ink/85 px-7 py-5 clip-corner">
              <div className="flex items-baseline gap-3 mb-3 pb-2 border-b border-vellum/15">
                <span className="font-heading text-crimson text-[10px] tracking-[0.35em]">
                  EXHIBIT {String.fromCharCode(65 + i)}
                </span>
                <span className="font-heading text-vellum text-lg tracking-[0.25em]">{tag.group}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {tag.items.map((name) => (
                  <div key={name} className="flex items-center gap-2 font-body text-vellum/85 text-xs">
                    <span className="w-1 h-1 bg-crimson flex-shrink-0" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute top-20 left-8 flex items-center gap-3">
          <span className="font-heading text-cyan-signal text-xs tracking-[0.3em]">§ 04</span>
          <span className="font-heading text-vellum/70 text-xs tracking-[0.3em]">THE PURSUIT — SKILLS IN MOTION</span>
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-10 inset-x-0 text-center font-heading text-vellum/80 text-sm tracking-[0.4em] animate-bounce"
        >
          SCROLL TO GIVE CHASE
        </div>

        <div
          ref={stampRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="font-heading text-vellum text-5xl md:text-7xl tracking-[0.25em] border-4 border-crimson px-10 py-6 -rotate-6 bg-ink/70">
            SKILLS · ON FILE
          </span>
        </div>

        <div className="absolute inset-0 ink-grain opacity-30 pointer-events-none" />
        <div ref={fadeRef} className="absolute inset-0 bg-ink pointer-events-none" style={{ opacity: 0 }} />
      </div>
    </section>
  );
}
