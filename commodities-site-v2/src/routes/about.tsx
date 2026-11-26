import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section, SectionHeader } from '~/components/layout/Section';
import { CtaBand, ProcessSteps, StatsBand, TrustStrip } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { ContentText } from '~/components/ui/ContentText';
import { accreditations, defaultProcess, stats } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/about';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'About Us',
    description:
      'Who we are, what we do and how we work with producers and users of secondary materials.',
    path: '/about',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

/** About copy must come from the business (MI-03, MI-04, MI-14, MI-15). */
const story = [
  '[PLACEHOLDER] Company story: founding, history and growth (MI-03).',
  '[PLACEHOLDER] What we do and our business model: recycler, trader, broker and/or exporter (MI-04).',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="About"
        title="About us"
        lead={
          <p>
            <ContentText>{'[PLACEHOLDER] One-sentence positioning statement (MI-03).'}</ContentText>
          </p>
        }
      />

      <Section labelledBy="story">
        <div className={styles.split}>
          <h2 id="story">Our story</h2>
          <div className="prose">
            {story.map((p) => (
              <p key={p}>
                <ContentText>{p}</ContentText>
              </p>
            ))}
          </div>
        </div>
      </Section>

      {stats.length > 0 && (
        <Section tone="dark" labelledBy="about-stats">
          <h2 id="about-stats" className="visually-hidden">
            Key figures
          </h2>
          <StatsBand stats={stats} />
        </Section>
      )}

      <Section tone="raised" labelledBy="approach">
        <SectionHeader id="approach" eyebrow="Approach" title="How we work" />
        <ProcessSteps steps={defaultProcess} />
      </Section>

      <Section labelledBy="facilities">
        <SectionHeader id="facilities" eyebrow="Facilities" title="Sites, fleet & equipment" />
        <DraftNotice>
          Facilities, fleet and equipment details and photography to be supplied (MI-07, MI-15).
        </DraftNotice>
        {accreditations.length > 0 && (
          <div style={{ marginTop: 'var(--space-6)' }}>
            <TrustStrip items={accreditations} />
          </div>
        )}
      </Section>

      <CtaBand title="Work with us" quoteHref="/contact" quoteLabel="Contact us" />
    </>
  );
}
