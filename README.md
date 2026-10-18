# Portfolio

This is the source for my personal site, **[michelledominic.dev](https://michelledominic.dev)**.

I wanted it to feel like a case file instead of a résumé, so the whole thing is a noir "digital investigator" theme. Under the hood it's a small static Vite + React + Tailwind app with no backend.

## What's on the site

- **Dossier** — who I am
- **Evidence Locker** — my projects, pinned up like case files
- **Case Log** — where I've worked
- **Schematic Lab** — my skills as a circuit schematic. Click a station and a little electron runs down the trace to show that group of skills
- **Wiretap** — how to reach me

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints.

Before pushing anything:

```bash
npm run lint
npm run typecheck
```

To build and preview the production version:

```bash
npm run build
npm run preview
```

## Finding your way around

- `src/pages/Home.jsx` — the only page; it stitches together the sections from `src/components/noir/`
- `src/components/ui/` — shadcn/radix UI primitives
- `about-me/` — my résumé and the source of truth for all the copy on the site
