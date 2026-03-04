/* ============================================================
   LENIS SMOOTH SCROLL
   Initialised first so all subsequent anchor handling uses it.
   ============================================================ */
let lenis;

if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function lenisRaf(time) {
    lenis.raf(time);
    requestAnimationFrame(lenisRaf);
  }
  requestAnimationFrame(lenisRaf);
}

/* Resolve nav height as a number for scroll offsets */
function getNavHeight() {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
    10
  ) || 70;
}

/* Smooth scroll all anchor links via Lenis when available */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -getNavHeight() });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   NAVIGATION — SCROLLED STATE
   ============================================================ */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ============================================================
   NAVIGATION — ACTIVE LINK ON SCROLL
   ============================================================ */
const navSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a');

if (navSections.length && navLinks.length) {
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  navSections.forEach(s => activeLinkObserver.observe(s));
}

/* ============================================================
   NAVIGATION — HAMBURGER TOGGLE (MOBILE)
   ============================================================ */
const navToggle = document.querySelector('.nav-toggle');
const navMenuEl = document.getElementById('primary-nav');

if (navToggle && navMenuEl) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenuEl.setAttribute('aria-hidden', String(expanded));
    navMenuEl.classList.toggle('open');
    navToggle.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navMenuEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenuEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navMenuEl.setAttribute('aria-hidden', 'true');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenuEl.classList.contains('open')) {
      navMenuEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navMenuEl.setAttribute('aria-hidden', 'true');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   EXPERIENCE TAB SWITCHER
   ============================================================ */
const expTabs   = document.querySelectorAll('.exp-tab');
const expPanels = document.querySelectorAll('.exp-panel');

if (expTabs.length) {
  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all
      expTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      expPanels.forEach(p => p.setAttribute('hidden', ''));

      // Activate selected
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.removeAttribute('hidden');
    });

    // Keyboard navigation: arrow keys cycle tabs
    tab.addEventListener('keydown', (e) => {
      const tabs = Array.from(expTabs);
      const idx  = tabs.indexOf(tab);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        tabs[(idx + 1) % tabs.length].focus();
        tabs[(idx + 1) % tabs.length].click();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        tabs[(idx - 1 + tabs.length) % tabs.length].click();
      }
    });
  });
}

/* ============================================================
   CARD SPOTLIGHT EFFECT
   ============================================================ */
document.querySelectorAll('.other-project-card, .research-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

/* ============================================================
   VIEW TRANSITIONS — PROJECT PAGE NAVIGATION
   Only runs on index.html (links starting with "projects/")
   ============================================================ */
if (document.startViewTransition) {
  document.querySelectorAll('a[href^="projects/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.href;
      document.startViewTransition(() => {
        window.location.href = href;
      });
    });
  });
}

/* View transitions back-link on project pages */
if (document.startViewTransition) {
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      const href = backLink.href;
      document.startViewTransition(() => {
        window.location.href = href;
      });
    });
  }
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
