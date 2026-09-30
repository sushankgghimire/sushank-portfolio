// Fade sections in as they scroll into view. No animation library.
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && els.length) {
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
