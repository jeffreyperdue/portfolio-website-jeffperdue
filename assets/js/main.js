(() => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  if (header) {
    const updateHeaderShadow = () => {
      const scrolled = window.scrollY > 8;
      header.classList.toggle("site-header--scrolled", scrolled);
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("is-open", !isExpanded);
    });

    navLinks.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === "A") {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      }
    });
  }

  const supportsSmoothScroll =
    "scrollBehavior" in document.documentElement.style;

  const handleAnchorClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLAnchorElement)) return;
    const href = target.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const top = section.getBoundingClientRect().top + window.scrollY - 72;

    if (supportsSmoothScroll && !prefersReducedMotion) {
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo(0, top);
    }

    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  };

  document.addEventListener("click", handleAnchorClick);

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      const href = backToTop.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      event.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (supportsSmoothScroll && !prefersReducedMotion) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  const navAnchors = document.querySelectorAll(
    "header .nav-links a[href^='#']"
  );
  const sections = Array.from(navAnchors)
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href) return null;
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (!section) return null;
      return { link, section };
    })
    .filter(Boolean);

  if (sections.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = sections.find((s) => s.section === entry.target);
          if (!match) return;
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove("is-active"));
            match.link.classList.add("is-active");
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((item) => observer.observe(item.section));
  }
})();

