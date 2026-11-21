import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll-reveal elements start 24px lower (styles/animations.css). Show the target
 * (and any reveal wrapper around it) at once, so the browser scrolls to its final position.
 */
function revealInstantly(target) {
  const wrappers = [];
  for (
    let el = target.closest('[data-reveal]');
    el;
    el = el.parentElement?.closest('[data-reveal]')
  ) {
    wrappers.push(el);
  }
  wrappers.forEach((el) => {
    el.style.transition = 'none';
    el.classList.add('is-revealed');
  });
  if (wrappers.length) {
    void target.offsetHeight; // apply the new position before measuring
    requestAnimationFrame(() => wrappers.forEach((el) => (el.style.transition = '')));
  }
}

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
      // Jump (not smooth-scroll) to the top on a page change; the new page fades in instead.
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const deadline = performance.now() + 3000;
    let frame;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        revealInstantly(target);
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
