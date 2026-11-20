import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On navigation: scroll to the #hash target if present (e.g. /services#export),
 * otherwise to the top of the page (docs/TECHNICAL_ARCHITECTURE.md §5).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
