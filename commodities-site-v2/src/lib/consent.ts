/**
 * Cookie consent (UK GDPR / PECR). The choice is stored in a first-party cookie for 6 months.
 * Analytics must call hasAnalyticsConsent() before loading (docs/TECHNICAL_ARCHITECTURE.md §15).
 */
export type ConsentChoice = 'accepted' | 'rejected';

const COOKIE = 'site_consent';
const MAX_AGE = 60 * 60 * 24 * 182;
const EVENT = 'consentchange';

export function readConsent(): ConsentChoice | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(accepted|rejected)`));
  return (match?.[1] as ConsentChoice | undefined) ?? null;
}

export function writeConsent(choice: ConsentChoice) {
  document.cookie = `${COOKIE}=${choice}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax; Secure`;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: choice }));
}

export function clearConsent() {
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/`;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
}

export function onConsentChange(cb: (choice: ConsentChoice | null) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentChoice | null>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

export const hasAnalyticsConsent = () => readConsent() === 'accepted';
