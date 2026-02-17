import { useEffect, useRef } from 'react';

/**
 * Enhanced scroll animation hook using Intersection Observer.
 * Automatically observes all elements with data-animate attribute
 * and adds 'scroll-visible' class when they scroll into view.
 *
 * Supported animations:
 *   data-animate="fade-up|fade-down|fade-left|fade-right|scale-in|fade-in|zoom-in|slide-up
 *                 |blur-in|rotate-in|flip-up|bounce-in|swing-in|float-up|reveal-up
 *                 |slide-in-left|slide-in-right|tilt-in|pop-in|drift-up"
 *   data-delay="0.1" (stagger delay in seconds)
 *   data-duration="1.2" (custom duration in seconds)
 */
const useScrollAnimation = (options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.08, rootMargin = '0px 0px -40px 0px' } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay) || 0;
            const duration = entry.target.dataset.duration;

            // Apply custom duration if specified
            if (duration) {
              entry.target.style.transitionDuration = `${duration}s`;
            }

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

    // Small delay to ensure DOM is ready after render
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        observerRef.current?.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);
};

export default useScrollAnimation;
