(function () {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const revealEls = document.querySelectorAll("[data-reveal]");
  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setHeaderScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  if (navToggle && nav) {
    const burgerLabel = navToggle.closest(".burger");

    function setMenuOpen(open) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (burgerLabel) {
        burgerLabel.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
    }

    navToggle.addEventListener("change", () => {
      setMenuOpen(navToggle.checked);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
        setMenuOpen(false);
      });
    });
  }

  if (revealEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
