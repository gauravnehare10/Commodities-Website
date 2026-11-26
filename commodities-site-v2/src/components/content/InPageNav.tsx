import { useEffect, useState } from 'react';
import { cx } from '~/lib/cx';
import styles from './InPageNav.module.css';

type Item = { id: string; label: string };

/** Sticky section navigation with scroll-spy (UI_UX_GUIDELINES §6.9). */
export function InPageNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    if (els.length === 0 || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={styles.nav} aria-label="On this page">
      <div className="container">
        <ul role="list" className={styles.list}>
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={cx(styles.link, active === i.id && styles.active)}
                aria-current={active === i.id ? 'location' : undefined}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
