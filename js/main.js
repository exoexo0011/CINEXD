/* ==========================================================================
   CINEXD — Main JS
   - Navigation (scroll state, mobile toggle, active link)
   - Custom cursor (dot + ring with hover states)
   - WhatsApp link helper
   - FAQ accordion
   - Portfolio filter
   - Contact form mailto
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const updateScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    // Mobile toggle
    const toggle = document.querySelector('.nav-toggle');
    const mobile = document.querySelector('.nav-mobile');
    if (toggle && mobile) {
      const close = () => {
        toggle.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      };
      toggle.addEventListener('click', () => {
        const open = !toggle.classList.contains('open');
        toggle.classList.toggle('open', open);
        mobile.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });
    }

    // Active link by current page
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const file = href.split('/').pop();
      if (file === path || (path === '' && file === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFaq() {
    const items = document.querySelectorAll('.faq-question');
    items.forEach((q) => {
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', () => {
        const expanded = q.getAttribute('aria-expanded') === 'true';
        const answer = q.nextElementSibling;

        // Close siblings (single-open accordion)
        items.forEach((other) => {
          if (other !== q) {
            other.setAttribute('aria-expanded', 'false');
            const oa = other.nextElementSibling;
            if (oa) oa.style.maxHeight = '0px';
          }
        });

        q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (answer) {
          answer.style.maxHeight = expanded ? '0px' : answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Portfolio Filter ---------- */
  function initPortfolio() {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');
    const countEl = document.querySelector('.portfolio-count strong');
    const empty = document.querySelector('.portfolio-empty');
    if (!filters.length || !cards.length) return;

    const apply = (cat) => {
      let visible = 0;
      cards.forEach((c) => {
        const cardCat = c.dataset.category || 'all';
        const match = cat === 'all' || cardCat === cat;
        if (match) {
          c.dataset.hidden = 'false';
          c.style.display = '';
          visible++;
        } else {
          c.dataset.hidden = 'true';
          // brief delay so transition shows
          setTimeout(() => {
            if (c.dataset.hidden === 'true') c.style.display = 'none';
          }, 300);
        }
      });
      if (countEl) countEl.textContent = String(visible).padStart(2, '0');
      if (empty) empty.classList.toggle('visible', visible === 0);
    };

    filters.forEach((b) => {
      b.addEventListener('click', () => {
        filters.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        apply(b.dataset.filter || 'all');
      });
    });

    // Initial count
    if (countEl) countEl.textContent = String(cards.length).padStart(2, '0');
  }

  /* ---------- Contact Form (mailto) ---------- */
  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const subject = `New Project Inquiry — ${name || 'CINEXD'}`;
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n\n` +
        `Message:\n${message}\n\n— Sent via cinexd.com`;
      const target = form.dataset.email || 'hello@cinexd.com';
      const href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;

      // Optimistic confirmation
      const note = form.querySelector('.form-success');
      if (note) {
        note.style.display = 'block';
        setTimeout(() => { note.style.display = 'none'; }, 6000);
      }
    });
  }

  /* ---------- Smooth in-page anchors ---------- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      a.addEventListener('click', (e) => {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- Year stamp in footer ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initFaq();
    initPortfolio();
    initContactForm();
    initAnchors();
    initYear();
  });
})();
