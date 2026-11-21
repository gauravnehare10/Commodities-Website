import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Seo from '../components/layout/Seo';
import CommodityCard from '../components/cards/CommodityCard';
import CtaBanner from '../components/sections/shared/CtaBanner';
import PageHero from '../components/sections/shared/PageHero';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { commodities } from '../data/commodities';
import { pageHeroes } from '../data/content';
import { reveal } from '../utils/motion';

/** P-03 Commodities overview (docs/WEBSITE_STRUCTURE.md §4.3). */
export default function CommoditiesPage() {
  const hero = pageHeroes.commodities;
  return (
    <>
      <Seo
        title="Commodities"
        description="Ferrous and non-ferrous metals, plastics, paper and cardboard, wood and electrical waste. See the grades we handle and request a quote."
      />

      <PageHero
        title={hero.title}
        intro={hero.intro}
        image={hero.image}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Commodities' }]}
      />

      <Section labelledBy="commodities-list-title">
        <SectionHeading
          id="commodities-list-title"
          eyebrow="Choose a category"
          title="Six material categories"
          lead="Each category lists the grades we handle and what we accept. Select one to learn more or to request a quote."
        />
        <Row className="g-4">
          {commodities.map((c, i) => (
            <Col key={c.slug} xs={12} md={6} lg={4} {...reveal(i % 3)}>
              <CommodityCard commodity={c} />
            </Col>
          ))}
        </Row>
      </Section>

      <CtaBanner
        compact
        title="Can't see your material?"
        text="We may still be able to help. Tell us what you have and we will let you know."
        buttonLabel="Ask us"
      />
    </>
  );
}
