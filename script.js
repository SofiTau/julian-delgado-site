document.addEventListener("DOMContentLoaded", () => {
  /* ---------- INTRO OVERLAY ---------- */
  const introOverlay = document.getElementById("introOverlay");
  const introEnter = document.getElementById("introEnter");

  if (introEnter && introOverlay) {
    introEnter.addEventListener("click", () => {
      introOverlay.classList.add("hidden");
      const video = introOverlay.querySelector("video");
      if (video) {
        video.pause();
      }
    });
  }

  /* ---------- NAV SECTIONS ---------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // solo manejar si tiene data-section (en index)
      const sectionId = link.dataset.section;
      if (!sectionId) return;

      e.preventDefault();

      // activar link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // mostrar sección
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

  /* ---------- GALLERY VIEW TOGGLE ---------- */
  const viewButtons = document.querySelectorAll(".view-btn");
  const galleryGrid = document.getElementById("galleryGrid");
  const gallerySingle = document.getElementById("gallerySingle");

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

  /* ---------- SINGLE VIEW LOGIC ---------- */
  const workCards = document.querySelectorAll(".work-card");
  const singleImage = document.getElementById("singleImage");
  const singleTitle = document.getElementById("singleTitle");
  const singleText = document.getElementById("singleText");
  const btnPrev = document.getElementById("singlePrev");
  const btnNext = document.getElementById("singleNext");

  const works = [];

  workCards.forEach((card, index) => {
    const img = card.querySelector("img");
    const title = card.querySelector("h2");
    const text = card.querySelector("p");

    works.push({
      src: img.getAttribute("src"),
      title: title ? title.textContent : "",
      text: text ? text.textContent : "",
    });

    // clic en imagen de grid → pasa a single view en esa foto
    img.addEventListener("click", () => {
      currentIndex = index;
      updateSingleView();

      viewButtons.forEach((b) => b.classList.remove("active"));
      const singleBtn = document.querySelector('.view-btn[data-view="single"]');
      if (singleBtn) singleBtn.classList.add("active");

      gallerySingle.classList.add("view-active");
      galleryGrid.classList.remove("view-active");
    });
  });

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
