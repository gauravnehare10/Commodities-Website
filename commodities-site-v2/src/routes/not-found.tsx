import { Section } from '~/components/layout/Section';
import { LinkButton } from '~/components/ui/Button';
import { buildMeta } from '~/lib/seo';
import type { Route } from './+types/not-found';
import styles from './page.module.css';

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
    path: '/404',
    noindex: true,
  });

export function NotFoundContent() {
  return (
    <Section grid>
      <div className={styles.centered}>
        <p className="eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="lead">The page may have moved or no longer exists. These links may help:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <LinkButton to="/commodities">Browse commodities</LinkButton>
          <LinkButton to="/services" variant="secondary">
            Services
          </LinkButton>
          <LinkButton to="/contact" variant="secondary">
            Contact us
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}

export default function NotFound() {
  return <NotFoundContent />;
}
