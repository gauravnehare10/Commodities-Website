import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section } from '~/components/layout/Section';
import { CtaBand, DocLink } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { downloads } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/resources.downloads';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Resources', to: '/resources' },
  { label: 'Downloads', to: '/resources/downloads' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Downloads',
    description: 'Brochures, material acceptance guides and forms.',
    path: '/resources/downloads',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

const dateFmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

/** Enabled via siteConfig.features.downloads once documents exist (MI-27). */
export default function DownloadsPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Downloads" title="Documents & guides" />
      <Section>
        {downloads.length === 0 ? (
          <DraftNotice>No downloadable documents supplied yet (MI-27).</DraftNotice>
        ) : (
          <ul role="list" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {downloads.map((d) => (
              <li
                key={d.href}
                className={styles.panel}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                }}
              >
                <DocLink href={d.href} label={d.title} sizeKb={d.sizeKb} />
                <span className={styles.label}>Updated {dateFmt.format(new Date(d.updated))}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
