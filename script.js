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

    img.addEventListener("click", () => {
      currentIndex = index;
      updateSingleView();

      viewButtons.forEach((b) => b.classList.remove("active"));
      const singleBtn = document.querySelector('.view-btn[data-view="single"]');
      if (singleBtn) singleBtn.classList.add("active");

      if (gallerySingle && galleryGrid) {
        gallerySingle.classList.add("view-active");
        galleryGrid.classList.remove("view-active");
      }
    });
  });

  let currentIndex = 0;

  function updateSingleView() {
    if (!works.length || !singleImage || !singleTitle || !singleText) return;
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
