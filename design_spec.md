# Portfolio Website — Complete Build Specification

**Owner**: Jeffrey Perdue  
**Deployment**: GitHub Pages (`jeffreyperdue.github.io`) — static site, no server-side processing  
**Stack**: Vanilla HTML / CSS / JavaScript — no build tools, no frameworks; one CDN library (Lenis, ~4KB)  
**Last Updated**: March 2026

> **How to use this document**: This is a complete build blueprint. Every section defines exact visual tokens, HTML structure, content strings, and behavior. An implementer should be able to produce a finished, production-ready site by following this document alone, without making any design decisions or guessing at content.

---

## Table of Contents

1. [File Structure](#1-file-structure)
2. [Design System](#2-design-system)
3. [Global Patterns](#3-global-patterns)
4. [Navigation](#4-navigation)
5. [Hero Section](#5-hero-section)
6. [Section 01 — About](#6-section-01--about)
7. [Section 02 — Experience](#7-section-02--experience)
8. [Section 03 — Projects](#8-section-03--projects)
9. [Section 04 — Research](#9-section-04--research)
10. [Section 05 — Contact](#10-section-05--contact)
11. [Footer](#11-footer)
12. [Individual Project Pages](#12-individual-project-pages)
13. [Responsive Behavior](#13-responsive-behavior)
14. [Animations & Transitions](#14-animations--transitions)
15. [Accessibility Requirements](#15-accessibility-requirements)
16. [Performance Requirements](#16-performance-requirements)
17. [SEO & Meta Tags](#17-seo--meta-tags)
18. [Asset Checklist](#18-asset-checklist)
19. [Pre-Launch Checklist](#19-pre-launch-checklist)

---

## 1. File Structure

```
portfolio-website-jeffperdue/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── profile.webp          (headshot, ~280×280px min, 2× resolution, <150KB)
│       ├── og-preview.png        (1200×630px Open Graph image)
│       ├── stressspec-preview.webp    (project screenshot, <150KB)
│       ├── petfolio-preview.webp      (project screenshot, <150KB)
│       └── nomnomafe-preview.webp     (project screenshot, <150KB)
├── projects/
│   ├── stressspec.html
│   ├── petfolio.html
│   ├── requirements-ai-research.html
│   ├── nomnomafe.html
│   └── stillcold.html
├── resume.pdf                    (linked from nav Resume button)
└── design_spec.md
```

All paths are relative to the repo root. No subdirectory prefixes needed for GitHub Pages if the repo is named `jeffreyperdue.github.io`.

---

## 2. Design System

### 2.1 Color Tokens

Define all colors as CSS custom properties on `:root`. Use these variable names exactly in all CSS — never hardcode hex values.

```css
:root {
  --color-bg:           #0F172A;   /* page background — deep slate navy */
  --color-surface:      #1E293B;   /* card / panel background */
  --color-surface-hover:#263448;   /* card hover state */
  --color-border:       #334155;   /* dividers, card borders */
  --color-text:         #F1F5F9;   /* primary body text */
  --color-muted:        #94A3B8;   /* secondary text, labels, dates */
  --color-accent:       #38BDF8;   /* sky blue — primary accent */
  --color-accent-hover: #7DD3FC;   /* accent hover / focus */
  --color-tag-bg:       #0D2137;   /* tech tag background */
  --color-tag-text:     #38BDF8;   /* tech tag text */
  --color-nav-bg:       transparent; /* nav starts transparent */
  --color-nav-scrolled: #0F172A;   /* nav background after 50px scroll */
  --color-status:       #4ADE80;   /* "open to work" green badge */
}
```

### 2.2 Typography Tokens

Load from Google Fonts. Add this `<link>` in every HTML `<head>` before the stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Lenis smooth scroll CDN** — add this `<script>` tag at the end of `<body>` in every HTML file, before `main.js`:

```html
<script src="https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.1.14/bundled/lenis.min.js"></script>
```

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px — base */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-hero: clamp(2.5rem, 6vw, 4.5rem); /* 40–72px, fluid */

  --leading-tight:  1.25;
  --leading-normal: 1.6;

  --weight-normal:  400;
  --weight-medium:  500;
  --weight-semibold:600;
}
```

**Usage rules:**
- Body text: `var(--font-sans)`, `var(--text-base)`, `var(--leading-normal)`
- Section number prefixes (`01.`, `02.`): `var(--font-mono)`, `var(--text-sm)`, `var(--color-accent)`
- Tech tags: `var(--font-mono)`, `var(--text-xs)`
- H1 (hero): `var(--text-hero)`, `var(--weight-semibold)`, `var(--leading-tight)`
- H2 (section headings): `var(--text-3xl)`, `var(--weight-semibold)`
- H3 (card titles): `var(--text-xl)`, `var(--weight-semibold)`

### 2.3 Spacing Tokens

```css
:root {
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */

  --section-padding-y:        6.25rem; /* 100px desktop */
  --section-padding-y-mobile: 3.75rem; /* 60px mobile */
  --content-max-width:        1100px;
  --nav-height:               70px;
}
```

### 2.4 Component Tokens

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;

  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.5);

  --transition-fast:   150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow:   600ms ease;

  --border-width: 1px;
  --border: var(--border-width) solid var(--color-border);
}
```

---

## 3. Global Patterns

### 3.1 Base Styles

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* scroll-behavior: smooth is intentionally omitted — Lenis owns smooth scrolling (see §14.5) */
html { scroll-padding-top: var(--nav-height); }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* Prevent awkward single-word orphans on all headings */
h1, h2, h3, h4 { text-wrap: balance; }
```

### 3.2 Section Wrapper Pattern

Every section uses this wrapper:

```html
<section id="{id}" class="section" aria-labelledby="{id}-title">
  <div class="section-inner">
    <!-- content -->
  </div>
</section>
```

```css
.section {
  padding: var(--section-padding-y) 0;
}

.section-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}
```

### 3.3 Section Heading Pattern

Every numbered section (`01.` through `05.`) uses this heading structure:

```html
<p class="section-label">01.</p>
<h2 id="about-title" class="section-title">About</h2>
<span class="section-line" aria-hidden="true"></span>
```

```css
.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-2);
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  white-space: nowrap;
}

.section-line {
  display: block;
  height: 1px;
  background: var(--color-border);
  flex: 1;
  max-width: 300px;
}
```

### 3.4 Tech Tag Pattern

Used on project cards, experience entries, and research entries:

```html
<ul class="tag-list" aria-label="Technologies used">
  <li>Python</li>
  <li>FastAPI</li>
</ul>
```

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
}

.tag-list li {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-tag-text);
  background: var(--color-tag-bg);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid rgba(56, 189, 248, 0.2);
}
```

### 3.5 Button Patterns

```html
<!-- Primary button -->
<a class="btn btn-primary" href="#projects">See My Work</a>

<!-- Outlined button -->
<a class="btn btn-outline" href="#contact">Get in Touch</a>

<!-- Nav Resume button -->
<a class="btn btn-resume" href="resume.pdf" target="_blank" rel="noopener">Resume</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  font-family: var(--font-mono);
  letter-spacing: 0.03em;
  transition: var(--transition-normal);
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-bg);
  border: 1px solid var(--color-accent);
}
.btn-primary:hover { background: var(--color-accent-hover); border-color: var(--color-accent-hover); }

.btn-outline {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}
.btn-outline:hover { background: rgba(56, 189, 248, 0.08); }

.btn-resume {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}
.btn-resume:hover { background: rgba(56, 189, 248, 0.08); }
```

### 3.6 Skip Link

First child of `<body>`:

```html
<a href="#main-content" class="skip-link">Skip to content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  background: var(--color-accent);
  color: var(--color-bg);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  z-index: 9999;
  font-weight: var(--weight-medium);
}
.skip-link:focus { top: var(--space-4); }
```

### 3.7 Scroll Reveal

All sections and featured project cards animate in on scroll. Apply `class="reveal"` to any element that should fade in:

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

In `main.js`:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### 3.8 Card Spotlight Effect

A mouse-tracking radial-gradient glow that follows the cursor over cards. Applied to `.other-project-card` and `.research-card`. Used by Linear, Vercel, and Raycast — the single most premium-feeling hover effect available in pure CSS/JS.

**CSS** — add to `.other-project-card` and `.research-card`:

```css
/* Cards must have position: relative (already set) */
.other-project-card,
.research-card {
  position: relative;
  overflow: hidden; /* contains the pseudo-element */
}

.other-project-card::before,
.research-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(56, 189, 248, 0.07),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
  z-index: 0;
}

.other-project-card:hover::before,
.research-card:hover::before {
  opacity: 1;
}

/* Ensure card content sits above the pseudo-element */
.other-project-card > *,
.research-card > * {
  position: relative;
  z-index: 1;
}
```

**JavaScript** — add to `main.js`:

```javascript
// Card spotlight: track mouse position per card
document.querySelectorAll('.other-project-card, .research-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});
```

**Accessibility note**: the `::before` pseudo-element uses `pointer-events: none` so it never interferes with click targets or keyboard focus.

---

## 4. Navigation

### 4.1 HTML Structure

```html
<header class="site-header" role="banner" id="top">
  <nav class="site-nav" aria-label="Primary navigation">
    <div class="nav-inner">
      <a href="#hero" class="nav-brand" aria-label="Jeffrey Perdue — home">
        Jeffrey Perdue
      </a>
      <button
        class="nav-toggle"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="primary-nav"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
      <div id="primary-nav" class="nav-menu" aria-hidden="true">
        <ol class="nav-links">
          <li><a href="#about"><span class="nav-num">01.</span>About</a></li>
          <li><a href="#experience"><span class="nav-num">02.</span>Experience</a></li>
          <li><a href="#projects"><span class="nav-num">03.</span>Projects</a></li>
          <li><a href="#research"><span class="nav-num">04.</span>Research</a></li>
          <li><a href="#contact"><span class="nav-num">05.</span>Contact</a></li>
        </ol>
        <a class="btn btn-resume" href="resume.pdf" target="_blank" rel="noopener">
          Resume
        </a>
      </div>
    </div>
  </nav>
</header>
```

### 4.2 CSS

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  background: var(--color-nav-bg);
  border-bottom: 1px solid transparent;
  transition: background var(--transition-normal), border-color var(--transition-normal);
}

.site-header.scrolled {
  background: var(--color-nav-scrolled);
  border-bottom-color: var(--color-border);
  backdrop-filter: blur(12px);
}

.nav-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-accent);
  letter-spacing: 0.05em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
}

.nav-links a {
  font-size: var(--text-sm);
  color: var(--color-text);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.nav-links a:hover { color: var(--color-accent); }
.nav-links a.active { color: var(--color-accent); }

.nav-num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
}

.nav-toggle { display: none; } /* shown only on mobile, see §13 */
```

### 4.3 JavaScript Behavior

```javascript
// Scrolled state
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Hamburger toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navMenuEl = document.getElementById('primary-nav');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenuEl.setAttribute('aria-hidden', String(expanded));
  navMenuEl.classList.toggle('open');
  navToggle.classList.toggle('open');
});
// Close menu on nav link click (mobile)
navMenuEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenuEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenuEl.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
  });
});
```

---

## 5. Hero Section

### 5.1 HTML Structure

```html
<section id="hero" class="hero" aria-label="Introduction">
  <div class="hero-inner">
    <div class="hero-text">
      <!-- Availability badge — visible signal for recruiters scanning the page -->
      <div class="status-badge" aria-label="Currently open to new opportunities">
        <span class="status-dot" aria-hidden="true"></span>
        <span class="status-text">Open to new opportunities</span>
      </div>
      <p class="hero-eyebrow">Hi, my name is</p>
      <h1 class="hero-name">Jeffrey Perdue.</h1>
      <p class="hero-tagline">
        I build reliable software systems at the intersection of backend services, enterprise data, and the people who depend on them.
      </p>
      <p class="hero-bio">
        I'm a software engineer and graduating senior at NKU (B.S. Applied Software Engineering · GPA 3.9 · May 2026), currently finishing an internship on the Kroger Technology team where I work across Spring Boot backend services, enterprise SQL data pipelines, and internal React tooling.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#projects">See My Work</a>
        <a class="btn btn-outline" href="#contact">Get in Touch</a>
      </div>
      <!-- Quick-scan social proof — recruiter reads this in under 5 seconds -->
      <ul class="hero-stats" aria-label="Key credentials">
        <li class="hero-stat">Kroger Technology</li>
        <li class="hero-stat">3.9 GPA</li>
        <li class="hero-stat">ISCAP 2025 Presenter</li>
        <li class="hero-stat">KCV Fellow</li>
      </ul>
    </div>
    <div class="hero-photo-wrap">
      <div class="hero-photo-bg" aria-hidden="true"></div>
      <img
        class="hero-photo"
        src="assets/img/profile.webp"
        alt="Portrait of Jeffrey Perdue"
        width="280"
        height="280"
      />
    </div>
  </div>
</section>
```

### 5.2 CSS

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
}

.hero-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-16);
  align-items: center;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.hero-name {
  font-size: var(--text-hero);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
}

.hero-tagline {
  font-size: var(--text-2xl);
  color: var(--color-muted);
  line-height: var(--leading-normal);
  max-width: 600px;
  margin-bottom: var(--space-6);
}

.hero-bio {
  font-size: var(--text-base);
  color: var(--color-muted);
  max-width: 520px;
  margin-bottom: var(--space-8);
  line-height: var(--leading-normal);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Availability badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  padding: var(--space-2) var(--space-3);
  background: rgba(74, 222, 128, 0.08);
  border: 1px solid rgba(74, 222, 128, 0.25);
  border-radius: var(--radius-full);
  width: fit-content;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-status);
  flex-shrink: 0;
  animation: status-pulse 2.5s ease infinite;
}

@keyframes status-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.45); }
  60%  { box-shadow: 0 0 0 7px rgba(74, 222, 128, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}

.status-text {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-status);
  letter-spacing: 0.02em;
}

/* Social proof stats strip */
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);
  list-style: none;
  padding: 0;
}

.hero-stat {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
}

/* Photo */
.hero-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.hero-photo {
  width: 280px;
  height: 280px;
  border-radius: var(--radius-full);
  object-fit: cover;
  position: relative;
  z-index: 1;
  border: 3px solid var(--color-accent);
  filter: grayscale(20%);
  transition: filter var(--transition-normal);
}
.hero-photo:hover { filter: grayscale(0%); }

/* Accent offset box behind photo */
.hero-photo-bg {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 280px;
  height: 280px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-accent);
  z-index: 0;
  transition: top var(--transition-normal), left var(--transition-normal);
}
.hero-photo-wrap:hover .hero-photo-bg { top: 10px; left: 10px; }
```

---

## 6. Section 01 — About

### 6.1 Content Strings

**Body paragraph 1** (what you do and why):
> I'm a software engineer who works across the stack — from Spring Boot microservices and enterprise data pipelines to React-based internal tooling. I'm most engaged when the work has clear operational stakes: building systems that people actually depend on, diagnosing failures before they escalate, and making complex workflows easier to reason about and maintain.

**Body paragraph 2** (positioning + what I'm looking for):
> I'm currently finishing my B.S. in Applied Software Engineering at Northern Kentucky University and wrapping up an internship at Kroger Technology, where I've worked on production-adjacent systems across Java, SQL, Azure Synapse, and Databricks. I'm looking for full-time roles starting mid-2026 on teams that value thoughtful design, observability, and iterative delivery — ideally at the intersection of backend services and data.

**"Currently working with" list** (6 items, right-side panel):
- Java & Spring Boot
- Python
- Azure Synapse / Databricks
- React & TypeScript
- SQL (SQL Server, window functions, CTEs)
- Git & Agile workflows

### 6.2 HTML Structure

```html
<section id="about" class="section" aria-labelledby="about-title">
  <div class="section-inner">
    <div class="section-header reveal">
      <p class="section-label">01.</p>
      <h2 id="about-title" class="section-title">
        About <span class="section-line" aria-hidden="true"></span>
      </h2>
    </div>
    <div class="about-grid reveal">
      <div class="about-text">
        <p>
          I'm a software engineer who works across the stack — from Spring Boot microservices and enterprise data pipelines to React-based internal tooling. I'm most engaged when the work has clear operational stakes: building systems that people actually depend on, diagnosing failures before they escalate, and making complex workflows easier to reason about and maintain.
        </p>
        <p>
          I'm currently finishing my B.S. in Applied Software Engineering at Northern Kentucky University and wrapping up an internship at Kroger Technology, where I've worked on production-adjacent systems across Java, SQL, Azure Synapse, and Databricks. I'm looking for full-time roles starting mid-2026 on teams that value thoughtful design, observability, and iterative delivery — ideally at the intersection of backend services and data.
        </p>
      </div>
      <div class="about-stack">
        <p class="about-stack-label">Currently working with:</p>
        <ul class="about-stack-list">
          <li>Java &amp; Spring Boot</li>
          <li>Python</li>
          <li>Azure Synapse / Databricks</li>
          <li>React &amp; TypeScript</li>
          <li>SQL (SQL Server, CTEs, window functions)</li>
          <li>Git &amp; Agile workflows</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

### 6.3 CSS

```css
.about-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-16);
  margin-top: var(--space-12);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-text p {
  color: var(--color-muted);
  line-height: var(--leading-normal);
}

.about-stack-label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.about-stack-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.about-stack-list li {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-muted);
  padding-left: var(--space-4);
  position: relative;
}

.about-stack-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}
```

---

## 7. Section 02 — Experience

### 7.1 Layout Pattern: Tab Switcher

Desktop: Two-column layout. Left column = company name tabs (stacked vertically). Right column = active job details panel. Clicking a tab updates the right panel without page reload. On mobile: tabs collapse to a horizontal scroll row above the panel.

### 7.2 Content Strings

#### Tab 1 — Kroger Technology (default active)

- **Role**: Software Engineering Intern
- **Company**: Kroger Technology — End-to-End Fresh
- **Date range**: August 2025 – April 2026
- **Location**: Blue Ash, OH

**Bullets (4):**
1. Contributed across backend services, frontend tools, and enterprise data platforms using Java Spring Boot, React, SQL, Azure Synapse, and Databricks to support production-adjacent systems.
2. Engineered a production-grade Spring Boot scheduler to monitor device telemetry gaps, query SQL Server for stale records, and dispatch OAuth2-authenticated email alerts with structured error handling and testable service design.
3. Designed version-aware SQL reconciliation logic using CTEs, window functions, and anti-join semantics to manage incremental purchase order loads, enforce soft-deactivation, and eliminate silent pipeline drift.
4. Designed and implemented a centralized internal mapping application as technical owner, standardizing temperature zone codes across distribution centers to enable consistent reporting and controlled business updates.

#### Tab 2 — KCV Innovation Fellowship

- **Role**: Fellow
- **Company**: Kentucky Commercialization Ventures
- **Date range**: Spring 2026
- **Location**: Lexington, KY

**Bullets (4):**
1. Selected for a cross-functional cohort focused on technology commercialization using the Time-to-Market framework.
2. Developing Market Attack Plans, conducting structured customer interviews, and assessing technology readiness levels.
3. Rotating as team lead across research phases, coordinating deliverables and pitch execution.
4. Designing commercialization strategies including IP positioning, revenue architecture, and ecosystem mapping.

#### Tab 3 — Costco Wholesale (de-emphasized)

- **Role**: Front End Supervisor
- **Company**: Costco Wholesale
- **Date range**: June 2020 – August 2025
- **Location**: Columbus, OH & Florence, KY

**Bullets (2):**
1. Led and coordinated 60+ employees in high-volume retail operations, overseeing staffing, training, and performance management.
2. Partnered with management to analyze operational data and implement process adjustments for a department generating over $180M in annual revenue.

### 7.3 HTML Structure

```html
<section id="experience" class="section" aria-labelledby="experience-title">
  <div class="section-inner">
    <div class="section-header reveal">
      <p class="section-label">02.</p>
      <h2 id="experience-title" class="section-title">
        Experience <span class="section-line" aria-hidden="true"></span>
      </h2>
    </div>
    <div class="experience-tabs reveal" role="tablist" aria-label="Experience entries">
      <div class="experience-tab-list">
        <button class="exp-tab active" role="tab" aria-selected="true"  aria-controls="exp-panel-kroger"    id="exp-tab-kroger">Kroger Technology</button>
        <button class="exp-tab"        role="tab" aria-selected="false" aria-controls="exp-panel-kcv"       id="exp-tab-kcv">KCV Fellowship</button>
        <button class="exp-tab"        role="tab" aria-selected="false" aria-controls="exp-panel-costco"    id="exp-tab-costco">Costco Wholesale</button>
      </div>

      <div class="experience-panels">

        <div id="exp-panel-kroger" class="exp-panel" role="tabpanel" aria-labelledby="exp-tab-kroger">
          <h3 class="exp-role">Software Engineering Intern <span class="exp-company">@ Kroger Technology</span></h3>
          <p class="exp-meta">August 2025 – April 2026 · Blue Ash, OH</p>
          <ul class="exp-bullets">
            <li>Contributed across backend services, frontend tools, and enterprise data platforms using Java Spring Boot, React, SQL, Azure Synapse, and Databricks to support production-adjacent systems.</li>
            <li>Engineered a production-grade Spring Boot scheduler to monitor device telemetry gaps, query SQL Server for stale records, and dispatch OAuth2-authenticated email alerts with structured error handling and testable service design.</li>
            <li>Designed version-aware SQL reconciliation logic using CTEs, window functions, and anti-join semantics to manage incremental purchase order loads, enforce soft-deactivation, and eliminate silent pipeline drift.</li>
            <li>Designed and implemented a centralized internal mapping application as technical owner, standardizing temperature zone codes across distribution centers to enable consistent reporting and controlled business updates.</li>
          </ul>
        </div>

        <div id="exp-panel-kcv" class="exp-panel" role="tabpanel" aria-labelledby="exp-tab-kcv" hidden>
          <h3 class="exp-role">Fellow <span class="exp-company">@ Kentucky Commercialization Ventures</span></h3>
          <p class="exp-meta">Spring 2026 · Lexington, KY</p>
          <ul class="exp-bullets">
            <li>Selected for a cross-functional cohort focused on technology commercialization using the Time-to-Market framework.</li>
            <li>Developing Market Attack Plans, conducting structured customer interviews, and assessing technology readiness levels.</li>
            <li>Rotating as team lead across research phases, coordinating deliverables and pitch execution.</li>
            <li>Designing commercialization strategies including IP positioning, revenue architecture, and ecosystem mapping.</li>
          </ul>
        </div>

        <div id="exp-panel-costco" class="exp-panel" role="tabpanel" aria-labelledby="exp-tab-costco" hidden>
          <h3 class="exp-role">Front End Supervisor <span class="exp-company">@ Costco Wholesale</span></h3>
          <p class="exp-meta">June 2020 – August 2025 · Columbus, OH &amp; Florence, KY</p>
          <ul class="exp-bullets">
            <li>Led and coordinated 60+ employees in high-volume retail operations, overseeing staffing, training, and performance management.</li>
            <li>Partnered with management to analyze operational data and implement process adjustments for a department generating over $180M in annual revenue.</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</section>
```

### 7.4 CSS

```css
.experience-tabs {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  margin-top: var(--space-12);
}

.experience-tab-list {
  display: flex;
  flex-direction: column;
  border-left: 2px solid var(--color-border);
}

.exp-tab {
  background: none;
  border: none;
  text-align: left;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-muted);
  cursor: pointer;
  transition: color var(--transition-fast), background var(--transition-fast);
  border-left: 2px solid transparent;
  margin-left: -2px;
  white-space: nowrap;
}
.exp-tab:hover { color: var(--color-accent); background: rgba(56, 189, 248, 0.05); }
.exp-tab.active {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
  background: rgba(56, 189, 248, 0.08);
}

.experience-panels { padding-left: var(--space-8); }

.exp-panel { display: block; }
.exp-panel[hidden] { display: none; }

.exp-role {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
  color: var(--color-text);
}
.exp-company { color: var(--color-accent); }

.exp-meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  margin-bottom: var(--space-6);
}

.exp-bullets {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  padding: 0;
}

.exp-bullets li {
  color: var(--color-muted);
  padding-left: var(--space-6);
  position: relative;
  line-height: var(--leading-normal);
}
.exp-bullets li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: var(--text-sm);
}
```

### 7.5 JavaScript Behavior

```javascript
const expTabs = document.querySelectorAll('.exp-tab');
const expPanels = document.querySelectorAll('.exp-panel');

expTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    expTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    expPanels.forEach(p => p.setAttribute('hidden', ''));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.getAttribute('aria-controls')).removeAttribute('hidden');
  });
});
```

---

## 8. Section 03 — Projects

### 8.1 Layout: Featured + Other

- **Featured projects** (3): full-width alternating rows. Odd rows: screenshot left, text right. Even rows: text left, screenshot right.
- **Other projects** (2): 2-column card grid with compact treatment.

### 8.2 Featured Project Content

#### Featured Project 1 — StressSpec

- **Number**: 01
- **Title**: StressSpec
- **Subtitle**: Requirements Risk Analysis Platform
- **Description**: A full-stack platform that stress-tests software requirements to surface structural ambiguity, scope gaps, and compliance risks before development begins. Built with a modular rule-based detection engine supporting 8 risk categories, a FastAPI web app with file upload and executive-summary reporting, and a CLI — both backed by a single unified analysis pipeline.
- **Tech tags**: Python, FastAPI, Jinja2, CLI, pytest
- **Links**: `projects/stressspec.html` (internal), GitHub (placeholder `#` until repo linked)
- **Screenshot**: `assets/img/stressspec-preview.webp` (use a dark placeholder `#1E293B` with centered label `StressSpec` in `var(--color-accent)` until real screenshot is available)

#### Featured Project 2 — Petfolio

- **Number**: 02
- **Title**: Petfolio
- **Subtitle**: Cross-Platform Pet Care App
- **Description**: A Flutter/Firebase app enabling coordinated pet care across multiple caregivers. Designed Firestore schemas and security rules to enforce structured ownership; implemented CRUD workflows, media handling, and Riverpod state management for testability. Integrated timezone-aware local notifications to prevent scheduling drift.
- **Tech tags**: Flutter, Dart, Firebase, Riverpod
- **Links**: `projects/petfolio.html`, GitHub (placeholder)
- **Screenshot**: `assets/img/petfolio-preview.webp` (placeholder same treatment as above)

#### Featured Project 3 — NomNom Safe

- **Number**: 03
- **Title**: NomNom Safe
- **Subtitle**: Allergen-Aware Menu System
- **Description**: A collaborative full-stack menu platform treating allergen signaling as safety-critical information rather than free-text description. Modeled explicit allergen attributes with role-based access controls, and aligned architecture with IEEE/ISO-inspired standards for traceability. Refactored MVP structure to isolate non-core features and improve long-term maintainability.
- **Tech tags**: React, Firebase, Express, Node.js
- **Links**: `projects/nomnomafe.html`, GitHub (placeholder)
- **Screenshot**: `assets/img/nomnomafe-preview.webp` (placeholder)

### 8.3 Other Projects Content

#### Other Project 1 — StillCold

- **Title**: StillCold
- **Description**: BLE-based embedded temperature monitoring system on ESP32-C6. Separates sensing (HTU21D over I²C) from wireless communication (custom BLE service), operating independently of Wi-Fi or cloud infrastructure.
- **Tech tags**: ESP32-C6, BLE, I²C, Embedded C/C++
- **Link**: `projects/stillcold.html`

#### Other Project 2 — Placeholder

- **Title**: Next Project
- **Description**: Reserved for upcoming work — currently exploring ideas in observability tooling and data pipeline development.
- **Tech tags**: Coming soon
- **No link** — card is non-interactive, styled with `opacity: 0.5`

### 8.4 HTML Structure

```html
<section id="projects" class="section" aria-labelledby="projects-title">
  <div class="section-inner">
    <div class="section-header reveal">
      <p class="section-label">03.</p>
      <h2 id="projects-title" class="section-title">
        Projects <span class="section-line" aria-hidden="true"></span>
      </h2>
      <p class="section-intro">A selection of things I've built.</p>
    </div>

    <!-- Featured projects -->
    <div class="featured-projects">

      <article class="featured-project reveal" aria-label="StressSpec project">
        <div class="featured-project-image">
          <a href="projects/stressspec.html" tabindex="-1" aria-hidden="true">
            <img src="assets/img/stressspec-preview.webp" alt="StressSpec interface screenshot" loading="lazy" width="600" height="375" />
          </a>
        </div>
        <div class="featured-project-content">
          <p class="featured-project-num">01.</p>
          <h3 class="featured-project-title">
            <a href="projects/stressspec.html">StressSpec</a>
          </h3>
          <p class="featured-project-subtitle">Requirements Risk Analysis Platform</p>
          <div class="featured-project-desc">
            <p>A full-stack platform that stress-tests software requirements to surface structural ambiguity, scope gaps, and compliance risks before development begins. Built with a modular rule-based detection engine supporting 8 risk categories, a FastAPI web app with file upload and executive-summary reporting, and a CLI — both backed by a single unified analysis pipeline.</p>
          </div>
          <ul class="tag-list" aria-label="Technologies used">
            <li>Python</li><li>FastAPI</li><li>Jinja2</li><li>CLI</li><li>pytest</li>
          </ul>
          <div class="featured-project-links">
            <a href="projects/stressspec.html" class="featured-link" aria-label="View StressSpec project details">
              <!-- External link icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <a href="#" class="featured-link" target="_blank" rel="noopener" aria-label="View StressSpec on GitHub">
              <!-- GitHub icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>
      </article>

      <!-- Featured Project 2 (reverse layout — add class "featured-project--reverse") -->
      <article class="featured-project featured-project--reverse reveal" aria-label="Petfolio project">
        <!-- Same structure as above, swapped grid columns via --reverse class -->
        <div class="featured-project-image">
          <a href="projects/petfolio.html" tabindex="-1" aria-hidden="true">
            <img src="assets/img/petfolio-preview.webp" alt="Petfolio app screenshot" loading="lazy" width="600" height="375" />
          </a>
        </div>
        <div class="featured-project-content">
          <p class="featured-project-num">02.</p>
          <h3 class="featured-project-title"><a href="projects/petfolio.html">Petfolio</a></h3>
          <p class="featured-project-subtitle">Cross-Platform Pet Care App</p>
          <div class="featured-project-desc">
            <p>A Flutter/Firebase app enabling coordinated pet care across multiple caregivers. Designed Firestore schemas and security rules to enforce structured ownership; implemented CRUD workflows, media handling, and Riverpod state management for testability. Integrated timezone-aware local notifications to prevent scheduling drift.</p>
          </div>
          <ul class="tag-list" aria-label="Technologies used">
            <li>Flutter</li><li>Dart</li><li>Firebase</li><li>Riverpod</li>
          </ul>
          <div class="featured-project-links">
            <a href="projects/petfolio.html" class="featured-link" aria-label="View Petfolio project details"><!-- external-link svg --></a>
            <a href="#" class="featured-link" target="_blank" rel="noopener" aria-label="View Petfolio on GitHub"><!-- github svg --></a>
          </div>
        </div>
      </article>

      <!-- Featured Project 3 (normal layout, no --reverse) -->
      <article class="featured-project reveal" aria-label="NomNom Safe project">
        <div class="featured-project-image">
          <a href="projects/nomnomafe.html" tabindex="-1" aria-hidden="true">
            <img src="assets/img/nomnomafe-preview.webp" alt="NomNom Safe interface screenshot" loading="lazy" width="600" height="375" />
          </a>
        </div>
        <div class="featured-project-content">
          <p class="featured-project-num">03.</p>
          <h3 class="featured-project-title"><a href="projects/nomnomafe.html">NomNom Safe</a></h3>
          <p class="featured-project-subtitle">Allergen-Aware Menu System</p>
          <div class="featured-project-desc">
            <p>A collaborative full-stack menu platform treating allergen signaling as safety-critical information rather than free-text description. Modeled explicit allergen attributes with role-based access controls, and aligned architecture with IEEE/ISO-inspired standards for traceability. Refactored MVP structure to isolate non-core features and improve long-term maintainability.</p>
          </div>
          <ul class="tag-list" aria-label="Technologies used">
            <li>React</li><li>Firebase</li><li>Express</li><li>Node.js</li>
          </ul>
          <div class="featured-project-links">
            <a href="projects/nomnomafe.html" class="featured-link" aria-label="View NomNom Safe project details"><!-- external-link svg --></a>
            <a href="#" class="featured-link" target="_blank" rel="noopener" aria-label="View NomNom Safe on GitHub"><!-- github svg --></a>
          </div>
        </div>
      </article>

    </div>

    <!-- Other projects grid -->
    <h3 class="other-projects-heading reveal">Other projects</h3>
    <div class="other-projects-grid">

      <article class="other-project-card reveal">
        <header class="other-project-header">
          <!-- Folder icon -->
          <svg class="other-project-folder" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <div class="other-project-links">
            <a href="projects/stillcold.html" aria-label="View StillCold project"><!-- external-link svg --></a>
          </div>
        </header>
        <h4 class="other-project-title">StillCold</h4>
        <p class="other-project-desc">BLE-based embedded temperature monitoring on ESP32-C6. Separates sensing from wireless communication, operating without Wi-Fi or cloud infrastructure.</p>
        <ul class="tag-list" aria-label="Technologies used">
          <li>ESP32-C6</li><li>BLE</li><li>I²C</li><li>Embedded C/C++</li>
        </ul>
      </article>

      <article class="other-project-card other-project-card--placeholder reveal" aria-label="Upcoming project placeholder">
        <header class="other-project-header">
          <svg class="other-project-folder" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </header>
        <h4 class="other-project-title">Next Project</h4>
        <p class="other-project-desc">Reserved for upcoming work — currently exploring ideas in observability tooling and data pipeline development.</p>
        <ul class="tag-list" aria-label="Technologies used">
          <li>Coming soon</li>
        </ul>
      </article>

    </div>
  </div>
</section>
```

### 8.5 CSS

```css
.section-intro {
  color: var(--color-muted);
  margin-top: var(--space-3);
  font-size: var(--text-base);
}

/* Featured projects */
.featured-projects {
  margin-top: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-32);
}

.featured-project {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
  position: relative;
}

.featured-project--reverse {
  direction: rtl; /* flip column order */
}
.featured-project--reverse > * {
  direction: ltr; /* restore text direction for children */
}

.featured-project-image {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  aspect-ratio: 16/10;
}
.featured-project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal), filter var(--transition-normal);
  filter: grayscale(30%) brightness(0.85);
}
.featured-project-image:hover img {
  transform: scale(1.03);
  filter: grayscale(0%) brightness(1);
}

.featured-project-num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  margin-bottom: var(--space-2);
}

.featured-project-title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-1);
}
.featured-project-title a {
  color: var(--color-text);
  transition: color var(--transition-fast);
}
.featured-project-title a:hover { color: var(--color-accent); }

.featured-project-subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-muted);
  margin-bottom: var(--space-4);
}

.featured-project-desc {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-card);
}
.featured-project-desc p {
  color: var(--color-muted);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.featured-project-links {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
}
.featured-link {
  color: var(--color-muted);
  transition: color var(--transition-fast);
}
.featured-link:hover { color: var(--color-accent); }

/* Other projects */
.other-projects-heading {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  text-align: center;
  margin-top: var(--space-32);
  margin-bottom: var(--space-8);
}

.other-projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.other-project-card {
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}
.other-project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-accent);
}
.other-project-card--placeholder {
  opacity: 0.5;
  pointer-events: none;
}

.other-project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-2);
}
.other-project-folder { color: var(--color-accent); }
.other-project-links { display: flex; gap: var(--space-3); }
.other-project-links a { color: var(--color-muted); transition: color var(--transition-fast); }
.other-project-links a:hover { color: var(--color-accent); }

.other-project-title {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
}

.other-project-desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: var(--leading-normal);
  flex: 1;
}
```

---

## 9. Section 04 — Research

### 9.1 Content Strings

#### Research Entry 1 — Requirements-Driven Development (lead entry)

- **Title**: Preserving Requirements-Driven Development in the Age of AI
- **Classification tag**: Undergraduate Research
- **Credential tag**: Featured Presenter, ISCAP Conference 2025
- **Bullets (3)**:
  1. Designed and executed an empirical comparison of requirements-driven versus prompt-only LLM development workflows, measuring structural integrity, maintainability, and traceability of AI-generated artifacts.
  2. Applied ISO/IEC 25010 quality attributes and IEEE 830 / ISO/IEC/IEEE 29148 standards as evaluation criteria across multiple LLM systems to assess consistency and long-term maintainability risk.
  3. Findings presented at the ISCAP Conference 2025; research demonstrates measurable quality degradation when structured requirements are omitted from AI-assisted development workflows.

#### Research Entry 2 — AI-Safe Ontology Engineering

- **Title**: AI-Safe Ontology Engineering for Structured Allergen Reasoning
- **Classification tag**: Undergraduate Research
- **Bullets (3)**:
  1. Designed a layered ontology framework to constrain LLM reasoning under uncertainty in safety-critical domains, reducing unjustified safety inferences.
  2. Developed a formal exposure-state model requiring positive structural evidence before permitting safety conclusions, directly addressing overconfident LLM outputs.
  3. Architected an abstraction pipeline (natural language → structured representation → RDF) to support collaborative ontology construction and experimental evaluation.

### 9.2 HTML Structure

```html
<section id="research" class="section" aria-labelledby="research-title">
  <div class="section-inner">
    <div class="section-header reveal">
      <p class="section-label">04.</p>
      <h2 id="research-title" class="section-title">
        Research <span class="section-line" aria-hidden="true"></span>
      </h2>
    </div>
    <div class="research-list">

      <article class="research-card reveal">
        <header class="research-card-header">
          <div class="research-tags">
            <span class="research-tag">Undergraduate Research</span>
            <span class="research-tag research-tag--highlight">Featured Presenter, ISCAP 2025</span>
          </div>
          <h3 class="research-title">Preserving Requirements-Driven Development in the Age of AI</h3>
        </header>
        <ul class="exp-bullets">
          <li>Designed and executed an empirical comparison of requirements-driven versus prompt-only LLM development workflows, measuring structural integrity, maintainability, and traceability of AI-generated artifacts.</li>
          <li>Applied ISO/IEC 25010 quality attributes and IEEE 830 / ISO/IEC/IEEE 29148 standards as evaluation criteria across multiple LLM systems to assess consistency and long-term maintainability risk.</li>
          <li>Findings presented at ISCAP Conference 2025; research demonstrates measurable quality degradation when structured requirements are omitted from AI-assisted development workflows.</li>
        </ul>
      </article>

      <article class="research-card reveal">
        <header class="research-card-header">
          <div class="research-tags">
            <span class="research-tag">Undergraduate Research</span>
          </div>
          <h3 class="research-title">AI-Safe Ontology Engineering for Structured Allergen Reasoning</h3>
        </header>
        <ul class="exp-bullets">
          <li>Designed a layered ontology framework to constrain LLM reasoning under uncertainty in safety-critical domains, reducing unjustified safety inferences.</li>
          <li>Developed a formal exposure-state model requiring positive structural evidence before permitting safety conclusions, directly addressing overconfident LLM outputs.</li>
          <li>Architected an abstraction pipeline (natural language → structured representation → RDF) to support collaborative ontology construction and experimental evaluation.</li>
        </ul>
      </article>

    </div>
  </div>
</section>
```

### 9.3 CSS

```css
.research-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: var(--space-12);
}

.research-card {
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}
.research-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-card);
}

.research-card-header {
  margin-bottom: var(--space-6);
}

.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.research-tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  background: rgba(255,255,255,0.05);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.research-tag--highlight {
  color: var(--color-accent);
  background: var(--color-tag-bg);
  border-color: rgba(56, 189, 248, 0.3);
}

.research-title {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  line-height: var(--leading-tight);
}
```

---

## 10. Section 05 — Contact

### 10.1 Content Strings

- **Heading**: What's Next?
- **Subheading**: Currently Open to Opportunities
- **Body**: I'm actively looking for full-time software engineering roles starting mid-2026. Whether you have an opportunity to discuss, a question about my work, or just want to say hi — my inbox is always open.
- **CTA button label**: Say Hello
- **CTA link**: `mailto:jeffrey.perdue@gmail.com`

### 10.2 HTML Structure

```html
<section id="contact" class="section section--contact" aria-labelledby="contact-title">
  <div class="section-inner">
    <div class="contact-content reveal">
      <p class="section-label">05.</p>
      <p class="contact-overline">Currently Open to Opportunities</p>
      <h2 id="contact-title" class="contact-heading">What's Next?</h2>
      <p class="contact-body">
        I'm actively looking for full-time software engineering roles starting mid-2026. Whether you have an opportunity to discuss, a question about my work, or just want to say hi — my inbox is always open.
      </p>
      <a href="mailto:jeffrey.perdue@gmail.com" class="btn btn-primary contact-cta">
        Say Hello
      </a>
      <div class="contact-social">
        <a href="https://linkedin.com/in/jeffperdue" target="_blank" rel="noopener" aria-label="LinkedIn profile" class="contact-social-link">
          <!-- LinkedIn SVG (filled) -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/jeffreyperdue" target="_blank" rel="noopener" aria-label="GitHub profile" class="contact-social-link">
          <!-- GitHub SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

### 10.3 CSS

```css
.section--contact {
  text-align: center;
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-overline {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.contact-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

.contact-body {
  color: var(--color-muted);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-8);
}

.contact-cta {
  font-size: var(--text-base);
  padding: var(--space-4) var(--space-8);
  margin-bottom: var(--space-8);
}

.contact-social {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
}

.contact-social-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-muted);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}
.contact-social-link:hover { color: var(--color-accent); }
```

---

## 11. Footer

### 11.1 HTML Structure

```html
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <p class="footer-copy">
      Designed &amp; Built by
      <a href="https://github.com/jeffreyperdue" target="_blank" rel="noopener">Jeffrey Perdue</a>
    </p>
    <p class="footer-year">© <span id="footer-year"></span></p>
  </div>
</footer>
```

In `main.js`:

```javascript
document.getElementById('footer-year').textContent = new Date().getFullYear();
```

### 11.2 CSS

```css
.site-footer {
  border-top: var(--border);
  padding: var(--space-6) 0;
}

.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copy {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
}
.footer-copy a {
  color: var(--color-accent);
  transition: color var(--transition-fast);
}
.footer-copy a:hover { color: var(--color-accent-hover); }

.footer-year {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
}
```

---

## 12. Individual Project Pages

All project pages live at `projects/{slug}.html` and share the same layout template. They do **not** need to be single-page-app style — they are standard HTML pages with the site nav and footer.

### 12.1 Required Page Sections (in order)

1. **Back link**: `← Back to all projects` (links to `../index.html#projects`)
2. **Hero block**: Project title, subtitle, tech tags, external links
3. **Overview**: 2–3 sentences — what it is and why it exists
4. **Problem**: The challenge or need that drove the project
5. **Approach**: How you thought through the solution (can use subheadings)
6. **Tech Stack**: Table or list of tools used and a one-line rationale for each
7. **Key Decisions & Tradeoffs**: At least 2 explicit tradeoff discussions
8. **What I Learned**: 2–4 honest reflections on growth and takeaways
9. **Links**: GitHub repo, live demo (if applicable)

### 12.2 Template HTML Shell

Each project page includes a **reading progress bar** — a thin accent-colored line at the top of the viewport that fills as the user scrolls. This is implemented with the CSS Scroll-Driven Animations API (pure CSS, zero JS). It serves a dual purpose: practical UX (shows how far through the page they are) and a subtle signal to any front-end-aware hiring manager that you use cutting-edge CSS APIs.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{Project Name} — Jeffrey Perdue</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <!-- Reading progress bar: sits above the nav, pure CSS Scroll-Driven Animation -->
  <div class="progress-bar" aria-hidden="true"></div>

  <!-- Same site-header / nav as index.html, with href paths prefixed with ../ -->
  <header class="site-header" role="banner" id="top"> ... </header>

  <main id="main-content" class="project-page">
    <div class="project-page-inner">
      <a href="../index.html#projects" class="back-link">
        ← Back to all projects
      </a>
      <article>
        <header class="project-page-header">
          <p class="project-page-overline">{Category — e.g. "Tool" or "App"}</p>
          <h1 class="project-page-title">{Project Name}</h1>
          <p class="project-page-subtitle">{Subtitle}</p>
          <ul class="tag-list" aria-label="Technologies used"> ... </ul>
          <div class="project-page-links"> ... </div>
        </header>

        <section class="project-section" aria-labelledby="overview">
          <h2 id="overview">Overview</h2>
          <p>...</p>
        </section>

        <section class="project-section" aria-labelledby="problem">
          <h2 id="problem">Problem</h2>
          <p>...</p>
        </section>

        <section class="project-section" aria-labelledby="approach">
          <h2 id="approach">Approach</h2>
          <p>...</p>
        </section>

        <section class="project-section" aria-labelledby="tech-stack">
          <h2 id="tech-stack">Tech Stack</h2>
          <!-- table or dl -->
        </section>

        <section class="project-section" aria-labelledby="tradeoffs">
          <h2 id="tradeoffs">Key Decisions &amp; Tradeoffs</h2>
          <p>...</p>
        </section>

        <section class="project-section" aria-labelledby="learnings">
          <h2 id="learnings">What I Learned</h2>
          <p>...</p>
        </section>
      </article>
    </div>
  </main>

  <footer class="site-footer" role="contentinfo"> ... </footer>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
```

### 12.3 Project Page CSS

```css
/* Reading progress bar — CSS Scroll-Driven Animations API */
@keyframes reading-progress {
  from { width: 0%; }
  to   { width: 100%; }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--color-accent);
  z-index: 2000; /* above the nav */
  animation: reading-progress linear;
  animation-timeline: scroll(root block);
  /* Fallback: bar is simply hidden in browsers that don't support scroll-timeline */
  width: 0%;
}

@supports not (animation-timeline: scroll()) {
  .progress-bar { display: none; }
}
```

```css
.project-page {
  padding-top: calc(var(--nav-height) + var(--space-16));
  padding-bottom: var(--space-32);
}

.project-page-inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-12);
  transition: gap var(--transition-fast);
  gap: var(--space-2);
}
.back-link:hover { gap: var(--space-3); }

.project-page-overline {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-3);
}

.project-page-title {
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
  line-height: var(--leading-tight);
}

.project-page-subtitle {
  font-size: var(--text-xl);
  color: var(--color-muted);
  margin-bottom: var(--space-6);
}

.project-page-links {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-6);
  margin-bottom: var(--space-16);
  padding-bottom: var(--space-8);
  border-bottom: var(--border);
}

.project-section {
  margin-bottom: var(--space-12);
}
.project-section h2 {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border);
}
.project-section p,
.project-section li {
  color: var(--color-muted);
  line-height: var(--leading-normal);
  font-size: var(--text-base);
}
.project-section ul, .project-section ol {
  padding-left: var(--space-6);
}
.project-section li { margin-bottom: var(--space-2); }
```

---

## 13. Responsive Behavior

### 13.1 Breakpoints

```css
/* All styles are desktop-first within sections but the base layout is mobile-tolerant */
/* Breakpoints: */
/* --bp-sm:  640px  */
/* --bp-md:  768px  */
/* --bp-lg:  1024px */
```

### 13.2 Navigation (mobile, < 768px)

```css
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    z-index: 1001;
  }
  .hamburger-bar {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
    transition: transform var(--transition-normal), opacity var(--transition-normal);
  }
  /* Animate hamburger to X when open */
  .nav-toggle.open .hamburger-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.open .hamburger-bar:nth-child(2) { opacity: 0; }
  .nav-toggle.open .hamburger-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .nav-menu {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-8);
    z-index: 1000;
  }
  .nav-menu.open {
    display: flex;
    aria-hidden: false;
  }
  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }
  .nav-links a { font-size: var(--text-xl); }
}
```

### 13.3 Hero (mobile, < 768px)

```css
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding: var(--space-12) var(--space-6);
  }
  .hero-photo-wrap {
    order: -1;
    margin: 0 auto var(--space-8);
  }
  .hero-photo, .hero-photo-bg {
    width: 200px;
    height: 200px;
  }
  .hero-tagline { max-width: 100%; }
  .hero-bio { max-width: 100%; }
  .hero-actions { justify-content: center; }
  .status-badge { margin: 0 auto var(--space-6); }
  .hero-stats { justify-content: center; }
}
```

### 13.4 About (mobile, < 768px)

```css
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
```

### 13.5 Experience (mobile, < 768px)

```css
@media (max-width: 768px) {
  .experience-tabs {
    grid-template-columns: 1fr;
  }
  .experience-tab-list {
    flex-direction: row;
    border-left: none;
    border-bottom: 2px solid var(--color-border);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .exp-tab {
    border-left: none;
    border-bottom: 2px solid transparent;
    margin-left: 0;
    margin-bottom: -2px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .exp-tab.active { border-bottom-color: var(--color-accent); }
  .experience-panels { padding-left: 0; padding-top: var(--space-8); }
}
```

### 13.6 Projects (mobile, < 768px)

```css
@media (max-width: 768px) {
  .featured-project,
  .featured-project--reverse {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: var(--space-6);
  }
  .featured-project-image { order: 0; }
  .featured-project-content { order: 1; }

  .other-projects-grid { grid-template-columns: 1fr; }
}
```

### 13.7 Projects (tablet, 768px–1024px)

```css
@media (min-width: 768px) and (max-width: 1024px) {
  .featured-project,
  .featured-project--reverse {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
}
```

### 13.8 General mobile adjustments

```css
@media (max-width: 640px) {
  .section { padding: var(--section-padding-y-mobile) 0; }
  .section-inner { padding: 0 var(--space-4); }
  .section-title { font-size: var(--text-2xl); }
}
```

---

## 14. Animations & Transitions

### 14.1 Scroll Reveal (defined in §3.7)

Apply `class="reveal"` to:
- Every `.section-header` div
- Every `.about-grid`
- Every `.experience-tabs`
- Every `.featured-project` article
- Every `.other-project-card` article
- Every `.research-card` article
- The `.contact-content` div

Do **not** apply to: navigation, hero (always visible), footer.

For staggered grid items (other project cards), add `style="transition-delay: {n * 100}ms"` inline — 0ms for the first card, 100ms for the second.

### 14.2 Hover Micro-interactions

All defined in §3.4 (tags), §3.5 (buttons), §8.5 (cards), §5.2 (hero photo). Summary:
- Cards: `translateY(-4px)` + shadow intensification
- Links: color shift to `var(--color-accent)`
- Buttons: background lightening
- Hero photo: grayscale removal
- Hero photo offset box: `top/left` reduction for parallax-adjacent feel
- Featured project images: `scale(1.03)` + grayscale removal on hover

### 14.3 Nav Transition

- On page load: nav background is transparent
- After scrolling 50px: background fades to `var(--color-nav-scrolled)`, bottom border fades in, `backdrop-filter: blur(12px)` applies
- Transition duration: `200ms ease`

### 14.4 No-Animation Preference

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  /* Disable status badge pulse */
  .status-dot { animation: none; }
  /* Hide progress bar (scroll-driven animation) */
  .progress-bar { display: none; }
}
```

### 14.5 Lenis Smooth Scroll

Lenis (~4KB gzipped) replaces the browser's native `scroll-behavior: smooth` with physics-based momentum scrolling. The result is an iOS-level scroll feel that makes the entire site feel more polished and intentional.

**Load order**: the Lenis `<script>` tag must appear before `main.js` in every HTML file:

```html
<!-- At the end of <body>, before main.js -->
<script src="https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.1.14/bundled/lenis.min.js"></script>
<script src="../assets/js/main.js" defer></script>
```

For `index.html`, the path for `main.js` is `assets/js/main.js` (no `../` prefix).

**Initialize in `main.js`** — place this before all other JS:

```javascript
// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// Make Lenis work with anchor hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) });
  });
});
```

**Graceful degradation**: if the CDN fails, the site scrolls normally (just without the smooth physics). No layout breakage.

### 14.6 View Transitions API

When navigating from `index.html` to a project page, the View Transitions API creates a smooth, cross-fade page transition instead of a hard cut. Progressive enhancement — browsers that don't support it navigate instantly as normal.

**Add to `main.js`** (index.html only):

```javascript
// View transitions for project page navigation
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
```

**CSS** — add to `styles.css`:

```css
/* View transition — cross-fade between pages */
@keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }

::view-transition-old(root) {
  animation: 200ms ease fade-out;
}
::view-transition-new(root) {
  animation: 300ms ease fade-in;
}
```

**On project pages** — the back link also benefits from a transition when returning to index:

```javascript
// On project pages: back link uses view transitions
if (document.startViewTransition) {
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      const href = backLink.href;
      document.startViewTransition(() => { window.location.href = href; });
    });
  }
}
```

### 14.7 Reading Progress Bar (Project Pages)

Defined in §12.2 and §12.3. Summary: a 3px accent-colored bar, `position: fixed; top: 0`, animated with `animation-timeline: scroll(root block)` — pure CSS, no JS. `z-index: 2000` ensures it sits above the sticky nav. Hidden via `@supports not` fallback in older browsers and suppressed with `prefers-reduced-motion`.

---

## 15. Accessibility Requirements

- **WCAG 2.1 AA** minimum compliance
- All interactive elements have visible focus indicators:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }
  ```
- All images have descriptive `alt` text. Decorative images use `alt=""` and `aria-hidden="true"`
- All icon-only links use `aria-label` with descriptive text
- Tab switcher uses full ARIA `role="tab"` / `role="tabpanel"` / `aria-selected` / `aria-controls` pattern
- Nav toggle uses `aria-expanded` and `aria-controls`
- Color contrast: all text/background pairs must meet **4.5:1** for body text, **3:1** for large text
  - `#F1F5F9` on `#0F172A` = 15.2:1 ✓
  - `#94A3B8` on `#0F172A` = 5.7:1 ✓
  - `#38BDF8` on `#0F172A` = 6.7:1 ✓
  - `#38BDF8` on `#1E293B` = 5.1:1 ✓
- Skip link present and functional
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- `lang="en"` on `<html>`
- `role="banner"` on `<header>`, `role="contentinfo"` on `<footer>`
- External links include `rel="noopener"` and open in `target="_blank"`
- Touch targets minimum **44×44px** on all interactive elements

---

## 16. Performance Requirements

- First Contentful Paint: < 1.5s
- Total page weight: < 2MB
- Images: all in **WebP** format, `loading="lazy"` on all below-fold images
- Hero profile photo: < 150KB at 2× resolution (560×560px), `loading="eager"`
- Project screenshots: < 150KB each
- No JavaScript frameworks — vanilla JS only
- One CDN script: Lenis `lenis.min.js` (~4KB gzipped) — loaded from `cdn.jsdelivr.net`
- Fonts loaded via Google Fonts with `display=swap`
- No third-party analytics scripts unless explicitly added later
- CSS and JS are single files each; no unnecessary imports
- Lenis CDN failure degrades gracefully to native scroll — no layout breakage

---

## 17. SEO & Meta Tags

In `index.html` `<head>`:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Jeffrey Perdue — Software Engineer</title>
<meta name="description" content="Portfolio of Jeffrey Perdue — software engineer building reliable backend systems, data pipelines, and internal tooling. NKU 2026, former Kroger Technology intern." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://jeffreyperdue.github.io" />
<meta property="og:title" content="Jeffrey Perdue — Software Engineer" />
<meta property="og:description" content="Software engineer building reliable backend systems, data pipelines, and internal tooling." />
<meta property="og:image" content="https://jeffreyperdue.github.io/assets/img/og-preview.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Jeffrey Perdue — Software Engineer" />
<meta name="twitter:description" content="Software engineer building reliable backend systems, data pipelines, and internal tooling." />
<meta name="twitter:image" content="https://jeffreyperdue.github.io/assets/img/og-preview.png" />

<!-- Canonical -->
<link rel="canonical" href="https://jeffreyperdue.github.io" />
```

---

## 18. Asset Checklist

| Asset | Path | Spec | Status |
|---|---|---|---|
| Profile headshot | `assets/img/profile.webp` | WebP, 560×560px, < 150KB | Needed |
| Open Graph image | `assets/img/og-preview.png` | PNG, 1200×630px | Needed |
| StressSpec screenshot | `assets/img/stressspec-preview.webp` | WebP, 1200×750px, < 150KB | Needed |
| Petfolio screenshot | `assets/img/petfolio-preview.webp` | WebP, 1200×750px, < 150KB | Needed |
| NomNom Safe screenshot | `assets/img/nomnomafe-preview.webp` | WebP, 1200×750px, < 150KB | Needed |
| Resume PDF | `resume.pdf` | Up-to-date, < 500KB | Needed |

**Placeholder instructions for screenshots**: Until real screenshots are available, render the `.featured-project-image` div with a solid `var(--color-surface)` background and a centered `<p>` containing the project name in `var(--color-muted)`. Use `aria-label` on the container to describe the placeholder.

---

## 19. Pre-Launch Checklist

- [ ] All images are WebP, optimized, and have descriptive alt text
- [ ] Resume PDF is current and links correctly from the nav
- [ ] All external links tested and open in new tabs with `rel="noopener"`
- [ ] Site is fully keyboard navigable (Tab, Enter, Escape for mobile menu)
- [ ] Tab switcher (Experience section) works correctly with keyboard
- [ ] Scroll reveal animations fire correctly on first scroll through
- [ ] `prefers-reduced-motion` disables all animations (reveal, pulse, progress bar)
- [ ] Nav active state tracks scroll position correctly
- [ ] Nav scrolled style triggers after 50px scroll
- [ ] Mobile layout tested on real device at 375px, 414px, 768px viewports
- [ ] Lighthouse scores: 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] Color contrast checked with WebAIM Contrast Checker for all text combinations
- [ ] Screen reader tested (NVDA, JAWS, or VoiceOver)
- [ ] `<title>` and meta description present on all pages
- [ ] GitHub Pages deployment verified at `jeffreyperdue.github.io`
- [ ] 404 behavior handled (GitHub Pages default or custom 404.html)
- [ ] Footer year updates dynamically
- [ ] No console errors on any page
- [ ] **Status badge** visible in hero with pulsing green dot; pulse stops with `prefers-reduced-motion`
- [ ] **Stats strip** visible below hero CTAs on all screen sizes
- [ ] **Lenis** smooth scroll active; anchor links scroll smoothly without jump; CDN failure tested (disable network, confirm no layout breakage)
- [ ] **Card spotlight** glow follows cursor on `.other-project-card` and `.research-card` elements
- [ ] **View Transitions** cross-fade fires when navigating to a project page (Chrome/Edge); other browsers navigate normally
- [ ] **Reading progress bar** fills correctly on all project pages; hidden in Firefox (no scroll-timeline support) without breakage; hidden with `prefers-reduced-motion`

---

*Every element of this site exists to do one of three things: build trust, demonstrate capability, or make contact easier. When in doubt, cut.*
