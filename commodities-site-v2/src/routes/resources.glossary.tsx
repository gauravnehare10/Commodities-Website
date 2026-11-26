import { Link } from 'react-router';
import { Section } from '~/components/layout/Section';
import { CtaBand } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { categoriesBySlugs, glossary } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/resources.glossary';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Resources', to: '/resources' },
  { label: 'Glossary', to: '/resources/glossary' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Scrap & Recycling Glossary',
    description:
      'Plain-English definitions of scrap metal and recycling terms: HMS, OA, ELV, ATF, WEEE, OCC, DMR, POPs and more.',
    path: '/resources/glossary',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'Scrap & Recycling Glossary',
        hasDefinedTerm: glossary.map((g) => ({
          '@type': 'DefinedTerm',
          name: g.term,
          description: g.definition,
        })),
      },
    ],
  });

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'en-GB'));
  const letters = new Set(sorted.map((g) => g.term[0]!.toUpperCase()));
  const firstOf = new Map<string, string>();
  for (const g of sorted) {
    const l = g.term[0]!.toUpperCase();
    if (!firstOf.has(l)) firstOf.set(l, g.slug);
  }

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Glossary"
        title="Trade terms, explained"
        lead="The language of scrap and recycling in plain English."
      />
      <Section>
        <nav
          aria-label="Jump to letter"
          className={styles.az}
          style={{ marginBottom: 'var(--space-6)' }}
        >
          {ALPHABET.map((l) =>
            letters.has(l) ? (
              <a key={l} href={`#${firstOf.get(l)}`}>
                {l}
              </a>
            ) : (
              <span key={l} aria-hidden="true">
                {l}
              </span>
            ),
          )}
        </nav>
        <dl className={styles.terms}>
          {sorted.map((g) => {
            const cats = categoriesBySlugs(g.relatedCategories);
            return (
              <div key={g.slug} id={g.slug} className={styles.term}>
                <dt>
                  {g.term}
                  {g.aliases.length > 0 && (
                    <span className={styles.aliases}>{g.aliases.join(' · ')}</span>
                  )}
                </dt>
                <dd>
                  <p>{g.definition}</p>
                  {cats.length > 0 && (
                    <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      See:{' '}
                      {cats.map((c, i) => (
                        <span key={c.slug}>
                          {i > 0 && ', '}
                          <Link to={`/commodities/${c.slug}`}>{c.name}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </Section>
      <CtaBand />
    </>
  );
}
