import { useEffect } from 'react';

/**
 * Reveals elements marked with `data-reveal` as they scroll into view (docs/UI_UX_GUIDELINES.md §7).
 * Watches the given container for newly added elements too, because pages load lazily.
 * Does nothing when <html> lacks .reveal-ready (no IntersectionObserver, or reduced motion).
 *
 * @param {React.RefObject<HTMLElement>} containerRef Element to watch (the <main> region)
 */
export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !document.documentElement.classList.contains('reveal-ready')) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const observeNew = () =>
      container.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el));

    observeNew();
    const mo = new MutationObserver(observeNew);
    mo.observe(container, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [containerRef]);
}
