(function () {
  const home = document.querySelector(".home-page");
  if (!home) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopCarousel = window.matchMedia("(min-width: 768px)");
  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const willOpen = !navLinks?.classList.contains("is-open");
    navLinks?.classList.toggle("is-open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
  });

  navLinks?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks?.classList.contains("is-open")) {
      closeMenu();
      menuButton?.focus();
    }
  });

  const showcase = document.querySelector(".launch-showcase");
  const viewport = showcase?.querySelector(".launch-viewport");
  const track = showcase?.querySelector(".launch-track");
  const slides = track ? Array.from(track.querySelectorAll(".launch-feature")) : [];
  const previousButton = showcase?.querySelector(".carousel-prev");
  const nextButton = showcase?.querySelector(".carousel-next");
  const toggleButton = showcase?.querySelector(".carousel-toggle");
  const status = showcase?.querySelector(".carousel-status");
  let activeIndex = 0;
  let autoAdvanceId = 0;
  let userPaused = false;
  let interactionPaused = false;

  const positionTrack = (instant) => {
    if (!track || !viewport || !desktopCarousel.matches || slides.length === 0) return;
    const slide = slides[activeIndex];
    const viewportWidth = viewport.getBoundingClientRect().width;
    const x = (viewportWidth / 2) - (slide.offsetLeft + slide.offsetWidth / 2);
    track.classList.toggle("is-resetting", Boolean(instant));
    track.style.setProperty("--track-x", `${x}px`);
    if (instant) requestAnimationFrame(() => track.classList.remove("is-resetting"));
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceId) window.clearInterval(autoAdvanceId);
    autoAdvanceId = 0;
  };

  const startAutoAdvance = () => {
    stopAutoAdvance();
    if (!desktopCarousel.matches || reducedMotion.matches || userPaused || interactionPaused || document.hidden) return;
    autoAdvanceId = window.setInterval(() => selectSlide(activeIndex + 1), 6000);
  };

  const selectSlide = (index, instant, announce = false) => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", desktopCarousel.matches && !isActive ? "true" : "false");
      slide.querySelectorAll("a, button").forEach((control) => {
        if (desktopCarousel.matches && !isActive) control.setAttribute("tabindex", "-1");
        else control.removeAttribute("tabindex");
      });
    });
    if (status) {
      status.setAttribute("aria-live", announce ? "polite" : "off");
      status.textContent = `${activeIndex + 1} of ${slides.length}`;
    }
    positionTrack(instant);

    if (!instant && window.gsap && !reducedMotion.matches) {
      const media = slides[activeIndex].querySelector(".launch-media");
      if (media) {
        window.gsap.fromTo(media, { opacity: .55, x: 18 }, { opacity: 1, x: 0, duration: .5, ease: "power3.out", overwrite: true });
      }
    }
  };

  const updateToggle = () => {
    if (!toggleButton) return;
    toggleButton.textContent = userPaused ? "Play" : "Pause";
    toggleButton.setAttribute("aria-pressed", String(userPaused));
  };

  const syncCarouselMode = () => {
    selectSlide(activeIndex, true);
    startAutoAdvance();
  };

  previousButton?.addEventListener("click", () => {
    selectSlide(activeIndex - 1, false, true);
    startAutoAdvance();
  });

  nextButton?.addEventListener("click", () => {
    selectSlide(activeIndex + 1, false, true);
    startAutoAdvance();
  });

  toggleButton?.addEventListener("click", () => {
    userPaused = !userPaused;
    updateToggle();
    startAutoAdvance();
  });

  showcase?.addEventListener("keydown", (event) => {
    if (!desktopCarousel.matches || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const focusWasInSlide = slides[activeIndex]?.contains(document.activeElement);
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    selectSlide(activeIndex + direction, false, true);
    if (focusWasInSlide) slides[activeIndex]?.querySelector("a, button")?.focus();
    startAutoAdvance();
  });

  showcase?.addEventListener("mouseenter", () => {
    interactionPaused = true;
    stopAutoAdvance();
  });

  showcase?.addEventListener("mouseleave", () => {
    interactionPaused = false;
    startAutoAdvance();
  });

  showcase?.addEventListener("focusin", () => {
    interactionPaused = true;
    stopAutoAdvance();
  });

  showcase?.addEventListener("focusout", (event) => {
    if (event.relatedTarget instanceof Node && showcase.contains(event.relatedTarget)) return;
    interactionPaused = false;
    startAutoAdvance();
  });

  document.addEventListener("visibilitychange", startAutoAdvance);
  window.addEventListener("resize", () => positionTrack(true));
  window.addEventListener("hashchange", () => {
    const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
    if (hashIndex >= 0) selectSlide(hashIndex, true);
  });
  desktopCarousel.addEventListener("change", syncCarouselMode);
  reducedMotion.addEventListener("change", startAutoAdvance);

  const initialHashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  if (initialHashIndex >= 0) activeIndex = initialHashIndex;
  updateToggle();
  syncCarouselMode();

  if (!window.gsap || reducedMotion.matches) return;

  window.gsap.registerPlugin(window.ScrollTrigger);
  const motionContext = window.gsap.context(() => {
    window.gsap.from(".home-header", {
      y: -18,
      opacity: 0,
      duration: .65,
      ease: "power3.out"
    });

    window.gsap.from(".hero-copy > *, .hero-art", {
      y: 28,
      opacity: 0,
      duration: .8,
      stagger: .08,
      ease: "power3.out",
      clearProps: "transform,opacity"
    });

    // Reels keep their CSS rotation, so only fade them in.
    window.gsap.from(".hero-reel", {
      opacity: 0,
      duration: .9,
      delay: .25,
      stagger: .12,
      ease: "power2.out",
      clearProps: "opacity"
    });

    [".bento", ".reel-row", ".project-grid", ".project-archive", ".about-section"].forEach((selector) => {
      const group = document.querySelector(selector);
      if (!group) return;
      const staggered = [".bento", ".reel-row", ".project-grid"].includes(selector);
      const children = staggered ? group.children : [group];
      window.gsap.from(children, {
        y: 24,
        opacity: 0,
        duration: .65,
        stagger: .055,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: group,
          start: "top 84%",
          once: true
        }
      });
    });
  }, home);

  window.addEventListener("pagehide", () => motionContext.revert(), { once: true });
})();
