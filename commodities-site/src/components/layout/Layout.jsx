import { Suspense, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

/** Page shell shared by every route: skip link, header, page content, footer. */
export default function Layout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  useScrollReveal(mainRef);

  // Fade the page in on navigation, but not on the very first load (that would delay the main image).
  const [lastPath, setLastPath] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setHasNavigated(true);
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="site-main">
        {/* Pages load on demand; reserve space meanwhile so the footer doesn't jump up */}
        <Suspense fallback={<div className="min-vh-100" aria-busy="true" />}>
          {/* Keyed by path so each new page replays the fade-in */}
          <div key={pathname} className={hasNavigated ? 'page-transition' : undefined}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
