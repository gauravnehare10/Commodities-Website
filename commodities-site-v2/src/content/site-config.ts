import type { SiteConfig } from './model';

/**
 * Company details. EVERY value here must come from the business.
 * See docs/PROJECT_REQUIREMENTS.md §11 for the Missing Information Register (MI-xx).
 */
export const siteConfig: SiteConfig = {
  companyName: 'Corvane Metals & Recycling', // MI-01
  legalName: 'Corvane Metals & Recycling Ltd', // MI-01
  companyNumber: undefined, // MI-01
  vatNumber: undefined, // MI-01
  registeredAddress: 'Unit 4, Wharfside Industrial Estate, Leeds LS10 1AB', // MI-01
  primaryPhone: '0113 496 0123', // MI-09
  primaryEmail: 'enquiries@example.com', // MI-09
  responseTime: 'one working day', // MI-23
  social: [], // MI-09
  coverage: {
    regions: ['Yorkshire & the Humber', 'North West', 'North East', 'East Midlands'],
    exportMarkets: ['Turkey', 'India', 'Netherlands', 'Spain'],
  }, // MI-08
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
