document.addEventListener("DOMContentLoaded", () => {
  /* ---------- RANDOMIZAR GALERÍA (mantener primera fija) ---------- */
  const galleryGrid = document.getElementById("galleryGrid");
  
  if (galleryGrid) {
    const workCards = Array.from(galleryGrid.querySelectorAll(".work-card"));
    
    if (workCards.length > 1) {
      // Guardar la primera card
      const firstCard = workCards[0];
      
      // Obtener el resto de las cards
      const remainingCards = workCards.slice(1);
      
      // Shuffle del resto (algoritmo Fisher-Yates)
      for (let i = remainingCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]];
      }
      
      // Limpiar la galería
      galleryGrid.innerHTML = '';
      
      // Agregar la primera card
      galleryGrid.appendChild(firstCard);
      
      // Agregar el resto shuffleadas
      remainingCards.forEach(card => galleryGrid.appendChild(card));
      
      // Actualizar los data-index
      const allCards = galleryGrid.querySelectorAll(".work-card");
      allCards.forEach((card, index) => {
        const img = card.querySelector("img");
        if (img) {
          img.setAttribute("data-index", index);
        }
      });
    }
  }

  /* ---------- REFERENCIAS BÁSICAS ---------- */
  const body = document.body;
  const introOverlay = document.getElementById("introOverlay");
  const introEnter = document.getElementById("introEnter");

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const hash = window.location.hash.replace("#", "");

  // guarda la posición del scroll de la grid para poder volver al mismo lugar
  let savedGridScroll = 0;

  /* ---------- NAV SECTIONS + HASH INICIAL (#home, #store, #about) ---------- */
  if (sections.length) {
    if (hash) {
      // activar sección según el hash
      sections.forEach((sec) => {
        if (sec.id === hash) {
          sec.classList.add("section-active");
        } else {
          sec.classList.remove("section-active");
        }
      });

      // activar link de navegación correspondiente
      navLinks.forEach((link) => {
        const sectionId = link.dataset.section;
        if (sectionId === hash) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // si entramos con hash, NO mostramos la intro
      if (introOverlay) {
        introOverlay.classList.add("hidden");
        body.classList.remove("intro-active");
        const video = introOverlay.querySelector("video");
        if (video) {
          video.pause();
        }
      }

      window.scrollTo({ top: 0 });
    } else {
      // si NO hay hash, esta es la visita "normal" → activamos la intro
      body.classList.add("intro-active");
    }

    // listeners de navegación (menú)
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

  /* ---------- INTRO OVERLAY (click en +) ---------- */
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

  /* ---------- GALLERY VIEW TOGGLE ---------- */
  const viewButtons = document.querySelectorAll(".view-btn");
  const gallerySingle = document.getElementById("gallerySingle");

  if (viewButtons.length && galleryGrid && gallerySingle) {
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;

        // si estamos saliendo de la grid, guardar dónde estaba el scroll
        const leavingGrid = galleryGrid.classList.contains("view-active");
        if (leavingGrid && view !== "grid") {
          savedGridScroll = window.scrollY;
        }

        viewButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (view === "grid") {
          galleryGrid.classList.add("view-active");
          gallerySingle.classList.remove("view-active");
          // volver al lugar donde estabas en la grid
          window.scrollTo({ top: savedGridScroll });
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
  let currentIndex = 0;

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
      // guardar la posición actual de la grid antes de abrir la foto
      if (galleryGrid && galleryGrid.classList.contains("view-active")) {
        savedGridScroll = window.scrollY;
      }

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

      // al abrir single view, subir al inicio
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

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
