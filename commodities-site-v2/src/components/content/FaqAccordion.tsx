import { Plus } from 'lucide-react';
import type { Faq } from '~/content/model';
import { GlossaryText } from './GlossaryText';
import styles from './FaqAccordion.module.css';

/** Native <details> accordion: works without JavaScript and is keyboard accessible. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <div className={styles.list}>
      {faqs.map((f) => (
        <details key={f.id} id={`faq-${f.id}`} className={styles.item}>
          <summary className={styles.summary}>
            <span>{f.question}</span>
            <Plus size={20} aria-hidden="true" className={styles.icon} />
          </summary>
          <div className={styles.answer}>
            {f.answer.map((p) => (
              <p key={p}>
                <GlossaryText>{p}</GlossaryText>
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
