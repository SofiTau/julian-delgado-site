document.addEventListener("DOMContentLoaded", () => {
  /* ---------- INTRO OVERLAY ---------- */
  const body = document.body;
  const introOverlay = document.getElementById("introOverlay");
  const introEnter = document.getElementById("introEnter");

  if (introOverlay && introEnter) {
    introEnter.addEventListener("click", () => {
      introOverlay.classList.add("hidden");
      body.classList.remove("intro-active");
      const video = introOverlay.querySelector("video");
      if (video) {
        video.pause();
      }
    });
  }

  /* ---------- NAV SECTIONS (solo index) ---------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  if (sections.length) {
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const sectionId = link.dataset.section;
        if (!sectionId) return; // en product pages se usan como links normales

        e.preventDefault();

        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

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
  }

  /* ---------- GALLERY VIEW TOGGLE ---------- */
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

  /* ---------- SINGLE VIEW LOGIC ---------- */
  const workCards = document.querySelectorAll(".work-card");
  const singleImage = document.getElementById("singleImage");
  const singleTitle = document.getElementById("singleTitle"); // puede no existir
  const singleText = document.getElementById("singleText");   // puede no existir
  const btnPrev = document.getElementById("singlePrev");
  const btnNext = document.getElementById("singleNext");

  const works = [];

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

    img.addEventListener("click", () => {
      currentIndex = index;
      updateSingleView();

      // activar botón de single view
      if (viewButtons.length) {
        viewButtons.forEach((b) => b.classList.remove("active"));
        const singleBtn = document.querySelector('.view-btn[data-view="single"]');
        if (singleBtn) singleBtn.classList.add("active");
      }

      // mostrar sólo single view
      if (gallerySingle && galleryGrid) {
        gallerySingle.classList.add("view-active");
        galleryGrid.classList.remove("view-active");
      }
    });
  });

  let currentIndex = 0;

  function updateSingleView() {
    // solo exige que haya works y que exista la imagen
    if (!works.length || !singleImage) return;
    const item = works[currentIndex];
    singleImage.src = item.src;

    // título y texto son opcionales
    if (singleTitle) singleTitle.textContent = item.title;
    if (singleText) singleText.textContent = item.text;
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
