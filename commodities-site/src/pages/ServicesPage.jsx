import Seo from '../components/layout/Seo';
import AnchorNav from '../components/sections/services/AnchorNav';
import CtaBanner from '../components/sections/shared/CtaBanner';
import PageHero from '../components/sections/shared/PageHero';
import ProcessSteps from '../components/sections/shared/ProcessSteps';
import SplitFeature from '../components/sections/shared/SplitFeature';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { pageHeroes, process } from '../data/content';
import { services } from '../data/services';

/** P-05 Services (docs/WEBSITE_STRUCTURE.md §4.5). */
export default function ServicesPage() {
  const hero = pageHeroes.services;
  return (
    <>
      <Seo
        title="Services"
        description="Collections and logistics, site clearances, commodity trading, export, processing and recycling consultancy for businesses."
      />

      {/* 1. Page header */}
      <PageHero
        title={hero.title}
        intro={hero.intro}
        image={hero.image}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* 2. Quick links to each service */}
      <AnchorNav
        label="Services on this page"
        items={services.map((s) => ({ id: s.id, label: s.title }))}
      />

      {/* 3. One block per service: image alternates left and right, backgrounds alternate */}
      {services.map((s, i) => (
        <Section key={s.id} tone={i % 2 === 0 ? 'white' : 'sand'} labelledBy={s.id}>
          <SplitFeature
            id={s.id}
            eyebrow={`Service ${String(i + 1).padStart(2, '0')}`}
            title={s.title}
            paragraphs={s.description}
            pointsTitle="What's included"
            points={s.includes}
            image={s.image}
            imageAlt={s.imageAlt}
            reverse={i % 2 === 1}
            action={
              <Button to="/contact" arrow>
                Request this service
              </Button>
            }
          />
        </Section>
      ))}

      {/* 4. How it works */}
      <Section
        tone={services.length % 2 === 0 ? 'white' : 'sand'}
        labelledBy="services-process-title"
      >
        <SectionHeading
          id="services-process-title"
          eyebrow="How it works"
          title="Four simple steps"
          lead="The same clear process, whichever service you need."
        />
        <ProcessSteps steps={process} />
      </Section>

      {/* 5. Call to action */}
      <CtaBanner
        title="Not sure which service you need?"
        text="Tell us about your site and materials, and we will recommend the right approach."
      />
    </>
  );
}
