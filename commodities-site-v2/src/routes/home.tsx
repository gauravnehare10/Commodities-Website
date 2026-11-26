import { Section, SectionHeader } from '~/components/layout/Section';
import { DraftNotice } from '~/components/layout/DraftBanner';
import { FaqAccordion } from '~/components/content/FaqAccordion';
import {
  CtaBand,
  LocationCard,
  ProcessSteps,
  StatsBand,
  Testimonials,
  TrustStrip,
} from '~/components/sections/Blocks';
import { isDraftMode } from '~/lib/env';
import styles from './page.module.css';
import { CommodityGrid, IndustryStrip, ServiceCards } from '~/components/sections/Cards';
import { HeroIntent } from '~/components/sections/Hero';
import { ArrowLink } from '~/components/ui/Button';
import {
  accreditations,
  activeCategories,
  activeServices,
  defaultProcess,
  featuredFaqs,
  industries,
  locations,
  siteConfig,
  stats,
  testimonials,
} from '~/content';
import { buildMeta, faqJsonLd, compact } from '~/lib/seo';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Scrap Metal & Recyclable Commodities',
    description:
      'Ferrous and non-ferrous scrap metal, recyclables and specialist waste streams. Check accepted materials and grades, then request a quote.',
    path: '/',
    jsonLd: compact([faqJsonLd(featuredFaqs())]),
  });

export default function Home() {
  const categories = activeCategories();
  const services = activeServices().slice(0, 6);
  const hasCoverage = siteConfig.coverage.regions.length > 0 || locations.length > 0;

  return (
    <>
      <HeroIntent />

      {accreditations.length > 0 ? (
        <Section tight tone="raised">
          <TrustStrip items={accreditations} />
        </Section>
      ) : null}

      <Section labelledBy="commodities-title">
        <SectionHeader
          id="commodities-title"
          eyebrow="Commodities"
          title="Materials we handle"
          lead="Choose a category to see the grades, what’s accepted and how to get a price."
          action={<ArrowLink to="/commodities">All commodities</ArrowLink>}
        />
        <CommodityGrid categories={categories} />
      </Section>

      <Section tone="raised" labelledBy="process-title">
        <SectionHeader
          id="process-title"
          eyebrow="How it works"
          title="From enquiry to paperwork in four steps"
        />
        <ProcessSteps steps={defaultProcess} />
      </Section>

      <Section labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="Logistics, trading and processing"
          action={<ArrowLink to="/services">All services</ArrowLink>}
        />
        <ServiceCards services={services} />
      </Section>

      {stats.length > 0 && (
        <Section tone="dark" labelledBy="stats-title">
          <h2 id="stats-title" className="visually-hidden">
            Key figures
          </h2>
          <StatsBand stats={stats} />
        </Section>
      )}

      <Section tone="dark" grid labelledBy="industries-title">
        <SectionHeader
          id="industries-title"
          eyebrow="Industries"
          title="Working with the sectors that produce and use secondary materials"
          action={<ArrowLink to="/industries">Industries we serve</ArrowLink>}
        />
        <IndustryStrip industries={industries} />
      </Section>

      {(hasCoverage || isDraftMode) && (
        <Section labelledBy="coverage-title">
          <SectionHeader id="coverage-title" eyebrow="Coverage" title="Where we operate" />
          {hasCoverage ? (
            <div className={styles.stack}>
              {siteConfig.coverage.regions.length > 0 && (
                <p className="lead">{siteConfig.coverage.regions.join(' · ')}</p>
              )}
              {locations.length > 0 && (
                <div className={styles.cards3}>
                  {locations.map((l) => (
                    <LocationCard key={l.id} location={l} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <DraftNotice>
              Coverage regions (MI-08) and depot locations (MI-07) are awaiting business input. This
              section is hidden in production until supplied.
            </DraftNotice>
          )}
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section tone="subtle" labelledBy="testimonials-title">
          <SectionHeader
            id="testimonials-title"
            eyebrow="Customers"
            title="What our customers say"
          />
          <Testimonials items={testimonials} />
        </Section>
      )}

      <Section tone="raised" labelledBy="faq-title">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Common questions"
          action={<ArrowLink to="/resources/faq">All FAQs</ArrowLink>}
        />
        <FaqAccordion faqs={featuredFaqs()} />
      </Section>

      <CtaBand />
    </>
  );
}
