# Project Requirements

> **Version:** 1.0 (draft for approval) · **Date:** 2026-11-20
> **Related:** [UI_UX_GUIDELINES](./UI_UX_GUIDELINES.md) · [WEBSITE_STRUCTURE](./WEBSITE_STRUCTURE.md) · [TECHNICAL_ARCHITECTURE](./TECHNICAL_ARCHITECTURE.md) · [DEVELOPMENT_ROADMAP](./DEVELOPMENT_ROADMAP.md)

## 1. Overview

A **simple, lightweight, static marketing website** for a UK commodities business that buys, sells, collects and recycles scrap metal and other recyclable materials.

The site has four jobs:

1. **Explain the business**: who it is and why customers can trust it.
2. **Show the commodities** it handles, with clear grade information.
3. **Present its services.**
4. **Turn visitors into enquiries.**

| Item | Decision |
|---|---|
| Stack | ReactJS + Vite, JavaScript, React Bootstrap (Bootstrap 5), CSS3 |
| Type | Static, client-side site, deployed as files to a static host |
| Design | Modern, premium, professional; image-led; strong typography and whitespace |
| Not included | Backend, database, authentication, dashboards, custom APIs, CMS, e-commerce |

**Conventions used in all documents:**

| Convention | Meaning |
|---|---|
| `P-xx` | Page ID (see WEBSITE_STRUCTURE §2) |
| `MI-xx` | Missing business information (see §9) |
| `[TBC]` | Visible placeholder text used until the business supplies real content |

## 2. Reference research summary

Two industry websites were reviewed for **business context only**. Their text, images, claims and layouts must not be copied.

| Reference | What it shows about the industry |
|---|---|
| cwsltd.com (waste broker) | Customers expect broad material coverage: metals, plastics by polymer, paper and cardboard, wood grades and mixed waste. Trust signals matter: licences, ISO certificates, testimonials. Its long, flat menu and thin commodity pages are weaknesses to avoid. |
| gsmt.co.uk (metal recycler) | Metal buyers and sellers look for **grade lists** (e.g. HMS, OA, copper, brass, aluminium), a clear "get a quote" path, and depot phone numbers and opening hours. Grade names with no explanation are a weakness to avoid. |

**What this project takes from the research:**

- Commodity pages need short, plain-English grade descriptions.
- "Get a quote" and phone contact must be visible everywhere.
- Navigation stays short: six links at most.

## 3. Goals and success measures

| Goal | Measure |
|---|---|
| Generate enquiries | Enquiry form submissions and phone-link taps |
| Build trust | Compliance and accreditation details visible on Home and About |
| Help visitors find their material | Every commodity has its own page with grades listed |
| Fast and accessible | Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90 |

## 4. Target audience

| Audience | What they need |
|---|---|
| Businesses with material to sell (manufacturers, construction and demolition firms, garages, warehouses) | Is my material accepted? How do I get a price or a collection? |
| Buyers of material (mills, processors, traders) | What grades are available? How do I enquire? |
| Procurement and compliance staff | Licences, accreditations, contact details |

## 5. Scope

### 5.1 In scope

- **Seven pages plus a 404 page.** See WEBSITE_STRUCTURE §2.
- **Six commodity category pages** generated from one template and one data file.
- **One enquiry form** on the Contact page, handled by a hosted form service. There is no custom backend (TECHNICAL_ARCHITECTURE §7).
- **Responsive design** from 320px to large desktop.
- **Basic SEO:** page titles and descriptions, sitemap.xml, robots.txt.
- **Accessibility** to WCAG 2.2 AA.
- **Optimised imagery** in WebP format.

### 5.2 Out of scope

- Backend code, databases, custom APIs, user accounts, admin dashboards, CMS
- Live metal prices, price calculators, online payments or booking
- Blog or news, careers, multilingual content
- Analytics and cookie banners. These can be added later if needed (MI-14).

## 6. Functional requirements

| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Sticky header with logo, navigation, phone and "Get a Quote" button | Visible on every page; collapses to a menu button below 992px (Bootstrap `lg`) |
| FR-02 | Home page sections as listed in WEBSITE_STRUCTURE §4.1 | All sections render from data files |
| FR-03 | Commodities overview page showing all categories as image cards | Cards come from `commodities.js` and link to detail pages |
| FR-04 | Commodity detail page (one template) | Shows intro, grades list, accepted and not-accepted items, related services and an enquiry call to action |
| FR-05 | Services page with one section per service | Each service has an anchor link, such as `/services#site-clearances` |
| FR-06 | Contact page with enquiry form, contact details and opening hours | Validated in the browser; on success, shows a thank-you message |
| FR-07 | Enquiry form pre-fills the commodity when opened from a commodity page | `/contact?commodity=ferrous-metals` selects that commodity |
| FR-08 | Footer with navigation, contact details, company and legal details | Present on every page |
| FR-09 | Privacy page | Content supplied by the business (MI-13) |
| FR-10 | 404 page | Links back to Home, Commodities and Contact |
| FR-11 | Each page sets its own title and meta description | Uses React 19 `<title>` and `<meta>` support |
| FR-12 | Click-to-call phone links | Uses `tel:` links; tappable on mobile |

## 7. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-01 | Performance | Initial JavaScript under 120 KB gzipped and CSS under 45 KB gzipped (Bootstrap included). Hero image under 250 KB; card images under 120 KB. LCP under 2.5 s on 4G. |
| NFR-02 | Responsive | **Every** page and component is fully responsive across mobile (320–767px), tablet (768–991px) and desktop (992px and up), following the standard in UI_UX_GUIDELINES §9.1: no horizontal scrolling, touch targets at least 44 × 44px, portrait and landscape |
| NFR-03 | Accessibility | WCAG 2.2 AA: semantic HTML, keyboard access, visible focus, alt text, colour contrast |
| NFR-04 | Browsers | Latest two versions of Chrome, Edge, Firefox and Safari (desktop and iOS) |
| NFR-05 | Maintainability | Reusable components; all business content in `src/data/`; no hard-coded copy inside components |
| NFR-06 | Simplicity | No more than six runtime dependencies, not counting the font packages (TECHNICAL_ARCHITECTURE §3) |
| NFR-07 | Security | HTTPS only; no secrets in the code; spam honeypot on the form |
| NFR-08 | Content accuracy | No invented company facts. Unknown details show `[TBC]` until supplied. |

## 8. Candidate commodities and services

These are drawn from the industry research and **must be confirmed** by the business (MI-05, MI-06).

| Commodity (slug) | Example grades |
|---|---|
| Ferrous Metals (`ferrous-metals`) | Heavy Melting Scrap (HMS 1 & 2), Old Arisings (OA), Light Iron, Cast Iron, Rebar, Steel Turnings |
| Non-Ferrous Metals (`non-ferrous-metals`) | Copper, Brass, Aluminium, Stainless Steel, Lead, Insulated Cable |
| Plastics (`plastics`) | PET, HDPE, PP, LDPE Film, Mixed Rigid Plastics |
| Paper & Cardboard (`paper-cardboard`) | OCC (old corrugated cardboard), Mixed Paper, Office Paper, Shredded Paper |
| Wood (`wood`) | Grade A, Grade B, Grade C |
| Electrical Waste (`electrical-waste`) | IT Equipment, Large Appliances, Small Appliances, Cabling |

| Service (anchor) | Summary |
|---|---|
| Collection & Logistics (`collection-logistics`) | Scheduled or one-off collections |
| Site Clearances (`site-clearances`) | Factory, demolition and commercial clearances |
| Commodity Trading (`commodity-trading`) | Buying and selling graded material |
| Export (`export`) | Container and bulk shipments |
| Processing (`processing`) | Sorting, baling and shearing |
| Recycling Consultancy (`recycling-consultancy`) | Site reviews and recommendations |

## 9. Missing information register

Development can start with `[TBC]` placeholders. Items marked **Launch blocker** must be supplied before the site goes live.

| ID | Information needed | Used on | Priority |
|---|---|---|---|
| MI-01 | Company trading name, legal name, company number, VAT number, registered address | Header, footer, Privacy | Launch blocker |
| MI-02 | Logo (SVG) and any brand colours or fonts | Header, footer, design | Launch blocker |
| MI-03 | Company story, history and mission | Home, About | Launch blocker |
| MI-04 | Business model: recycler, trader, broker, exporter, or a combination | Home hero, About | Launch blocker |
| MI-05 | Confirmed commodity list, with grades and accepted / not-accepted items per category | Commodities | Launch blocker |
| MI-06 | Confirmed services list and descriptions | Services | Launch blocker |
| MI-07 | Phone, email, address(es) and opening hours | Header, footer, Contact | Launch blocker |
| MI-08 | Licences and accreditations with numbers (e.g. Waste Carrier registration, Environmental Permit, Scrap Metal Dealer licence, ISO certificates) | Home, About, footer | High |
| MI-09 | Areas served, and export markets if any | Home, Services | High |
| MI-10 | Photography (yard, materials, fleet, team), or approval to use licensed stock images | Site-wide | High |
| MI-11 | Verified statistics (years trading, tonnage, fleet) and testimonials, with permission | Home | Medium. These sections are hidden if not supplied. |
| MI-12 | Where enquiries should be delivered (email address) and the preferred form service | Contact form | Launch blocker |
| MI-13 | Privacy policy text | Privacy | Launch blocker |
| MI-14 | Whether analytics are wanted (this would also need a cookie notice) | Future | Low |
| MI-15 | Domain name and hosting account | Deployment | Launch blocker |

## 10. Assumptions and constraints

- The business is UK-based. The site uses UK English and metric units. *(Assumption; to be confirmed.)*
- The site is maintained by a developer who edits the data files. There is no CMS.
- Stock images, if used, must be licensed for commercial use, and their credits recorded.
- Pages that depend on JavaScript are acceptable for SEO at this scale. Prerendering can be added later if search ranking requires it (TECHNICAL_ARCHITECTURE §9).
