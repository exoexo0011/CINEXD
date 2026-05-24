/* ==========================================================================
   CINEXD — Animations JS
   - Scroll-triggered reveal via IntersectionObserver
   - Parallax on hero background
   - Stagger groups
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-up, .reveal-fade');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => io.observe(el));
  }

  /* ---------- Stagger child reveals ---------- */
  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach((parent) => {
      const step = parseFloat(parent.dataset.stagger) || 0.08;
      const children = parent.children;
      Array.from(children).forEach((c, i) => {
        c.classList.add('reveal');
        c.style.setProperty('--reveal-delay', `${i * step}s`);
      });
    });
  }

  /* ---------- Hero parallax ---------- */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll('[data-parallax]');
    if (!targets.length) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      targets.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Counter (stats) ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) {
      counters.forEach((c) => {
        c.textContent = c.dataset.count || c.textContent;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const dur = 1600;
          const start = performance.now();
          const startVal = 0;

          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            const val = Math.round(startVal + (target - startVal) * ease);
            el.textContent = val;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initStagger();
    initReveal();
    initParallax();
    initCounters();
  });
})();
