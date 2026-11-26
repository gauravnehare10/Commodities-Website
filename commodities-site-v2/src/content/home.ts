import type { ProcessStep } from './model';

/** Home page copy (docs/WEBSITE_STRUCTURE.md §5.1). Positioning depends on MI-04. */
export const home = {
  eyebrow: 'Scrap metal · Recyclables · Secondary commodities',
  headline: 'Materials, graded and moved with precision.',
  lead: '[PLACEHOLDER] One or two sentences on what the business does and for whom (MI-03, MI-04).',
  confirmed: false,
};

/** Default process used on home, hubs and any category without its own steps. */
export const defaultProcess: ProcessStep[] = [
  {
    title: 'Tell us what you have',
    text: 'Describe the material, approximate quantity and location, or what you want to buy.',
  },
  {
    title: 'Assessment & quote',
    text: 'We review the grade and logistics and come back with a quote.',
  },
  {
    title: 'Collect or deliver',
    text: 'Material is collected from your site or delivered to ours, as agreed.',
  },
  {
    title: 'Weigh, pay & document',
    text: 'Material is weighed and graded, payment is made by traceable method, and paperwork is issued.',
  },
];
