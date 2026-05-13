/**
 * script.js — PesulapSkripsi
 * 1. Sticky header dengan efek scroll
 * 2. Scroll reveal — service cards (staggered)
 * 3. Scroll reveal — elemen umum (.reveal-up) + footer
 * 4. Smooth scroll — anchor links
 * 5. Modal system — open / close / keyboard
 * 6. Tab switching — di dalam modal
 * 7. Under Maintenance — Instagram PesulapSkripsi
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
     1. STICKY HEADER — Tambah class .scrolled saat user scroll
  ------------------------------------------------------------------ */
  const header = document.querySelector(".header");

  const handleHeaderScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Jalankan sekali saat load (jika halaman sudah di-scroll)

  /* ------------------------------------------------------------------
     2. SCROLL REVEAL — Service Cards (staggered)
  ------------------------------------------------------------------ */
  const cards = document.querySelectorAll(".service-card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  if ("IntersectionObserver" in window) {
    cards.forEach((card) => cardObserver.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("visible"));
  }

  /* ------------------------------------------------------------------
     3. SCROLL REVEAL — Elemen umum (.reveal-up) + Footer
  ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll(".reveal-up, .footer");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* ------------------------------------------------------------------
     4. SMOOTH SCROLL — Anchor links
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

  /* ------------------------------------------------------------------
     5. MODAL SYSTEM — Open / Close
  ------------------------------------------------------------------ */
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  };

  const closeModal = (modal) => {
    modal.classList.remove("active");
    if (!document.querySelector(".modal-overlay.active")) {
      document.body.classList.remove("modal-open");
    }
  };

  // Buka modal dari tombol di service card
  document.querySelectorAll(".service-card[data-modal]").forEach((card) => {
    const btn = card.querySelector(".btn-lihat-harga");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(card.dataset.modal);
    });
  });

  // Tutup via tombol ×
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) closeModal(modal);
    });
  });

  // Tutup via klik backdrop
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Tutup via Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(closeModal);
    }
  });

  /* ------------------------------------------------------------------
     6. TABS — Switching di dalam modal
  ------------------------------------------------------------------ */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.dataset.tab;
      const modalBox = btn.closest(".modal-box");
      if (!modalBox) return;

      modalBox
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      modalBox
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = document.getElementById(targetTabId);
      if (targetTab) targetTab.classList.add("active");
    });
  });

  /* ------------------------------------------------------------------
     7. UNDER MAINTENANCE — Instagram PesulapSkripsi
  ------------------------------------------------------------------ */
  document.querySelectorAll('[data-maintenance="true"]').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("modal-maintenance");
    });
  });
});
