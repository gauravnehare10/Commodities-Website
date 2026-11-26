# Commodities Website

A simple, static marketing website built with React, Vite, JavaScript, React Bootstrap (Bootstrap 5) and CSS3. It is hosted on **Vercel**. The enquiry form opens the visitor's **email app** with the enquiry written out (demo mode), and can be switched to **Formspree** later.

Bootstrap is themed through CSS variables in `src/styles/theme.css`, with no Sass. To change brand colours, edit `src/styles/variables.css`.

The project documents are in [`docs/`](docs/). Start with [PROJECT_REQUIREMENTS.md](docs/PROJECT_REQUIREMENTS.md).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

You need Node 22 (see `.nvmrc`; Vercel uses the same version via `engines` in `package.json`).

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the `dist/` build locally |
| `npm run lint` | Runs ESLint |
| `npm run format` | Runs Prettier on `src/` |

## Deploy to Vercel

The project is ready to deploy. `vercel.json` sets up the following:

- **Build:** framework Vite, build command `npm run build`, output folder `dist`.
- **Page links:** every page URL (e.g. `/commodities/wood`) serves the app, so direct links and page refreshes work. Missing files still return a real 404.
- **Security headers:** `nosniff`, `DENY` framing, `Referrer-Policy`, `Permissions-Policy` and HSTS.
- **Caching:** fingerprinted assets for 1 year; banner images for 1 day.

### First deployment

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. **Set Root Directory to `commodities-site`.** The repository also contains other folders (`commodities-site-v2/`, `docs/`), so this step is required.
4. Leave Framework, Build Command and Output Directory as detected; they come from `vercel.json`. No environment variables are needed.
5. Click **Deploy**. Vercel builds the site and gives you a `*.vercel.app` URL.

After that, every push to `main` deploys to production, and every other branch or pull request gets its own preview URL.

Using the Vercel CLI instead: run `npx vercel` from inside `commodities-site/` for a preview, then `npx vercel --prod`.

### Before going live

1. **Enquiries:** set the company email in `src/data/company.js` (`email`). Pressing "Send enquiry" opens the visitor's email app with a message to that address containing everything they filled in; they press Send. Until the email is set, the To field is left empty.
   - *Optional, for production:* to receive enquiries without the visitor's email app, create a free form at [formspree.io](https://formspree.io) and paste its URL into `formEndpoint` in the same file. The form switches to Formspree automatically.
2. **Domain:** add it in Vercel → Project → Settings → Domains (HTTPS is automatic). Then replace `https://www.example.com` with the real domain in `public/sitemap.xml` and `public/robots.txt`.
3. **Content:** replace every `[TBC]` (search the code) with real business details.

The full launch checklist is in [DEVELOPMENT_ROADMAP.md, Phase 11](docs/DEVELOPMENT_ROADMAP.md).

## Status

**Phases 1–10 are complete:** all pages are built and QA has been run. Results are in [DEVELOPMENT_ROADMAP.md §5](docs/DEVELOPMENT_ROADMAP.md). The site is deploy-ready for Vercel. Launch (Phase 11) needs the business information marked `[TBC]`.

- **Content:** in `src/data/`. Images are in `src/assets/images/`, and banner images (with phone-sized `-sm` copies) are in `public/images/`.
- **SEO files:** `public/sitemap.xml` and `public/robots.txt`. If you add a commodity, also add its URL to `sitemap.xml`.
- **Image credits:** stock photos are credited in [docs/IMAGE_CREDITS.md](docs/IMAGE_CREDITS.md).
