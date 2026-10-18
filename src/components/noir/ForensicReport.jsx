import React, { useState } from 'react';
import { FolderOpen, X, Cpu, Tag, Play, Github, Maximize2 } from 'lucide-react';

const MANILA = '#C9A876';

// Aged-paper look: a couple of tea stains over a vignetted cream sheet.
const AGED_PAPER = {
  background: [
    'radial-gradient(circle at 10% 90%, #8B5E3433 0 30px, transparent 60px)',
    'radial-gradient(circle at 95% 8%, #8B5E3426 0 20px, transparent 50px)',
    'radial-gradient(ellipse at center, #EFE6D2 55%, #DCCDAE 100%)',
  ].join(', '),
};
const FLAP = {
  background: [
    'radial-gradient(circle at 20% 30%, #00000014 0 40px, transparent 41px)',
    'radial-gradient(circle at 80% 70%, #5a3a1a18 0 70px, transparent 71px)',
    `linear-gradient(160deg, #D4B583, ${MANILA} 45%, #BC9A66)`,
  ].join(', '),
};

/** @param {{ p: import('./Projects').Project, className?: string }} props */
function Evidence({ p, className = '' }) {
  return p.img ? (
    <img src={p.img} alt={p.title} className={className} />
  ) : (
    <div className="w-full h-44 flex items-center justify-center border-2 border-dashed border-ink/25">
      <Cpu className="w-20 h-20 text-ink/60" strokeWidth={1} />
    </div>
  );
}

/** @param {{ p: import('./Projects').Project }} props */
function ReportText({ p }) {
  return (
    <>
      <h3 className="font-heading text-ink text-2xl md:text-3xl leading-tight mb-2">{p.title}</h3>
      <p className="font-body text-ink/80 text-sm mb-4">{p.summary}</p>
      <ul className="font-body text-ink/80 text-sm space-y-2 mb-4">
        {p.details.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="text-crimson mt-0.5">▸</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** @param {{ p: import('./Projects').Project }} props */
function ReportLinks({ p }) {
  if (!p.video && !p.github) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {p.video && (
        <a
          href={p.video}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-crimson border-2 border-crimson px-3 py-2 hover:bg-crimson hover:text-vellum transition-colors"
        >
          <Play className="w-4 h-4" /> SURVEILLANCE FOOTAGE
        </a>
      )}
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-ink border-2 border-ink px-3 py-2 hover:bg-ink hover:text-vellum transition-colors"
        >
          <Github className="w-4 h-4" /> VIEW SOURCE
        </a>
      )}
    </div>
  );
}

/** @param {{ p: import('./Projects').Project }} props */
function ReportChips({ p }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.tech.map((t) => (
        <span key={t} className="font-body text-ink text-[10px] border border-ink/40 px-2 py-1 flex items-center gap-1">
          <Cpu className="w-3 h-3" /> {t}
        </span>
      ))}
      {p.tags.map((t) => (
        <span key={t} className="font-body text-ink text-[10px] border border-crimson/50 text-crimson px-2 py-1 flex items-center gap-1">
          <Tag className="w-3 h-3" /> {t}
        </span>
      ))}
    </div>
  );
}

function PaperClip() {
  return (
    <div className="absolute -top-5 right-10 w-[22px] h-[60px] border-4 border-[#8a8f96] rounded-xl z-10" aria-hidden="true">
      <div className="absolute left-[3px] top-2 w-2 h-[38px] border-[3px] border-[#8a8f96] rounded-lg" />
    </div>
  );
}

/** @param {{ project: import('./Projects').Project, caseNo: string, onClose: () => void }} props */
export default function ForensicReport({ project: p, caseNo, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Mobile: image stacked above the report, unchanged */}
      <div
        className="md:hidden relative vellum-paper max-w-3xl w-full p-6 sketch-border max-h-[90vh] overflow-y-auto"
        onClick={stop}
      >
        <button onClick={onClose} aria-label="Close report" className="absolute top-3 right-3 text-ink/60 hover:text-crimson">
          <X className="w-5 h-5" />
        </button>
        <div className="absolute -top-2 left-6 w-5 h-5 bg-crimson rounded-full" />
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-4 h-4 text-crimson" />
          <span className="font-heading text-ink text-xs tracking-widest">FORENSIC REPORT</span>
          <span className="h-px flex-1 bg-ink/30" />
          <span className="font-heading text-crimson text-[10px]">CASE OPEN</span>
        </div>
        <div className="grid gap-5">
          <Evidence p={p} className="w-full h-auto border-2 border-ink/20" />
          <div>
            <ReportText p={p} />
            <ReportLinks p={p} />
            <ReportChips p={p} />
          </div>
        </div>
      </div>

      {/* Desktop: an open manila folder — evidence clipped left, report tucked in a pocket right */}
      <div className="hidden md:block relative w-full max-w-6xl mt-8" onClick={stop}>
        <button
          onClick={onClose}
          aria-label="Close report"
          className="absolute -top-10 right-0 text-vellum/80 hover:text-crimson"
        >
          <X className="w-6 h-6" />
        </button>
        <div
          className="absolute -top-8 left-8 px-5 py-1 font-scribble text-ink text-lg rounded-t-lg"
          style={{ background: MANILA }}
        >
          case file #{caseNo}
        </div>

        <div className="relative grid grid-cols-2 grid-rows-1 h-[min(80vh,720px)] drop-shadow-[8px_10px_0_rgba(0,0,0,0.55)]">
          {/* Left flap: the evidence */}
          <div
            className="relative flex flex-col p-8 rounded-l-md shadow-[inset_-18px_0_22px_-14px_rgba(0,0,0,0.35)]"
            style={FLAP}
          >
            <div className="relative min-h-0 rotate-[-1.5deg] mt-2">
              <div className="absolute inset-0 bg-[#E2D6BC] rotate-[3deg] translate-x-2.5 translate-y-2 shadow-[2px_3px_0_rgba(0,0,0,0.2)]" />
              <div className="relative p-5 text-ink shadow-[3px_4px_0_rgba(0,0,0,0.25)]" style={AGED_PAPER}>
                <PaperClip />
                <div className="font-heading text-xs tracking-[0.2em] mb-2">EXHIBIT A</div>
                {p.img ? (
                  <button
                    onClick={() => setIsZoomed(true)}
                    aria-label={`Enlarge image of ${p.title}`}
                    className="block w-full bg-white border-[6px] border-white shadow-[1px_2px_4px_rgba(0,0,0,0.35)] cursor-zoom-in"
                  >
                    {/* folder height minus the paper's label, caption, padding and the stamp */}
                    <Evidence p={p} className="w-full max-h-[calc(min(80vh,720px)_-_250px)] object-contain" />
                  </button>
                ) : (
                  <Evidence p={p} />
                )}
                <div className="font-scribble text-ink/70 text-lg mt-2">{p.tagline}</div>
                {p.img && (
                  <div className="font-scribble text-crimson text-base flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" /> click to enlarge
                  </div>
                )}
              </div>
            </div>
            <div className="mt-auto pt-4">
              <span className="inline-block font-heading text-crimson border-[3px] border-crimson px-3 py-1 tracking-[0.2em] rotate-[-8deg] opacity-85">
                CLASSIFIED
              </span>
            </div>
          </div>

          {/* Right flap: the report, tucked into a pocket */}
          <div
            className="relative flex flex-col p-8 pb-4 rounded-r-md shadow-[inset_18px_0_22px_-14px_rgba(0,0,0,0.35)]"
            style={FLAP}
          >
            <div
              className="relative flex-1 min-h-0 overflow-y-auto p-6 pb-12 text-ink rotate-[1deg] shadow-[3px_4px_0_rgba(0,0,0,0.25)]"
              style={AGED_PAPER}
            >
              <ReportText p={p} />
            </div>
            <div
              className="relative z-10 -mt-10 -mx-4 px-6 pt-10 pb-5 shadow-[0_-4px_10px_rgba(0,0,0,0.23)]"
              style={{
                background: 'linear-gradient(170deg, #B6955F, #A88550)',
                clipPath: 'polygon(0 22%, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              <ReportLinks p={p} />
              <ReportChips p={p} />
            </div>
          </div>

          {/* String tie on the spine */}
          <div className="absolute left-1/2 top-1/2 w-28 h-[3px] bg-[#6b4f2c] origin-left rotate-[100deg] z-20" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 -ml-3 -mt-3 w-6 h-6 rounded-full bg-[#7a5a33] shadow-[inset_0_0_0_4px_#5d4325] z-20" aria-hidden="true" />
        </div>
      </div>

      {/* Enlarged evidence */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[70] bg-ink/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          <img src={p.img} alt={p.title} className="max-w-[95vw] max-h-[92vh] object-contain bg-white" />
        </div>
      )}
    </div>
  );
}
