# UI / UX Guidelines

> **Version:** 1.0 (draft for approval) · **Date:** 2026-11-20
> **Related:** [PROJECT_REQUIREMENTS](./PROJECT_REQUIREMENTS.md) · [WEBSITE_STRUCTURE](./WEBSITE_STRUCTURE.md) · [TECHNICAL_ARCHITECTURE](./TECHNICAL_ARCHITECTURE.md) · [DEVELOPMENT_ROADMAP](./DEVELOPMENT_ROADMAP.md)

## 1. Design direction: "Industrial Premium"

The site should feel like a **confident, established industrial business presented with the polish of a premium brand**. Its character comes from:

- calm neutral backgrounds
- large, real photography of materials
- bold headlines
- generous whitespace
- one warm metallic accent (copper)

The design is original. It doesn't reuse layouts, colours or imagery from the reference websites.

**Principles**

1. **Image-led.** Material close-ups do the storytelling. Text stays short.
2. **Whitespace is a feature.** Sections breathe; aim for one idea per section.
3. **Strong typographic hierarchy.** Big headlines, short paragraphs, clear labels.
4. **Restraint.** One accent colour, one card style and one button family.
5. **Always actionable.** A clear next step, a quote or a call, on every screen.

## 2. Colour

All colours are CSS custom properties in `src/styles/variables.css`. The values below are provisional until the brand is supplied (MI-02).

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--color-ink` | `#14171A` | Headings, body text, dark sections, footer | 17.8:1 on white |
| `--color-graphite` | `#2E3338` | Secondary text | 12.6:1 on white |
| `--color-slate` | `#5C6670` | Muted text, captions | 5.8:1 on white ✅ |
| `--color-line` | `#E4E1DA` | Borders, dividers | decorative |
| `--color-sand` | `#F5F2EC` | Alternate section background | — |
| `--color-white` | `#FFFFFF` | Page background, cards | — |
| `--color-copper` | `#9C4F25` | **Primary accent:** buttons, links, highlights | 5.9:1 against white text ✅ |
| `--color-copper-dark` | `#7E3F1D` | Button hover | — |
| `--color-copper-light` | `#E9C7A8` | Accent on dark backgrounds (eyebrows, icons) | 11:1 on ink ✅ |
| `--color-forest` | `#1E4B43` | Small sustainability or compliance badges only | 9.6:1 on white |
| `--color-error` | `#B42318` | Form errors | 6.5:1 on white |
| `--color-success` | `#1F7A4D` | Form success | 5.3:1 on white |

**Usage**

- **Balance:** about 70% white or sand, 25% ink, and 5% copper.
- **Copper** is reserved for primary buttons, links, small accents (eyebrow labels, icon tints, underline details) and focus rings.
- **Dark sections** (ink background) appear at most twice per page: typically the stats strip or call-to-action banner, plus the footer.
- **Meaning:** colour is never the only signal. Errors also use an icon and text.

## 3. Typography

| Role | Font | Weights | Fallback |
|---|---|---|---|
| Headings | **Manrope** | 600, 700, 800 | `system-ui, sans-serif` |
| Body and UI | **Inter** | 400, 500, 600 | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

Fonts are self-hosted with `@fontsource` packages, so there are no external font requests. Text uses `font-display: swap`.

| Token | Size | Line height | Use |
|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 1.8rem + 4vw, 4.75rem)` | 1.05 | Home hero headline |
| `--fs-h1` | `clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)` | 1.1 | Page titles |
| `--fs-h2` | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` | 1.15 | Section headings |
| `--fs-h3` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | 1.3 | Card titles |
| `--fs-lead` | `1.1875rem` (19px) | 1.6 | Intro paragraphs |
| `--fs-body` | `1rem` (16px) | 1.65 | Body |
| `--fs-small` | `0.875rem` | 1.5 | Captions, meta |
| `--fs-eyebrow` | `0.8125rem`, uppercase, letter-spacing `0.12em`, weight 600 | 1.4 | Section labels |

**Rules**

- Headings use Manrope 700–800 with letter-spacing `-0.02em`.
- Body text lines are at most `65ch` long.
- Every major section has an **eyebrow label** (e.g. `OUR COMMODITIES`) in copper above its heading. This is a recurring signature element.
- Headings and buttons use sentence case. Text is UK English.

## 4. Layout and spacing

| Token | Value |
|---|---|
| Breakpoints | Bootstrap 5 defaults, mobile-first: `576px` (sm), `768px` (md), `992px` (lg), `1200px` (xl), `1400px` (xxl) |
| Container | Bootstrap `Container`, capped at `1200px`; side padding `clamp(1.25rem, 5vw, 2.5rem)` (overridden in `theme.css`) |
| Grid | Bootstrap `Row` and `Col` (12 columns), with gutter `g-4` (24px) for card grids |
| Spacing scale (8px base) | `--space-1` 4px · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96 · `-10` 128 |
| Section padding | `clamp(4rem, 9vw, 8rem)` top and bottom |
| Radius | `--radius-sm` 8px (inputs, chips) · `--radius-md` 14px (cards, buttons) · `--radius-lg` 24px (images, feature panels) |
| Shadows | `--shadow-sm: 0 1px 2px rgb(20 23 26 / .06)` · `--shadow-md: 0 12px 32px -12px rgb(20 23 26 / .18)` |

**Grids**

- Card grids are 1 column on mobile, 2 at 768px (`md={6}`) and 3 at 992px (`lg={4}`).
- Split sections (image and text) stack on mobile and become two columns at 992px (`lg={6}`). They alternate sides down the page.

## 5. Imagery

Imagery carries the premium feel, so it must be good.

| Aspect | Guideline |
|---|---|
| Source | Client photography first (MI-10). Interim: licensed royalty-free stock (e.g. Unsplash or Pexels licence), credited in `docs/IMAGE_CREDITS.md`. |
| Subjects | Close-ups of materials (copper wire, steel, baled cardboard, plastic flakes), yard and fleet operations, people at work wearing PPE |
| Style | Natural light, rich detail, slightly warm and consistent grading. No cartoon graphics and no clichéd green-leaf "eco" imagery. |
| Treatment | Rounded corners (`--radius-lg`). Hero and page-header images may use a dark gradient overlay so white text stays legible (at least 4.5:1). |
| Format | WebP. Hero 1600–1920px wide and under 250 KB. Cards 800px wide and under 120 KB. Split images 1200px wide and under 180 KB. |
| Aspect ratios | **Home hero:** 4:3 on mobile, 16:10 on tablet, 1:1 on small laptops (992–1199px) and 5:4 from 1200px, so the image roughly matches the height of the headline column and the hero fits on one laptop screen. **Cards:** 4:3. **Split sections:** 5:4. **Page headers:** 1600×700 wide crops. |
| Loading | Hero: `loading="eager"` and `fetchpriority="high"`. All others: `loading="lazy"`. Always set `width` and `height`. |
| Alt text | Describe the material or activity ("Bales of cardboard stacked in a warehouse"). Purely decorative images use `alt=""`. |

**Icons:** `lucide-react`, outline style, 1.75px stroke, sized 20px in the UI and 28px in feature grids. Icons that convey meaning have a text label beside them; decorative icons are `aria-hidden`.

## 6. Components

Components are built on **React Bootstrap** and themed to this guide. Bootstrap provides structure and behaviour; the look comes from `theme.css` and each component's CSS file.

| Our component | Built on (React Bootstrap) |
|---|---|
| Button | `Button` (variants `primary`, `outline-dark`, `light`, `link`) |
| Header, mobile menu | `Navbar`, `Nav`, `Offcanvas` |
| Layout grids, Footer, split sections | `Container`, `Row`, `Col` |
| CommodityCard, ServiceCard, AcceptanceLists, ContactDetails, EnquiryPanel | `Card` |
| EnquiryForm | `Form`, `Form.Group`, `Form.Label`, `Form.Control`, `Form.Select`, `Form.Check`, `Form.Control.Feedback`, `Alert` |
| PageHero breadcrumb | `Breadcrumb` |
| GradeList | `ListGroup` (flush) + `Badge` (pill) for grade codes |
| Section, SectionHeading, Hero, ProcessSteps, StatsStrip, CtaBanner | Custom markup inside `Container`, `Row` and `Col` |

| Component | Design notes |
|---|---|
| **Button** | Variants: `primary` (copper fill, white text), `secondary` (ink outline, Bootstrap `outline-dark`), `light` (white fill, for dark sections), `link` (copper text with arrow →). Height 48px (52px large), `--radius-md`, weight 600. Hover darkens the colour and moves the arrow 3px; the transition is 200ms. |
| **Header** | Bootstrap `Navbar`. 80px tall, transparent over the Home hero and white with `--shadow-sm` once scrolled; 64px tall on mobile. The active link has a copper underline. |
| **Mobile menu** | React Bootstrap `Offcanvas` (placement `end`): full-screen on phones and 400px wide on tablets. Ink background with large white links (1.75rem), the phone number and a "Get a Quote" button. Bootstrap's slide-in transition; body scroll locked and focus trapped while open. |
| **Hero** (Home) | Two columns on desktop: text left (eyebrow, display headline, lead, two buttons, phone line) and a large rounded image right, with a small floating "trust" card overlapping its corner if accreditation data exists. On mobile the image sits below the text. |
| **PageHero** | Full-width image with a dark gradient, white title, optional breadcrumb and intro. About 420px tall on desktop and 320px on mobile. |
| **SectionHeading** | Eyebrow, H2 and an optional lead paragraph. Left-aligned by default; centred variant for grids. |
| **CommodityCard** | 4:3 image on top (zooms to 1.04 on hover), a title, a two-line summary and a "View grades →" link. The whole card is clickable. White background with `--radius-md` and `--shadow-sm`, rising to `--shadow-md` on hover. The `compact` variant is a small image plus title. |
| **ServiceCard** | Icon in a sand-coloured circle, title, summary and arrow link. No image. |
| **Service block** (`SplitFeature`) | Services page blocks reuse `SplitFeature`: a 5:4 image, eyebrow (`Service 01`–`06`), title, paragraphs, a "What's included" heading and checklist (copper ticks), and a "Request this service" button. Image side and background alternate. |
| **SplitFeature** | Image and text side by side, with an optional bullet list and button. |
| **FeatureGrid** | Two to four columns of icon, title and text. |
| **ProcessSteps** | Four numbered steps. Large copper numbers (`01`) in Manrope 800, with a thin connecting line on desktop. Vertical on mobile. |
| **GradeList** | Table-like list: each row shows the grade name in bold, an optional code in a small sand-coloured pill, and a one-line description. Rows are divided by `--color-line`. On mobile the rows stack naturally (no table markup). |
| **AcceptanceLists** | Two cards: "We accept" with green ticks and "We don't accept" with red crosses. |
| **TrustBar** | A row of accreditation names and numbers with a shield icon. Hidden when there is no data. |
| **StatsStrip** | Ink background with three or four large numbers (Manrope 800, copper-light) and labels. Hidden when there is no data. |
| **Testimonial** | Large quote in Manrope 600, with the author and company below and a copper quotation-mark accent. Hidden when there is no data. |
| **AnchorNav** | A row of pill-shaped links (Bootstrap `btn btn-outline-dark rounded-pill`, 44px tall) below the page header. Jumps to the service sections. Below 992px it is one line that scrolls sideways, with a fade on the right edge to show there are more links; on desktop it wraps. |
| **EnquiryPanel** | A small sticky side card on commodity pages: "Interested in this material?", a "Get a Quote" button and the phone number. Sand background. |
| **CtaBanner** | Ink background with a subtle image overlay at 15% opacity. Heading, one line of text, a "Get a Quote" button and the phone number. Inside a rounded `--radius-lg` container. |
| **EnquiryForm** | Bootstrap form controls, restyled: labels above fields; inputs 52px tall with a 1px `--color-slate` border, `--radius-sm` and a white background. Focus shows a copper ring instead of Bootstrap's blue. Errors use `isInvalid` with `Form.Control.Feedback` (red text below the field). Full-width submit button on mobile. |
| **ContactDetails** | A sand-coloured card listing phone, email, address and an opening-hours table, each with an icon. |
| **Footer** | Ink background, four columns (WEBSITE_STRUCTURE §3.2), and a bottom bar with a thin divider. |

## 7. Motion

- **Subtle and purposeful.** Hover transitions take 200ms; the mobile menu uses Bootstrap's built-in Offcanvas transition.
- **Optional fade-up on scroll** for section headings and cards: 16px movement, 500ms, once only, using a small `IntersectionObserver` hook. Content stays visible without JavaScript.
- **No** parallax, carousels, auto-playing video or scroll-jacking.
- **`prefers-reduced-motion: reduce`** turns all animation off.

## 8. Accessibility checklist (WCAG 2.2 AA)

- [ ] One `<h1>` per page and a logical heading order
- [ ] Landmarks (`header`, `nav`, `main`, `footer`) and a "Skip to content" link
- [ ] Everything works by keyboard; the mobile menu traps focus while open and closes on Esc
- [ ] Visible focus ring: `outline: 2px solid var(--color-copper); outline-offset: 3px`
- [ ] Contrast pairs as listed in §2; text over images uses an overlay
- [ ] Form fields have `<label>` elements, `autocomplete` attributes, errors linked with `aria-describedby`, and form status announced via `aria-live`
- [ ] Touch targets are at least 44 × 44 px
- [ ] `lang="en-GB"`; the page is usable at 200% zoom and at 320px width

## 9. Responsive design

### 9.1 Standard (applies to every component and page)

Everything built must work and look intentional on **mobile, tablet and desktop**. A component isn't done until it has been checked at all three.

| Device class | Width range | Test widths | Typical devices |
|---|---|---|---|
| Mobile | 320–767px | 320, 375, 414 | Small and large phones, portrait |
| Tablet | 768–991px | 768, 820 | Tablets in portrait; large phones in landscape |
| Desktop | 992px and up | 1024, 1280, 1440, 1920 | Laptops, desktops, tablets in landscape |

**Rules**

1. **Mobile-first CSS.** Base styles target mobile; `@media (min-width: …)` and Bootstrap `md`/`lg` props add larger layouts.
2. **No horizontal scrolling** at any width from 320px. Long words, URLs and button labels must wrap.
3. **Fluid sizing.** Use `clamp()` for type and spacing; images use `max-width: 100%` and `height: auto`. Avoid fixed pixel widths on content.
4. **Touch first.** Targets are at least 44 × 44px. Nothing depends on hover alone; hover effects are enhancements only.
5. **Readable everywhere.** Body text is at least 16px; line length is at most 65 characters on desktop.
6. **Images adapt.** Crops stay meaningful on every device (use `object-position`); no text is baked into images.
7. **Orientation.** Layouts work in both portrait and landscape; no content is locked to one orientation.
8. **Zoom.** The page stays usable at 200% browser zoom (WCAG 1.4.4 and 1.4.10).

### 9.2 Layout per element

| Element | Mobile (< 768) | Tablet (768–991) | Desktop (≥ 992) |
|---|---|---|---|
| Header | Logo, phone icon, menu button | Same as mobile | Full navigation, phone, "Get a Quote" |
| Home hero | Text, then image | Text, then a wider image | Two columns |
| Card grids | 1 column | 2 columns | 3 columns |
| Split sections | Stacked (image first) | Stacked | Two columns, alternating sides |
| Process steps | Vertical | 2 × 2 grid | 4 in a row |
| Footer | Single column | 2 columns | 4 columns |
| Contact | Form, then details | Form, then details | Two columns, 7 : 5 |

## 10. Voice and content

- **Clear, confident, factual.** "We collect, grade and recycle…" may only be used once the business confirms it (MI-04).
- **Short paragraphs** of no more than three sentences, with useful headings.
- **Explain industry terms once** ("OCC: old corrugated cardboard").
- **No unverifiable claims** such as "No.1" or "best prices".
- **Buttons describe the action:** "Get a Quote", "View grades", "Send enquiry".
