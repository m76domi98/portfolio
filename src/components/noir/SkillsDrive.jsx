import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SKILLS, driveEnabled } from './Skills';

// Scroll-driven pursuit: two CSS door panels (the inked door art from
// Skills.mp4 frame 0) swing open onto a three.js chase where the car drifts
// lane to lane and skills fly in on the opposite roadside.
const DOOR_END = 0.16; // doors fully open
const DOOR_GONE = 0.2; // door layer faded out after the push-through
const END_FADE = 0.94;

// four stops, one per SKILLS group — each shows the group's full roster
const TAGS = SKILLS.map((g, i) => ({
  at: 0.21 + i * 0.18,
  side: i % 2 ? 'R' : 'L',
  group: g.group,
  items: g.items.map((s) => s.name),
}));
const TAG_SPAN = 0.15;

// car lane keyframes: holds the lane opposite each stop, swerves between them
const LANES = [
  [0.16, 0], [0.23, 2.2], [0.34, 2.2], [0.41, -2.2], [0.52, -2.2],
  [0.59, 2.2], [0.7, 2.2], [0.77, -2.2], [0.87, -2.2], [0.94, 0], [1.0, 0],
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
  camera.position.set(0, 2.5, 0);

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
  const doorRef = useRef(null);
  const doorLRef = useRef(null);
  const doorRRef = useRef(null);
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

      // door panels swing open, then the whole frame pushes past the camera
      const doorP = smooth(Math.min(1, p / DOOR_END));
      if (doorRef.current) {
        doorLRef.current.style.transform = `rotateY(${-doorP * 102}deg)`;
        doorRRef.current.style.transform = `rotateY(${doorP * 102}deg)`;
        doorRef.current.style.transform = `scale(${1 + doorP * 0.45})`;
        doorRef.current.style.opacity = p < DOOR_END ? 1 : Math.max(0, 1 - (p - DOOR_END) / (DOOR_GONE - DOOR_END));
        doorRef.current.style.visibility = p >= DOOR_GONE ? 'hidden' : 'visible';
      }
      if (hintRef.current) hintRef.current.style.opacity = p < 0.03 && scrubbing === false ? 1 : Math.max(0, 1 - p / 0.05);

      // 3d stage: always live behind the doors
      canvasRef.current.style.opacity = 1;
      {
        const x = laneX(p);
        const dxdp = (laneX(p + 0.01) - x) / 0.01; // lateral vs ~260 units/p forward
        const yaw = -Math.atan2(dxdp, 240) * 2.5; // exaggerated drift angle
        const travel = Math.max(0, p - DOOR_END) * 260;
        roadTex.offset.y = travel / 10;
        lights.position.z = travel % 16;
        car.position.x = x;
        car.position.z = -9 - Math.max(0, p - 0.86) * 180; // pulls away at the end
        car.rotation.y = yaw;
        car.rotation.z = -yaw * 0.2;
        const flare = 0.5 + Math.min(0.5, Math.abs(yaw) * 1.4);
        for (const t of tails) t.scale.setScalar(flare);
        camera.position.x = x * 0.3;
        camera.lookAt(x * 0.6, 1, -13);
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
        <div ref={doorRef} className="absolute inset-0" style={{ perspective: '1100px' }}>
          {[doorLRef, doorRRef].map((ref, i) => (
            <div
              key={i}
              ref={ref}
              className="absolute inset-y-0 w-[50.1%]"
              style={{
                [i === 0 ? 'left' : 'right']: 0,
                transformOrigin: i === 0 ? 'left center' : 'right center',
                backfaceVisibility: 'hidden',
                backgroundImage: 'url(/door.jpg)',
                backgroundSize: '200.4% 100%',
                backgroundPosition: i === 0 ? 'left center' : 'right center',
              }}
            />
          ))}
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
          SCROLL TO OPEN THE DOOR
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
