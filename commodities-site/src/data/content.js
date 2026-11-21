/**
 * Page copy that is not company facts (docs/WEBSITE_STRUCTURE.md §5).
 * Headings and general explanations are drafts for review. Statements about THIS business
 * are marked '[TBC]' until confirmed (MI-03, MI-04, MI-11, MI-13).
 * `icon` values are lucide-react icon names.
 */
import aboutStory from '../assets/images/about/story.webp';

// Banner images are in public/images (fixed URLs so index.html can preload them; each has a "-sm" phone copy).
const homeHero = '/images/hero/home.webp';
const aboutWide = '/images/hero/about-wide.webp';
const commoditiesWide = '/images/hero/commodities-wide.webp';
const servicesWide = '/images/hero/services-wide.webp';
const contactWide = '/images/hero/contact-wide.webp';
// About page story uses a different photo from its page header (about-wide shows the crane lorry)
import aboutPageStory from '../assets/images/services/recycling-consultancy.webp';

export const home = {
  hero: {
    eyebrow: 'Scrap metal · Recycling · Commodities',
    title: 'Turning scrap into value, responsibly.', // draft headline: confirm with business (MI-04)
    lead: '[TBC] One or two sentences on what the business does and who it serves (MI-03, MI-04).',
    image: homeHero,
    imageAlt: 'An excavator lifting scrap metal in a recycling yard',
  },
  about: {
    eyebrow: 'About us',
    title: 'A dependable partner for your recyclable materials', // draft
    text: [
      '[TBC] Short introduction to the company: history, experience and what sets it apart (MI-03).',
    ],
    points: ['[TBC] Key point 1', '[TBC] Key point 2', '[TBC] Key point 3'],
    image: aboutStory,
    imageAlt: 'A crane lorry loading material into a large container',
  },
};

/** "How it works": four steps shown on Home, About and Services. */
export const process = [
  {
    title: 'Tell us what you have',
    text: 'Send a few details about your material, quantity and location, or what you would like to buy.',
  },
  {
    title: 'Get a quote',
    text: 'We review the grade and logistics and come back with a clear quote.',
  },
  {
    title: 'Collect or deliver',
    text: 'Material is collected from your site or delivered to ours, as agreed in your quote.',
  },
  {
    title: 'Weigh, pay and paperwork',
    text: 'Material is weighed and graded, payment is made, and you receive the transfer paperwork.',
  },
];

/** "Why choose us": claims must be confirmed by the business before launch. */
export const whyUs = [
  {
    icon: 'Scale',
    title: 'Transparent pricing',
    text: '[TBC] How prices are set and explained to customers.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Fully compliant',
    text: '[TBC] Licences, permits and duty-of-care paperwork (MI-08).',
  },
  {
    icon: 'Truck',
    title: 'Reliable collections',
    text: '[TBC] Fleet, coverage and collection times (MI-09).',
  },
  {
    icon: 'Recycle',
    title: 'Responsible recycling',
    text: '[TBC] Where materials go and how they are reused.',
  },
];

export const about = {
  story: [
    '[TBC] Company story: founding, history and growth (MI-03).',
    '[TBC] What the business does today and who it works with (MI-04).',
  ],
  storyImage: aboutPageStory,
  storyImageAlt: 'Two people in high-visibility vests inspecting a large industrial warehouse',
  values: [
    { icon: 'Handshake', title: 'Integrity', text: '[TBC] What this value means in practice.' },
    { icon: 'ShieldCheck', title: 'Compliance', text: '[TBC] What this value means in practice.' },
    { icon: 'Leaf', title: 'Sustainability', text: '[TBC] What this value means in practice.' },
    { icon: 'Users', title: 'Partnership', text: '[TBC] What this value means in practice.' },
  ],
};

/** Page header (PageHero) content for inner pages. */
export const pageHeroes = {
  about: {
    title: 'About us',
    intro: '[TBC] One-sentence introduction to the company (MI-03).',
    image: aboutWide,
  },
  commodities: {
    title: 'Our commodities',
    intro:
      'From ferrous and non-ferrous metals to plastics, paper, wood and electrical waste. See the grades we handle and how to get a quote.',
    image: commoditiesWide,
  },
  services: {
    title: 'Our services',
    intro:
      'Collections, clearances, trading, export, processing and advice: the services that move your material from site to market.',
    image: servicesWide,
  },
  contact: {
    title: 'Get a quote',
    intro: 'Tell us about your material or what you need, and our team will get back to you.',
    image: contactWide,
  },
};

/** Closing call-to-action banner used across pages. */
export const cta = {
  title: 'Ready to move your material?',
  text: 'Tell us what you have and we will come back with a quote.',
  image: servicesWide,
};

/** Enquiry form: "Enquiry type" options (docs/WEBSITE_STRUCTURE.md §4.6). */
export const enquiryTypes = [
  { value: 'sell', label: 'Sell material' },
  { value: 'buy', label: 'Buy material' },
  { value: 'collection', label: 'Collection / clearance' },
  { value: 'general', label: 'General enquiry' },
];

/** Testimonials: empty until real quotes are supplied with permission (MI-11). Section hides when empty. */
export const testimonials = [];

/** Privacy policy: text must be supplied or approved by the business (MI-13). */
export const privacy = {
  updated: '[TBC]',
  sections: [
    {
      heading: 'Who we are',
      body: ['[TBC] Company name, address and contact details for data protection queries.'],
    },
    {
      heading: 'What information we collect',
      body: ['[TBC] For example, details you provide in the enquiry form.'],
    },
    {
      heading: 'How we use your information',
      body: ['[TBC] For example, to respond to your enquiry.'],
    },
    { heading: 'How long we keep it', body: ['[TBC] Retention period.'] },
    { heading: 'Your rights', body: ['[TBC] Your rights under UK GDPR and how to exercise them.'] },
    { heading: 'Contact', body: ['[TBC] How to contact us about your data.'] },
  ],
};
