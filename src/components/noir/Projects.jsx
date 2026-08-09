import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FolderOpen, Folder, X, Cpu, Tag, Pin, Play, Github,
  Grab, GitBranch, Users, Hand, Thermometer,
} from 'lucide-react';

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {number[]} pin
 * @property {string} title
 * @property {string} [img]
 * @property {string} [video]
 * @property {string} [github]
 * @property {import('lucide-react').LucideIcon} [icon]
 * @property {string} tagline
 * @property {string[]} tech
 * @property {string[]} tags
 * @property {string} summary
 * @property {string[]} details
 */

// Board coordinates: units match the 260vw × 260vh board (svg viewBox shares them).
// Each `pin` is where the card's pin sits; the camera and the red string both use it.
// Serpentine: zig-zag left→right across the top row, then right→left across the bottom.
/** @type {Project[]} */
const PROJECTS = [
  {
    id: 'handshake',
    pin: [30, 40],
    title: 'hand.shake — AI Grip-Assist Glove',
    img: '/handshake1.jpg',
    video: 'https://youtu.be/rRj_OVckCcA',
    github: 'https://github.com/m76domi98/hand.shake',
    icon: Grab,
    tagline: 'A wearable that knows how hard to hold.',
    tech: ['QNX', 'Raspberry Pi 5', 'ESP32', 'Python', 'Gemini'],
    tags: ['Hardware', 'AI', 'Wearable'],
    summary: 'An adjustable AI-powered assistive glove: a Raspberry Pi 5 camera classifies objects and estimates grip force, and an ESP32 drives tendon-actuated servos to match.',
    details: [
      'Assembled a compact prototype integrating a Raspberry Pi 5, Camera Module 3 Wide, ESP32, and tendon-driven actuation.',
      'Engineered a QNX 8 vision pipeline with Gemini and automatic fallback vision-language models for resilient inference.',
      'Wrote ESP32 firmware controlling 360° servos via PWM, receiving wireless grip-force targets and streaming telemetry.',
      'Built a live telemetry dashboard showing detected objects and target vs. applied grip force.',
    ],
  },
  {
    id: 'meshgit',
    pin: [90, 90],
    title: 'MeshGit',
    icon: GitBranch,
    img:'/meshgit.png',
    github: 'https://github.com/m76domi98/git-stl',
    tagline: 'Version control that understands geometry.',
    tech: ['React', 'Three.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
    tags: ['Software', '3D', 'Dev Tools'],
    summary: 'A geometry-aware version control system for STL mesh files — visual diffs of added, removed, and unchanged geometry in an interactive Three.js viewport.',
    details: [
      'Rendered visual mesh diffs in a Three.js viewport instead of text-based diffs.',
      'Split a Node.js/Express API from a Python geometry service for mesh cleaning, boolean operations, and diffing.',
      'Implemented commit history, branching, GitHub integration, and conflict-zone identification, backed by PostgreSQL and Docker Compose.',
    ],
  },
  {
    id: 'elevateher',
    pin: [150, 35],
    title: 'ElevateHER',
    img: '/elevateHer.png',
    video: 'https://youtu.be/79R0GDeVhUc?si=ABAqgYDvfBFryECb',
    github: 'https://github.com/m76domi98/ElevateHER',
    icon: Users,
    tagline: 'Swipe-to-match peer mentorship.',
    tech: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'Gemini'],
    tags: ['Mobile', 'AI', 'Hackathon'],
    summary: 'A React Native app for peer mentorship and skill-sharing, matching mentors and mentees through a swipe-based interface with AI-powered recommendations.',
    details: [
      'Built a swipe-based matching interface for mentorship and skill-sharing.',
      'Integrated Gemini-powered recommendations to match mentors and mentees.',
      'Developed Node.js/Express/MongoDB backend services for users and mentorship sessions.',
    ],
  },
  {
    id: 'summus',
    pin: [210, 40],
    title: 'Summus — T&C Summarizer',
    img: '/summus.png',
    github: 'https://github.com/m76domi98/AI_AGENT',
    tagline: 'The fine print, decoded.',
    tech: ['JavaScript', 'FastAPI', 'Python', 'LLM'],
    tags: ['Software', 'AI', 'Privacy'],
    summary: 'A Chrome extension that distills dense Terms & Conditions into plain-language summaries.',
    details: [
      'Built a Chrome extension with JavaScript and HTML/CSS to summarize terms and conditions in place.',
      'Engineered a FastAPI backend with Flask-CORS, validating REST endpoints via Postman.',
      'Ran local LLM inference via Ollama and Hugging Face Transformers, embedding a contextual chatbot.',
    ],
  },
  {
    id: 'asl',
    pin: [230, 165],
    title: 'ASL Recognition System',
    img:'/asl.png',
    github: 'https://github.com/m76domi98/asl_recognition',
    icon: Hand,
    tagline: 'Sign language, recognized live.',
    tech: ['Python', 'TensorFlow/Keras', 'FastAPI', 'Node.js', 'Docker'],
    tags: ['Software', 'AI', 'Vision'],
    summary: 'A CNN image classifier for static ASL hand signs, served through a FastAPI inference service behind a Node.js API gateway.',
    details: [
      'Trained a CNN image classifier to recognize static ASL hand signs from a labeled dataset.',
      'Built a FastAPI ML inference service preprocessing images and returning predicted letters.',
      'Implemented a Node.js API gateway for image uploads, containerized with Docker Compose.',
    ],
  },
  {
    id: 'hvac',
    pin: [185, 210],
    title: 'Home Energy Monitor & HVAC Controller',
    img:'/intel10.jpg',
    icon: Thermometer,
    tagline: 'FPGA-based climate control.',
    tech: ['VHDL', 'Quartus Prime', 'ModelSim', 'Intel MAX 10'],
    tags: ['Hardware', 'FPGA'],
    summary: 'An FPGA-based temperature control system on an Intel MAX 10, comparing real-time temperature inputs against user set-points to drive HVAC logic.',
    details: [
      'Designed modular VHDL components with synchronous control logic on an Intel MAX 10.',
      'Verified functionality through unit-level and top-level ModelSim simulations, integrated with Quartus Prime.',
      'Mapped internal state and temperature values to dual seven-segment displays for real-time feedback.',
    ],
  },
  {
    id: 'sensesecure',
    pin: [140, 160],
    title: 'SenseSecure Alarm System',
    img: '/SenseSecure.png',
    github: 'https://github.com/samiksha-satthy/ece-198-SenseSecure',
    tagline: 'An adaptive alarm for visually impaired users.',
    tech: ['C', 'STM32', 'KiCad', 'UART'],
    tags: ['Hardware', 'Embedded', 'Accessibility'],
    summary: 'An adaptive alarm system for visually impaired users built on STM32, combining environmental sensing with multi-device alert signaling.',
    details: [
      'Developed on STM32 in embedded C, integrating environmental sensing and multi-device alerts.',
      'Designed and validated custom schematics and PCB layouts in KiCad with DRC/ERC checks.',
      'Implemented UART communication between two STM32 microcontrollers to coordinate power control and alert signaling.',
    ],
  },
  {
    id: 'fdm',
    pin: [95, 205],
    title: 'FDM Infill Error Correction',
    img: '/3d_print.webp',
    tagline: '3D prints that fix themselves.',
    tech: ['Python', 'OpenCV', 'PrusaSlicer', 'FullControl'],
    tags: ['Hardware', 'Algorithms', '3D Printing'],
    summary: 'Python algorithms that detect and correct 3D-print infill anomalies, validated on Prusa FDM printers.',
    details: [
      'Designed Python algorithms to detect and correct infill anomalies, validated on Prusa FDM printers.',
      'Processed binary scans with OpenCV thresholding and contour detection to locate defect regions.',
      'Reconstructed meshes via Delaunay triangulation and generated optimized G-code with PrusaSlicer and FullControl.',
    ],
  },
  {
    id: 'podcastify',
    pin: [50, 155],
    title: 'Podcastify',
    img: '/podcast.png',
    tagline: 'Turn anything into a podcast feed.',
    tech: ['Python', 'Audio Processing', 'API'],
    tags: ['Software', 'Audio'],
    summary: 'A pipeline that converts written content into narrated podcast episodes with a subscribe-ready feed.',
    details: [
      'Built a content-to-audio pipeline with voice synthesis and chapter segmentation.',
      'Generated RSS-compliant feeds for direct subscription in podcast apps.',
      'Automated episode packaging and metadata tagging.',
    ],
  },
];

const BOARD = { w: 260, h: 260 }; // vw × vh, also the svg viewBox

// Camera keyframes: center each pin (plus a small offset so the card shows below it),
// then pull back to reveal the whole board.
const STOPS = PROJECTS.map((_, i) => 0.05 + (i * 0.81) / (PROJECTS.length - 1));
const SEG = [0, ...STOPS, 1];
const CAM_X = PROJECTS.map((p) => `${50 - p.pin[0]}vw`);
const CAM_Y = PROJECTS.map((p) => `${50 - (p.pin[1] + 22)}vh`);
const X_FRAMES = [CAM_X[0], ...CAM_X, `${50 - BOARD.w / 2}vw`];
const Y_FRAMES = [CAM_Y[0], ...CAM_Y, `${50 - BOARD.h / 2}vh`];

// Red string sagging pin-to-pin
const STRING_PATH = PROJECTS.slice(1).reduce((d, p, i) => {
  const [x0, y0] = PROJECTS[i].pin;
  const [x1, y1] = p.pin;
  return `${d} Q ${(x0 + x1) / 2} ${Math.max(y0, y1) + 12} ${x1} ${y1}`;
}, `M ${PROJECTS[0].pin[0]} ${PROJECTS[0].pin[1]}`);

/** @param {{ p: Project, index: number, onOpen: (id: string) => void, floating?: boolean }} props */
function FolderCard({ p, index, onOpen, floating = true }) {
  const Icon = p.icon || Folder;
  return (
    <div
      className={floating ? 'absolute w-[35rem]' : 'relative w-full max-w-md mx-auto'}
      style={
        floating
          ? {
              left: `${p.pin[0]}vw`,
              top: `${p.pin[1]}vh`,
              transform: `translateX(-50%) rotate(${index % 2 === 0 ? -2 : 2}deg)`,
            }
          : { transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }
      }
    >
      {/* Folder tab — absolute so the folder's top edge sits exactly on the pin coordinate */}
      <div className="absolute -top-6 left-4 px-4 py-1 bg-[#C9A876] font-scribble text-ink text-xs tracking-wider rounded-t-md">
        case file #{String(index + 1).padStart(2, '0')}
      </div>
      <button
        onClick={() => onOpen(p.id)}
        className="group relative block w-full text-left bg-[#C9A876] p-3 shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-transform"
      >
        {/* Pushpin (string endpoint) */}
        <Pin className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-crimson fill-crimson drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)] rotate-[8deg]" />
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 z-10 p-1.5 bg-ink/80 hover:bg-crimson transition-colors rounded-full"
            aria-label={`${p.title} on GitHub`}
          >
            <Github className="w-4 h-4 text-vellum" />
          </a>
        )}
        <div className="vellum-paper p-3">
          {/* Tape */}
          <div className="absolute top-1 left-8 w-16 h-4 bg-[#E4DCD3]/60 rotate-[-4deg]" />
          <div className="overflow-hidden mb-3 bg-ink/5">
            {p.img ? (
              <img
                src={p.img}
                alt={p.title}
                className={`w-full object-cover ${floating ? 'h-72' : 'h-44'}`}
              />
            ) : (
              <div className={`w-full flex items-center justify-center border-2 border-dashed border-ink/25 ${floating ? 'h-72' : 'h-44'}`}>
                <Icon className="w-20 h-20 text-ink/60 group-hover:text-crimson transition-colors" strokeWidth={1} />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading text-ink text-lg leading-tight">{p.title}</h3>
            <Folder className="w-4 h-4 text-ink/50 group-hover:text-crimson transition-colors flex-shrink-0" />
          </div>
          <p className="font-body text-ink/60 text-[11px] leading-snug">{p.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {p.tags.map((t) => (
              <span key={t} className="font-body text-ink/70 text-[9px] border border-ink/30 px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(/** @type {string | null} */ (null));
  const active = PROJECTS.find((p) => p.id === openId);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const x = useTransform(scrollYProgress, SEG, X_FRAMES);
  const y = useTransform(scrollYProgress, SEG, Y_FRAMES);
  const scale = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1, 0.34]);
  // Red string draws itself pin-to-pin as the camera travels
  const pathLength = useTransform(scrollYProgress, [0.05, 0.86], [0, 1]);

  return (
    <section id="evidence" className="relative">
      {/* Mobile: simple stacked case files */}
      <div className="md:hidden bg-ink py-20 px-6 space-y-10">
        <div className="text-center">
          <div className="font-heading text-cyan-signal text-xs tracking-[0.3em] mb-1">§ 02 // EVIDENCE LOCKER</div>
          <h2 className="font-heading text-vellum text-4xl">PROJECTS</h2>
        </div>
        {PROJECTS.map((p, i) => (
          <FolderCard key={p.id} p={p} index={i} onOpen={setOpenId} floating={false} />
        ))}
      </div>

      {/* Desktop: scroll-driven conspiracy board */}
      <div ref={ref} className="relative hidden md:block" style={{ height: '1000vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Heading pinned over the board */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <div className="font-heading text-cyan-signal text-xs tracking-[0.3em] mb-1">§ 02 // EVIDENCE LOCKER</div>
          <h2 className="font-heading text-vellum text-4xl md:text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">PROJECTS</h2>
        </div>

        {/* The board the camera travels across */}
        <motion.div
          className="absolute top-0 left-0"
          style={{
            width: `${BOARD.w}vw`,
            height: `${BOARD.h}vh`,
            x,
            y,
            scale,
            background: 'linear-gradient(105deg, #0A0A0C 48%, #C41E3A 48%)',
          }}
        >
          <div className="absolute inset-0 ink-grain opacity-20" />

          {/* Red string, drawn as you scroll */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox={`0 0 ${BOARD.w} ${BOARD.h}`}
            preserveAspectRatio="none"
          >
            {/* strokeWidth in viewBox units: non-scaling-stroke breaks dash-draw animation in Chrome */}
            <motion.path
              d={STRING_PATH}
              fill="none"
              stroke="#FF2D4E"
              strokeWidth="0.35"
              style={{ pathLength }}
            />
          </svg>

          {PROJECTS.map((p, i) => (
            <FolderCard key={p.id} p={p} index={i} onOpen={setOpenId} />
          ))}
        </motion.div>
      </div>
      </div>

      {/* Forensic report overlay */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative vellum-paper max-w-3xl w-full p-6 md:p-8 sketch-border max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenId(null)}
              className="absolute top-3 right-3 text-ink/60 hover:text-crimson"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute -top-2 left-6 w-5 h-5 bg-crimson rounded-full" />
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-4 h-4 text-crimson" />
              <span className="font-heading text-ink text-xs tracking-widest">FORENSIC REPORT</span>
              <span className="h-px flex-1 bg-ink/30" />
              <span className="font-heading text-crimson text-[10px]">CASE OPEN</span>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-5">
              <img src={active.img} alt={active.title} className="w-full h-auto border-2 border-ink/20" />
              <div>
                <h3 className="font-heading text-ink text-2xl md:text-3xl leading-tight mb-2">{active.title}</h3>
                <p className="font-body text-ink/80 text-sm mb-4">{active.summary}</p>
                <ul className="font-body text-ink/80 text-sm space-y-2 mb-4">
                  {active.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-crimson mt-0.5">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.video && (
                    <a
                      href={active.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-crimson border-2 border-crimson px-3 py-2 hover:bg-crimson hover:text-vellum transition-colors"
                    >
                      <Play className="w-4 h-4" /> SURVEILLANCE FOOTAGE
                    </a>
                  )}
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-ink border-2 border-ink px-3 py-2 hover:bg-ink hover:text-vellum transition-colors"
                    >
                      <Github className="w-4 h-4" /> VIEW SOURCE
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span key={t} className="font-body text-ink text-[10px] border border-ink/40 px-2 py-1 flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> {t}
                    </span>
                  ))}
                  {active.tags.map((t) => (
                    <span key={t} className="font-body text-ink text-[10px] border border-crimson/50 text-crimson px-2 py-1 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
