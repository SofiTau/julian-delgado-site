document.addEventListener("DOMContentLoaded", () => {
  /* ---------- INTRO OVERLAY ---------- */
  const introOverlay = document.getElementById("introOverlay");
  const introEnter = document.getElementById("introEnter");

  if (introOverlay && introEnter) {
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
      const sectionId = link.dataset.section;
      if (!sectionId) return; // en product pages no usamos data-section

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

  /* ---------- VIEW TOGGLE (GRID / SINGLE) ---------- */
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

  /* ---------- SINGLE VIEW DATA ---------- */
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

    if (!img) return;

    works.push({
      src: img.getAttribute("src"),
      title: title ? title.textContent : "",
      text: text ? text.textContent : "",
    });

    // click en imagen del grid → abre single view en esa imagen
    img.addEventListener("click", () => {
      currentIndex = index;
      updateSingleView();

      // cambiar toggle a "single"
      const singleBtn = document.querySelector('.view-btn[data-view="single"]');
      const gridBtn = document.querySelector('.view-btn[data-view="grid"]');

      if (singleBtn && gridBtn && galleryGrid && gallerySingle) {
        gridBtn.classList.remove("active");
        singleBtn.classList.add("active");
        gallerySingle.classList.add("view-active");
        galleryGrid.classList.remove("view-active");
      }
    });
  });

  let currentIndex = 0;

  function updateSingleView() {
    if (!works.length || !singleImage) return;
    const item = works[currentIndex];
    singleImage.src = item.src;
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
