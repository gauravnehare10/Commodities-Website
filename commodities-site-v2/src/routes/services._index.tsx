import { Section, SectionHeader } from '~/components/layout/Section';
import { CtaBand, ProcessSteps } from '~/components/sections/Blocks';
import { ServiceCards } from '~/components/sections/Cards';
import { PageHero } from '~/components/sections/Hero';
import { LinkButton } from '~/components/ui/Button';
import { defaultProcess, servicesByGroup } from '~/content';
import { serviceGroupLabels } from '~/content/model';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/services._index';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Services: Collection, Trading, Processing & Advisory',
    description:
      'Collection and haulage, site clearances, commodity trading, export, processing and advisory services for scrap and recyclables.',
    path: '/services',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

export default function ServicesHub() {
  const groups = servicesByGroup();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title="Services that move material"
        lead="From a single collection to ongoing trading and export, choose the service that fits your material and site."
        actions={
          <LinkButton to="/quote?intent=collection" size="lg" arrow>
            Request a service
          </LinkButton>
        }
      />
      {groups.map(({ group, items }, i) => (
        <Section key={group} tone={i % 2 ? 'raised' : 'default'} labelledBy={`svc-${group}`}>
          <SectionHeader
            id={`svc-${group}`}
            eyebrow={`${String(i + 1).padStart(2, '0')} / ${String(groups.length).padStart(2, '0')}`}
            title={serviceGroupLabels[group]}
          />
          <ServiceCards services={items} />
        </Section>
      ))}
      <Section tone="dark" grid labelledBy="svc-process">
        <SectionHeader id="svc-process" eyebrow="Process" title="How we work" />
        <ProcessSteps steps={defaultProcess} />
      </Section>
      <CtaBand />
    </>
  );
}
