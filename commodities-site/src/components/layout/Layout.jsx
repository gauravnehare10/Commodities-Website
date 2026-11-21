import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

/** Page shell shared by every route: skip link, header, page content, footer. */
export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1} className="site-main">
        {/* Pages load on demand; reserve space meanwhile so the footer doesn't jump up */}
        <Suspense fallback={<div className="min-vh-100" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
