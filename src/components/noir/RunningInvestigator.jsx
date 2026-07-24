import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/noir/Hero';

const FRAMES = Array.from({ length: 9 }, (_, i) => `/investigator/${String(i + 2).padStart(2, '0')}.png`);

// Vertical scroll is converted to horizontal motion: the section is 300vh tall,
// its viewport is sticky, and scroll progress drives the runner and the track.
export default function RunningInvestigator() {
  const ref = useRef(null);
  const [frame, setFrame] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // the whole intro is one horizontal ride: hero → chase scene → about panel
  const trackX = useTransform(scrollYProgress, [0.02, 0.98], ['0vw', '-200vw']);
  // Desktop: she enters while the hero's red wedge is still sliding off (p 0.35).
  // Mobile: the sprite is width-capped at 90vw, so she waits until the desk is gone
  // and starts a full viewport off-screen. ponytail: no resize listener, read once.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  const runnerX = useTransform(
    scrollYProgress,
    isMobile ? [0.5, 0.85] : [0.35, 0.85],
    isMobile ? ['-100vw', '110vw'] : ['-45vw', '110vw']
  );

  // run cycle advances with scroll, so she only runs while you scroll
  useEffect(
    () =>
      scrollYProgress.on('change', (p) => {
        setFrame(Math.floor(p * 40) % FRAMES.length);
      }),
    [scrollYProgress]
  );

  return (
    <section ref={ref} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: trackX }} className="flex h-full w-[300vw]">
          {/* panel 1 — the hero itself rides the track */}
          <div className="relative w-screen h-full flex-shrink-0 overflow-hidden">
            <Hero />
          </div>

          {/* panel 2 — the chase scene */}
          <div className="relative w-screen h-full flex-shrink-0 vellum-paper">
            <div className="px-6 md:px-12 pt-28">
              <div className="flex items-center gap-3">
                <span className="font-heading text-crimson text-xs tracking-[0.3em]">↔ PURSUIT</span>
                <span className="h-px w-20 bg-crimson/50" />
                <span className="font-heading text-ink/70 text-xs tracking-[0.3em]">KEEP SCROLLING</span>
              </div>
              <p className="mt-2 font-body text-ink/60 text-sm max-w-md">
                The investigator flees the scene — follow her to the dossier.
              </p>
            </div>
            {/* ground line */}
            <div className="absolute left-0 right-0" style={{ bottom: '16%' }}>
              <div className="h-px bg-ink/45" />
            </div>
          </div>

          {/* panel 3 — slides in and hands off to the About section below */}
          <div className="relative w-screen h-full flex-shrink-0 bg-ink">
            <div className="absolute inset-0 ink-grain opacity-30" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <div className="font-heading text-cyan-signal text-sm tracking-[0.3em] mb-4">
                § 01 // THE SUBJECT
              </div>
              <div className="font-heading text-vellum text-4xl md:text-6xl tracking-tight">
                ABOUT ME
              </div>
            </div>
          </div>
        </motion.div>

        {/* the runner, crossing the viewport above the track */}
        <motion.div style={{ x: runnerX, bottom: '10%' }} className="absolute left-0 z-10 pointer-events-none">
          <div className="relative h-[72vh] w-[72vh] max-w-[90vw] max-h-[90vw]">
            {FRAMES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === frame ? 'Investigator running' : ''}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ opacity: i === frame ? 1 : 0 }}
                draggable={false}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
