import { Link } from 'react-router';
import { useClientValue } from '~/hooks/useClientValue';
import { onConsentChange, readConsent, writeConsent, type ConsentChoice } from '~/lib/consent';
import { Button } from '../ui/Button';
import styles from './CookieBanner.module.css';

const subscribe = (cb: () => void) => onConsentChange(cb);

/**
 * Consent banner (FR-15). "Accept" and "Reject" have equal weight (PECR guidance).
 * The prerendered HTML never contains it: the server snapshot is "unknown".
 */
export function CookieBanner() {
  const consent = useClientValue<ConsentChoice | null | 'unknown'>(
    readConsent,
    'unknown',
    subscribe,
  );
  if (consent !== null) return null;

  return (
    <section className={styles.banner} aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use essential cookies to run this site. With your permission we’d also like to use
          analytics cookies to understand how it is used.{' '}
          <Link to="/cookie-policy">Read our cookie policy</Link>.
        </p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => writeConsent('rejected')}>
            Reject analytics
          </Button>
          <Button variant="secondary" onClick={() => writeConsent('accepted')}>
            Accept analytics
          </Button>
        </div>
      </div>
    </section>
  );
}
