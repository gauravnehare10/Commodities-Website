import { Check } from 'lucide-react';
import { Link } from 'react-router';
import { FaqAccordion } from '~/components/content/FaqAccordion';
import { GlossaryText } from '~/components/content/GlossaryText';
import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section, SectionHeader } from '~/components/layout/Section';
import { CtaBand, ProcessSteps } from '~/components/sections/Blocks';
import { CommodityGrid } from '~/components/sections/Cards';
import { PageHero } from '~/components/sections/Hero';
import { LinkButton } from '~/components/ui/Button';
import { ContentText } from '~/components/ui/ContentText';
import { categoriesBySlugs, defaultProcess, faqsByIds, getService, industries } from '~/content';
import { serviceGroupLabels } from '~/content/model';
import { showDraftNotes } from '~/lib/env';
import { breadcrumbJsonLd, buildMeta, compact, faqJsonLd, serviceJsonLd } from '~/lib/seo';
import type { Route } from './+types/services.$service';
import { NotFoundContent } from './not-found';
import styles from './page.module.css';

export const meta: Route.MetaFunction = ({ params }) => {
  const s = getService(params.service);
  if (!s) return [{ title: 'Not found' }];
  const path = `/services/${s.slug}`;
  return buildMeta({
    title: s.seo.title,
    description: s.seo.description,
    path,
    jsonLd: compact([
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: s.name, to: path },
      ]),
      serviceJsonLd(s.name, s.summary, path),
      faqJsonLd(faqsByIds(s.faqs)),
    ]),
  });
};

export default function ServicePage({ params }: Route.ComponentProps) {
  const s = getService(params.service);
  if (!s) return <NotFoundContent />;
  const materials = categoriesBySlugs(s.materials);
  const audiences = industries.filter((i) => s.audiences.includes(i.slug));
  const faqs = faqsByIds(s.faqs);
  const quoteHref = `/quote?service=${s.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: s.name, to: `/services/${s.slug}` },
        ]}
        eyebrow={serviceGroupLabels[s.group]}
        title={s.name}
        lead={<p>{s.summary}</p>}
        actions={
          <LinkButton to={quoteHref} size="lg" arrow>
            Request this service
          </LinkButton>
        }
      />

      {showDraftNotes && !s.confirmed && (
        <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
          <DraftNotice>
            Candidate service from the industry research, not yet confirmed by the business (MI-06).
          </DraftNotice>
        </div>
      )}

      <Section labelledBy="svc-overview">
        <div className={styles.twoCol}>
          <div className="prose">
            <h2 id="svc-overview">Overview</h2>
            {s.overview.map((p) => (
              <p key={p}>
                <GlossaryText>{p}</GlossaryText>
              </p>
            ))}
          </div>
          <aside className={`${styles.panel} ${styles.sticky}`} aria-labelledby="svc-includes">
            <h3 id="svc-includes" style={{ marginBottom: 'var(--space-4)' }}>
              What’s included
            </h3>
            <ul role="list" style={{ display: 'grid', gap: 'var(--space-3)' }}>
              {s.includes.map((i) => (
                <li key={i} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <Check
                    size={20}
                    aria-hidden="true"
                    style={{ flex: 'none', color: 'var(--color-patina-600)' }}
                  />
                  <ContentText>{i}</ContentText>
                </li>
              ))}
            </ul>
            {s.equipment && s.equipment.length > 0 && (
              <>
                <p className={styles.label} style={{ marginTop: 'var(--space-5)' }}>
                  Equipment
                </p>
                <ul className={styles.list}>
                  {s.equipment.map((e) => (
                    <li key={e}>
                      <ContentText>{e}</ContentText>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </Section>

      {audiences.length > 0 && (
        <Section tone="raised" labelledBy="svc-audiences">
          <SectionHeader
            id="svc-audiences"
            eyebrow="Who it’s for"
            title="Industries using this service"
          />
          <div className={styles.linkList}>
            {audiences.map((a) => (
              <Link key={a.slug} to={`/industries#${a.slug}`}>
                {a.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {materials.length > 0 && (
        <Section labelledBy="svc-materials">
          <SectionHeader id="svc-materials" eyebrow="Materials" title="Materials handled" />
          <CommodityGrid categories={materials} compact />
        </Section>
      )}

      <Section tone="raised" labelledBy="svc-process">
        <SectionHeader id="svc-process" eyebrow="Process" title="How it works" />
        <ProcessSteps steps={s.process ?? defaultProcess} />
      </Section>

      {faqs.length > 0 && (
        <Section labelledBy="svc-faqs">
          <SectionHeader id="svc-faqs" eyebrow="FAQ" title="Questions about this service" />
          <FaqAccordion faqs={faqs} />
        </Section>
      )}

      <CtaBand
        title={`Talk to us about ${s.name.toLowerCase()}`}
        quoteHref={quoteHref}
        quoteLabel="Request this service"
      />
    </>
  );
}
