import { AcceptanceChecklist } from '~/components/commodity/AcceptanceChecklist';
import { MaterialTable } from '~/components/commodity/MaterialTable';
import { FaqAccordion } from '~/components/content/FaqAccordion';
import { GlossaryText } from '~/components/content/GlossaryText';
import { InPageNav } from '~/components/content/InPageNav';
import { DraftNotice } from '~/components/layout/DraftBanner';
import { Section, SectionHeader } from '~/components/layout/Section';
import { Callout, CtaBand, InfoPanel, ProcessSteps } from '~/components/sections/Blocks';
import { CommodityGrid, ServiceCards } from '~/components/sections/Cards';
import { PageHero } from '~/components/sections/Hero';
import { LinkButton } from '~/components/ui/Button';
import { NotFoundContent } from './not-found';
import { ContentText } from '~/components/ui/ContentText';
import {
  activeCategories,
  activeMaterials,
  defaultProcess,
  faqsByIds,
  getCategory,
  servicesBySlugs,
} from '~/content';
import { categoryGroupLabels } from '~/content/model';
import { isDraftMode } from '~/lib/env';
import { breadcrumbJsonLd, buildMeta, compact, faqJsonLd } from '~/lib/seo';
import type { Route } from './+types/commodities.$category';
import styles from './page.module.css';

export const meta: Route.MetaFunction = ({ params }) => {
  const c = getCategory(params.category);
  if (!c) return [{ title: 'Not found' }];
  const path = `/commodities/${c.slug}`;
  return buildMeta({
    title: c.seo.title,
    description: c.seo.description,
    path,
    jsonLd: compact([
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'Commodities', to: '/commodities' },
        { label: c.name, to: path },
      ]),
      faqJsonLd(faqsByIds(c.faqs)),
    ]),
  });
};

export default function CommodityCategoryPage({ params }: Route.ComponentProps) {
  const c = getCategory(params.category);
  if (!c) return <NotFoundContent />;
  const materials = activeMaterials(c);
  const faqs = faqsByIds(c.faqs);
  const services = servicesBySlugs(c.relatedServices);
  const siblings = activeCategories().filter((x) => x.group === c.group && x.slug !== c.slug);
  const quoteHref = `/quote?intent=sell&category=${c.slug}`;

  const nav = [
    { id: 'overview', label: 'Overview' },
    ...(materials.length
      ? [{ id: 'materials', label: `Materials & grades (${materials.length})` }]
      : []),
    { id: 'acceptance', label: 'Acceptance' },
    { id: 'process', label: 'Process' },
    ...(faqs.length ? [{ id: 'faqs', label: 'FAQs' }] : []),
  ];

  return (
    <>
      <PageHero
        accent={c.group}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Commodities', to: '/commodities' },
          { label: c.name, to: `/commodities/${c.slug}` },
        ]}
        eyebrow={`${categoryGroupLabels[c.group]} · ${materials.length} grades`}
        title={c.name}
        lead={<p>{c.summary}</p>}
        actions={
          <>
            <LinkButton to={quoteHref} size="lg" arrow>
              Get a price
            </LinkButton>
            <LinkButton to="#materials" size="lg" variant="secondary">
              View grades
            </LinkButton>
          </>
        }
        aside={
          c.keyFacts?.length ? (
            <ul role="list" className={styles.facts}>
              {c.keyFacts.map((f) => (
                <li key={f}>
                  <ContentText>{f}</ContentText>
                </li>
              ))}
            </ul>
          ) : undefined
        }
      />

      <InPageNav items={nav} />

      {isDraftMode && !c.confirmed && (
        <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
          <DraftNotice>
            This category is a <strong>candidate</strong> from the industry research and has not
            been confirmed by the business (MI-05). Material descriptions are general industry
            definitions; highlighted items need business input.
          </DraftNotice>
        </div>
      )}

      <Section labelledBy="overview" id="overview-section">
        <div className={styles.split}>
          <h2 id="overview">Overview</h2>
          <div className="prose">
            {c.overview.map((p) => (
              <p key={p}>
                <GlossaryText>{p}</GlossaryText>
              </p>
            ))}
          </div>
        </div>
      </Section>

      {materials.length > 0 && (
        <Section tone="raised" labelledBy="materials">
          <SectionHeader
            id="materials"
            eyebrow={`${materials.length} materials`}
            title="Materials & grades"
            lead="Filter by type or search. Select “Quote” on any row to start a pre-filled request."
          />
          <MaterialTable category={c} />
        </Section>
      )}

      <Section labelledBy="acceptance">
        <SectionHeader id="acceptance" eyebrow="Acceptance" title="What we accept" />
        <div className={styles.stack}>
          <AcceptanceChecklist acceptance={c.acceptance} />
          {c.logistics && (
            <InfoPanel
              items={[
                { label: 'Minimum quantity', value: c.logistics.minimumQuantity },
                { label: 'Collection', value: c.logistics.collection },
                { label: 'Drop-off', value: c.logistics.dropOff },
                { label: 'Containers', value: c.logistics.containers?.join(', ') },
              ]}
            />
          )}
          {c.complianceNotes?.map((n) => (
            <Callout key={n} tone="compliance" title="Compliance">
              <p>
                <GlossaryText>{n}</GlossaryText>
              </p>
            </Callout>
          ))}
        </div>
      </Section>

      <Section tone="raised" labelledBy="process">
        <SectionHeader id="process" eyebrow="Process" title="How it works" />
        <ProcessSteps steps={c.process ?? defaultProcess} />
      </Section>

      {services.length > 0 && (
        <Section labelledBy="related-services">
          <SectionHeader
            id="related-services"
            eyebrow="Related services"
            title={`Services for ${c.name.toLowerCase()}`}
          />
          <ServiceCards services={services} />
        </Section>
      )}

      {faqs.length > 0 && (
        <Section tone="raised" labelledBy="faqs">
          <SectionHeader id="faqs" eyebrow="FAQ" title={`${c.name}: questions`} />
          <FaqAccordion faqs={faqs} />
        </Section>
      )}

      {siblings.length > 0 && (
        <Section labelledBy="siblings">
          <SectionHeader
            id="siblings"
            eyebrow={categoryGroupLabels[c.group]}
            title="Related categories"
          />
          <CommodityGrid categories={siblings} compact />
        </Section>
      )}

      <CtaBand
        title={`Get a price for ${c.name.toLowerCase()}`}
        quoteHref={quoteHref}
        quoteLabel="Request a quote"
      />
    </>
  );
}
