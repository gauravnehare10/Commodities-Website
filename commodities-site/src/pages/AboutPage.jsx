import Seo from '../components/layout/Seo';
import CtaBanner from '../components/sections/shared/CtaBanner';
import FeatureGrid from '../components/sections/shared/FeatureGrid';
import PageHero from '../components/sections/shared/PageHero';
import ProcessSteps from '../components/sections/shared/ProcessSteps';
import SplitFeature from '../components/sections/shared/SplitFeature';
import TrustBar from '../components/sections/shared/TrustBar';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { company } from '../data/company';
import { about, pageHeroes, process } from '../data/content';

/** P-02 About (docs/WEBSITE_STRUCTURE.md §4.2). Built entirely from shared sections. */
export default function AboutPage() {
  const hero = pageHeroes.about;
  return (
    <>
      <Seo
        title="About Us"
        description="Who we are, how we work and the standards we follow when buying, collecting and recycling scrap metal and recyclable materials."
      />

      {/* 1. Page header */}
      <PageHero
        title={hero.title}
        intro={hero.intro}
        image={hero.image}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* 2. Our story */}
      <Section labelledBy="about-story-title">
        <SplitFeature
          id="about-story-title"
          eyebrow="Our story"
          title="Who we are"
          paragraphs={about.story}
          image={about.storyImage}
          imageAlt={about.storyImageAlt}
        />
      </Section>

      {/* 3. Mission and values */}
      <Section tone="sand" labelledBy="about-values-title">
        <SectionHeading
          id="about-values-title"
          eyebrow="Our values"
          title="What we stand for"
          lead="The principles behind every collection, quote and trade."
        />
        <FeatureGrid items={about.values} />
      </Section>

      {/* 4. Compliance and accreditations (hidden until supplied, MI-08) */}
      {company.accreditations.length > 0 && (
        <Section labelledBy="about-compliance-title" spacing="compact">
          <SectionHeading
            id="about-compliance-title"
            eyebrow="Compliance"
            title="Licences and accreditations"
            align="center"
          />
          <TrustBar items={company.accreditations} />
        </Section>
      )}

      {/* 5. How it works */}
      <Section labelledBy="about-process-title">
        <SectionHeading id="about-process-title" eyebrow="How we work" title="Four simple steps" />
        <ProcessSteps steps={process} />
      </Section>

      {/* 6. Call to action */}
      <CtaBanner
        title="Work with us"
        text="Tell us about your materials and we will show you how we can help."
      />
    </>
  );
}
