/**
 * script.js — PesulapSkripsi
 * Scroll reveal untuk kartu layanan + smooth scroll.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
     1. SCROLL REVEAL — Service Cards
     Kartu muncul bertahap (staggered) saat masuk viewport.
  ------------------------------------------------------------------ */
  const cards = document.querySelectorAll(".service-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    // Fallback untuk browser lama
    cards.forEach((card) => card.classList.add("visible"));
  }

  /* ------------------------------------------------------------------
     2. SMOOTH SCROLL — Anchor links
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
