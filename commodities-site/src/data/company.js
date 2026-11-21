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
  // MI-07. Also the address the enquiry form's email is sent to (see formEndpoint below).
  // While it is '[TBC]', the visitor's email app opens with the "To" field empty.
  email: '[TBC]',
  address: '[TBC] Site address', // MI-07
  openingHours: [
    { days: 'Monday – Friday', hours: '[TBC]' }, // MI-07
    { days: 'Saturday', hours: '[TBC]' },
  ],
  areasServed: [], // MI-09
  accreditations: [], // MI-08: { name, number }
  stats: [], // MI-11: { value, label }
  social: [], // { label, url }
  responseTime: '[TBC]', // MI-12, e.g. "one working day" (shown after an enquiry is sent)
  /**
   * How the enquiry form delivers enquiries (MI-12, docs/TECHNICAL_ARCHITECTURE.md §7):
   *   ''                                → EMAIL mode (current, for the demo): pressing "Send enquiry" opens the
   *                                       visitor's email app with the enquiry written out, addressed to `email`
   *                                       above. The visitor presses Send in their email app.
   *   'https://formspree.io/f/xxxxxxxx' → FORMSPREE mode: the form is sent straight to Formspree, which emails
   *                                       the business. No email app needed. (Free account at formspree.io.)
   */
  formEndpoint: '',
};
