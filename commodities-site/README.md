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

**Phases 1–8 are complete:** setup, design foundation, layout, data and imagery, and the Home, Commodities, Services, About and Contact pages. The Privacy page shows a temporary placeholder until Phase 9.

**Enquiry form:** set `formEndpoint` in `src/data/company.js` to `'netlify'` or a Formspree URL. Until then, submissions are logged to the browser console and the thank-you message is shown. Content and images are in `src/data/` and `src/assets/images/`.

Business details still to be supplied appear as `[TBC]`. Search the code for `[TBC]` to find them all. Stock image credits are in [docs/IMAGE_CREDITS.md](docs/IMAGE_CREDITS.md). See [DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md) for the remaining phases.
