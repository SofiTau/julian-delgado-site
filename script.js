/* =========================================
   BLOQUEAR TODO HASTA QUE TERMINE EL INTRO
========================================= */

document.body.classList.add("pre-intro");

const introOverlay = document.getElementById("introOverlay");
const introEnter = document.getElementById("introEnter");

introEnter.addEventListener("click", () => {
  introOverlay.classList.add("hidden");
  document.body.classList.remove("pre-intro");
});

/* =========================================
   NAV ENTRE SECCIONES
========================================= */

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = link.getAttribute("data-section");

    navLinks.forEach(n => n.classList.remove("active"));
    link.classList.add("active");

    sections.forEach(sec => {
      if (sec.id === target) sec.classList.add("section-active");
      else sec.classList.remove("section-active");
    });

    window.scrollTo(0, 0);
  });
});

/* =========================================
   GRID VIEW ↔ SINGLE VIEW
========================================= */

const gridBtn = document.querySelector('[data-view="grid"]');
const singleBtn = document.querySelector('[data-view="single"]');

const galleryGrid = document.getElementById("galleryGrid");
const gallerySingle = document.getElementById("gallerySingle");

const singleImage = document.getElementById("singleImage");
const singleTitle = document.getElementById("singleTitle");
const singleText = document.getElementById("singleText");

let currentIndex = 0;

function activateGrid() {
  gridBtn.classList.add("active");
  singleBtn.classList.remove("active");

  galleryGrid.classList.add("view-active");
  gallerySingle.classList.remove("view-active");
}

function activateSingle() {
  singleBtn.classList.add("active");
  gridBtn.classList.remove("active");

  gallerySingle.classList.add("view-active");
  galleryGrid.classList.remove("view-active");
}

gridBtn.addEventListener("click", activateGrid);
singleBtn.addEventListener("click", activateSingle);

/* Click en una imagen del GRID → pasa a SINGLE */

const workCards = document.querySelectorAll(".work-card img");

workCards.forEach(img => {
  img.addEventListener("click", () => {
    currentIndex = Number(img.getAttribute("data-index"));
    updateSingleView();
    activateSingle();
  });
});

/* =========================================
   SINGLE VIEW - NAVEGACIÓN
========================================= */

function updateSingleView() {
  const card = workCards[currentIndex];

  singleImage.src = card.src;
  singleTitle.textContent = card.parentElement.querySelector("h2").textContent;
  singleText.textContent = card.parentElement.querySelector("p").textContent;
}

document.getElementById("singlePrev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + workCards.length) % workCards.length;
  updateSingleView();
});

document.getElementById("singleNext").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % workCards.length;
  updateSingleView();
});
