import { BookOpen, Download, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router';
import { Section } from '~/components/layout/Section';
import { CtaBand } from '~/components/sections/Blocks';
import { PageHero } from '~/components/sections/Hero';
import { siteConfig } from '~/content';
import { breadcrumbJsonLd, buildMeta } from '~/lib/seo';
import type { Route } from './+types/resources._index';
import styles from './page.module.css';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Resources', to: '/resources' },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Resources: FAQ, Glossary & Downloads',
    description:
      'Answers to common questions, an industry glossary of scrap and recycling terms, and downloadable documents.',
    path: '/resources',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

export default function ResourcesHub() {
  const cards = [
    {
      to: '/resources/faq',
      icon: <MessageCircleQuestion size={32} aria-hidden="true" />,
      title: 'FAQ',
      text: 'Selling, buying, collections, payments and compliance.',
    },
    {
      to: '/resources/glossary',
      icon: <BookOpen size={32} aria-hidden="true" />,
      title: 'Glossary',
      text: 'Plain-English definitions of trade terms like HMS, OA, OCC and WEEE.',
    },
    ...(siteConfig.features.downloads
      ? [
          {
            to: '/resources/downloads',
            icon: <Download size={32} aria-hidden="true" />,
            title: 'Downloads',
            text: 'Brochures, acceptance guides and forms.',
          },
        ]
      : []),
  ];
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Resources"
        title="Know the trade"
        lead="Reference material for anyone buying, selling or managing secondary materials."
      />
      <Section>
        <ul role="list" className={styles.cards3}>
          {cards.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className={styles.resourceCard}>
                {c.icon}
                <h2 style={{ fontSize: 'var(--text-h3)' }}>{c.title}</h2>
                <p>{c.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
