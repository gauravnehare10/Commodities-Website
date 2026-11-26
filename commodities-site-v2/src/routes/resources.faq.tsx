import { useState } from 'react';
import { FaqAccordion } from '~/components/content/FaqAccordion';
import { Section } from '~/components/layout/Section';
import { CtaBand } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { allFaqs } from '~/content';
import { faqTopicLabels, faqTopics, type FaqTopic } from '~/content/model';
import { breadcrumbJsonLd, buildMeta, compact, faqJsonLd } from '~/lib/seo';
import chip from '~/components/commodity/MaterialTable.module.css';
import type { Route } from './+types/resources.faq';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Resources', to: '/resources' },
  { label: 'FAQ', to: '/resources/faq' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Frequently Asked Questions',
    description:
      'Answers about selling and buying scrap metal and recyclables, collections, payments and compliance.',
    path: '/resources/faq',
    jsonLd: compact([breadcrumbJsonLd(crumbs), faqJsonLd(allFaqs)]),
  });

export default function FaqPage() {
  const [topic, setTopic] = useState<FaqTopic | null>(null);
  const topics = faqTopics.filter((t) => allFaqs.some((f) => f.topic === t));
  const shown = topic ? allFaqs.filter((f) => f.topic === topic) : allFaqs;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Can’t find your answer? Contact us and we’ll help."
      />
      <Section>
        <div className={styles.topicChips} role="group" aria-label="Filter by topic">
          <button
            type="button"
            className={chip.chip}
            aria-pressed={topic === null}
            onClick={() => setTopic(null)}
          >
            All
          </button>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              className={chip.chip}
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
            >
              {faqTopicLabels[t]}
            </button>
          ))}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {shown.length} questions shown
        </p>
        <FaqAccordion faqs={shown} />
      </Section>
      <CtaBand title="Still have a question?" quoteHref="/contact" quoteLabel="Contact us" />
    </>
  );
}
