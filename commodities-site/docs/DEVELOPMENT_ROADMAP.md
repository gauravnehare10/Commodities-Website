# Development Roadmap

> **Version:** 1.0 (draft for approval) · **Date:** 2026-11-20
> **Related:** [PROJECT_REQUIREMENTS](./PROJECT_REQUIREMENTS.md) · [UI_UX_GUIDELINES](./UI_UX_GUIDELINES.md) · [WEBSITE_STRUCTURE](./WEBSITE_STRUCTURE.md) · [TECHNICAL_ARCHITECTURE](./TECHNICAL_ARCHITECTURE.md)

## 1. Approach

- **Build in small, visible steps.** Each phase ends with something you can open in a browser.
- **Content runs in parallel.** Development uses `[TBC]` placeholders and licensed stock imagery until the business supplies real content (PROJECT_REQUIREMENTS §9).
- **Durations assume one developer.** The critical path to launch is business content, not code.

## 2. Phases

| Phase | Name | Estimate | Output |
|---|---|---|---|
| 0 | Content and asset gathering | Runs in parallel | Answers to the MI items; images selected |
| 1 | Project setup | 0.5 day | Vite + React running; folder structure; lint and format set up |
| 2 | Design foundation | 1 day | React Bootstrap installed and themed (`theme.css`); `variables.css`, `base.css`, fonts; `Button`, `Section`, `SectionHeading` |
| 3 | Layout | 1 day | `Header` (with mobile menu), `Footer`, `Layout`, `ScrollToTop`, routing with placeholder pages |
| 4 | Data and imagery | 0.5 day | `src/data/*.js` filled with draft content; optimised WebP images added |
| 5 | Home page | 1.5 days | All Home sections (WEBSITE_STRUCTURE §4.1) |
| 6 | Commodities | 1 day | Commodities overview and commodity detail template (six pages) |
| 7 | Services and About | 1 day | Services page with anchors; About page |
| 8 | Contact and enquiry form | 1 day | Form with validation, pre-fill, success and error states; contact details |
| 9 | Privacy, 404 and SEO | 0.5 day | Remaining pages; titles and meta tags; sitemap.xml; robots.txt |
| 10 | QA and polish | 1–1.5 days | Responsive, accessibility, performance and cross-browser fixes (§5) |
| 11 | Launch | 0.5 day | Deployed to the host, domain connected, form tested live |

**Estimated development total: about 9–10 working days**, plus content turnaround from the business.

## 3. Phase details

### Phase 1: Project setup

- [x] Vite + React (JavaScript) project created in `commodities-site/`. The template files were written by hand, so there was no boilerplate to remove.
- [x] Install `react-router-dom`, `lucide-react`, `@fontsource/manrope` and `@fontsource/inter`
- [x] Create the folder structure in TECHNICAL_ARCHITECTURE §4
- [x] Add Prettier and `.nvmrc`; check ESLint runs

### Phase 2: Design foundation

- [x] Add the tokens from UI_UX_GUIDELINES §2–4 to `variables.css`
- [x] Add the reset, typography, focus ring, skip link and reduced-motion rule to `base.css`
- [x] Install `react-bootstrap` and `bootstrap`; theme Bootstrap through `--bs-*` variables in `theme.css` (copper primary, fonts, radius, focus ring, container width)
- [x] Build `Button` (wrapping React Bootstrap `Button`), `Section` (white, sand and ink tones, using Bootstrap `Container`) and `SectionHeading` with eyebrow
- [x] Self-hosted fonts (Latin subset, specified weights only) imported in `main.jsx`; a temporary style preview page sits in `App.jsx` until Phase 3

### Phase 3: Layout

- [x] Header: sticky, shadow on scroll, active link, phone, "Get a Quote". *The transparent-over-hero variant moves to Phase 5, since it needs the Home hero.*
- [x] Header built with React Bootstrap `Navbar`; mobile menu with `Offcanvas` (Esc to close and focus trap are built in), closing on route change
- [x] Footer: four columns and bottom bar, driven by `navigation.js` and `company.js`
- [x] All eight routes resolve, including the 404; each page sets its title and description with `Seo`
- [x] Responsive check at 320, 375, 768, 992, 1280 and 1440px: no horizontal overflow, sticky header works, mobile menu verified (focus moves in, Esc closes, link closes)

### Phase 4: Data and imagery

- [x] Fill `company.js`, `commodities.js`, `services.js`, `content.js` and `navigation.js` with draft content. Industry definitions are written out; business-specific statements are marked `[TBC]` (78 items).
- [x] Source images, optimise to WebP and record them in `docs/IMAGE_CREDITS.md`: 24 Unsplash images, optimised with `sharp`, all within the UI_UX_GUIDELINES §5 size budgets

### Phases 5–9: Pages

Build each page from its blueprint in WEBSITE_STRUCTURE §4, reusing components. **Definition of done** for every page:

- [ ] Responsive on mobile, tablet and desktop: checked at 320, 375, 768, 992 and 1440px in browser dev tools (UI_UX_GUIDELINES §9.1), with no horizontal scrolling and layouts as in §9.2
- [ ] Touch targets at least 44px; nothing depends on hover alone
- [ ] Content comes from `src/data/`
- [ ] Has its own `<title>` and meta description
- [ ] Keyboard navigable with visible focus
- [ ] Images have alt text, dimensions and lazy loading (except the hero)
- [ ] No console errors

**Progress**

| Phase | Page | Status |
|---|---|---|
| 5 | Home (P-01) | ✅ Done: all 10 sections; header transparent over the hero; checked at 320–1440px |
| 6 | Commodities (P-03, P-04) | ✅ Done: overview page and detail template for all 6 categories (PageHero, GradeList, AcceptanceLists, EnquiryPanel, compact cards); checked at 320–1440px |
| 7 | Services (P-05), About (P-02) | ✅ Done: Services has jump links and 6 alternating blocks; About is built entirely from shared sections; anchors land below the sticky header; checked at 320–1440px |
| 8 | Contact (P-06) | Not started |
| 9 | Privacy (P-07), 404 (P-08 ✅ done in Phase 3), SEO files | Not started |

### Phase 10: QA

Run the checklist in §5 and fix any issues.

### Phase 11: Launch

- [ ] All launch-blocker MI items resolved, with no `[TBC]` text left (search the codebase)
- [ ] Form endpoint configured; a live test submission reaches the business inbox
- [ ] Host connected to the repository; build command `npm run build`, publish directory `dist`
- [ ] Custom domain and HTTPS active; `sitemap.xml` URLs use the real domain
- [ ] Sitemap submitted to Google Search Console

## 4. Milestones

| Milestone | After phase | Review |
|---|---|---|
| M1: Design foundation and layout visible | 3 | Check the look and feel: header, footer, typography and colours |
| M2: Home page complete | 5 | Main design sign-off |
| M3: All pages built | 9 | Content review using `[TBC]` placeholders |
| M4: Launch | 11 | Final sign-off |

## 5. QA checklist

**Responsive**

- [ ] 320, 375, 576, 768, 992, 1200 and 1440px widths, with no horizontal scrolling
- [ ] Mobile menu, hero and card grids behave as described in UI_UX_GUIDELINES §9

**Functional**

- [ ] Every navigation, footer and call-to-action link works; service anchors scroll to the right section
- [ ] An unknown commodity URL shows the 404 page
- [ ] Form: required-field errors, invalid email, success state, failure state and `?commodity=` pre-fill
- [ ] Phone links open the dialler on mobile

**Accessibility**

- [ ] Keyboard-only run through all pages and the form
- [ ] axe DevTools reports no serious issues
- [ ] Headings, landmarks, alt text and contrast checked (UI_UX_GUIDELINES §8)
- [ ] Usable at 200% zoom

**Performance and SEO**

- [ ] Lighthouse mobile scores meet the targets on Home, a commodity page and Contact
- [ ] Every page has a unique title and description
- [ ] Image sizes within the limits in UI_UX_GUIDELINES §5

**Browsers**

- [ ] Chrome, Edge, Firefox and Safari (macOS and iOS); Chrome on Android

## 6. Risks

| Risk | Mitigation |
|---|---|
| Business content arrives late | Build with `[TBC]` placeholders; track MI items weekly |
| Weak or inconsistent imagery | Agree an image style early (UI_UX_GUIDELINES §5); plan a photo shoot |
| Scope creep (prices, blog, portal) | Refer to PROJECT_REQUIREMENTS §5.2; add new items to a post-launch list |
| Form spam | Honeypot plus the form service's spam filtering |

## 7. Possible later additions (not in this build)

- Analytics and a cookie notice (MI-14)
- Build-time prerendering for stronger SEO (TECHNICAL_ARCHITECTURE §9)
- News or case studies section
- Additional commodity categories, added as data only
