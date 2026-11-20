/**
 * Company facts. EVERY value must come from the business. See the Missing Information
 * Register (docs/PROJECT_REQUIREMENTS.md §9). '[TBC]' marks content still to be supplied.
 */
export const company = {
  name: '[TBC] Company Name', // MI-01
  legalName: '[TBC] Legal Company Name Ltd', // MI-01
  companyNumber: '', // MI-01 (hidden when empty)
  vatNumber: '', // MI-01 (hidden when empty)
  registeredAddress: '[TBC] Registered address', // MI-01
  tagline: '[TBC] One-line description of the business.', // MI-03
  phone: '[TBC]', // MI-07
  email: '[TBC]', // MI-07
  address: '[TBC] Site address', // MI-07
  openingHours: [
    { days: 'Monday – Friday', hours: '[TBC]' }, // MI-07
    { days: 'Saturday', hours: '[TBC]' },
  ],
  areasServed: [], // MI-09
  accreditations: [], // MI-08: { name, number }
  stats: [], // MI-11: { value, label }
  social: [], // { label, url }
  formEndpoint: '', // MI-12 (docs/TECHNICAL_ARCHITECTURE.md §7)
};
