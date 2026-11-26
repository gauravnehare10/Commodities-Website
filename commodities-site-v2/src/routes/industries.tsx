import { Link } from 'react-router';
import { Section } from '~/components/layout/Section';
import { CtaBand } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { Icon } from '~/components/ui/Icon';
import { categoriesBySlugs, industries, servicesBySlugs } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/industries';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Industries', to: '/industries' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Industries We Serve',
    description:
      'Scrap metal and recyclables services for manufacturing, construction and demolition, automotive, waste management, logistics and more.',
    path: '/industries',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Industries"
        title="Sector by sector"
        lead="Each industry produces its own mix of materials. Find yours to see the typical materials and the services that fit."
      />
      <Section>
        <nav
          aria-label="Industries on this page"
          className={styles.linkList}
          style={{ marginBottom: 'var(--space-6)' }}
        >
          {industries.map((i) => (
            <a key={i.slug} href={`#${i.slug}`}>
              {i.name}
            </a>
          ))}
        </nav>
        {industries.map((i) => {
          const mats = categoriesBySlugs(i.typicalMaterials);
          const svcs = servicesBySlugs(i.services);
          return (
            <article
              key={i.slug}
              id={i.slug}
              className={styles.industry}
              aria-labelledby={`${i.slug}-title`}
            >
              <div className={styles.industryHead}>
                <span className={styles.industryIcon}>
                  <Icon name={i.icon} size={26} />
                </span>
                <h2 id={`${i.slug}-title`} style={{ fontSize: 'var(--text-h3)' }}>
                  {i.name}
                </h2>
              </div>
              <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <p className="lead">{i.summary}</p>
                {mats.length > 0 && (
                  <div>
                    <p className={styles.label}>Typical materials</p>
                    <div className={styles.linkList}>
                      {mats.map((m) => (
                        <Link key={m.slug} to={`/commodities/${m.slug}`}>
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {svcs.length > 0 && (
                  <div>
                    <p className={styles.label}>Relevant services</p>
                    <div className={styles.linkList}>
                      {svcs.map((s) => (
                        <Link key={s.slug} to={`/services/${s.slug}`}>
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </Section>
      <CtaBand
        title="Talk to our team"
        text="Tell us about your site and materials and we’ll recommend the right approach."
      />
    </>
  );
}
