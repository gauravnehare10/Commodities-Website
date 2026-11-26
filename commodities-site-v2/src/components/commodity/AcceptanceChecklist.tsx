import { Check, Lightbulb, X } from 'lucide-react';
import type { CommodityCategory } from '~/content/model';
import { ContentText } from '../ui/ContentText';
import styles from './AcceptanceChecklist.module.css';

/** "We accept / We don't accept / Preparation tips" (UI_UX_GUIDELINES §6.5). */
export function AcceptanceChecklist({
  acceptance,
}: {
  acceptance: CommodityCategory['acceptance'];
}) {
  return (
    <div className={styles.grid}>
      <div className={styles.col}>
        <h3 className={styles.title}>We accept</h3>
        <ul role="list" className={styles.list}>
          {acceptance.accepted.map((a) => (
            <li key={a}>
              <Check size={20} aria-hidden="true" className={styles.yes} />
              <ContentText>{a}</ContentText>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.col}>
        <h3 className={styles.title}>We don’t accept</h3>
        <ul role="list" className={styles.list}>
          {acceptance.notAccepted.map((a) => (
            <li key={a}>
              <X size={20} aria-hidden="true" className={styles.no} />
              <ContentText>{a}</ContentText>
            </li>
          ))}
        </ul>
      </div>
      {acceptance.preparation && acceptance.preparation.length > 0 && (
        <div className={styles.prep}>
          <h3 className={styles.title}>
            <Lightbulb size={20} aria-hidden="true" /> Preparation tips
          </h3>
          <ul className={styles.prepList}>
            {acceptance.preparation.map((p) => (
              <li key={p}>
                <ContentText>{p}</ContentText>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
