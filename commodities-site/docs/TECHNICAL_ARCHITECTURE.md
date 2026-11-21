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
│   └── images/                  # Banner images with fixed URLs (+ *-sm.webp phone copies), see §8
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
│   │       └── contact/         #   EnquiryForm, ContactDetails, enquiry.js (validation + sending) + contact.css
│   ├── pages/                   # HomePage, AboutPage, CommoditiesPage, CommodityDetailPage,
│   │                            # ServicesPage, ContactPage, PrivacyPage, NotFoundPage
│   ├── hooks/
│   │   └── useScrollReveal.js   # Adds .is-revealed to [data-reveal] elements as they scroll into view (run once in Layout)
│   ├── utils/
│   │   ├── contact.js           # isTbc(), telHref(), mailHref(), displayName() for placeholder-safe contact details
│   │   ├── images.js            # bannerSrcSet(), HERO_SIZES, BANNER_SIZES
│   │   └── motion.js            # reveal(index, step) and delay(ms) helpers for staggered animation
│   └── styles/
│       ├── variables.css        # Design tokens (UI_UX_GUIDELINES §2–4)
│       ├── theme.css            # Maps tokens onto Bootstrap (--bs-* variables, buttons, forms, container)
│       ├── base.css             # Typography, focus, skip link, reduced motion (Bootstrap Reboot is the reset)
│       ├── utilities.css        # .eyebrow, .lead, .prose (Bootstrap utilities cover the rest)
│       └── animations.css       # Motion tokens, keyframes, .animate-in, .animate-settle, scroll reveal, page fade (UI_UX_GUIDELINES §7)
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
- **Vercel fallback.** A rewrite in `vercel.json` serves `index.html` for every path without a file extension, so deep links and page refreshes work. Paths with an extension (`/assets/…`, `/images/…`, `/sitemap.xml`) are served as files, so a missing file returns a real 404. Unknown page URLs render `NotFoundPage`, which is marked `noindex`.

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

The form is a normal HTML form, enhanced with React for validation and a success message. Vercel has no built-in form handling, so there are two delivery modes, chosen by one value in `company.js` (`formEndpoint`, MI-12):

| Mode | `formEndpoint` | What happens on "Send enquiry" | Use |
|---|---|---|---|
| **Email** (current) | `''` | The visitor's email app opens with a new message: To = `company.email`, a subject such as "Website enquiry: Sell material – Wood", and every field in the body. The visitor presses Send. A panel then says the email is ready, with an "Open email again" button. | Demo / no accounts needed |
| **Formspree** | `https://formspree.io/f/<id>` | The form posts to Formspree, which emails the business directly. The visitor sees "Thank you, your enquiry has been sent". | Production, when a Formspree account is set up |

- **Email mode details.** `buildMailto()` in `sections/contact/enquiry.js` URL-encodes the subject and a CRLF body. While `company.email` is `[TBC]`, the To field is left empty. Messages are capped at 1,500 characters so the link stays within what mail apps accept. Limitation: the visitor needs an email app, or a browser set up to handle email links; without one, the "Open email again" button and phone number are the fallback.
- **Configuration.** `formEndpoint` is not a secret. To switch to Formspree, create a free account, create a form with the business inbox as recipient, and paste the form URL into `formEndpoint`.
- **Validation.** Native HTML attributes (`required`, `type="email"`, `minlength`) plus a small `validate()` function for friendly messages. Errors show below each field, and the first invalid field is focused.
- **Submission.** `fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })`. On success, the form is replaced by a thank-you panel. On failure, a message shows the phone number and email.
- **Spam.** A hidden honeypot field named `_gotcha`, which Formspree recognises natively, plus Formspree's built-in filtering.
- **Pre-fill.** `useSearchParams()` reads `?commodity=` to preselect the commodity.
- **Implementation.** Validation and sending live in `sections/contact/enquiry.js`, separate from the UI. Formspree supports cross-origin requests, so the browser posts directly to it; no Vercel function is needed.
- **Accessibility.** Each field has a `<label>`. Invalid fields get Bootstrap's `is-invalid` styling, `aria-invalid="true"`, and `aria-describedby` pointing to the error text. Focus moves to the first invalid field, the error count is announced in an `aria-live` region, and the thank-you message receives focus and has `role="status"`.

## 8. Images

- **Location:**
  - **Below-the-fold images** (cards, split sections, services) live in `src/assets/images/`. Data files import them, so Vite fingerprints them for long-term caching.
  - **Banner images** (Home hero, page headers, commodity headers, which are each page's largest element) live in `public/images/` with fixed URLs, so `index.html` can preload them. Each has a phone-sized `*-sm.webp` copy, used through `srcset`; see `src/utils/images.js`.
- **Optimisation:** done before adding the image, using Squoosh or `sharp-cli` to produce WebP at the sizes in UI_UX_GUIDELINES §5. There is no image pipeline in the build.
- **Markup:** every `<img>` has `width`, `height`, `alt` and `loading` attributes; the hero image also has `fetchpriority="high"`.
- **Credits:** each stock image is recorded in `docs/IMAGE_CREDITS.md` with its source, author and licence.

## 9. SEO

- **Per-page metadata:** each page renders `<title>` and `<meta name="description">` inside its component, and React 19 moves them into `<head>`.
- **Default metadata:** `index.html` holds a site-wide default title, description and Open Graph tags, plus `lang="en-GB"`, for crawlers that don't run JavaScript (e.g. social link previews). These tags carry `data-default-meta`, and `src/main.jsx` removes them when the app starts. Each page then has exactly one title and description, from its `<Seo>` component, instead of two.
- **Crawling:** `public/sitemap.xml` (12 URLs) and `public/robots.txt` are maintained by hand.
- **Known limitation:** as an SPA, page content is rendered by JavaScript. Google renders JavaScript, which is acceptable for this scope. If search performance later requires it, add build-time prerendering (e.g. `vite-react-ssg`) without changing components. This is a future option only.

## 10. Performance

| Technique | Target |
|---|---|
| Small dependency set | Initial JS under 120 KB gzipped (React, React DOM, the router, React Bootstrap components used, and the app) |
| CSS | Under 45 KB gzipped. The full `bootstrap.min.css` (about 30 KB gzipped) is accepted for simplicity; partial Sass imports could trim it later if needed. |
| Route-level code splitting | Pages load with `React.lazy`, so the first visit downloads the shared layout plus one page: about 101 KB gzipped, against 118 KB without splitting. `ScrollToTop` waits up to 3 s for `#hash` targets on lazily loaded pages. |
| Banner preload | An inline script in `index.html` preloads the current page's banner image (with matching `imagesrcset` and `imagesizes`) before the JavaScript runs. |
| Layout stability | `<main>` uses `display: flow-root`, so the Home hero's negative margin can't shift the page when it loads. CLS is 0 on all pages. |
| Known limit | First paint is about 2.7 s on Lighthouse's simulated slow 4G, because the CSS (Bootstrap) and JS must load before an SPA can draw. Performance scores are 83–91. Future options, if needed: prerendering (`vite-react-ssg`, §9), and partial Bootstrap imports via Sass. |
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
| Host | **Vercel** (decided). Enquiries go through Formspree (§7). |
| Configuration | `commodities-site/vercel.json`: framework `vite`, build `npm run build`, output `dist`, SPA rewrite (§5), headers, `trailingSlash: false` (redirects `/about/` to `/about`, matching the sitemap) |
| Repository | The repository holds several projects, so the Vercel project's **Root Directory** must be set to `commodities-site` |
| Node | `22.x` (from `engines` in `package.json`); Vercel installs with `npm ci` from `package-lock.json` |
| Domain | Custom domain added in Vercel → Settings → Domains; HTTPS certificates are automatic (MI-15) |
| Security headers | Set in `vercel.json` on every path: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment, usb off), `Strict-Transport-Security`. A Content-Security-Policy is not set yet: it would need a hash for the inline preload script in `index.html` and `connect-src https://formspree.io`; it can be added after launch. |
| Caching | `/assets/*` (fingerprinted): 1 year, immutable. `/images/*` (fixed names): 1 day, plus `stale-while-revalidate`. HTML: Vercel's default (always revalidated). |
| Releases | Each push to `main` deploys to production; every other branch or pull request gets its own preview URL for review |

## 13. Coding standards

- **Components:** functional components and hooks only. One component per file, named in PascalCase.
- **Props:** keep them simple. Pass data objects, not long prop lists.
- **No business copy in components.** Text comes from `src/data/`. The exceptions are UI microcopy such as "View grades" and "Send enquiry".
- **Semantic HTML first:** `<nav>`, `<section aria-labelledby>`, `<ul>`, `<button>` and `<a>` used correctly.
- **Commits:** short imperative messages, e.g. "Add commodity detail page".
