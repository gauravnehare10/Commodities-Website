import { useLocation } from 'react-router';
import { Section } from '~/components/layout/Section';
import { PageHero } from '~/components/sections/Hero';
import { ContentText } from '~/components/ui/ContentText';
import { getLegalPage } from '~/content';
import { buildMeta } from '~/lib/seo';
import type { Route } from './+types/legal';
import { NotFoundContent } from './not-found';

/** One template for Privacy, Cookies, Terms and Modern Slavery (P-14). Content: MI-24. */
export const meta: Route.MetaFunction = ({ location }) => {
  const page = getLegalPage(location.pathname.replace(/^\//, ''));
  if (!page) return [{ title: 'Not found' }];
  return buildMeta({ title: page.title, description: `${page.title}.`, path: location.pathname });
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const page = getLegalPage(pathname.replace(/^\//, ''));
  if (!page) return <NotFoundContent />;
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: page.title, to: pathname },
        ]}
        eyebrow="Legal"
        title={page.title}
        lead={
          <p>
            Last updated: <ContentText>{page.updated}</ContentText>
          </p>
        }
      />
      <Section>
        <div className="prose">
          {page.sections.map((s) => (
            <section
              key={s.heading}
              style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}
            >
              <h2 style={{ fontSize: 'var(--text-h3)' }}>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p}>
                  <ContentText>{p}</ContentText>
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
