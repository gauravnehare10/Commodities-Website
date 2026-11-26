/**
 * Form schemas shared by the browser (React Hook Form) and the submit function.
 * docs/WEBSITE_STRUCTURE.md §5.9–5.10, docs/TECHNICAL_ARCHITECTURE.md §9.
 * Uses zod/mini (tree-shakeable) to keep the quote/contact routes within the JS budget (NFR-01).
 */
import * as z from 'zod/mini';

const phonePattern = /^[+()\d\s-]{7,20}$/;
const trimmed = (min: number, max: number, message: string) =>
  z
    .string()
    .check(
      z.trim(),
      z.minLength(min, message),
      z.maxLength(max, `Keep this under ${max} characters`),
    );
const optionalText = (max: number) =>
  z._default(z.string().check(z.trim(), z.maxLength(max, `Keep this under ${max} characters`)), '');

export const intents = ['sell', 'buy', 'collection'] as const;
export const intentLabels: Record<(typeof intents)[number], { title: string; text: string }> = {
  sell: { title: 'Sell material', text: 'I have scrap or recyclable material to sell.' },
  buy: { title: 'Buy material', text: 'I want to buy graded material.' },
  collection: {
    title: 'Collection / clearance',
    text: 'I need material collected or a site cleared.',
  },
};

export const units = ['kg', 'tonnes', 'loads', 'containers'] as const;
export const frequencies = ['one-off', 'weekly', 'monthly', 'ad-hoc'] as const;
export const frequencyLabels: Record<(typeof frequencies)[number], string> = {
  'one-off': 'One-off',
  weekly: 'Weekly',
  monthly: 'Monthly',
  'ad-hoc': 'Ad hoc',
};
export const logisticsOptions = ['collect', 'deliver', 'unsure'] as const;
export const logisticsLabels: Record<(typeof logisticsOptions)[number], string> = {
  collect: 'Please collect',
  deliver: 'I will deliver',
  unsure: 'Not sure yet',
};

const consent = z.literal(true, { error: 'Please confirm you have read the privacy notice' });

export const quoteSchema = z.object({
  intent: z.enum(intents, { error: 'Choose what you would like to do' }),
  category: z.string().check(z.minLength(1, 'Choose a material category')),
  materials: z._default(z.array(z.string()), []),
  description: optionalText(2000),
  quantity: z.string().check(
    z.trim(),
    z.regex(/^\d+(\.\d+)?$/, 'Enter a number, e.g. 5 or 2.5'),
    z.refine((v) => Number(v) > 0, 'Quantity must be more than 0'),
  ),
  unit: z.enum(units),
  frequency: z.enum(frequencies),
  location: trimmed(2, 100, 'Enter a town or postcode'),
  logistics: z.enum(logisticsOptions),
  preferredDate: z._default(z.string(), ''),
  firstName: trimmed(1, 80, 'Enter your first name'),
  lastName: trimmed(1, 80, 'Enter your last name'),
  company: optionalText(120),
  email: z.email({ error: 'Enter a valid email address' }),
  phone: z.string().check(z.trim(), z.regex(phonePattern, 'Enter a valid phone number')),
  preferredContact: z.enum(['phone', 'email']),
  consent,
  marketingOptIn: z._default(z.boolean(), false),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

/** Fields validated at each step of the quote form. */
export const quoteSteps = [
  { id: 'intent', label: 'Intent', fields: ['intent'] },
  { id: 'material', label: 'Material', fields: ['category', 'materials', 'description'] },
  {
    id: 'logistics',
    label: 'Quantity & location',
    fields: ['quantity', 'unit', 'frequency', 'location', 'logistics', 'preferredDate'],
  },
  {
    id: 'contact',
    label: 'Your details',
    fields: [
      'firstName',
      'lastName',
      'company',
      'email',
      'phone',
      'preferredContact',
      'consent',
      'marketingOptIn',
    ],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  fields: readonly (keyof QuoteInput)[];
}[];

export const contactSubjects = [
  'general',
  'selling',
  'buying',
  'collection',
  'compliance',
  'other',
] as const;
export const contactSubjectLabels: Record<(typeof contactSubjects)[number], string> = {
  general: 'General enquiry',
  selling: 'Selling material',
  buying: 'Buying material',
  collection: 'Collections & clearances',
  compliance: 'Compliance documents',
  other: 'Other',
};

export const contactSchema = z.object({
  name: trimmed(1, 120, 'Enter your name'),
  company: optionalText(120),
  email: z.email({ error: 'Enter a valid email address' }),
  phone: z._default(
    z.string().check(
      z.trim(),
      z.refine((v) => v === '' || phonePattern.test(v), 'Enter a valid phone number'),
    ),
    '',
  ),
  subject: z.enum(contactSubjects),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, 'Please add a little more detail (10+ characters)'),
      z.maxLength(5000, 'Keep this under 5000 characters'),
    ),
  consent,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Envelope posted to /api/submit. */
const envelope = { token: z._default(z.string(), ''), company_website: z._default(z.string(), '') };
export const submissionSchema = z.discriminatedUnion('formType', [
  z.object({ formType: z.literal('quote'), data: quoteSchema, ...envelope }),
  z.object({ formType: z.literal('contact'), data: contactSchema, ...envelope }),
]);
