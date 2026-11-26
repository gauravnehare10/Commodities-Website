import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import type { CommodityCategory, Industry, Service } from '~/content/model';
import { categoryGroupLabels } from '~/content/model';
import { cx } from '~/lib/cx';
import { CARD_IMAGE_SIZES, categoryImage, serviceImage, type CardImage } from '~/lib/images';
import { Icon } from '../ui/Icon';
import styles from './Cards.module.css';

/** Full-bleed photo at the top of a card (a square thumbnail on phones). Decorative: the title names it. */
function CardMedia({ image }: { image: CardImage }) {
  return (
    <div className={styles.media}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={CARD_IMAGE_SIZES}
        width={800}
        height={600}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Signature material card (UI_UX_GUIDELINES §6.3). The whole card is one link. */
export function MaterialCard({
  category,
  compact,
}: {
  category: CommodityCategory;
  compact?: boolean;
}) {
  const count = category.materials.filter((m) => m.active).length;
  const image = categoryImage(category.slug);
  return (
    <article
      className={cx(styles.card, styles.material, compact && styles.compact)}
      data-group={category.group}
    >
      {image ? (
        <CardMedia image={image} />
      ) : (
        !compact && (
          <div className={styles.swatch} aria-hidden="true">
            <Icon name={category.icon} size={40} strokeWidth={1.25} />
          </div>
        )
      )}
      <p className={cx('eyebrow', styles.cardEyebrow)}>
        {categoryGroupLabels[category.group]} · {count} {count === 1 ? 'grade' : 'grades'}
      </p>
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

/**
 * Photo tile for overview grids (Home): just the photo, material name and grade count.
 * The summary and grade details live on the Commodities pages. The whole tile is one link.
 */
export function MaterialTile({ category }: { category: CommodityCategory }) {
  const count = category.materials.filter((m) => m.active).length;
  const image = categoryImage(category.slug);
  return (
    <article className={styles.tile} data-group={category.group}>
      {image ? (
        <img
          className={styles.tileImage}
          src={image.src}
          srcSet={image.srcSet}
          sizes="(max-width: 767px) 72px, 25vw"
          width={800}
          height={600}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className={cx(styles.tileImage, styles.tileSwatch)} aria-hidden="true">
          <Icon name={category.icon} size={32} strokeWidth={1.25} />
        </span>
      )}
      <div className={styles.tileBody}>
        <p className={styles.tileMeta}>
          {categoryGroupLabels[category.group]} · {count} {count === 1 ? 'grade' : 'grades'}
        </p>
        <h3 className={styles.tileTitle}>
          <Link to={`/commodities/${category.slug}`} className={styles.cardLink}>
            {category.name}
          </Link>
        </h3>
      </div>
      <span className={styles.tileArrow} aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </article>
  );
}

/**
 * Desktop column count that fills every row: 8 → 4 + 4, 6 → 3 + 3, 2 → two wide cards.
 * Counts that can't divide evenly use whichever of 4 or 3 leaves the fuller last row.
 */
export function gridColumns(count: number): 2 | 3 | 4 {
  if (count <= 2) return 2;
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  return count % 4 >= count % 3 ? 4 : 3;
}

/**
 * @param tiles Photo tiles (name + grade count only) instead of full cards, for overview sections.
 */
export function CommodityGrid({
  categories,
  compact,
  tiles,
}: {
  categories: CommodityCategory[];
  compact?: boolean;
  tiles?: boolean;
}) {
  if (categories.length === 0) return null;
  return (
    <ul
      role="list"
      className={cx(styles.grid, compact && styles.gridCompact, tiles && styles.gridTiles)}
      data-cols={gridColumns(categories.length)}
      data-reveal-stagger=""
    >
      {categories.map((c) => (
        <li key={c.slug}>
          {tiles ? <MaterialTile category={c} /> : <MaterialCard category={c} compact={compact} />}
        </li>
      ))}
    </ul>
  );
}

export function ServiceCards({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <ul
      role="list"
      className={styles.grid}
      data-cols={gridColumns(services.length)}
      data-reveal-stagger=""
    >
      {services.map((s) => {
        const image = serviceImage(s.slug);
        return (
          <li key={s.slug}>
            <article className={cx(styles.card, styles.service)}>
              {image && <CardMedia image={image} />}
              <span
                className={cx(styles.serviceIcon, image && styles.serviceIconOnMedia)}
                aria-hidden="true"
              >
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
        );
      })}
    </ul>
  );
}

export function IndustryStrip({ industries }: { industries: Industry[] }) {
  if (industries.length === 0) return null;
  return (
    <ul role="list" className={styles.industryStrip} data-reveal-stagger="">
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
