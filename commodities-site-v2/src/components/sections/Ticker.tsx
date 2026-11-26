import { Pause, Play } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { activeCategories } from '~/content';
import { cx } from '~/lib/cx';
import styles from './Ticker.module.css';

/**
 * "Ticker tape" of every active material and its trade code, scrolling like a market board.
 * Names and codes only (from content); no prices or claims.
 *
 * - The list is rendered twice so the loop is seamless; screen readers get the first copy only.
 * - Moving content can always be paused with the button (WCAG 2.2.2), and also pauses on hover.
 * - With reduced motion it doesn't move at all and the button is hidden.
 */
export function MaterialTicker() {
  const [paused, setPaused] = useState(false);
  const items = activeCategories().flatMap((c) =>
    c.materials
      .filter((m) => m.active)
      .map((m) => ({
        key: `${c.slug}-${m.slug}`,
        name: m.name,
        code: m.codes?.[0],
        group: c.group,
      })),
  );
  if (items.length === 0) return null;

  // Speed stays constant however many materials there are (about 2.2s per item)
  const duration = `${Math.round(items.length * 2.2)}s`;

  const list = (copy: number) => (
    <ul className={styles.list} aria-hidden={copy > 0 ? true : undefined} role="list">
      {items.map((m) => (
        <li key={`${copy}-${m.key}`} className={styles.item} data-group={m.group}>
          <span className={styles.name}>{m.name}</span>
          {m.code && <span className={styles.code}>{m.code}</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.ticker} aria-label="Materials we handle">
      <p className={styles.label} aria-hidden="true">
        Materials
      </p>
      <div className={styles.viewport}>
        <div
          className={cx(styles.track, paused && styles.paused)}
          style={{ '--ticker-duration': duration } as CSSProperties}
        >
          {list(0)}
          {list(1)}
        </div>
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play materials ticker' : 'Pause materials ticker'}
      >
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
    </section>
  );
}
