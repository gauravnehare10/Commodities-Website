import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On navigation: scroll to the #hash target if present (e.g. /services#export),
 * otherwise to the top of the page (docs/TECHNICAL_ARCHITECTURE.md §5).
 *
 * Pages are lazy-loaded, so a #hash target may not exist yet when the URL changes.
 * In that case keep looking on each animation frame for up to 3 seconds.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const deadline = performance.now() + 3000;
    let frame;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
      } else if (performance.now() < deadline) {
        frame = requestAnimationFrame(tryScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };
    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
