import { lazy, Suspense } from 'react';
import styles from './Forms.module.css';

/**
 * Forms (React Hook Form + zod/mini, ~22 KB gzip) load as a separate chunk so the
 * route's initial JS stays within the NFR-01 budget (docs/TECHNICAL_ARCHITECTURE.md §11).
 */
const QuoteFormImpl = lazy(() => import('./QuoteForm').then((m) => ({ default: m.QuoteForm })));
const ContactFormImpl = lazy(() =>
  import('./ContactForm').then((m) => ({ default: m.ContactForm })),
);

function FormSkeleton({ rows }: { rows: number }) {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading form">
      {Array.from({ length: rows }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export function LazyQuoteForm() {
  return (
    <Suspense fallback={<FormSkeleton rows={4} />}>
      <QuoteFormImpl />
    </Suspense>
  );
}

export function LazyContactForm() {
  return (
    <Suspense fallback={<FormSkeleton rows={6} />}>
      <ContactFormImpl />
    </Suspense>
  );
}
