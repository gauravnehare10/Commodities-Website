/**
 * Content model (docs/WEBSITE_STRUCTURE.md §6).
 * Every content file is validated against these schemas by scripts/check-content.ts.
 * Keep imports in src/content relative (no "~" alias): react-router.config.ts loads them at build time.
 * BUILD-TIME ONLY: browser code imports constants/types from ./model.ts so Zod stays out of the bundle.
 */
import { z } from 'zod';
import { categoryGroups, faqTopics, serviceGroups } from './model';

export { PLACEHOLDER } from './model';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a lowercase hyphenated slug');
const text = z.string().trim().min(1);

export const seoSchema = z.object({
  title: text,
  description: text,
  noindex: z.boolean().optional(),
});

export const processStepSchema = z.object({ title: text, text });

export const materialSchema = z.object({
  slug,
  name: text,
  subgroup: z.string().optional(),
  codes: z.array(text).optional(),
  description: text,
  typicalSources: z.array(text).optional(),
  notes: z.string().optional(),
  active: z.boolean(),
});

export const categorySchema = z.object({
  slug,
  name: text,
  group: z.enum(categoryGroups),
  active: z.boolean(),
  /** false until the business confirms it handles this category (MI-05). */
  confirmed: z.boolean(),
  order: z.number(),
  icon: text,
  summary: text.max(180),
  overview: z.array(text).min(1),
  keyFacts: z.array(text).optional(),
  materials: z.array(materialSchema),
  acceptance: z.object({
    accepted: z.array(text),
    notAccepted: z.array(text),
    preparation: z.array(text).optional(),
  }),
  logistics: z
    .object({
      minimumQuantity: z.string().optional(),
      collection: z.string().optional(),
      dropOff: z.string().optional(),
      containers: z.array(text).optional(),
    })
    .optional(),
  complianceNotes: z.array(text).optional(),
  process: z.array(processStepSchema).optional(),
  relatedServices: z.array(slug),
  faqs: z.array(text),
  seo: seoSchema,
});

export const serviceSchema = z.object({
  slug,
  name: text,
  group: z.enum(serviceGroups),
  active: z.boolean(),
  confirmed: z.boolean(),
  order: z.number(),
  icon: text,
  summary: text.max(180),
  overview: z.array(text).min(1),
  includes: z.array(text),
  audiences: z.array(slug),
  materials: z.array(slug),
  equipment: z.array(text).optional(),
  process: z.array(processStepSchema).optional(),
  faqs: z.array(text),
  seo: seoSchema,
});

export const industrySchema = z.object({
  slug,
  name: text,
  icon: text,
  summary: text,
  typicalMaterials: z.array(slug),
  services: z.array(slug),
});

export const locationSchema = z.object({
  id: slug,
  name: text,
  type: z.enum(['yard', 'office', 'port']),
  address: z.object({ lines: z.array(text), town: text, postcode: text }),
  phone: text,
  email: z.email().optional(),
  hours: z.array(z.object({ days: text, time: text })),
  facilities: z.array(text).optional(),
  directionsUrl: z.url().optional(),
  geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

export const accreditationSchema = z.object({
  id: slug,
  name: text,
  type: z.enum(['licence', 'permit', 'certification', 'membership']),
  number: z.string().optional(),
  issuer: text,
  validUntil: z.iso.date().optional(),
  document: z.object({ href: text, sizeKb: z.number() }).optional(),
});

export const faqSchema = z.object({
  id: slug,
  question: text,
  answer: z.array(text).min(1),
  topic: z.enum(faqTopics),
  featured: z.boolean().optional(),
});

export const glossarySchema = z.object({
  term: text,
  slug,
  aliases: z.array(text),
  definition: text,
  relatedCategories: z.array(slug),
});

export const testimonialSchema = z.object({
  quote: text,
  author: text,
  role: z.string().optional(),
  company: z.string().optional(),
  /** Must be true: written permission is required before publishing (MI-13). */
  permissionConfirmed: z.literal(true),
});

export const statSchema = z.object({ value: text, label: text, source: text, asOf: z.iso.date() });

export const downloadSchema = z.object({
  title: text,
  href: text,
  type: text,
  sizeKb: z.number(),
  updated: z.iso.date(),
});

export const legalPageSchema = z.object({
  slug,
  title: text,
  updated: z.string(),
  sections: z.array(z.object({ heading: text, body: z.array(text) })),
});

export const siteConfigSchema = z.object({
  companyName: text,
  legalName: text,
  companyNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  registeredAddress: text,
  primaryPhone: text,
  primaryEmail: text,
  responseTime: text,
  social: z.array(
    z.object({
      platform: z.enum(['linkedin', 'facebook', 'instagram', 'x', 'youtube']),
      url: z.url(),
    }),
  ),
  coverage: z.object({ regions: z.array(text), exportMarkets: z.array(text).optional() }),
  buysFromPublic: z.boolean().nullable(),
  showPrices: z.boolean(),
  features: z.object({
    news: z.boolean(),
    careers: z.boolean(),
    downloads: z.boolean(),
    partners: z.boolean(),
    modernSlavery: z.boolean(),
  }),
});

export type Seo = z.infer<typeof seoSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type Material = z.infer<typeof materialSchema>;
export type CommodityCategory = z.infer<typeof categorySchema>;
export type CategoryGroup = CommodityCategory['group'];
export type Service = z.infer<typeof serviceSchema>;
export type ServiceGroup = Service['group'];
export type Industry = z.infer<typeof industrySchema>;
export type Location = z.infer<typeof locationSchema>;
export type Accreditation = z.infer<typeof accreditationSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type FaqTopic = Faq['topic'];
export type GlossaryEntry = z.infer<typeof glossarySchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Download = z.infer<typeof downloadSchema>;
export type LegalPage = z.infer<typeof legalPageSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
