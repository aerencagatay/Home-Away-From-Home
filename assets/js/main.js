/* ============================================
   Main JS — Mobile menu & smooth interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  // Mobile menu toggle
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Open menu" : "Close menu"
      );
      nav.classList.toggle("is-open", !isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = !isOpen ? "hidden" : "";
    });

    // Close menu on nav link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Header background on scroll
  const header = document.querySelector(".header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Keyboard: close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
      menuBtn.focus();
    }
  });
});
