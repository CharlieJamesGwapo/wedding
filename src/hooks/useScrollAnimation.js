import { useEffect, useRef } from 'react';

/**
 * Global scroll animation hook using Intersection Observer.
 * Automatically observes all elements with data-animate attribute
 * and adds 'visible' class when they scroll into view.
 *
 * Usage: call useScrollAnimation() in any page component.
 * Then add data-animate="fade-up|fade-left|fade-right|scale-in|fade-in" to elements.
 * Optionally add data-delay="0.1" for stagger delays (in seconds).
 */
const useScrollAnimation = (options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add('scroll-visible');
              }, delay * 1000);
            } else {
              entry.target.classList.add('scroll-visible');
            }
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);
};

export default useScrollAnimation;
