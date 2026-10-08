(function () {
  const home = document.querySelector(".home-page");
  if (!home) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopCarousel = window.matchMedia("(min-width: 768px)");
  const ease = "cubic-bezier(.16, 1, .3, 1)";

  /* Menu */
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

  /* Current section in the nav */
  const sectionLinks = new Map(
    Array.from(navLinks?.querySelectorAll('a[href^="#"]') ?? []).map((link) => [link.getAttribute("href").slice(1), link])
  );
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link, id) => {
        if (id === entry.target.id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  // The hero has no nav link, so reaching it clears the current marker.
  ["top", ...sectionLinks.keys()].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  /* Creator rail: arrow buttons scroll one card; each disables at its end */
  const rail = document.querySelector(".rail");
  const railPrev = document.querySelector(".rail-prev");
  const railNext = document.querySelector(".rail-next");
  if (rail && railPrev && railNext) {
    const step = () => (rail.firstElementChild?.getBoundingClientRect().width ?? 320) + 20;
    railPrev.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: reducedMotion.matches ? "auto" : "smooth" }));
    railNext.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: reducedMotion.matches ? "auto" : "smooth" }));
    const edgeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const button = entry.target === rail.firstElementChild ? railPrev : railNext;
        button.disabled = entry.isIntersecting;
      });
    }, { root: rail, threshold: .95 });
    edgeObserver.observe(rail.firstElementChild);
    edgeObserver.observe(rail.lastElementChild);
  }

  /* Reel strip pause control (WCAG 2.2.2: moving content can be paused) */
  const marquee = document.querySelector(".marquee");
  const marqueeToggle = document.querySelector(".marquee-toggle");
  marqueeToggle?.addEventListener("click", () => {
    const paused = marquee?.classList.toggle("is-paused") ?? false;
    marqueeToggle.setAttribute("aria-pressed", String(paused));
    marqueeToggle.setAttribute("aria-label", paused ? "Play the reel strip" : "Pause the reel strip");
    marqueeToggle.querySelector(".ph")?.classList.replace(paused ? "ph-pause" : "ph-play", paused ? "ph-play" : "ph-pause");
  });

  /* Shipped carousel */
  const showcase = document.querySelector(".shipped");
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
    const x = (viewport.getBoundingClientRect().width / 2) - (slide.offsetLeft + slide.offsetWidth / 2);
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
  };

  const updateToggle = () => {
    if (!toggleButton) return;
    toggleButton.textContent = userPaused ? "Play" : "Pause";
    toggleButton.setAttribute("aria-pressed", String(userPaused));
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
    selectSlide(activeIndex + (event.key === "ArrowLeft" ? -1 : 1), false, true);
    if (focusWasInSlide) slides[activeIndex]?.querySelector("a, button")?.focus();
    startAutoAdvance();
  });

  const pauseForInteraction = (paused) => {
    interactionPaused = paused;
    if (paused) stopAutoAdvance();
    else startAutoAdvance();
  };
  showcase?.addEventListener("mouseenter", () => pauseForInteraction(true));
  showcase?.addEventListener("mouseleave", () => pauseForInteraction(false));
  showcase?.addEventListener("focusin", () => pauseForInteraction(true));
  showcase?.addEventListener("focusout", (event) => {
    if (event.relatedTarget instanceof Node && showcase.contains(event.relatedTarget)) return;
    pauseForInteraction(false);
  });

  document.addEventListener("visibilitychange", startAutoAdvance);
  window.addEventListener("resize", () => positionTrack(true));
  window.addEventListener("hashchange", () => {
    const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
    if (hashIndex >= 0) selectSlide(hashIndex, true);
  });
  desktopCarousel.addEventListener("change", () => {
    selectSlide(activeIndex, true);
    startAutoAdvance();
  });

  const initialHashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  if (initialHashIndex >= 0) activeIndex = initialHashIndex;
  updateToggle();
  selectSlide(activeIndex, true);
  startAutoAdvance();

  /*
    Motion. CSS always holds the final visible state; animations only use fill "backwards",
    so cancelling one (or a script failure) leaves content readable. Reveals run once, start
    just before a group enters, and skip groups already on screen at load.
  */
  const owned = new Set();
  let revealObserver = null;

  const play = (element, keyframes, options) => {
    const animation = element.animate(keyframes, { easing: ease, fill: "backwards", ...options });
    owned.add(animation);
    animation.finished.then(() => owned.delete(animation), () => owned.delete(animation));
  };

  const reveals = {
    rail: (group) => Array.from(group.children).slice(0, 4).forEach((card, index) =>
      play(card, [{ opacity: 0, transform: "translateX(64px)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: index * 60 })),
    track: (group) =>
      play(group, [{ opacity: 0, transform: "translateX(72px)" }, { opacity: 1, transform: "none" }], { duration: 750 }),
    mark: (group) =>
      play(group, [{ transform: "translateY(40%)" }, { transform: "none" }], { duration: 800 }),
  };

  const startMotion = () => {
    if (reducedMotion.matches || !("animate" in Element.prototype)) return;

    // Hero elements never start fully transparent, so the first paint counts toward LCP.
    play(document.querySelector(".hero-title"), [{ opacity: .15, transform: "translateY(32px)" }, { opacity: 1, transform: "none" }], { duration: 750 });
    document.querySelectorAll(".hero-foot > *").forEach((element, index) =>
      play(element, [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 550, delay: 160 + index * 80 }));
    document.querySelectorAll(".reel").forEach((reel, index) =>
      play(reel, [{ transform: "translateY(72px)" }, { transform: "none" }], { duration: 800, delay: 120 + index * 80 }));

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealObserver.unobserve(entry.target);
        reveals[entry.target.dataset.reveal]?.(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px 15% 0px" });

    document.querySelectorAll("[data-reveal]").forEach((group) => {
      if (group.getBoundingClientRect().top < window.innerHeight) return;
      revealObserver.observe(group);
    });
  };

  const stopMotion = () => {
    revealObserver?.disconnect();
    owned.forEach((animation) => animation.cancel());
    owned.clear();
  };

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) stopMotion();
    startAutoAdvance();
  });

  startMotion();
})();
