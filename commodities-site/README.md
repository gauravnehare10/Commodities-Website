# Commodities Website

A simple, static marketing website built with React, Vite, JavaScript, React Bootstrap (Bootstrap 5) and CSS3.

Bootstrap is themed through CSS variables in `src/styles/theme.css`, with no Sass. To change brand colours, edit `src/styles/variables.css`.

The project documents are in [`docs/`](docs/). Start with [PROJECT_REQUIREMENTS.md](docs/PROJECT_REQUIREMENTS.md).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

You need Node 20 or newer (see `.nvmrc`).

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the `dist/` build locally |
| `npm run lint` | Runs ESLint |
| `npm run format` | Runs Prettier on `src/` |

## Status

**Phases 1–3 (setup, design foundation, layout) are complete.** All routes work with the header, mobile menu and footer. Page content is a temporary placeholder until Phases 5–9. See [DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md) for the remaining phases.
