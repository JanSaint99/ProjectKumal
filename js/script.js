/**
 * script.js — PesulapSkripsi
 * 1. Scroll reveal — service cards
 * 2. Smooth scroll — anchor links
 * 3. Modal system — open / close / keyboard
 * 4. Tab switching — di dalam modal
 * 5. Under Maintenance — Instagram PesulapSkripsi
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
     1. SCROLL REVEAL — Service Cards
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    cards.forEach((card) => observer.observe(card));
  } else {
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

  /* ------------------------------------------------------------------
     3. MODAL SYSTEM — Open / Close
  ------------------------------------------------------------------ */
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    // Aksesibilitas: fokus ke tombol close
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  };

  const closeModal = (modal) => {
    modal.classList.remove("active");
    // Hapus modal-open hanya jika tidak ada modal lain yang aktif
    if (!document.querySelector(".modal-overlay.active")) {
      document.body.classList.remove("modal-open");
    }
  };

  // Buka modal dari service card (klik tombol "Lihat Harga")
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
     4. TABS — Switching di dalam modal
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
     5. UNDER MAINTENANCE — Instagram PesulapSkripsi
     Intercept klik pada kartu dengan data-maintenance="true"
     dan tampilkan modal maintenance alih-alih membuka link.
  ------------------------------------------------------------------ */
  document.querySelectorAll('[data-maintenance="true"]').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("modal-maintenance");
    });
  });
});
