document.addEventListener("DOMContentLoaded", () => {
  /* ========== INTRO OVERLAY ========== */
  const body = document.body;
  const introOverlay = document.getElementById("introOverlay");
  const introEnter = document.getElementById("introEnter");

  // Mientras la intro está activa, el contenido principal puede estar oculto vía CSS usando .intro-active
  if (introOverlay && introEnter) {
    body.classList.add("intro-active");

    introEnter.addEventListener("click", () => {
      introOverlay.classList.add("hidden");
      const video = introOverlay.querySelector("video");
      if (video) {
        video.pause();
      }
      body.classList.remove("intro-active");
      body.classList.add("intro-finished");
    });
  }

  /* ========== NAV SECTIONS (INDEX) ========== */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const sectionId = link.dataset.section;
      // Si no tiene data-section (por ejemplo en páginas de producto), dejamos que navegue normal
      if (!sectionId) return;

      e.preventDefault();

      // Activar link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Mostrar sección correspondiente
      sections.forEach((sec) => {
        if (sec.id === sectionId) {
          sec.classList.add("section-active");
        } else {
          sec.classList.remove("section-active");
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ========== GALLERY VIEW TOGGLE (GRID / SINGLE) ========== */
  const viewButtons = document.querySelectorAll(".view-btn");
  const galleryGrid = document.getElementById("galleryGrid");
  const gallerySingle = document.getElementById("gallerySingle");

  if (viewButtons.length && galleryGrid && gallerySingle) {
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        viewButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (view === "grid") {
          galleryGrid.classList.add("view-active");
          gallerySingle.classList.remove("view-active");
        } else {
          gallerySingle.classList.add("view-active");
          galleryGrid.classList.remove("view-active");
        }
      });
    });
  }

  /* ========== SINGLE VIEW LOGIC (HOME) ========== */
  const workCards = document.querySelectorAll(".work-card");
  const singleImage = document.getElementById("singleImage");
  const singleTitle = document.getElementById("singleTitle");
  const singleText = document.getElementById("singleText");
  const btnPrev = document.getElementById("singlePrev");
  const btnNext = document.getElementById("singleNext");

  const works = [];

  if (workCards.length && singleImage && singleTitle && singleText) {
    workCards.forEach((card, index) => {
      const img = card.querySelector("img");
      const title = card.querySelector("h2");
      const text = card.querySelector("p");

      if (!img) return;

      works.push({
        src: img.getAttribute("src"),
        title: title ? title.textContent : "",
        text: text ? text.textContent : "",
      });

      // Click en imagen de la grilla → ir a single view en esa foto
      img.addEventListener("click", () => {
        currentIndex = index;
        updateSingleView();

        // activar botón de single
        if (viewButtons.length && galleryGrid && gallerySingle) {
          viewButtons.forEach((b) => b.classList.remove("active"));
          const singleBtn = document.querySelector('.view-btn[data-view="single"]');
          if (singleBtn) singleBtn.classList.add("active");

          gallerySingle.classList.add("view-active");
          galleryGrid.classList.remove("view-active");
        }
      });
    });
  }

  let currentIndex = 0;

  function updateSingleView() {
    if (!works.length) return;
    const item = works[currentIndex];
    singleImage.src = item.src;
    singleTitle.textContent = item.title;
    singleText.textContent = item.text;
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (!works.length) return;
      currentIndex = (currentIndex - 1 + works.length) % works.length;
      updateSingleView();
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (!works.length) return;
      currentIndex = (currentIndex + 1) % works.length;
      updateSingleView();
    });
  }

  if (works.length) {
    updateSingleView();
  }
});
