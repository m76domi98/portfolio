import React from 'react';
import Navbar from '@/components/noir/Navbar';
import RunningInvestigator from '@/components/noir/RunningInvestigator';
import About from '@/components/noir/About';
import Projects from '@/components/noir/Projects';
import Experience from '@/components/noir/Experience';
import Skills from '@/components/noir/Skills';
import Contact from '@/components/noir/Contact';

export default function Home() {
  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <RunningInvestigator />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}