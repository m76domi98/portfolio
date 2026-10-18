# Portfolio

This is the source for my personal site, **[michelledominic.dev](https://michelledominic.dev)**.

I'm a big art person and a huge detective-story fan. I've read all the Sherlock Holmes books and watched pretty much every adaptation, and I'm a sucker for the opening title sequences of movies and shows. This site is inspired by all of that: a noir "digital investigator" theme where my résumé is a case file and scrolling through it feels like the intro to a good mystery.

Under the hood it's a small static Vite + React + Tailwind app with no backend.

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
