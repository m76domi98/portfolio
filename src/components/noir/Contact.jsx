import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const CHANNELS = [
  { icon: Mail, label: 'EMAIL', value: 'mmdomini@uwaterloo.ca', href: 'mailto:mmdomini@uwaterloo.ca' },
  { icon: Github, label: 'GITHUB', value: '@m76domi98', href: 'https://github.com/m76domi98' },
  { icon: Linkedin, label: 'LINKEDIN', value: 'in/michelle-dominic', href: 'https://linkedin.com/in/michelle-dominic' },
];

export default function Contact() {
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

        <div className="mt-12 pt-6 border-t border-vellum/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-vellum/50 text-xs text-center md:text-left">
            MICHELLE DOMINIC'S CASE FILE // ALL DIGITAL EVIDENCE SECURED
          </p>
          <p className="font-scribble text-crimson text-xs -rotate-2">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
