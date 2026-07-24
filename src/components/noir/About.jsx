import React, { useRef, useState } from 'react';
import { Pin, Search, Cog } from 'lucide-react';

const PROFILE_IMG = '/michelle_cover.png';

const STATS = [
  'Computer Engineering Student at Waterloo',
  'SAP HANA Cloud PM Intern ×2',
  'FPGA Design Member @ UWASIC',
];

const LENS_R = 90; // lens radius in px
const ZOOM = 1.8;

function AboutContent() {
  return (
    <div className="grid md:grid-cols-2">
      {/* Left spread — black: dossier folder + stats */}
      <div className="relative bg-ink py-20 md:py-28 px-6 md:px-12">
        <div className="absolute inset-0 ink-grain opacity-30" />
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading text-cyan-signal text-sm tracking-[0.3em]">§ 01</span>
            <span className="h-px flex-1 bg-cyan-signal/40" />
            <span className="font-heading text-vellum text-sm tracking-[0.3em]">THE SUBJECT</span>
          </div>

          <h2 className="font-heading text-vellum text-3xl md:text-4xl leading-tight mb-10">
            The Investigator Behind the Code
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Manila dossier folder */}
            <div className="relative flex-shrink-0 rotate-[-3deg]">
              <div className="absolute -top-4 left-2 px-3 py-1 bg-[#C9A876] text-ink font-scribble text-xs tracking-wider rounded-t-sm">
                dossier
              </div>
              <div className="bg-[#C9A876] p-2 pt-3 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                <div className="bg-vellum p-2 max-w-[200px]">
                  <img src={PROFILE_IMG} alt="Michelle Dominic" className="w-full h-auto" />
                </div>
              </div>
              <Search className="absolute -bottom-4 -right-4 w-14 h-14 text-vellum drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)] rotate-[15deg]" strokeWidth={1.5} />
            </div>

            {/* Stats */}
            <div>
              <div className="font-heading text-vellum text-xl tracking-[0.2em] border-b-2 border-vellum inline-block pb-1 mb-4">
                STATS
              </div>
              <ul className="font-body text-vellum/90 text-sm md:text-base leading-relaxed space-y-1">
                {STATS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right spread — red: torn classified note */}
      <div className="relative bg-crimson py-20 md:py-28 px-6 md:px-12">
        <div className="absolute inset-0 ink-grain opacity-20" />

        {/* Arrow from stats to the note */}
        <svg
          className="hidden md:block absolute left-0 top-1/2 -translate-x-1/3 w-28 h-16 text-vellum"
          viewBox="0 0 100 50"
          fill="none"
        >
          <path d="M 5 40 Q 45 48 88 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78 14 L 90 17 L 84 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>

        <div className="relative max-w-xl mx-auto">
          {/* Torn paper note */}
          <div
            className="relative bg-vellum text-ink p-6 md:p-8 pt-10 rotate-[1deg] shadow-[6px_6px_0_rgba(0,0,0,0.35)]"
            style={{
              clipPath:
                'polygon(0 3%, 4% 0, 30% 2%, 55% 0, 78% 2%, 100% 0, 99% 30%, 100% 55%, 98% 78%, 100% 96%, 82% 99%, 60% 96%, 38% 100%, 16% 97%, 0 100%, 1% 70%, 0 40%)',
            }}
          >
            {/* Tape */}
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#C9A876]/80 rotate-[-1deg]" />
            <Pin className="absolute top-3 right-4 w-5 h-5 text-crimson fill-crimson" />

            <h3 className="font-heading text-ink text-2xl md:text-3xl leading-tight border-b-4 border-double border-crimson pb-2 mb-4">
              ABOUT ME — CLASSIFIED DOSSIER
            </h3>

            <div className="font-body font-bold text-ink/90 text-sm md:text-base leading-relaxed space-y-3">
              <p>
                Hi! I'm Michelle — a Computer Engineering student at the University of
                Waterloo interested in backend, ML, embedded systems, and data-driven
                products.
              </p>
              <p>
                Recent trail of evidence: two Product Management internships on SAP HANA
                Cloud, a full-stack internship building predictive models, and FPGA design
                work on a 10 Gbps Ethernet packet parser with UWASIC. Off the clock it's
                hackathons and hardware — an AI grip-assist glove, an STM32 alarm system,
                and a version control system for 3D meshes.
              </p>
            </div>

            <div className="mt-5 font-scribble text-crimson text-lg -rotate-2 inline-block">
              Seeking Winter 2027 co-op.
            </div>

            {/* Gear doodles */}
            <Cog className="absolute bottom-4 right-5 w-10 h-10 text-ink/70" strokeWidth={1.5} />
            <Cog className="absolute bottom-10 right-14 w-6 h-6 text-ink/70" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const [lens, setLens] = useState(null); // {x, y, w} relative to section

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width });
  };

  return (
    <section
      id="about"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setLens(null)}
      className="relative overflow-hidden"
      style={{ cursor: lens ? 'none' : undefined }}
    >
      <AboutContent />

      {/* Magnifying-glass cursor: a lens showing the section magnified */}
      {lens && (
        <div
          className="absolute z-40 pointer-events-none hidden md:block"
          style={{ left: lens.x - LENS_R, top: lens.y - LENS_R }}
          aria-hidden="true"
        >
          {/* Glass */}
          <div
            className="relative overflow-hidden rounded-full border-4 border-[#C9A876] shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.15)]"
            style={{ width: LENS_R * 2, height: LENS_R * 2 }}
          >
            <div
              style={{
                width: lens.w,
                transform: `translate(${LENS_R - lens.x * ZOOM}px, ${LENS_R - lens.y * ZOOM}px) scale(${ZOOM})`,
                transformOrigin: '0 0',
              }}
            >
              <AboutContent />
            </div>
            {/* Glint */}
            <div className="absolute top-4 left-6 w-10 h-4 bg-white/25 rounded-full rotate-[-30deg]" />
          </div>
          {/* Handle */}
          <div
            className="absolute w-5 h-16 bg-[#8B5E34] border-2 border-ink/60 rounded-full"
            style={{
              left: LENS_R * 2 - 14,
              top: LENS_R * 2 - 14,
              transform: 'rotate(-45deg)',
              transformOrigin: 'top center',
            }}
          />
        </div>
      )}
    </section>
  );
}
