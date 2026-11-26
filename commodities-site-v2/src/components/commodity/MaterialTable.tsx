import { ArrowRight, Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { CommodityCategory, Material } from '~/content/model';
import { cx } from '~/lib/cx';
import { GlossaryText } from '../content/GlossaryText';
import styles from './MaterialTable.module.css';

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s]/g, ' ');

function matches(m: Material, q: string) {
  if (!q) return true;
  const hay = normalise(
    [m.name, m.subgroup, ...(m.codes ?? []), m.description, ...(m.typicalSources ?? [])].join(' '),
  );
  return normalise(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}

/**
 * Materials & grades table with sub-group chips and search (FR-04, FR-05).
 * Renders the full table in prerendered HTML, so it works without JavaScript.
 * Rows become stacked spec cards below 768px.
 */
export function MaterialTable({ category }: { category: CommodityCategory }) {
  const materials = category.materials.filter((m) => m.active);
  const subgroups = useMemo(
    () => [...new Set(materials.map((m) => m.subgroup).filter((s): s is string => Boolean(s)))],
    [materials],
  );
  const [subgroup, setSubgroup] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const visible = materials.filter(
    (m) => (!subgroup || m.subgroup === subgroup) && matches(m, deferredQuery),
  );
  const quoteHref = (m: Material) =>
    `/quote?intent=sell&category=${category.slug}&material=${m.slug}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        {subgroups.length > 1 && (
          <div className={styles.chips} role="group" aria-label="Filter by type">
            <button
              type="button"
              className={styles.chip}
              aria-pressed={subgroup === null}
              onClick={() => setSubgroup(null)}
            >
              All <span className={styles.chipCount}>{materials.length}</span>
            </button>
            {subgroups.map((g) => (
              <button
                key={g}
                type="button"
                className={styles.chip}
                aria-pressed={subgroup === g}
                onClick={() => setSubgroup(subgroup === g ? null : g)}
              >
                {g}{' '}
                <span className={styles.chipCount}>
                  {materials.filter((m) => m.subgroup === g).length}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className={styles.search}>
          <label htmlFor={`search-${category.slug}`} className="visually-hidden">
            Search {category.name}
          </label>
          <Search size={18} aria-hidden="true" className={styles.searchIcon} />
          <input
            id={`search-${category.slug}`}
            type="search"
            placeholder="Search grades, e.g. HMS"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'material' : 'materials'} shown
      </p>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p>No matching material.</p>
          <Link to={`/quote?intent=sell&category=${category.slug}`}>Tell us what you have</Link>
        </div>
      ) : (
        <table className={styles.table}>
          <caption className="visually-hidden">{category.name}: materials and grades</caption>
          <thead>
            <tr>
              <th scope="col">Material / grade</th>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col">Typical sources</th>
              <th scope="col">
                <span className="visually-hidden">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((m) => (
              <tr key={m.slug} id={`material-${m.slug}`} className={styles.row}>
                <th scope="row" className={styles.name}>
                  {m.subgroup && <span className={styles.subgroup}>{m.subgroup}</span>}
                  {m.name}
                </th>
                <td
                  data-label="Code"
                  className={cx(styles.code, !m.codes?.length && styles.emptyCell)}
                >
                  {m.codes?.join(' / ') || '—'}
                </td>
                <td data-label="Description">
                  <GlossaryText>{m.description}</GlossaryText>
                  {m.notes && <span className={styles.notes}>{m.notes}</span>}
                </td>
                <td
                  data-label="Typical sources"
                  className={cx(styles.sources, !m.typicalSources?.length && styles.emptyCell)}
                >
                  {m.typicalSources?.join(', ') || '—'}
                </td>
                <td className={styles.action}>
                  <Link to={quoteHref(m)} className={styles.quoteLink}>
                    Quote <span className="visually-hidden">for {m.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
