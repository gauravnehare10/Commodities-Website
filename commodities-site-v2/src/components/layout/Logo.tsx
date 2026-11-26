import { siteConfig } from '~/content';
import { isDraftMode } from '~/lib/env';
import styles from './Logo.module.css';

/**
 * Interim wordmark until the client logo (SVG) is supplied (MI-02).
 * Replace the mark + text with the brand SVG; keep the accessible name.
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  const name = siteConfig.companyName.replace('[PLACEHOLDER] ', '');
  return (
    <span className={styles.logo} data-inverse={inverse || undefined}>
      <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 22V10h6M8 16h5M18 22V10l6 12V10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
        />
      </svg>
      <span className={styles.text}>
        {name}
        {isDraftMode && siteConfig.companyName.startsWith('[PLACEHOLDER]') && (
          <span className={styles.draft}>logo TBC</span>
        )}
      </span>
    </span>
  );
}
