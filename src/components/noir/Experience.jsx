import React from 'react';
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';

const EXPERIENCES = [
  {
    org: 'SAP',
    role: 'Product Management Intern',
    period: 'MAY 2026 — PRESENT',
    imgs: ['/sap.png'],
    summary:
      'Prioritized Administration & Monitoring features for SAP HANA Cloud, synthesizing customer requests, engineering constraints, and product strategy to define MVP scope.',
    points: [
      'Applied Azure OpenAI embeddings to cluster customer prompts and identify opportunities for specialized AI agents.',
      'Performed competitive analysis of AI model capabilities and pricing to support roadmap decisions.',
      'Validated MVP requirements with customers, engineering, and product leadership through preview testing and feedback sessions.',
      'Analyzed product adoption with Azure Application Insights and delivered internal workshops on customer pain points.',
    ],
    tags: ['Product', 'AI', 'HANA Cloud'],
  },
  {
    org: 'UWASIC',
    role: 'FPGA Design Member',
    period: 'JUL 2026 — PRESENT',
    imgs: ['/uwasic-logo.png'],
    summary:
      'Developing SystemVerilog RTL for a 10 Gbps Ethernet packet parser targeting FPGA hardware on the IP packet parser team.',
    points: [
      'Designing the IP header extraction stage, turning streaming IPv4 packet data into structured metadata registers.',
      'Building verification logic to validate packet parsing, field extraction, and metadata generation.',
      'Collaborating with cross-functional parser teams via Git workflows, code reviews, and simulation-driven development.',
    ],
    tags: ['FPGA', 'SystemVerilog', 'Networking'],
  },
  {
    org: 'SAP',
    role: 'Product Management Intern',
    period: 'SEPT 2025 — DEC 2025',
    imgs: ['/sap.png'],
    summary:
      'Supported SAP HANA Cloud product development through roadmap planning, stakeholder coordination, and developer-facing content.',
    points: [
      'Created technical tutorials for HANA Cloud Central, HANA Client, and Knowledge Graph Engine — including one with 11,000+ visitors.',
      'Analyzed HANA Client download data with Python (Pandas) and Excel to understand usage patterns.',
      'Built a usage analytics dashboard with Azure Application Insights to track engagement across HANA Cloud Central.',
    ],
    tags: ['Product', 'Analytics', 'Docs'],
  },
  {
    org: 'Stubbe’s Precast',
    role: 'Full Stack Developer Intern',
    period: 'JAN 2025 — APR 2025',
    imgs: ['/stubbes.png'],
    summary:
      'Built ML pipelines and predictive models for warehouse production forecasting, and integrated AI tooling into internal manufacturing software.',
    points: [
      'Created pipelines to train and test models with Python, Excel, and SQL, cutting data preparation time by 35%.',
      'Deployed predictive models with TensorFlow, XGBoost, and Scikit-learn, reducing forecast error by 15%.',
      'Integrated an AI chatbot into internal Digital Manufacturing software using C#, .NET, Node.js, and Vue.js.',
    ],
    tags: ['ML', 'Full Stack', 'Manufacturing'],
  },
  {
    org: 'FAST Research Group',
    role: 'Research Assistant — Free Appropriate Sustainable Technology, Western University',
    period: 'MAY 2023 — MAR 2024',
    imgs: ['/fast-uwo.jpg'],
    summary:
      'Research on 3D-printing correction algorithms and renewable energy optimization.',
    points: [
      'Developed a 3D-printing G-code correction algorithm in FullControl, improving structural integrity by 20%.',
      'Generated economic heatmaps with Python and Matplotlib to identify cost-effective renewable strategies.',
      'Contributed to open-source projects focused on energy optimization and sustainability.',
    ],
    tags: ['Research', '3D Printing', 'Open Source'],
  },
];



export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden bg-ink">
      <div className="absolute inset-0 ink-grain opacity-25" />
      {/* Subtle red wash right side */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-crimson/15 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-heading text-cyan-signal text-sm tracking-[0.3em]">§ 03</span>
          <span className="h-px flex-1 bg-cyan-signal/40" />
          <span className="font-heading text-vellum text-sm tracking-[0.3em]">EXPERIENCE // CLASSIFIED</span>
        </div>

        <h2 className="font-heading text-vellum text-4xl md:text-6xl mb-12">CASE LOG</h2>

        <div className="space-y-8">
          {EXPERIENCES.map((e, i) => (
            <motion.div
              key={`${e.org}-${e.period}`}
              className="relative vellum-paper p-6 md:p-8 sketch-border"
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <Pin className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-crimson fill-crimson" />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-heading text-ink text-xl md:text-2xl">{e.org}</h3>
                <span className="font-heading text-crimson text-xs tracking-widest">{e.period}</span>
              </div>
              <div className="font-body text-ink/70 text-xs tracking-wider mb-3">{e.role}</div>
              <div className={e.imgs ? 'md:grid md:grid-cols-[1fr_220px] md:gap-6' : ''}>
                <div>
                  <p className="font-body text-ink/85 text-sm md:text-base leading-relaxed mb-4">{e.summary}</p>
                  <ul className="font-body text-ink/80 text-sm space-y-1.5 mb-4">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-crimson">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="font-body text-ink text-[10px] border border-ink/40 px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {e.imgs && (
                  <div className="mt-5 md:mt-0 self-start space-y-6">
                    {e.imgs.map((src, j) => (
                      <div
                        key={src}
                        className={`relative bg-vellum p-2 pb-4 shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1 ${
                          (i + j) % 2 === 0 ? 'rotate-2' : '-rotate-2'
                        }`}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#E4DCD3]/70 rotate-[-3deg]" />
                        <img src={src} alt={e.org} className="w-full h-36 md:h-40 object-cover" />
                        <div className="font-scribble text-ink/60 text-[10px] text-center mt-1">
                          exhibit {String.fromCharCode(65 + i)}{e.imgs.length > 1 ? `-${j + 1}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rubber stamp slams down after the file lands */}
              <motion.div
                className="absolute bottom-4 right-4 z-10 pointer-events-none font-heading text-crimson text-xs md:text-sm tracking-[0.2em] border-[3px] border-crimson px-3 py-1 rotate-[-12deg]"
                initial={{ opacity: 0, scale: 2.4 }}
                whileInView={{ opacity: 0.75, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.45, duration: 0.15 }}
              >
                {e.period.includes('PRESENT') ? 'ACTIVE CASE' : 'CASE CLOSED'}
              </motion.div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
}