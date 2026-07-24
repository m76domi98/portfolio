import React, { useState, useEffect } from 'react';

const TABS = [
  { label: 'DOSSIER', href: '#dossier' },
  { label: 'EVIDENCE', href: '#evidence' },
  { label: 'CASE LOG', href: '#experience' },
  { label: 'SCHEMATIC', href: '#schematic' },
  { label: 'WIRETAP', href: '#wiretap' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/95 backdrop-blur border-b border-crimson/40 py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#dossier" className="flex items-center gap-2 group">
          <span className="font-heading text-vellum text-lg md:text-xl tracking-wider group-hover:text-cyan-signal transition-colors">
            M.DOMINIC
          </span>
          <span className="text-crimson text-xs font-scribble -rotate-6">case #001</span>
        </a>

        <nav className="hidden md:flex items-end gap-1">
          {TABS.map((tab, i) => (
            <a
              key={tab.href}
              href={tab.href}
              className="relative font-heading text-xs tracking-wider text-vellum px-4 pt-2 pb-1 border-2 border-b-0 border-vellum/30 hover:border-cyan-signal hover:text-cyan-signal transition-all duration-200"
              style={{
                marginLeft: i === 0 ? 0 : '-1px',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                clipPath: 'polygon(8% 0, 100% 0, 96% 100%, 0 100%)',
              }}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-vellum font-heading text-sm border border-vellum/40 px-3 py-1"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕ CLOSE' : '☰ MENU'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pt-3 pb-2 bg-ink/98">
          {TABS.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              onClick={() => setOpen(false)}
              className="font-heading text-sm tracking-wider text-vellum px-3 py-2 border-l-2 border-crimson hover:border-cyan-signal hover:text-cyan-signal"
            >
              {tab.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}