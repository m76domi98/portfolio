# Portfolio

Michelle Dominic's portfolio site — a noir "digital investigator" theme built as a static Vite + React + Tailwind app. No backend.

## Sections

- **Dossier** — hero + about
- **Evidence Locker** — projects, styled as pinned case files
- **Case Log** — work experience
- **Schematic Lab** — interactive skills board: a circuit schematic (VCC → op-amp → R1 → C1 → ground) where clicking a station routes a glowing electron along the trace and shows that group's skills
- **Wiretap** — contact

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Checks

```bash
npm run lint
npm run typecheck
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/Home.jsx` — the only route; composes the sections from `src/components/noir/`
- `src/components/ui/` — shadcn/radix UI primitives
- `about-me/` — resume + facts; source of truth for all site copy
