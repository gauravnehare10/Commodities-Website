import { Search } from 'lucide-react';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { materialIndex } from '~/content';
import { track } from '~/lib/analytics';
import styles from './MaterialSearch.module.css';

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s]/g, ' ');

/** Search across every active material in every category (WEBSITE_STRUCTURE §5.3 #1). */
export function MaterialSearch() {
  const index = useMemo(
    () =>
      materialIndex().map((e) => ({
        ...e,
        hay: norm(
          [
            e.material.name,
            ...(e.material.codes ?? []),
            e.material.subgroup,
            e.category.name,
            e.material.description,
          ].join(' '),
        ),
      })),
    [],
  );
  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.trim());

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const terms = norm(q).split(/\s+/).filter(Boolean);
    return index.filter((e) => terms.every((t) => e.hay.includes(t))).slice(0, 8);
  }, [q, index]);

  useEffect(() => {
    if (q.length < 2) return;
    const t = setTimeout(() => track('material_search', { length: q.length }), 800);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className={styles.wrap}>
      <label htmlFor="material-search" className={styles.label}>
        Search all materials
      </label>
      <div className={styles.field}>
        <Search size={20} aria-hidden="true" className={styles.icon} />
        <input
          id="material-search"
          type="search"
          autoComplete="off"
          placeholder="e.g. copper, OCC, HMS, rebar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          aria-describedby="material-search-status"
        />
      </div>
      <p id="material-search-status" className="visually-hidden" aria-live="polite">
        {q.length >= 2 ? `${results.length} results` : ''}
      </p>
      {q.length >= 2 && (
        <div className={styles.results}>
          {results.length === 0 ? (
            <p className={styles.none}>
              No match for “{q}”.{' '}
              <Link to="/quote?intent=sell">Describe your material instead</Link>
            </p>
          ) : (
            <ul role="list">
              {results.map(({ material, category }) => (
                <li key={`${category.slug}-${material.slug}`}>
                  <Link
                    to={`/commodities/${category.slug}#material-${material.slug}`}
                    className={styles.result}
                  >
                    <span className={styles.resultName}>
                      {material.name}
                      {material.codes?.length ? (
                        <span className={styles.code}> {material.codes.join(' / ')}</span>
                      ) : null}
                    </span>
                    <span className={styles.resultCat}>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
