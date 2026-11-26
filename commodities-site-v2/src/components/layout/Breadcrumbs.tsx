import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Crumb } from '~/lib/seo';
import styles from './Breadcrumbs.module.css';

/** Breadcrumb trail. The last crumb is the current page. JSON-LD is emitted by the route's meta. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.to} className={styles.item}>
              {last ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <>
                  <Link to={c.to}>{c.label}</Link>
                  <ChevronRight size={14} aria-hidden="true" className={styles.sep} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
