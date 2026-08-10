/// <reference path="../../vite-env.d.ts" />
import React from 'react';
import { ChevronDown } from 'lucide-react';
import bngDesk from '@/public/bng-desk.png';
// pre-aligned into bng-desk's frame (scratchpad bake.ps1) so no CSS nudge is needed
import colorDesk from '@/public/color-desk-aligned.png';

const STATS = [
  'UNDER INVESTIGATION',
  'HACKATHON ADDICT',
  'SEEKING CO-OP // WINTER 2027',
];

export default function Hero() {
  return (
    <section id="dossier" className="relative min-h-screen overflow-hidden bg-ink">
      {/* Split backdrop: ink left, crimson right */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, #0A0A0C 49.85%, #C41E3A 50.15%)' }}
      />
      <div className="absolute inset-0 ink-grain opacity-50" />

      {/* Pin top-right */}
      <div className="absolute top-6 right-6 z-20 w-3.5 h-3.5 rounded-full bg-[#8f1128] border-2 border-ink shadow-lg" />

      {/* Crime scene tape across the red side */}
      <div
        className="hidden md:block absolute -right-16 top-44 z-10 rotate-[14deg] bg-[#a0132c] text-ink font-heading text-xs lg:text-sm tracking-[0.25em] whitespace-nowrap px-12 py-2 border-y-2 border-ink/60 shadow-lg"
      >
        CRIME SCENE // CODE LINE DO NOT CROSS
      </div>

      {/* STATS left */}
      <div className="hidden lg:block absolute left-8 xl:left-16 top-1/2 z-10 max-w-[240px]">
        <div className="inline-block font-heading text-vellum text-2xl tracking-widest border-b-2 border-vellum pb-1">
          STATS
        </div>
        <ul className="mt-4 space-y-2">
          {STATS.map((s) => (
            <li key={s} className="flex items-start gap-2 font-heading text-vellum text-sm tracking-wider">
              <span className="text-crimson">✗</span>
              {s}
            </li>
          ))}
        </ul>
        {/* hand-drawn arrow toward the desk */}
        <svg viewBox="0 0 100 60" className="mt-3 ml-10 w-24 h-14" fill="none">
          <path
            d="M6 8 C 14 42, 48 54, 88 42"
            stroke="#E4DCD3"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M76 34 L90 42 L74 50"
            stroke="#E4DCD3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-16 text-center">
        {/* Name + role, one line */}
        <h1 className="font-heading text-vellum tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          MICHELLE DOMINIC // DIGITAL INVESTIGATOR
        </h1>
        <p className="mt-3 font-heading text-vellum/80 text-base md:text-xl tracking-[0.15em]">
          COMPUTER ENGINEERING // IN PROGRESS
        </p>

        {/* Light & desk — lamp cone sways over the desk, revealing the color desk only where it lands */}
        <div className="relative mx-auto my-4 md:my-6 w-72 sm:w-96 md:w-[28rem] pointer-events-none">
          <div className="w-0.5 h-6 bg-vellum/70 mx-auto" />
          <div
            className="w-9 h-4 mx-auto shadow-md"
            style={{ clipPath: 'polygon(32% 0%, 68% 0%, 100% 100%, 0% 100%)', background: '#8a8a86' }}
          />
          {/* beam space between shade and desk — keep in sync with the -4rem counter-origin below */}
          <div className="h-16" />
          <div className="relative w-full aspect-[1307/800]">
            <img
              src={bngDesk}
              alt="Desk in the dark"
              className="absolute inset-0 w-full h-full object-fill"
            />
          </div>
          {/* swaying cone: spans shade-to-desk-bottom, clipped to a triangle, rotates about its apex */}
          <div
            className="absolute inset-x-0 top-10 bottom-0 lamp-sway"
            style={{
              clipPath: 'polygon(47% 0%, 53% 0%, 88% 100%, 5% 100%)',
              transformOrigin: '50% 0%',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(255,241,214,0.85), rgba(255,196,60,0.25) 40%, rgba(255,196,60,0.08) 100%)',
              }}
            />
            {/* color desk counter-rotated about the same apex so it stays pinned to the b&w desk */}
            <div
              className="absolute inset-x-0 bottom-0 aspect-[1307/800] lamp-sway-counter"
              style={{ transformOrigin: '50% -4rem' }}
            >
              <img
                src={colorDesk}
                alt="Desk lit by the lamp"
                className="absolute inset-0 w-full h-full object-fill"
              />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/Michelle_Dominic_Range.pdf"
            download
            className="group relative inline-flex items-center gap-2 bg-cyan-signal text-ink font-heading text-sm tracking-wider px-6 py-3 clip-corner hover:bg-vellum transition-colors"
          >
            OPEN CASE FILE
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#wiretap"
            className="font-heading text-vellum text-sm tracking-wider px-6 py-3 border-2 border-crimson hover:bg-crimson hover:text-vellum transition-colors clip-corner"
          >
            TRANSMIT INTEL
          </a>
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden mt-12 grid grid-cols-2 gap-3 text-left">
          {STATS.map((s) => (
            <div key={s} className="flex items-start gap-2 font-heading text-vellum text-xs tracking-wider">
              <span className="text-crimson">✗</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
