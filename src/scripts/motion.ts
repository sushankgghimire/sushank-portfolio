import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Pointer spotlight on cards. Cheap, and works regardless of motion preference.
document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
  card.addEventListener(
    'pointermove',
    (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
});

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const title = document.querySelector<HTMLElement>('[data-hero-title]');
  if (title) {
    const split = SplitText.create(title, { type: 'words,chars', charsClass: 'char', wordsClass: 'word' });
    gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.035,
      delay: 0.1,
    });
  }

  const intro = ['[data-hero-eyebrow]', '[data-hero-lede]', '[data-hero-status]', '[data-hero-cta]']
    .map((s) => document.querySelector(s))
    .filter(Boolean) as Element[];
  if (intro.length) {
    gsap.from(intro, { y: 22, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.4 });
  }
  const visual = document.querySelector('[data-hero-visual]');
  if (visual) gsap.from(visual, { scale: 0.94, opacity: 0, duration: 1.3, ease: 'power3.out', delay: 0.35 });

  // Scroll reveals for everything below the fold.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Count up metric values like "2x", "80%", "99.9%".
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const raw = el.textContent?.trim() ?? '';
    const m = raw.match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[1].replace(/,/g, ''));
    const suffix = m[2];
    const decimals = (m[1].split('.')[1] || '').length;
    const state = { v: 0 };
    gsap.to(state, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = state.v.toFixed(decimals) + suffix;
      },
      onComplete: () => {
        el.textContent = raw;
      },
    });
  });

  // Stacked case study cards: shrink and fade the ones already pinned behind.
  const cases = gsap.utils.toArray<HTMLElement>('[data-case]');
  if (cases.length > 1 && matchMedia('(min-width: 960px)').matches) {
    cases.forEach((card, i) => {
      const next = cases[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.96,
        opacity: 0.55,
        filter: 'blur(1px)',
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 20%', scrub: true },
      });
    });
  }

  // Magnetic buttons, pointer devices only.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3' });
      btn.addEventListener(
        'pointermove',
        (e) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
        },
        { passive: true },
      );
      btn.addEventListener('pointerleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
});
