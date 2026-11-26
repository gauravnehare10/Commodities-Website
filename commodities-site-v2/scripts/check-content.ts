/**
 * Content guard (docs/TECHNICAL_ARCHITECTURE.md §7.3).
 *  - Validates every content file against its Zod schema.
 *  - Checks cross-references (services, FAQs, categories, industries).
 *  - When SITE_ENV=production, fails if any ACTIVE item is unconfirmed or contains placeholders.
 * Run: npm run content:check   (also runs before every build)
 */
import { z } from 'zod';
import {
  accreditations,
  activeLegalPages,
  allCategories,
  allFaqs,
  allServices,
  downloads,
  glossary,
  home,
  industries,
  locations,
  siteConfig,
  stats,
  testimonials,
} from '../src/content/index';
import {
  accreditationSchema,
  categorySchema,
  downloadSchema,
  faqSchema,
  glossarySchema,
  industrySchema,
  legalPageSchema,
  locationSchema,
  PLACEHOLDER,
  serviceSchema,
  siteConfigSchema,
  statSchema,
  testimonialSchema,
} from '../src/content/schema';

const production = process.env.SITE_ENV === 'production';
const errors: string[] = [];
const warnings: string[] = [];

function validate<T>(label: string, schema: z.ZodType<T>, items: unknown[]) {
  items.forEach((item, i) => {
    const res = schema.safeParse(item);
    if (!res.success) {
      for (const issue of res.error.issues)
        errors.push(`${label}[${i}] ${issue.path.join('.')}: ${issue.message}`);
    }
  });
}

validate('siteConfig', siteConfigSchema, [siteConfig]);
validate('category', categorySchema, allCategories);
validate('service', serviceSchema, allServices);
validate('industry', industrySchema, industries);
validate('location', locationSchema, locations);
validate('accreditation', accreditationSchema, accreditations);
validate('faq', faqSchema, allFaqs);
validate('glossary', glossarySchema, glossary);
validate('testimonial', testimonialSchema, testimonials);
validate('stat', statSchema, stats);
validate('download', downloadSchema, downloads);
validate('legal', legalPageSchema, activeLegalPages());

// ---- Uniqueness ----
const dupes = (label: string, keys: string[]) => {
  const seen = new Set<string>();
  for (const k of keys) {
    if (seen.has(k)) errors.push(`${label}: duplicate "${k}"`);
    seen.add(k);
  }
};
dupes(
  'category slug',
  allCategories.map((c) => c.slug),
);
dupes(
  'service slug',
  allServices.map((s) => s.slug),
);
dupes(
  'faq id',
  allFaqs.map((f) => f.id),
);
dupes(
  'glossary slug',
  glossary.map((g) => g.slug),
);
allCategories.forEach((c) =>
  dupes(
    `material slug in ${c.slug}`,
    c.materials.map((m) => m.slug),
  ),
);

// ---- Cross-references (to ACTIVE items) ----
const activeCats = new Set(allCategories.filter((c) => c.active).map((c) => c.slug));
const activeSvcs = new Set(allServices.filter((s) => s.active).map((s) => s.slug));
const faqIds = new Set(allFaqs.map((f) => f.id));
const industrySlugs = new Set(industries.map((i) => i.slug));
const ref = (from: string, kind: string, set: Set<string>, slugs: string[]) =>
  slugs.forEach(
    (s) =>
      !set.has(s) && warnings.push(`${from} → ${kind} "${s}" is missing or inactive (link hidden)`),
  );

for (const c of allCategories.filter((x) => x.active)) {
  ref(`category ${c.slug}`, 'service', activeSvcs, c.relatedServices);
  c.faqs.forEach((f) => !faqIds.has(f) && errors.push(`category ${c.slug} → unknown faq "${f}"`));
}
for (const s of allServices.filter((x) => x.active)) {
  ref(`service ${s.slug}`, 'category', activeCats, s.materials);
  s.audiences.forEach(
    (a) => !industrySlugs.has(a) && errors.push(`service ${s.slug} → unknown industry "${a}"`),
  );
  s.faqs.forEach((f) => !faqIds.has(f) && errors.push(`service ${s.slug} → unknown faq "${f}"`));
}
for (const i of industries) {
  ref(`industry ${i.slug}`, 'category', activeCats, i.typicalMaterials);
  ref(`industry ${i.slug}`, 'service', activeSvcs, i.services);
}
for (const g of glossary) ref(`glossary ${g.slug}`, 'category', activeCats, g.relatedCategories);

// ---- Placeholder / confirmation guard ----
const placeholderHits: string[] = [];
const scan = (label: string, value: unknown) => {
  const json = JSON.stringify(value);
  if (json.includes(PLACEHOLDER) || json.includes('{{')) placeholderHits.push(label);
};
scan('siteConfig', siteConfig);
scan('home', home);
allCategories.filter((c) => c.active).forEach((c) => scan(`category ${c.slug}`, c));
allServices.filter((s) => s.active).forEach((s) => scan(`service ${s.slug}`, s));
allFaqs.forEach((f) => scan(`faq ${f.id}`, f));
activeLegalPages().forEach((p) => scan(`legal ${p.slug}`, p));
const unconfirmed = [
  ...allCategories.filter((c) => c.active && !c.confirmed).map((c) => `category ${c.slug}`),
  ...allServices.filter((s) => s.active && !s.confirmed).map((s) => `service ${s.slug}`),
  ...(home.confirmed ? [] : ['home copy']),
];

if (production) {
  placeholderHits.forEach((l) => errors.push(`placeholder content in production: ${l}`));
  unconfirmed.forEach((l) =>
    errors.push(
      `unconfirmed content in production: ${l} (set confirmed: true once approved, or active: false)`,
    ),
  );
} else {
  if (placeholderHits.length)
    warnings.push(
      `${placeholderHits.length} item(s) contain placeholders (allowed outside production)`,
    );
  if (unconfirmed.length)
    warnings.push(`${unconfirmed.length} item(s) are unconfirmed (allowed outside production)`);
}

// ---- Report ----
for (const w of warnings) console.warn(`  ⚠ ${w}`);
if (errors.length) {
  console.error(
    `\n✖ Content check failed (${errors.length} error${errors.length > 1 ? 's' : ''}):`,
  );
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log(
  `✔ Content check passed (${production ? 'production' : (process.env.SITE_ENV ?? 'development')} mode)`,
);
