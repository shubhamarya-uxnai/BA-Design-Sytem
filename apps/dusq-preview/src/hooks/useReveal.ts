import { useEffect, useRef, useState } from 'react';

/**
 * One-shot IntersectionObserver scroll-reveal hook adapted from
 * /Users/shubhamaryasingh/Building/Portfolio redesign/references/portfolio-landing.html
 * Observes the container (if .rv) and any .rv descendants, adding .in once and unobserving.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.05,
  rootMargin = '0px 0px 40px 0px'
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === 'undefined') return;

    const targets: HTMLElement[] = [];
    if (root.classList.contains('rv')) targets.push(root);
    root.querySelectorAll<HTMLElement>('.rv').forEach((el) => targets.push(el));
    if (targets.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    // Immediately mark visible if already within or near viewport
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 250) {
        el.classList.add('in');
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => {
      if (!el.classList.contains('in')) {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * One-shot numeric count-up hook adapted from
 * /Users/shubhamaryasingh/Building/Portfolio redesign/framer-site/Framer Assets/framer/StatCounter.tsx
 * Uses IntersectionObserver (threshold: 0.4) + requestAnimationFrame cubic ease-out: 1 - Math.pow(1 - p, 3).
 * Respects prefers-reduced-motion: reduce by rendering endValue immediately.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  endValue: number,
  durationMs = 1100
) {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === 'undefined') return endValue;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return endValue;
    }
    return 0;
  });
  const ref = useRef<T | null>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setValue(endValue);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        obs.disconnect();

        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(Math.max(0, (t - t0) / durationMs), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(endValue * eased));
          if (p < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            rafRef.current = null;
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [endValue, durationMs]);

  return { ref, value };
}
