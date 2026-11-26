import { TriangleAlert } from 'lucide-react';
import { showDraftNotes, SITE_ENV } from '~/lib/env';
import styles from './DraftBanner.module.css';

/**
 * Site-wide reminder that content is unconfirmed. Shown only on the local dev server
 * (`npm run dev`), never on a deployed site, whatever SITE_ENV it was built with.
 */
export function DraftBanner() {
  if (!showDraftNotes) return null;
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

/** Inline notice where a whole section is waiting for business data. Local dev server only. */
export function DraftNotice({ children }: { children: React.ReactNode }) {
  if (!showDraftNotes) return null;
  return (
    <div className={styles.notice} role="note">
      <TriangleAlert size={18} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
