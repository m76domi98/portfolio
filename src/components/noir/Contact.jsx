import React, { useState } from 'react';
import { Mail, Github, Linkedin, X } from 'lucide-react';

const CHANNELS = [
  { icon: Mail, label: 'EMAIL', value: 'mmdomini@uwaterloo.ca', href: 'mailto:mmdomini@uwaterloo.ca' },
  { icon: Github, label: 'GITHUB', value: '@m76domi98', href: 'https://github.com/m76domi98' },
  { icon: Linkedin, label: 'LINKEDIN', value: 'in/michelle-dominic', href: 'https://linkedin.com/in/michelle-dominic' },
];

export default function Contact() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer id="wiretap" className="relative bg-ink overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 ink-grain opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-signal/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-heading text-cyan-signal text-xs tracking-[0.3em] mb-2">§ 05 // THE WIRETAP</div>
            <h2 className="font-heading text-vellum text-3xl md:text-5xl">MAKE CONTACT</h2>
            <p className="font-body text-vellum/60 text-sm mt-3 max-w-md">
              Recruiters, collaborators, and fellow investigators — channels open.
            </p>
          </div>
          <div className="stamp-confidential text-xs self-start md:self-auto">CONFIDENTIAL</div>
        </div>

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
            <div className="font-heading text-cyan-signal text-xs tracking-[0.2em] mb-3">DECRYPTED // PRIVACY_POLICY.TXT</div>
            <p className="font-body text-vellum/80 text-xs leading-relaxed">
              This is a personal website that does not directly collect, track, or store any personal data. It is hosted on Vercel, which automatically processes standard server logs (such as IP addresses) solely to ensure site security and performance. It also uses Vercel Analytics, a cookieless, privacy-friendly tool that reports aggregated page-view metrics (e.g. page path, referrer, device type) — it does not use cookies or track individuals across sites. External links to third-party platforms (like LinkedIn) are subject to their own privacy policies.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
