import { FileText, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { siteConfig, telHref } from '~/content';
import { track } from '~/lib/analytics';
import styles from './StickyActionBar.module.css';

/** Mobile-only Call · Quote bar (FR-24). Hidden on the quote form itself. */
export function StickyActionBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/quote')) return null;
  const tel = telHref(siteConfig.primaryPhone);

  return (
    <div className={styles.bar}>
      {tel ? (
        <a
          href={tel}
          className={styles.call}
          onClick={() => track('phone_click', { location: 'sticky-bar' })}
        >
          <Phone size={20} aria-hidden="true" /> Call
        </a>
      ) : (
        <Link to="/contact" className={styles.call}>
          <Phone size={20} aria-hidden="true" /> Contact
        </Link>
      )}
      <Link to="/quote" className={styles.quote}>
        <FileText size={20} aria-hidden="true" /> Get a quote
      </Link>
    </div>
  );
}
