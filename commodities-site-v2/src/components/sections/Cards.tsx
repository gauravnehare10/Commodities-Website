import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { CommodityCategory, Industry, Service } from '~/content/model';
import { categoryGroupLabels } from '~/content/model';
import { cx } from '~/lib/cx';
import { Icon } from '../ui/Icon';
import styles from './Cards.module.css';

/** Signature material card (UI_UX_GUIDELINES §6.3). The whole card is one link. */
export function MaterialCard({
  category,
  compact,
}: {
  category: CommodityCategory;
  compact?: boolean;
}) {
  const count = category.materials.filter((m) => m.active).length;
  return (
    <article
      className={cx(styles.card, styles.material, compact && styles.compact)}
      data-group={category.group}
    >
      <p className={cx('eyebrow', styles.cardEyebrow)}>
        {categoryGroupLabels[category.group]} · {count} {count === 1 ? 'grade' : 'grades'}
      </p>
      {!compact && (
        <div className={styles.swatch} aria-hidden="true">
          <Icon name={category.icon} size={40} strokeWidth={1.25} />
        </div>
      )}
      <h3 className={styles.cardTitle}>
        <Link to={`/commodities/${category.slug}`} className={styles.cardLink}>
          {category.name}
        </Link>
      </h3>
      <p className={styles.cardText}>{category.summary}</p>
      <span className={styles.cardMore} aria-hidden="true">
        View grades <ArrowRight size={16} />
      </span>
    </article>
  );
}

export function CommodityGrid({
  categories,
  compact,
}: {
  categories: CommodityCategory[];
  compact?: boolean;
}) {
  if (categories.length === 0) return null;
  return (
    <ul role="list" className={cx(styles.grid, compact && styles.gridCompact)}>
      {categories.map((c) => (
        <li key={c.slug}>
          <MaterialCard category={c} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

export function ServiceCards({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <ul role="list" className={styles.grid}>
      {services.map((s) => (
        <li key={s.slug}>
          <article className={cx(styles.card, styles.service)}>
            <span className={styles.serviceIcon}>
              <Icon name={s.icon} size={24} />
            </span>
            <h3 className={styles.cardTitle}>
              <Link to={`/services/${s.slug}`} className={styles.cardLink}>
                {s.name}
              </Link>
            </h3>
            <p className={styles.cardText}>{s.summary}</p>
            <span className={styles.cardMore} aria-hidden="true">
              Learn more <ArrowRight size={16} />
            </span>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function IndustryStrip({ industries }: { industries: Industry[] }) {
  if (industries.length === 0) return null;
  return (
    <ul role="list" className={styles.industryStrip}>
      {industries.map((i) => (
        <li key={i.slug}>
          <Link to={`/industries#${i.slug}`} className={styles.industryLink}>
            <Icon name={i.icon} size={22} />
            <span>{i.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
