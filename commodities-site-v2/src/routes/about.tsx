import { Section, SectionHeader } from '~/components/layout/Section';
import {
  CtaBand,
  InfoPanel,
  ProcessSteps,
  StatsBand,
  TrustStrip,
} from '~/components/sections/Blocks';
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

/** Demo copy for the fictional demo company; replace with the business's own (MI-03, MI-04). */
const story = [
  'Corvane started in 1998 as a small scrap yard beside the canal in Leeds. Today we run a 60-tonne weighbridge, a fleet of collection vehicles and a processing yard that handles metals, fibre, plastics, wood and electrical waste.',
  'We buy material from manufacturers, contractors, waste managers and the public, process it into consistent grades, and sell it to mills, foundries and reprocessors in the UK and overseas.',
];

/** Demo facilities for the fictional demo company (MI-07, MI-15). */
const facilities = [
  { label: 'Yard', value: 'Leeds, LS10: 3.5 acres with a covered non-ferrous bay' },
  { label: 'Weighbridge', value: '60-tonne, 18-metre, calibrated every year' },
  { label: 'Processing', value: '600-tonne shear and a fibre and plastics baler' },
  { label: 'Fleet', value: 'Hook-loaders, skip wagons and grab lorries' },
  { label: 'Containers', value: 'Skips, 20 to 40 yd³ roll-on/roll-offs, cages and stillages' },
  { label: 'Opening hours', value: 'Mon to Fri 7:30am to 5pm, Sat 8am to 12 noon' },
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
            <ContentText>
              {
                'An independent metals and recycling business in Leeds, turning scrap and waste into graded raw materials since 1998.'
              }
            </ContentText>
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
        <InfoPanel items={facilities} />
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
