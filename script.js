/* ============================================================
   ANIMACIONES FADE-IN
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* Fade-in */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));


  /* ============================================================
     LIGHTBOX
  ============================================================ */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".mockup-img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }


  /* ============================================================
     MODAL "Qué incluye"
  ============================================================ */
  const modal = document.getElementById("included-modal");
  const openBtn = document.getElementById("open-included-modal");
  const closeBtn = document.getElementById("close-included-modal");

  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }


  /* ============================================================
     SLIDER MOCKUPS — APPLE STYLE
  ============================================================ */

  const slider = document.querySelector(".mockup-slider");
  const viewport = document.querySelector(".mockup-viewport");
  const slides = Array.from(document.querySelectorAll(".mockup-slide"));
  const prev = document.getElementById("mockup-prev");
  const next = document.getElementById("mockup-next");
  const dotsContainer = document.getElementById("mockup-dots");

  if (slider && viewport && slides.length && prev && next && dotsContainer) {

    let currentIndex = 0;

    /* -----------------------------
       Crear dots dinámicos
    ------------------------------*/
    const dots = slides.map((_, index) => {
      const dot = document.createElement("span");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });


    /* ============================================================
       FUNCIÓN CRÍTICA — Centrado perfecto estilo Apple
    ============================================================ */
    function updateSlider() {
      const active = slides[currentIndex];

      // Activar slide visible
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
      });

      // Cálculo del centrado perfecto
      const viewportWidth = viewport.clientWidth;
      const slideCenter = active.offsetLeft + active.offsetWidth / 2;
      const offset = viewportWidth / 2 - slideCenter;

      slider.style.transform = `translateX(${offset}px)`;

      // Actualizar dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }


    /* Navegación */
    prev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });


    /* Recalcular cuando cargan las imágenes o cambia el tamaño */
    window.addEventListener("load", () => setTimeout(updateSlider, 50));
    window.addEventListener("resize", () => updateSlider());

  }

});