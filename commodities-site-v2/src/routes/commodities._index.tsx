import { MaterialSearch } from '~/components/commodity/MaterialSearch';
import { Section, SectionHeader } from '~/components/layout/Section';
import { Callout, CtaBand } from '~/components/sections/Blocks';
import { CommodityGrid } from '~/components/sections/Cards';
import { PageHero } from '~/components/sections/Hero';
import { ArrowLink } from '~/components/ui/Button';
import { categoriesByGroup } from '~/content';
import { categoryGroupLabels } from '~/content/model';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/commodities._index';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Commodities', to: '/commodities' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Commodities: Metals, Recyclables & Specialist Streams',
    description:
      'Browse ferrous and non-ferrous metals, plastics, fibre, wood and specialist waste streams. Search any material or grade.',
    path: '/commodities',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

export default function CommoditiesHub() {
  const groups = categoriesByGroup();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Commodities"
        title="Find your material"
        lead="Search by name, grade or trade code, or browse by category."
        aside={<MaterialSearch />}
      />

      {groups.map(({ group, items }, i) => (
        <Section key={group} tone={i % 2 ? 'raised' : 'default'} labelledBy={`group-${group}`}>
          <SectionHeader
            id={`group-${group}`}
            eyebrow={`${String(i + 1).padStart(2, '0')} / ${String(groups.length).padStart(2, '0')}`}
            title={categoryGroupLabels[group]}
          />
          <CommodityGrid categories={items} />
        </Section>
      ))}

      <Section tight>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Callout title="Can’t find your material?">
            <p>
              Tell us what it is and roughly how much you have.{' '}
              <ArrowLink to="/quote?intent=sell">Describe your material</ArrowLink>
            </p>
          </Callout>
          <Callout title="Looking to buy?">
            <p>
              Enquire about graded material supply.{' '}
              <ArrowLink to="/quote?intent=buy">Make a buying enquiry</ArrowLink>
            </p>
          </Callout>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
