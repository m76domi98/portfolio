import { useEffect, useRef, useState } from 'react';
import { Power, Cpu, CircuitBoard, Code2, Wrench, Layers, Award, Brain, Target } from 'lucide-react';

// True where the SkillsDrive pursuit renders; the schematic then stands down.
export const driveEnabled = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 1024px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** @typedef {{ name: string, level: number, via: string, subgroup?: string }} SkillItem */

/** @type {{ group: string, icon: any, items: SkillItem[] }[]} */
export const SKILLS = [
  {
    group: 'LANGUAGES',
    icon: Code2,
    items: [
      { name: 'Python', level: 92, via: 'hand.shake, Stubbe’s, FAST', subgroup: 'Software' },
      { name: 'C / C++', level: 90, via: 'SenseSecure, coursework', subgroup: 'Software' },
      { name: 'Java', level: 70, via: 'coursework', subgroup: 'Software' },
      { name: 'JavaScript / TypeScript', level: 55, via: 'Summus, MeshGit', subgroup: 'Software' },
      { name: 'C#', level: 72, via: 'Stubbe’s', subgroup: 'Software' },
      { name: 'HTML / CSS', level: 55, via: 'Summus', subgroup: 'Software' },
      { name: 'SystemVerilog', level: 65, via: 'UWASIC', subgroup: 'Hardware / RTL' },
      { name: 'VHDL', level: 68, via: 'HVAC controller', subgroup: 'Hardware / RTL' },
      { name: 'Assembly', level: 55, via: 'coursework', subgroup: 'Hardware / RTL' },
      { name: 'SQL', level: 78, via: 'Stubbe’s, SAP', subgroup: 'Data' },
    ],
  },

  {
    group: 'FRAMEWORKS',
    icon: Layers,
    items: [
      { name: 'FastAPI / Flask', level: 85, via: 'Summus, ASL, Credit+' },
      { name: 'TensorFlow', level: 75, via: 'Stubbe’s, ASL' },
      { name: 'Node.js', level: 70, via: 'MeshGit, ElevateHER' },
      { name: 'Hugging Face', level: 70, via: 'Summus' },
      { name: 'React / React Native', level: 65, via: 'MeshGit, ElevateHER' },
      { name: '.NET', level: 62, via: 'Stubbe’s' },
      { name: 'Vue.js', level: 60, via: 'Stubbe’s' },
    ],
  },

  {
    group: 'EMBEDDED / SYSTEMS',
    icon: Cpu,
    items: [
      { name: 'Arduino', level: 90, via: 'personal builds' },
      { name: 'STM32', level: 82, via: 'SenseSecure' },
      { name: '3D Modeling / CAD', level: 80, via: 'FAST, MeshGit' },
      { name: 'PWM / UART', level: 80, via: 'hand.shake, SenseSecure' },
      { name: 'FPGA Design', level: 75, via: 'UWASIC, HVAC controller' },
      { name: 'RTL Design / Verification', level: 72, via: 'UWASIC' },
      { name: 'KiCad', level: 75, via: 'SenseSecure' },
      { name: 'ESP32', level: 70, via: 'hand.shake' },
      { name: 'QNX', level: 65, via: 'hand.shake' },
      { name: 'Raspberry Pi', level: 60, via: 'hand.shake' },
      { name: 'RISC-V Architecture', level: 58, via: 'coursework' },
    ],
  },

  {
    group: 'ML / DATA',
    icon: Brain,
    items: [
      { name: 'TensorFlow', level: 75, via: 'Stubbe’s, ASL' },
      { name: 'Computer Vision', level: 72, via: 'ASL, hand.shake' },
      { name: 'Azure OpenAI / Embeddings', level: 70, via: 'SAP' },
      { name: 'Hugging Face', level: 70, via: 'Summus' },
      { name: 'SQL', level: 78, via: 'Stubbe’s, SAP' },
      { name: 'Power BI', level: 68, via: 'SAP, Stubbe’s' },
      { name: 'Application Insights', level: 75, via: 'SAP' },
    ],
  },

  {
    group: 'TOOLS',
    icon: Wrench,
    items: [
      { name: 'Git / GitHub', level: 88, via: 'every case on file' },
      { name: 'Docker', level: 80, via: 'MeshGit, ASL' },
      { name: 'REST APIs / Postman', level: 82, via: 'Summus' },
      { name: 'MongoDB / Supabase', level: 72, via: 'ElevateHER' },
      { name: 'Quartus / ModelSim', level: 72, via: 'HVAC controller' },
      { name: 'Linux', level: 75, via: 'SAP, QNX, embedded projects' },
    ],
  },

  {
    group: 'PRODUCT',
    icon: Target,
    items: [
      { name: 'Jira', level: 85, via: 'SAP' },
      { name: 'Confluence', level: 82, via: 'SAP' },
      { name: 'Figma', level: 78, via: 'SAP, product work' },
      { name: 'MVP Definition', level: 85, via: 'SAP HANA Cloud' },
      { name: 'Requirements / Prioritization', level: 85, via: 'SAP HANA Cloud' },
      { name: 'Customer Validation', level: 80, via: 'SAP HANA Cloud' },
      { name: 'Competitive Analysis', level: 78, via: 'SAP' },
    ],
  },
];

export const CERTS = ['React JS — Scalar Topics', 'SQL — HackerRank'];

// Motherboard trace: boustrophedon snake, right-angle polyline through one
// station pad per SKILLS group. Row count follows SKILLS.length so adding or
// removing a category doesn't need the layout hand-redrawn.
const ROW_Y = SKILLS.map((_, i) => 70 + i * 120);
const LEFT_X = 80, RIGHT_X = 420, START_X = 30, NODE_FRAC = 0.42;
const GROUND_X = ROW_Y.length % 2 === 0 ? LEFT_X : RIGHT_X;
const GROUND_Y = ROW_Y[ROW_Y.length - 1] + 45;
const VIEWBOX_H = GROUND_Y + 25;

/** @type {[number, number][]} */
const PTS = [];
/** @type {number[]} */
const NODE_PT = [];
ROW_Y.forEach((y, i) => {
  const ltr = i % 2 === 0;
  const entryX = i === 0 ? START_X : ltr ? LEFT_X : RIGHT_X;
  const exitX = ltr ? RIGHT_X : LEFT_X;
  if (i === 0) PTS.push([entryX, y]);
  PTS.push([entryX + (exitX - entryX) * NODE_FRAC, y]);
  NODE_PT.push(PTS.length - 1);
  PTS.push([exitX, y]);
  if (i < ROW_Y.length - 1) PTS.push([exitX, ROW_Y[i + 1]]); // drop to next row
});
PTS.push([GROUND_X, GROUND_Y]);

const CUM = PTS.reduce((acc, [x, y], i) => {
  if (i === 0) return [0];
  const [px, py] = PTS[i - 1];
  acc.push(acc[i - 1] + Math.abs(x - px) + Math.abs(y - py)); // axis-aligned segments
  return acc;
}, /** @type {number[]} */ ([]));
const NODE_DIST = NODE_PT.map((i) => CUM[i]);

/** @param {number} d */
function pointAt(d) {
  for (let i = 1; i < PTS.length; i++) {
    if (d <= CUM[i]) {
      const t = (d - CUM[i - 1]) / (CUM[i] - CUM[i - 1] || 1);
      return [
        PTS[i - 1][0] + (PTS[i][0] - PTS[i - 1][0]) * t,
        PTS[i - 1][1] + (PTS[i][1] - PTS[i - 1][1]) * t,
      ];
    }
  }
  return PTS[PTS.length - 1];
}

const TRACE_D = 'M' + PTS.map(([x, y]) => `${x} ${y}`).join(' L');

export default function Skills() {
  const [hidden] = useState(driveEnabled);
  const [powered, setPowered] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const electronRef = useRef(/** @type {SVGGElement | null} */ (null));
  const distRef = useRef(0);
  const rafRef = useRef(0);

  // The board powers itself on when scrolled into view; the switch still toggles it.
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPowered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Drive the electron along the trace to the active station.
  useEffect(() => {
    if (!powered) return;
    const from = distRef.current;
    const to = NODE_DIST[active];
    const dur = Math.max(400, Math.abs(to - from) * 2.2); // ~ms, speed scales with distance
    const t0 = performance.now();
    const step = (/** @type {number} */ now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; // ease in-out
      const d = from + (to - from) * e;
      distRef.current = d;
      const [x, y] = pointAt(d);
      if (electronRef.current) electronRef.current.setAttribute('transform', `translate(${x} ${y})`);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, powered]);

  if (hidden) return null; // desktop shows the SkillsDrive pursuit instead

  const wire = powered ? '#C41E3A' : 'rgba(228,220,211,0.25)';
  const col = SKILLS[active];
  const Icon = col.icon;

  return (
    <section ref={sectionRef} id="schematic" className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 ink-grain opacity-25" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-heading text-cyan-signal text-sm tracking-[0.3em]">§ 04</span>
          <span className="h-px flex-1 bg-cyan-signal/40" />
          <span className="font-heading text-vellum text-sm tracking-[0.3em]">SCHEMATIC LAB</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-heading text-vellum text-4xl md:text-6xl mb-2">SKILL TREE</h2>
            <p className="font-body text-vellum/60 text-sm md:text-base max-w-xl">
              Click a station on the board — the electron routes there and the
              readout shows what that block can do.
            </p>
          </div>

          <button
            onClick={() => setPowered((p) => !p)}
            className={`group flex items-center gap-3 border-2 px-5 py-3 font-heading text-sm tracking-wider transition-all clip-corner ${
              powered
                ? 'border-crimson text-crimson pulse-glow'
                : 'border-vellum/40 text-vellum/70'
            }`}
          >
            <Power className={`w-5 h-5 ${powered ? 'text-crimson' : 'text-vellum/50'}`} />
            <span>{powered ? 'POWER: ON' : 'POWER: OFF'}</span>
            <span className={`w-10 h-5 rounded-full border ${powered ? 'border-crimson bg-crimson/20' : 'border-vellum/40'} relative transition-all`}>
              <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all ${powered ? 'left-5 bg-crimson' : 'left-0.5 bg-vellum/50'}`} />
            </span>
          </button>
        </div>

        {/* ── Schematic (left) + active station readout (right); stacked on phones ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className={`flex flex-col border-2 transition-colors duration-500 ${powered ? 'border-crimson/60 bg-crimson/[0.04]' : 'border-vellum/20 bg-vellum/[0.02]'}`}>
            <svg viewBox={`0 0 500 ${VIEWBOX_H}`} className="w-full block flex-1" role="img" aria-label="Skill schematic: circuit trace connecting skill groups">
              {/* main trace */}
              <path d={TRACE_D} fill="none" stroke={wire} strokeWidth="2" opacity="0.7" style={{ transition: 'stroke 0.5s' }} />

              {/* vias at every bend */}
              {PTS.filter((_, i) => !NODE_PT.includes(i) && i !== 0 && i !== PTS.length - 1).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="none" stroke={wire} strokeWidth="1.5" opacity="0.6" />
              ))}

              {/* VCC at the start */}
              <g stroke={wire} strokeWidth="2" fill="none">
                <line x1="30" y1="70" x2="30" y2="45" />
                <line x1="22" y1="45" x2="38" y2="45" />
              </g>
              <text x="30" y="35" textAnchor="middle" fill={wire} fontSize="11" className="font-heading">VCC</text>

              {/* op-amp on row 2, pointing left (wire gap masked by ink) */}
              <rect x="305" y="170" width="50" height="40" fill="#0A0A0C" />
              <g stroke={wire} strokeWidth="2" fill="none">
                <path d="M348 172 L348 208 L311 190 Z" />
                <line x1="348" y1="182" x2="355" y2="182" />
                <line x1="348" y1="198" x2="355" y2="198" />
              </g>
              <text x="337" y="186" fill={wire} fontSize="9">+</text>
              <text x="337" y="203" fill={wire} fontSize="9">−</text>

              {/* resistor on row 3 */}
              <rect x="142" y="298" width="56" height="24" fill="#0A0A0C" />
              <path d="M142 310 l7 0 4 -9 8 18 8 -18 8 18 8 -18 4 9 7 0" fill="none" stroke={wire} strokeWidth="2" />
              <text x="170" y="290" textAnchor="middle" fill={wire} fontSize="10" className="font-heading">R1</text>

              {/* capacitor on row 4 */}
              <rect x="322" y="416" width="16" height="28" fill="#0A0A0C" />
              <g stroke={wire} strokeWidth="2">
                <line x1="326" y1="416" x2="326" y2="444" />
                <line x1="334" y1="416" x2="334" y2="444" />
              </g>
              <text x="330" y="408" textAnchor="middle" fill={wire} fontSize="10" className="font-heading">C1</text>

              {/* ground at the end */}
              <g stroke={wire} strokeWidth="2">
                <line x1={GROUND_X - 12} y1={GROUND_Y} x2={GROUND_X + 12} y2={GROUND_Y} />
                <line x1={GROUND_X - 7} y1={GROUND_Y + 6} x2={GROUND_X + 7} y2={GROUND_Y + 6} />
                <line x1={GROUND_X - 2} y1={GROUND_Y + 12} x2={GROUND_X + 2} y2={GROUND_Y + 12} />
              </g>

              {/* station pads */}
              {SKILLS.map((s, i) => {
                const [x, y] = PTS[NODE_PT[i]];
                const isActive = powered && i === active;
                return (
                  <g key={s.group} onClick={() => setActive(i)} className="cursor-pointer">
                    <circle cx={x} cy={y} r="22" fill="transparent" />
                    <circle cx={x} cy={y} r="10" fill="none" stroke={isActive ? '#C41E3A' : wire} strokeWidth="2" opacity={isActive ? 1 : 0.6} />
                    <circle cx={x} cy={y} r="4" fill={isActive ? '#C41E3A' : 'rgba(228,220,211,0.4)'} />
                    <text
                      x={x}
                      y={y - 22}
                      textAnchor="middle"
                      fontSize="14"
                      letterSpacing="2"
                      className="font-heading"
                      fill={isActive ? '#E4DCD3' : 'rgba(228,220,211,0.55)'}
                    >
                      {s.group}
                    </text>
                    <text x={x} y={y - 38} textAnchor="middle" fontSize="9" fill="rgba(228,220,211,0.35)">
                      U{i + 1}
                    </text>
                  </g>
                );
              })}

              {/* the electron */}
              {powered && (
                <g ref={electronRef} transform={`translate(${PTS[0][0]} ${PTS[0][1]})`}>
                  <circle r="11" fill="#00F0FF" opacity="0.15">
                    <animate attributeName="r" values="9;14;9" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                  <circle r="5" fill="#00F0FF" />
                  <circle r="2" fill="#FFFFFF" />
                </g>
              )}
            </svg>

            {/* slideshow dots */}
            <div className="flex justify-center gap-3 py-4">
              {SKILLS.map((s, i) => (
                <button
                  key={s.group}
                  onClick={() => setActive(i)}
                  aria-label={s.group}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active && powered ? 'w-8 bg-crimson' : 'w-2.5 bg-vellum/30 hover:bg-vellum/60'
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            key={col.group}
            className={`p-6 border-2 transition-all duration-500 flicker-in ${
              powered ? 'border-crimson/60 bg-crimson/[0.04]' : 'border-vellum/20 bg-vellum/[0.02]'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 96%, 95% 100%, 0 100%)' }}
          >
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-vellum/15">
              <Icon className={`w-5 h-5 ${powered ? 'text-crimson' : 'text-vellum/60'}`} />
              <span className="font-heading text-vellum text-sm tracking-widest">U{active + 1} — {col.group}</span>
              <span className={`ml-auto text-[10px] font-body ${powered ? 'text-crimson' : 'text-vellum/40'}`}>
                {powered ? '● LIVE' : '○ IDLE'}
              </span>
            </div>

            {(() => {
              const item = (/** @type {SkillItem} */ s, /** @type {number} */ idx) => (
                <div key={s.name} className="group cursor-crosshair">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-body text-vellum/85 group-hover:text-vellum text-xs transition-colors">{s.name}</span>
                    <span className="font-scribble text-crimson text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                      → {s.via}
                    </span>
                    <span className={`ml-auto font-body text-[10px] flex-shrink-0 ${powered ? 'text-crimson' : 'text-vellum/40'}`}>
                      {powered ? `${s.level}%` : '—'}
                    </span>
                  </div>
                  <div className="h-2 bg-vellum/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        powered ? 'bg-crimson signal-flow' : 'bg-vellum/30'
                      }`}
                      style={{
                        width: powered ? `${s.level}%` : '0%',
                        transitionDelay: `${idx * 60}ms`,
                      }}
                    />
                  </div>
                </div>
              );
              const subgroups = /** @type {string[]} */ ([...new Set(col.items.map((s) => s.subgroup).filter(Boolean))]);
              if (subgroups.length === 0) {
                return <div className="space-y-4">{col.items.map(item)}</div>;
              }
              return subgroups.map((sg) => (
                <div key={sg} className="mb-5 last:mb-0">
                  <div className="font-heading text-crimson text-[10px] tracking-[0.25em] mb-3">{sg.toUpperCase()}</div>
                  <div className="space-y-4">
                    {col.items.filter((s) => s.subgroup === sg).map(item)}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <span
              key={c}
              className={`flex items-center gap-2 font-heading text-xs tracking-wider border-2 px-4 py-2 clip-corner transition-all duration-500 ${
                powered ? 'border-crimson/60 text-vellum' : 'border-vellum/40 text-vellum/70'
              }`}
            >
              <Award className="w-4 h-4" /> {c}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-vellum/40 font-body text-xs">
          <CircuitBoard className="w-4 h-4" />
          <span>SCHEMATIC REV. 2026.02 // SUBJECT: M. DOMINIC</span>
        </div>
      </div>
    </section>
  );
}
