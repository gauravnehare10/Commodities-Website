import { CircleAlert } from 'lucide-react';
import type { Ref } from 'react';
import styles from './Forms.module.css';

type Item = { id: string; message: string };

/** Error summary shown on submit; each item links to its field (UI_UX_GUIDELINES §6.8). */
export function FormErrorSummary({ items, ref }: { items: Item[]; ref?: Ref<HTMLDivElement> }) {
  if (items.length === 0) return null;
  return (
    <div
      ref={ref}
      className={styles.summary}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
    >
      <p id="error-summary-title" className={styles.summaryTitle}>
        <CircleAlert size={20} aria-hidden="true" />
        There {items.length === 1 ? 'is a problem' : `are ${items.length} problems`} to fix
      </p>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`}>{i.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
