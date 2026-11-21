# Website Structure

> **Version:** 1.0 (draft for approval) · **Date:** 2026-11-20
> **Related:** [PROJECT_REQUIREMENTS](./PROJECT_REQUIREMENTS.md) · [UI_UX_GUIDELINES](./UI_UX_GUIDELINES.md) · [TECHNICAL_ARCHITECTURE](./TECHNICAL_ARCHITECTURE.md) · [DEVELOPMENT_ROADMAP](./DEVELOPMENT_ROADMAP.md)

## 1. Sitemap

```
/                          P-01  Home
├── /about                 P-02  About
├── /commodities           P-03  Commodities (overview)
│   └── /commodities/:slug P-04  Commodity detail (one template, 6 pages)
├── /services              P-05  Services (one page, a section per service)
├── /contact               P-06  Contact & enquiry
├── /privacy               P-07  Privacy policy
└── *                      P-08  404 Not found
```

## 2. Page inventory

| ID | Page | Route | Page component | Main call to action |
|---|---|---|---|---|
| P-01 | Home | `/` | `HomePage` | Get a Quote |
| P-02 | About | `/about` | `AboutPage` | Contact Us |
| P-03 | Commodities | `/commodities` | `CommoditiesPage` | View a commodity |
| P-04 | Commodity detail | `/commodities/:slug` | `CommodityDetailPage` | Enquire about this material |
| P-05 | Services | `/services` | `ServicesPage` | Request a service |
| P-06 | Contact | `/contact` | `ContactPage` | Send enquiry |
| P-07 | Privacy | `/privacy` | `PrivacyPage` | — |
| P-08 | Not found | `*` | `NotFoundPage` | Back to Home |

**Commodity slugs:** `ferrous-metals`, `non-ferrous-metals`, `plastics`, `paper-cardboard`, `wood`, `electrical-waste`.

An unknown slug, such as `/commodities/xyz`, shows the 404 page.

## 3. Navigation

### 3.1 Header

```
Desktop (≥ 992px, Bootstrap lg)
[Logo]   Home  About  Commodities  Services  Contact      ☎ [TBC phone]   [ Get a Quote ]

Mobile (< 992px)
[Logo]                                              [☎]  [☰]
```

- **Five navigation links.** The current page is highlighted.
- **"Get a Quote"** links to `/contact`.
- **The header** is a React Bootstrap `Navbar` (`expand="lg"`).
- **The mobile menu** is a React Bootstrap `Offcanvas` panel sliding in from the right, full-screen on phones. It holds the navigation links, the phone number and a "Get a Quote" button. It closes on link click, on the Esc key and on route change. Focus trapping and scroll locking are built in.
- **The header is sticky.** On scroll it gains a white background and a subtle shadow.

### 3.2 Footer

| Column 1 | Column 2 | Column 3 | Column 4 |
|---|---|---|---|
| Logo, one-line description, accreditations | Commodities (6 links) | Company: About, Services, Contact, Privacy | Contact: phone, email, address, opening hours |

**Bottom bar:** © year, legal company name, company number, registered address (MI-01).

## 4. Page layouts

Each table lists the page's sections from top to bottom, with the component and data source for each. A section that depends on business data that hasn't been supplied (marked "optional") is **hidden** until the data exists.

### 4.1 P-01 Home

| # | Section | Component | Data |
|---|---|---|---|
| 1 | Hero: eyebrow, headline, intro, "Get a Quote" and "Our Commodities" buttons, phone line, large image | `Hero` | `content.js` → `home.hero` and `company.phone` |
| 2 | Trust bar: accreditations and key facts (optional, MI-08) | `TrustBar` | `company.js` → `accreditations` |
| 3 | Commodities preview: six image cards | `CommodityCard` × 6 | `commodities.js` |
| 4 | About intro: image and text, link to About | `SplitFeature` | `content.js` → `home.about` |
| 5 | Services preview: three to six cards | `ServiceCard` | `services.js` |
| 6 | How it works: four steps | `ProcessSteps` | `content.js` → `process` |
| 7 | Why choose us: four points | `FeatureGrid` | `content.js` → `whyUs` |
| 8 | Stats strip (optional, MI-11) | `StatsStrip` | `company.js` → `stats` |
| 9 | Testimonial (optional, MI-11) | `Testimonial` | `content.js` → `testimonials` |
| 10 | Call-to-action banner | `CtaBanner` | shared |

### 4.2 P-02 About

| # | Section | Component |
|---|---|---|
| 1 | Page header: title, intro, background image | `PageHero` |
| 2 | Our story: text and image (MI-03) | `SplitFeature` |
| 3 | Mission and values: three or four points | `FeatureGrid` |
| 4 | Compliance and accreditations (MI-08) | `TrustBar` (full) |
| 5 | How it works | `ProcessSteps` |
| 6 | Call-to-action banner | `CtaBanner` |

### 4.3 P-03 Commodities

| # | Section | Component |
|---|---|---|
| 1 | Page header | `PageHero` |
| 2 | Intro text | `SectionHeading` |
| 3 | Grid of all six commodity cards | `CommodityCard` |
| 4 | "Can't see your material? Ask us" callout | `CtaBanner` (compact) |

### 4.4 P-04 Commodity detail

| # | Section | Component | Data field |
|---|---|---|---|
| 1 | Page header: name, short description, image, breadcrumb (Home / Commodities / Name) | `PageHero` | `name`, `summary`, `image` |
| 2 | Overview text, with a side panel ("Enquire about this material" button and phone) | `SplitFeature` + `EnquiryPanel` | `overview` |
| 3 | Grades we handle: list of grades, each with name, optional code and one-line description | `GradeList` | `grades[]` |
| 4 | Accepted and not-accepted lists | `AcceptanceLists` | `accepted[]`, `notAccepted[]` |
| 5 | Related services: two or three cards | `ServiceCard` | `relatedServices[]` |
| 6 | Other commodities: compact cards | `CommodityCard` (compact) | the other categories |
| 7 | Call-to-action banner. Its button links to `/contact?commodity=<slug>`. | `CtaBanner` | `slug` |

### 4.5 P-05 Services

| # | Section | Component |
|---|---|---|
| 1 | Page header | `PageHero` |
| 2 | Quick links to each service (anchor chips) | `AnchorNav` |
| 3 | One block per service, alternating image left and right: title, description, "What's included" list, button | `SplitFeature` × 6 (shared) |
| 4 | How it works | `ProcessSteps` |
| 5 | Call-to-action banner | `CtaBanner` |

Service anchors: `#collection-logistics`, `#site-clearances`, `#commodity-trading`, `#export`, `#processing`, `#recycling-consultancy`.

### 4.6 P-06 Contact

| # | Section | Component |
|---|---|---|
| 1 | Page header | `PageHero` |
| 2 | Two columns: enquiry form (left), contact details, opening hours and locations (right) | `EnquiryForm` + `ContactDetails` |
| 3 | Map: a static image or a "Get directions" link. No embedded map script. | inside `ContactDetails` |

**Enquiry form fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | Yes | `autocomplete="name"` |
| Company | text | No | `autocomplete="organization"` |
| Email | email | Yes | |
| Phone | tel | Yes | |
| Enquiry type | select | Yes | Sell material · Buy material · Collection / clearance · General enquiry |
| Commodity | select | No | Six categories plus "Other / not sure". Pre-filled from `?commodity=` |
| Approximate quantity | text | No | For example, "5 tonnes per month" |
| Message | textarea | Yes | At least 10 characters |
| Consent | checkbox | Yes | "I agree to my details being used to respond to this enquiry", linked to Privacy |
| Honeypot | hidden text | — | Spam trap; never shown |

- **Delivery (demo, email mode):** "Send enquiry" opens the visitor's email app with the enquiry written out and addressed to the company email. The form is replaced by a "Your email is ready to send" panel with an "Open email again" button (TECHNICAL_ARCHITECTURE §7).
- **Delivery (Formspree mode, when configured):** after a successful submission the form is replaced by a thank-you message with the expected response time. If submission fails, an error message shows with the phone number and email address.

### 4.7 P-07 Privacy and P-08 404

- **Privacy:** page header followed by the policy text (MI-13).
- **404:** a short message with three buttons: Home, Commodities and Contact.

## 5. Content data model (plain JavaScript)

All content lives in `src/data/`. Components never contain business copy.

### `company.js`

```js
export const company = {
  name: '[TBC] Company Name',          // MI-01
  legalName: '[TBC]',                  // MI-01
  companyNumber: '',                   // MI-01 (hidden if empty)
  vatNumber: '',
  registeredAddress: '[TBC]',          // MI-01 (footer bottom bar)
  tagline: '[TBC]',                    // MI-03
  phone: '[TBC]',                      // MI-07
  email: '[TBC]',                      // MI-07
  address: '[TBC]',                    // MI-07
  openingHours: [{ days: 'Mon–Fri', hours: '[TBC]' }],
  areasServed: [],                     // MI-09
  accreditations: [],                  // MI-08: { name, number }
  stats: [],                           // MI-11: { value, label }
  social: [],                          // { label, url }
  responseTime: '[TBC]',               // MI-12: shown in the thank-you message, e.g. "one working day"
  formEndpoint: '',                    // MI-12: Formspree form URL (TECHNICAL_ARCHITECTURE §7)
};
```

### `commodities.js`

```js
export const commodities = [
  {
    slug: 'ferrous-metals',
    name: 'Ferrous Metals',
    summary: 'One-line summary used on cards (≤ 120 characters).',
    image: ferrousCard,                // 800×600 card image, imported from src/assets/images
    imageWide: ferrousWide,            // 1600×700 detail-page header image
    imageAlt: 'Stacked steel beams in a scrap yard',
    overview: ['Paragraph 1', 'Paragraph 2'],
    grades: [{ name: 'Heavy Melting Scrap', code: 'HMS 1 & 2', description: '…' }],
    accepted: ['…'],
    notAccepted: ['…'],
    relatedServices: ['collection-logistics', 'processing'],
  },
];
```

### `services.js`

```js
export const services = [
  {
    id: 'collection-logistics',
    title: 'Collection & Logistics',
    summary: 'Card text (≤ 120 characters).',
    description: ['Paragraph'],
    includes: ['…'],
    image: collectionImg,
    imageAlt: '…',
    icon: 'Truck',                     // lucide-react icon name
  },
];
```

### `content.js`

Page copy that is not company facts:

- `home.hero`, `home.about`
- `about.story`, `about.values`
- `process` (four steps)
- `whyUs` (four points)
- `pageHeroes` (title, intro and wide image for the About, Commodities, Services and Contact page headers)
- `cta` (closing banner title, text and background image)
- `testimonials` (empty until MI-11)
- `privacy` (sections)

### `navigation.js`

Header and footer link lists, so there is one source for both.

## 6. Linking rules

1. Every commodity page links to the Contact page with its slug pre-filled, and to its related services.
2. Every service block links to the Contact page.
3. Every page ends with a call to action, apart from Contact, Privacy and 404.
4. "Get a Quote" appears in the header on every page.

## 7. SEO per page

| Page | Title pattern | Description (aim for 150–160 characters) |
|---|---|---|
| Home | `{Company} – Scrap Metal & Commodities` | Business summary |
| Commodity | `{Commodity} Recycling & Trading – {Company}` | `summary`, extended |
| Others | `{Page} – {Company}` | Written per page |

`public/sitemap.xml` lists all 12 indexable URLs: P-01 to P-03, the six P-04 pages, and P-05 to P-07. `robots.txt` allows all crawlers and points to the sitemap.
