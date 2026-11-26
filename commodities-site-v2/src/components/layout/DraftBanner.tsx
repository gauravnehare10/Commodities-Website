import { TriangleAlert } from 'lucide-react';
import { isDraftMode, SITE_ENV } from '~/lib/env';
import styles from './DraftBanner.module.css';

/** Site-wide reminder that content is unconfirmed. Never rendered in production builds. */
export function DraftBanner() {
  if (!isDraftMode) return null;
  return (
    <div className={styles.banner} role="note">
      <TriangleAlert size={16} aria-hidden="true" />
      <span>
        <strong>{SITE_ENV} preview:</strong> draft content. Highlighted text is awaiting business
        information (see docs/PROJECT_REQUIREMENTS.md §11).
      </span>
    </div>
  );
}

/** Inline notice where a whole section is waiting for business data. Draft mode only. */
export function DraftNotice({ children }: { children: React.ReactNode }) {
  if (!isDraftMode) return null;
  return (
    <div className={styles.notice} role="note">
      <TriangleAlert size={18} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
