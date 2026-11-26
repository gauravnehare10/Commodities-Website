import type { SiteConfig } from './model';

/**
 * Company details. EVERY value here must come from the business.
 * See docs/PROJECT_REQUIREMENTS.md §11 for the Missing Information Register (MI-xx).
 */
export const siteConfig: SiteConfig = {
  companyName: '[PLACEHOLDER] Company Name', // MI-01
  legalName: '[PLACEHOLDER] Legal Entity Ltd', // MI-01
  companyNumber: undefined, // MI-01
  vatNumber: undefined, // MI-01
  registeredAddress: '[PLACEHOLDER] Registered address', // MI-01
  primaryPhone: '[PLACEHOLDER] Phone', // MI-09
  primaryEmail: '[PLACEHOLDER] enquiries@your-domain', // MI-09
  responseTime: '[PLACEHOLDER] one working day', // MI-23
  social: [], // MI-09
  coverage: { regions: [], exportMarkets: [] }, // MI-08
  buysFromPublic: null, // MI-30 (null = not yet confirmed)
  showPrices: false, // MI-19
  features: {
    news: false, // MI-18
    careers: false, // MI-17
    downloads: false, // MI-27
    partners: false, // MI-16
    modernSlavery: false, // MI-24
  },
};
