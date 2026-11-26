# Commodities Website

A static, prerendered React + Vite site for a scrap metal and secondary commodities business, built from the specs in [`../docs`](../docs).

> **Status: draft build.** All company-specific content is placeholder or unconfirmed. In development and staging, placeholders are highlighted in amber. A production build **refuses to run** until they're replaced (see [Going to production](#going-to-production)).

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173
```

Node 22 is required (see `.nvmrc`).

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with HMR. Forms are logged to the console instead of being sent. |
| `npm run build` | Content check, then prerender every route to `build/client/`, then generate the sitemap, robots.txt and 404.html |
| `npm run preview` | Serve `build/client` locally. Note: it doesn't map `/about` to `about/index.html` the way static hosts do. |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run lint` | ESLint (TypeScript, React hooks, jsx-a11y) |
| `npm test` | Vitest unit and component tests |
| `npm run content:check` | Validate all content (Zod schemas, cross-references, placeholder guard) |
| `npm run budget` | Check every route's initial JS is ≤ 150 KB gzip (run after build) |
| `npm run verify` | All of the above, in order |

## How it works

- **React Router v7 in framework mode** with `ssr: false` and `prerender`. Every route, including each commodity and service page, becomes a real HTML file at build time, then hydrates.
- **Content lives in `src/content/`** as typed data files. Pages are generated from data: adding a commodity, material, service, FAQ or glossary term needs no component changes.
- **Design tokens** are in `src/styles/tokens.css`. Swap the primitive colour and font values there to apply the client brand.
- **Forms** (`/quote` multi-step, `/contact`) use React Hook Form with `zod/mini` schemas that are shared with the server-side handler in `server/submit-handler.ts` (deployed as the Vercel Function `api/submit.ts`).

```
src/
  content/        ← ALL business content (edit here)
    site-config.ts    company details, contact, feature flags
    commodities/*.ts  one file per category, with its materials/grades
    services.ts, industries.ts, faqs.ts, glossary.ts, legal.ts, home.ts
    business-data.ts  locations, accreditations, stats, testimonials, downloads
    model.ts          browser-safe constants and types
    schema.ts         Zod schemas (build-time validation only)
  components/     ui/ layout/ sections/ commodity/ content/ forms/
  routes/         one module per page template
  lib/            seo, analytics, consent, glossary linker, form schemas
  styles/         tokens.css, global.css
server/           submit-handler.ts: form validation, spam check, email (shared by both hosts)
api/              Vercel Function for form submissions (POST /api/submit)
functions/api/    Cloudflare Pages Function (alternative host)
scripts/          check-content, postbuild (sitemap/robots/404), check-budget
```

## Editing content

| Task | Where |
|---|---|
| Company name, phone, email, address | `src/content/site-config.ts` |
| Hide a commodity category | set `active: false` in its file |
| Add a material/grade | add an entry to `materials` in the category file |
| Approve a category or service | replace its `[PLACEHOLDER]` text, then set `confirmed: true` |
| Add a depot, licence, stat or testimonial | `src/content/business-data.ts`. Each section appears automatically once it has data. |
| Licence and accreditation rule | items show only when they have a `number` or `document` (evidence) |
| Enable downloads, careers or modern slavery pages | `siteConfig.features` |

Every `[PLACEHOLDER]` maps to a numbered item (`MI-xx`) in the Missing Information Register: [`docs/PROJECT_REQUIREMENTS.md` §11](../docs/PROJECT_REQUIREMENTS.md).

## Going to production

```bash
SITE_ENV=production PUBLIC_SITE_URL=https://www.example.com npm run build
```

With `SITE_ENV=production` the build fails if any active item:

- still contains `[PLACEHOLDER]`
- is `confirmed: false`
- has invalid fields or broken cross-references

Production builds also:

- drop the draft banner and amber highlights
- drop the `noindex` meta tag
- emit an indexable robots.txt

### Deploying to Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. Set **Root Directory** to `commodities-site-v2`. Everything else is read from [`vercel.json`](vercel.json): no framework preset, `npm run build`, output `build/client`, security headers and asset caching.
3. Add **Environment Variables** (Project → Settings):

| Variable | When | Notes |
|---|---|---|
| `SITE_ENV` | build | `staging` while content has placeholders (draft banner, `noindex`). `production` only once all content is confirmed; the build fails otherwise. |
| `PUBLIC_SITE_URL` | build | Your domain, e.g. `https://www.example.com`. If unset, the project's `*.vercel.app` production address is used for canonical links and the sitemap. |
| `VITE_TURNSTILE_SITE_KEY` | build | Optional. Spam check widget; hidden when empty. |
| `EMAIL_PROVIDER_API_KEY` | function | Resend API key. Without the email variables, the form replies "not configured" (503). |
| `EMAIL_FROM` | function | Verified sender in Resend, e.g. `website@your-domain` |
| `FORM_TO_QUOTE`, `FORM_TO_CONTACT` | function | Recipient address(es), comma-separated (MI-23) |
| `TURNSTILE_SECRET_KEY` | function | Optional; pair with the site key |
| `CRM_WEBHOOK_URL` | function | Optional |

4. Deploy. Redeploy after changing any **build** variable.
5. Recommended: in **Firewall**, add a rate-limit rule for `/api/submit` (e.g. 5 requests per 10 minutes per IP).

How it fits together: every page is prerendered to `build/client/<route>/index.html` and served statically. Unknown URLs get `404.html` with a real 404 status. The form posts to `/api/submit`, which is the Vercel Function in `api/submit.ts`. Node 22 is pinned in `package.json`.

Add analytics domains to the CSP in `vercel.json` once a provider is chosen (MI-22).

### Alternative: Cloudflare Pages

Build command `npm run build`, output `build/client`. Cloudflare uses `functions/api/submit.ts` and `public/_headers` instead of `api/` and `vercel.json`. Both function files share `server/submit-handler.ts`. The environment variables are the same as above. Rate-limit with a WAF rule.

## Not done yet

- **Visual and browser QA.** The build was checked by type, lint, unit tests, prerender output and bundle budget, not yet in real browsers or with screen readers. Playwright e2e/axe and Lighthouse CI (TECHNICAL_ARCHITECTURE §12) are not set up.
- **Photography.** There are no images; cards use CSS material textures until MI-15 is resolved.
- **Analytics.** Events are typed and consent-gated, but no provider is wired in (MI-22).
- **Logo.** The interim wordmark is in `src/components/layout/Logo.tsx` (MI-02).
- **CSP.** It needs `'unsafe-inline'` for scripts because of React Router's inline hydration data.
