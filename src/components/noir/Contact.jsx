import React, { useEffect, useId, useRef, useState } from 'react';
import { Mail, Github, Linkedin, X } from 'lucide-react';

const CHANNELS = [
  { icon: Mail, label: 'EMAIL', value: 'mmdomini@uwaterloo.ca', href: 'mailto:mmdomini@uwaterloo.ca' },
  { icon: Github, label: 'GITHUB', value: '@m76domi98', href: 'https://github.com/m76domi98' },
  { icon: Linkedin, label: 'LINKEDIN', value: 'in/michelle-dominic', href: 'https://linkedin.com/in/michelle-dominic' },
];

// Wiretap animation (one 6s loop, timing in index.css .relay-*):
// send - you throw; in flight - letter follows an arc while its dashed trail grows behind it;
// tear - I catch it and rip it open; stars burst out and I cheer.
const INK = '#E4DCD3';
const CYAN = '#00F0FF';
const SEAL = '#C41E3A';
const STAR = 'M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4 Z';
// burst offsets from the held letter, in svg units
const STARS = [
  { dx: -14, dy: -30, s: 1, c: INK },
  { dx: 4, dy: -38, s: 1.3, c: CYAN },
  { dx: -24, dy: -16, s: 0.8, c: CYAN },
  { dx: -4, dy: -20, s: 1.1, c: INK },
  { dx: 14, dy: -24, s: 0.6, c: INK },
  { dx: -18, dy: -4, s: 0.6, c: CYAN },
];
// flight lane geometry (px): the arc starts/ends at LANE_Y and peaks ARC_PEAK above it
const LANE_Y = 60;
const ARC_PEAK = 40;

const arm = (x2, cls) => (
  <line x1="30" y1="40" x2={x2} y2="58" className={cls} style={{ transformOrigin: '30px 40px' }} />
);

function Figure({ bodyClass, children }) {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 60 100" className="w-14 h-auto overflow-visible" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        <g className={bodyClass}>
          <circle cx="30" cy="20" r="11" />
          <line x1="30" y1="31" x2="30" y2="66" />
          <line x1="30" y1="66" x2="18" y2="92" />
          <line x1="30" y1="66" x2="42" y2="92" />
          {children}
        </g>
      </svg>
    </div>
  );
}

function Sender() {
  return (
    <Figure>
      {arm(16)}
      {arm(44, 'relay-arm-throw')}
      <g className="relay-speed" stroke={CYAN} strokeWidth="2">
        <line x1="58" y1="37" x2="66" y2="36" />
        <line x1="58" y1="43" x2="66" y2="42" />
      </g>
    </Figure>
  );
}

function Receiver() {
  return (
    <Figure bodyClass="relay-hop">
      {arm(16, 'relay-arm-catch')}
      {arm(44, 'relay-arm-hold')}
      {/* alert ticks by the head */}
      <g className="relay-alert" stroke={CYAN} strokeWidth="2">
        <line x1="12" y1="10" x2="7" y2="7" />
        <line x1="15" y1="5" x2="12" y2="0" />
        <line x1="21" y1="3" x2="20" y2="-3" />
      </g>
      {/* held letter: two halves tear apart, the seal drops, stars burst out */}
      <g className="relay-held" stroke="#0A0A0C" strokeWidth="1.2" strokeLinecap="butt">
        <path className="relay-tear-l" style={{ transformOrigin: '12px 60px' }} d="M0 46 L4 44 L7 47 L12 45 L12 60 L0 60 Z" fill={INK} />
        <path className="relay-tear-r" style={{ transformOrigin: '12px 60px' }} d="M12 45 L16 47 L20 44 L24 46 L24 60 L12 60 Z" fill={INK} />
        <circle cx="12" cy="52" r="2.6" fill={SEAL} stroke="none" className="relay-seal" />
      </g>
      {STARS.map((st, i) => (
        <g key={i} transform="translate(12 48)">
          <path
            d={STAR}
            fill={st.c}
            stroke="none"
            className="relay-star"
            style={{ '--dx': `${st.dx}px`, '--dy': `${st.dy}px`, '--s': st.s, animationDelay: `${i * 0.05}s` }}
          />
        </g>
      ))}
    </Figure>
  );
}

function Envelope() {
  return (
    <svg viewBox="0 0 36 24" className="w-9 h-6" aria-hidden="true">
      <rect x="1" y="1" width="34" height="22" rx="1.5" fill={INK} stroke="#0A0A0C" strokeWidth="1.5" />
      <path d="M1 2 L18 14 L35 2" fill="none" stroke="#0A0A0C" strokeWidth="1.5" />
      <circle cx="18" cy="14" r="3" fill={SEAL} />
    </svg>
  );
}

function LetterRelay() {
  const laneRef = useRef(null);
  const maskId = `relay-trail${useId().replace(/:/g, '')}`; // useId has colons, which break url(#...)
  const [laneWidth, setLaneWidth] = useState(0);

  // the arc is built in real pixels so the envelope (offset-path) and its trail share one exact curve
  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return undefined;
    const observer = new ResizeObserver(([entry]) => setLaneWidth(entry.contentRect.width));
    observer.observe(lane);
    return () => observer.disconnect();
  }, []);

  const arc = `M0 ${LANE_Y} Q${laneWidth / 2} ${LANE_Y - 2 * ARC_PEAK} ${laneWidth} ${LANE_Y}`;

  return (
    <div
      className="relative left-1/2 -translate-x-1/2 w-screen mt-10 h-36 overflow-hidden"
      role="img"
      aria-label="You throw a letter across the screen to me, I tear it open, stars burst out and I cheer"
    >
      <div className="absolute left-[6%] bottom-5"><Sender /></div>
      <div className="absolute right-[6%] bottom-5"><Receiver /></div>
      {/* lane runs from your outstretched hand to the spot where I hold the letter */}
      <div ref={laneRef} className="absolute left-[calc(6%+3rem)] right-[calc(6%+2.75rem)] top-2 h-[72px]">
        {laneWidth > 0 && (
          <>
            <svg className="absolute inset-0 overflow-visible relay-trail" width={laneWidth} height="72" fill="none" aria-hidden="true">
              <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-40" width={laneWidth + 40} height="152">
                <path d={arc} pathLength="100" stroke="white" strokeWidth="8" strokeDasharray="100" className="relay-trail-reveal" />
              </mask>
              <path d={arc} stroke={CYAN} strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" opacity="0.85" mask={`url(#${maskId})`} />
            </svg>
            <div className="relay-fly absolute left-0 top-0" style={{ offsetPath: `path('${arc}')` }}>
              <Envelope />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer id="wiretap" className="relative bg-ink overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 ink-grain opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-signal/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-body font-semibold text-cyan-signal text-xs tracking-[0.3em] mb-2">§ 05 // THE WIRETAP</div>
            <h2 className="font-heading text-vellum text-3xl md:text-5xl">MAKE CONTACT</h2>
            <p className="font-body text-vellum/60 text-sm mt-3 max-w-md">
              Recruiters, collaborators, and fellow investigators — channels open.
            </p>
          </div>
        </div>

        <LetterRelay />

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center gap-3 border border-vellum/30 hover:border-cyan-signal p-4 transition-colors"
            >
              <c.icon className="w-5 h-5 text-cyan-signal" />
              <div>
                <div className="font-body text-vellum text-xs">{c.label}</div>
                <div className="font-body text-vellum/50 text-[10px] group-hover:text-cyan-signal transition-colors">{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Layout Fixed */}
        <div className="mt-12 pt-6 border-t border-vellum/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-vellum/50 text-xs text-center md:text-left">
            MICHELLE DOMINIC'S CASE FILE // ALL DIGITAL EVIDENCE SECURED
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="font-body text-cyan-signal/60 hover:text-cyan-signal text-xs tracking-wider transition-colors cursor-pointer"
            >
              [ PRIVACY NOTICE ]
            </button>
            <p className="font-scribble text-crimson text-sm -rotate-2 font-bold select-none">© 2026</p> 
          </div>
        </div>
      </div>

      {/* Styled Theme Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ink border border-cyan-signal/40 p-6 max-w-md w-full relative shadow-lg shadow-cyan-signal/10">
            <button 
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 text-vellum/50 hover:text-cyan-signal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-body font-semibold text-cyan-signal text-xs tracking-[0.2em] mb-3">DECRYPTED // PRIVACY_POLICY.TXT</div>
            <p className="font-body text-vellum/80 text-xs leading-relaxed">
              This is a personal website that does not directly collect, track, or store any personal data. It is hosted on Vercel, which automatically processes standard server logs (such as IP addresses) solely to ensure site security and performance. It also uses Vercel Analytics, a cookieless, privacy-friendly tool that reports aggregated page-view metrics (e.g. page path, referrer, device type) — it does not use cookies or track individuals across sites. External links to third-party platforms (like LinkedIn) are subject to their own privacy policies.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
