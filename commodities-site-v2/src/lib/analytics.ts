import { hasAnalyticsConsent } from './consent';

/**
 * Typed analytics events (docs/TECHNICAL_ARCHITECTURE.md §15).
 * The provider is not chosen yet (MI-22); events go to window.dataLayer once consent is given,
 * which works with GA4/GTM and is a no-op otherwise.
 */
export type AnalyticsEvents = {
  quote_start: { intent?: string };
  quote_step_complete: { step: number };
  quote_submit: { intent: string; category: string };
  contact_submit: { subject: string };
  phone_click: { location: string };
  download: { file: string };
  material_search: { length: number };
  cta_click: { id: string };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track<E extends keyof AnalyticsEvents>(event: E, params: AnalyticsEvents[E]) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
