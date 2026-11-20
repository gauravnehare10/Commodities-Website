# Technical Architecture

> **Version:** 1.0 (draft for approval) · **Date:** 2026-11-20
> **Related:** [PROJECT_REQUIREMENTS](./PROJECT_REQUIREMENTS.md) · [UI_UX_GUIDELINES](./UI_UX_GUIDELINES.md) · [WEBSITE_STRUCTURE](./WEBSITE_STRUCTURE.md) · [DEVELOPMENT_ROADMAP](./DEVELOPMENT_ROADMAP.md)

## 1. Approach

A **plain React single-page application built with Vite**, deployed as static files.

- **No server, database, authentication or custom API.**
- **Content** is plain JavaScript data files.
- **UI components and layout** use **React Bootstrap** (Bootstrap 5), themed with plain CSS3 custom properties. There is no Sass.
- **Enquiries** are sent by a hosted form service, configured as a URL with no code to run (§7).

```
src/data/*.js ─┐
src/assets/*   ├─► Vite build ─► dist/ (index.html + hashed JS/CSS/images) ─► Static host (CDN)
components/CSS ┘                                                              │
                                                     Browser ── form POST ──► Form service ─► Email inbox
```

## 2. Technology

| Concern | Choice | Notes |
|---|---|---|
| Build tool | **Vite** (latest stable) | Dev server and production build |
| UI | **React 19** | React 19 renders `<title>` and `<meta>` placed in components into the document head |
| Language | **JavaScript (ES2022+, JSX)** | No TypeScript |
| Routing | **react-router-dom** | Client-side routing, used in library (SPA) mode |
| UI framework | **React Bootstrap** + **Bootstrap 5** CSS | Grid (`Container`, `Row`, `Col`), `Navbar`, `Offcanvas`, `Card`, `Form`, `Button`, `Breadcrumb`, `Alert`. Imported per component (e.g. `import Button from 'react-bootstrap/Button'`) so only used parts are bundled. |
| Styling | **CSS3**: custom properties, Flexbox and Grid, `clamp()`, media queries | Bootstrap is themed by overriding its `--bs-*` CSS variables in `theme.css`. Custom components have one `.css` file each, with BEM class names. No Sass and no CSS-in-JS. |
| Icons | **lucide-react** | Tree-shaken, so only the icons used are bundled |
| Fonts | **@fontsource/manrope**, **@fontsource/inter** | Self-hosted |
| Linting and formatting | ESLint (Vite React template config) and Prettier | Development only |
| Node | 20 LTS or newer | Recorded in `.nvmrc` |

## 3. Dependencies

**Runtime (six):** `react`, `react-dom`, `react-router-dom`, `react-bootstrap`, `bootstrap` (CSS only), `lucide-react`. The two `@fontsource` packages contain only CSS and font files.

**Development:** `vite`, `@vitejs/plugin-react`, `eslint` and its React plugins, `prettier`.

There are no form, validation, state-management or animation libraries; React Bootstrap is the only UI library. Bootstrap's own JavaScript bundle (`bootstrap.bundle.js`) is **not** used, because React Bootstrap provides the behaviour. Adding any dependency needs a stated reason in the pull request.

## 4. Project structure

```
commodities-site/
├── docs/                        # These documents (+ IMAGE_CREDITS.md)
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects               # SPA fallback for Netlify: /*  /index.html  200
├── src/
│   ├── main.jsx                 # Entry: router, global CSS, fonts
│   ├── App.jsx                  # Route definitions
│   ├── assets/
│   │   ├── images/              # Optimised WebP images (hero/, commodities/, services/, about/)
│   │   └── logo.svg             # Placeholder until MI-02
│   ├── data/
│   │   ├── company.js
│   │   ├── commodities.js
│   │   ├── services.js
│   │   ├── content.js
│   │   └── navigation.js
│   ├── components/
│   │   ├── layout/              # Layout, Header, Footer, Logo, ScrollToTop, Seo
│   │   ├── ui/                  # Button (wraps react-bootstrap Button), Section, SectionHeading, Icon (name → lucide icon)
│   │   ├── cards/               # CommodityCard, ServiceCard + cards.css (used on several pages)
│   │   └── sections/            # Page sections, grouped by the page that uses them:
│   │       ├── shared/          #   PageHero, CtaBanner, SplitFeature, FeatureGrid, ProcessSteps, TrustBar + shared.css
│   │       ├── home/            #   Hero, StatsStrip, Testimonial + home.css
│   │       ├── commodities/     #   GradeList, AcceptanceLists, EnquiryPanel + commodities.css
│   │       ├── services/        #   AnchorNav + services.css (service blocks reuse shared/SplitFeature)
│   │       └── contact/         #   EnquiryForm, ContactDetails (Phase 8) + contact.css
│   ├── pages/                   # HomePage, AboutPage, CommoditiesPage, CommodityDetailPage,
│   │                            # ServicesPage, ContactPage, PrivacyPage, NotFoundPage
│   ├── hooks/
│   │   └── useReveal.js         # Optional fade-up on scroll
│   ├── utils/
│   │   └── contact.js           # isTbc(), telHref(), mailHref(), displayName() for placeholder-safe contact details
│   └── styles/
│       ├── variables.css        # Design tokens (UI_UX_GUIDELINES §2–4)
│       ├── theme.css            # Maps tokens onto Bootstrap (--bs-* variables, buttons, forms, container)
│       ├── base.css             # Typography, focus, skip link, reduced motion (Bootstrap Reboot is the reset)
│       └── utilities.css        # .eyebrow, .lead, .prose (Bootstrap utilities cover the rest)
├── index.html
├── vite.config.js
├── eslint.config.js
├── .prettierrc
├── .nvmrc
└── package.json
```

**Component conventions**

- **Where a section goes.** Sections used by one page go in that page's folder (`sections/home/`, `sections/commodities/`…). Sections used by two or more pages go in `sections/shared/`. If a page-specific section becomes needed elsewhere, move it to `shared/`.
- **When to make a component.** Create one only when a block is reused, or is complex enough to deserve its own file. Simple one-off markup can stay in the page component.
- **One stylesheet per folder.** There is one CSS file per folder (`shared.css`, `home.css`, `cards.css`…), not one per component, because Bootstrap utilities handle most styling. Each file has one labelled block per component, in alphabetical order. Every component in the folder imports the folder stylesheet; Vite includes it only once.
- **Data flow.** Components receive data through props. Only page components import from `src/data/`. Exceptions: layout components (Header, Footer) and contact-detail sections read `company.js` directly.

## 5. Routing

```jsx
// src/App.jsx (outline)
<Routes>
  <Route element={<Layout />}>              {/* Header + <Outlet/> + Footer + ScrollToTop */}
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="commodities" element={<CommoditiesPage />} />
    <Route path="commodities/:slug" element={<CommodityDetailPage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="privacy" element={<PrivacyPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

- **Unknown commodity slugs:** `CommodityDetailPage` looks up the slug in `commodities.js` and renders `NotFoundPage` if it isn't found.
- **Scroll position:** `ScrollToTop` scrolls to the top on route change, or to the `#hash` target if one is present (for service anchors).
- **Static hosts** need a fallback that sends every path to `index.html`: `_redirects` on Netlify, `vercel.json` rewrites on Vercel.

## 6. Styling architecture

- **Load order** (in `main.jsx`): `bootstrap/dist/css/bootstrap.min.css` → fonts → `variables.css` → `theme.css` → `base.css` → `utilities.css` → component CSS. Later files win, so our styles override Bootstrap without `!important`.
- **`variables.css`** holds every design token: colours, fonts, type scale, spacing, radius and shadows.
- **`theme.css`** applies the tokens to Bootstrap. It overrides the root `--bs-*` variables (primary colour, body font, text and link colours, border radius) and the component variables (`--bs-btn-*` for buttons, focus ring, form controls), and caps `.container` at 1200px.
- **Use Bootstrap first:** use React Bootstrap components and Bootstrap utility classes for layout, spacing, colour, borders, radius, shadows and positioning (`d-flex`, `gap-3`, `p-4`, `mb-0`, `text-primary`, `bg-light`, `rounded-3`, `shadow-sm`, `w-100`, `object-fit-cover`, `position-absolute`). A component's `.css` file holds **only** what Bootstrap can't express: responsive aspect ratios, hover effects, gradients, decorative lines, line clamps and exact fluid sizes. Each component CSS file starts with a comment saying so.
- **Theme-mapped utilities** (set in `theme.css`): `text-primary` and `btn-primary` are copper, `text-secondary` is graphite, `text-body-secondary` is slate, `bg-light` is sand, and `bg-dark` and `text-dark` are ink.
- **Never fight Bootstrap's `!important` utilities** with `!important`. Change the Bootstrap CSS variable they read instead (e.g. set `--bs-box-shadow-sm` on hover), or leave that property out of the utility classes.
- **BEM naming** for custom component classes, so they never collide with Bootstrap's: `.commodity-card`, `.commodity-card__image`.
- **Mobile-first**, using Bootstrap breakpoints in media queries: `576px`, `768px`, `992px`, `1200px`, `1400px`.
- **No `!important`**, except where Bootstrap itself uses it (its utility classes) and in the reduced-motion rule below.
- **Reduced motion** is handled once in `base.css`:

  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
  ```

  This is the only place our own CSS uses `!important`.

## 7. Enquiry form (no backend)

The form is a normal HTML form, enhanced with React for validation and a success message.

| Option | How it works | When to use |
|---|---|---|
| **A. Netlify Forms** (recommended if hosting on Netlify) | Add `data-netlify="true"` and a hidden `form-name` field. Netlify captures submissions and emails them. | Hosting on Netlify |
| **B. Formspree** (or similar) | The form posts to `https://formspree.io/f/<id>`. The service emails the submission. | Any other host |

- **Configuration.** The endpoint is one value in `company.js` (`formEndpoint`, MI-12). It is not a secret.
- **Validation.** Native HTML attributes (`required`, `type="email"`, `minlength`) plus a small `validate()` function for friendly messages. Errors show below each field, and the first invalid field is focused.
- **Submission.** `fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })`. On success, the form is replaced by a thank-you panel. On failure, a message shows the phone number and email.
- **Spam.** A hidden honeypot field (supported natively by both services) plus each service's built-in filtering.
- **Pre-fill.** `useSearchParams()` reads `?commodity=` to preselect the commodity.
- **Local development.** If no endpoint is configured, the form logs the data to the console and shows the success state.

## 8. Images

- **Location:** `src/assets/images/`, imported in data files so Vite fingerprints them for long-term caching.
- **Optimisation:** done before adding the image, using Squoosh or `sharp-cli` to produce WebP at the sizes in UI_UX_GUIDELINES §5. There is no image pipeline in the build.
- **Markup:** every `<img>` has `width`, `height`, `alt` and `loading` attributes; the hero image also has `fetchpriority="high"`.
- **Credits:** each stock image is recorded in `docs/IMAGE_CREDITS.md` with its source, author and licence.

## 9. SEO

- **Per-page metadata:** each page renders `<title>` and `<meta name="description">` inside its component, and React 19 moves them into `<head>`.
- **Default metadata:** `index.html` holds default title, description, Open Graph tags and `lang="en-GB"`.
- **Crawling:** `public/sitemap.xml` (12 URLs) and `public/robots.txt` are maintained by hand.
- **Known limitation:** as an SPA, page content is rendered by JavaScript. Google renders JavaScript, which is acceptable for this scope. If search performance later requires it, add build-time prerendering (e.g. `vite-react-ssg`) without changing components. This is a future option only.

## 10. Performance

| Technique | Target |
|---|---|
| Small dependency set | Initial JS under 120 KB gzipped (React, React DOM, the router, React Bootstrap components used, and the app) |
| CSS | Under 45 KB gzipped. The full `bootstrap.min.css` (about 30 KB gzipped) is accepted for simplicity; partial Sass imports could trim it later if needed. |
| Route-level code splitting | Not needed at this size. Revisit only if JS exceeds the budget. |
| Images | WebP, correctly sized, lazy-loaded below the fold |
| Fonts | Two families; only the Latin subset weights listed are imported |
| Caching | Hashed assets are cached for one year by the host; `index.html` is not cached |
| Measurement | Lighthouse (mobile) on Home, a commodity page and Contact before each release |

## 11. Quality and testing

There is no automated test suite; the site is too simple to need one.

**Checks**

- `npm run lint` passes with no errors.
- `npm run build` succeeds.
- The manual QA checklist in DEVELOPMENT_ROADMAP §5 has been followed.
- Lighthouse scores meet PROJECT_REQUIREMENTS §3.
- Accessibility spot checks with axe DevTools and keyboard-only navigation.

## 12. Hosting and deployment

| Item | Decision |
|---|---|
| Host | **Netlify** recommended: free tier, Netlify Forms, simple SPA redirects. Vercel or Cloudflare Pages also work with option B in §7. Final choice: MI-15. |
| Build | Command `npm run build`; publish directory `dist` |
| Domain | Custom domain with HTTPS (automatic on all three hosts) |
| Security headers | Set in `public/_headers` (Netlify): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |
| Releases | Push to `main` to deploy; the host's preview URLs are used for review |

## 13. Coding standards

- **Components:** functional components and hooks only. One component per file, named in PascalCase.
- **Props:** keep them simple. Pass data objects, not long prop lists.
- **No business copy in components.** Text comes from `src/data/`. The exceptions are UI microcopy such as "View grades" and "Send enquiry".
- **Semantic HTML first:** `<nav>`, `<section aria-labelledby>`, `<ul>`, `<button>` and `<a>` used correctly.
- **Commits:** short imperative messages, e.g. "Add commodity detail page".
