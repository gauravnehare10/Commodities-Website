import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles/tokens.css';
import './styles/global.css';

import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import { CookieBanner } from './components/layout/CookieBanner';
import { DraftBanner } from './components/layout/DraftBanner';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { StickyActionBar } from './components/layout/StickyActionBar';
import { LinkButton } from './components/ui/Button';
import { isDraftMode } from './lib/env';
import { organizationJsonLd } from './lib/seo';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
];

export function Layout({ children }: { children: ReactNode }) {
  const orgLd = organizationJsonLd();
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f1a1c" />
        {isDraftMode && <meta name="robots" content="noindex, nofollow" />}
        <Meta />
        <Links />
        {orgLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <DraftBanner />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <StickyActionBar />
        <CookieBanner />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <section className="container" style={{ paddingBlock: 'var(--space-9)' }}>
      <p className="eyebrow">{notFound ? 'Error 404' : 'Something went wrong'}</p>
      <h1 style={{ marginBlock: 'var(--space-4)' }}>
        {notFound ? 'Page not found' : 'Sorry, this page could not be loaded'}
      </h1>
      <p className="lead" style={{ marginBottom: 'var(--space-6)' }}>
        {notFound
          ? 'The page may have moved. Try our commodities or get in touch.'
          : 'Please try again, or contact us directly.'}
      </p>
      <LinkButton to="/commodities">Browse commodities</LinkButton>
      {import.meta.env.DEV && error instanceof Error && (
        <pre style={{ marginTop: 'var(--space-6)', whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
      )}
    </section>
  );
}
