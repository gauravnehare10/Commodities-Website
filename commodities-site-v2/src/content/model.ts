/**
 * Zod-free content constants, labels and helpers, safe to import in the browser bundle.
 * Runtime validation lives in ./schema.ts and runs only at build time (scripts/check-content.ts).
 */
import type { CommodityCategory, Service } from './schema';

export type * from './schema';

export const PLACEHOLDER = '[PLACEHOLDER]';

export const categoryGroups = ['metals', 'recyclables', 'specialist'] as const;
export const categoryGroupLabels: Record<(typeof categoryGroups)[number], string> = {
  metals: 'Metals',
  recyclables: 'Recyclables',
  specialist: 'Specialist streams',
};

export const serviceGroups = ['logistics', 'trading', 'processing', 'advisory'] as const;
export const serviceGroupLabels: Record<(typeof serviceGroups)[number], string> = {
  logistics: 'Logistics',
  trading: 'Trading',
  processing: 'Processing',
  advisory: 'Advisory',
};

export const faqTopics = ['selling', 'buying', 'collections', 'payments', 'compliance'] as const;
export const faqTopicLabels: Record<(typeof faqTopics)[number], string> = {
  selling: 'Selling',
  buying: 'Buying',
  collections: 'Collections',
  payments: 'Payments',
  compliance: 'Compliance',
};

/** Typed identity helpers: give editors autocompletion; validation happens in check-content. */
export const defineCategory = (c: CommodityCategory) => c;
export const defineService = (s: Service) => s;
