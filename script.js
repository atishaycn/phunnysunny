(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const launchShowcase = document.querySelector(".launch-showcase");
  const launchCards = launchShowcase ? Array.from(launchShowcase.querySelectorAll(".launch-feature")) : [];

  if (launchShowcase && launchCards.length > 0) {
    const launchTrack = launchShowcase.querySelector(".launch-track");
    const desktopCarousel = window.matchMedia("(min-width: 641px)");
    const firstClone = launchCards[0].cloneNode(true);
    const lastClone = launchCards[launchCards.length - 1].cloneNode(true);
    let activeSlide = 0;
    let trackIndex = 1;
    let autoAdvanceId = null;

    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");
    firstClone.classList.add("is-clone");
    lastClone.classList.add("is-clone");

    if (launchTrack) {
      launchTrack.prepend(lastClone);
      launchTrack.append(firstClone);
    }

    const getCardStep = () => {
      const activeCard = launchTrack?.querySelector(".launch-feature");
      return activeCard ? activeCard.getBoundingClientRect().width + 18 : 0;
    };

    const setVisualActiveCard = (index) => {
      const allTrackCards = launchTrack ? Array.from(launchTrack.querySelectorAll(".launch-feature")) : launchCards;
      allTrackCards.forEach((card) => card.classList.remove("is-active"));

      if (index === 0) {
        lastClone.classList.add("is-active");
      } else if (index === launchCards.length + 1) {
        firstClone.classList.add("is-active");
      } else {
        launchCards[index - 1]?.classList.add("is-active");
      }
    };

    const setTrackPosition = (index, instant = false) => {
      trackIndex = index;
      if (instant) {
        launchTrack?.classList.add("is-resetting");
      }

      setVisualActiveCard(trackIndex);
      launchShowcase.style.setProperty("--slide-offset", `${trackIndex * getCardStep()}px`);

      if (instant) {
        window.requestAnimationFrame(() => {
          launchTrack?.classList.remove("is-resetting");
        });
      }
    };

    const setActiveSlide = (index, instant = false) => {
      activeSlide = ((index % launchCards.length) + launchCards.length) % launchCards.length;
      launchShowcase.style.setProperty("--active-slide", activeSlide);
      setTrackPosition(activeSlide + 1, instant);
    };

    const startCarousel = () => {
      setActiveSlide(activeSlide, true);
      if (!prefersReducedMotion && !autoAdvanceId) {
        autoAdvanceId = window.setInterval(() => {
          setTrackPosition(trackIndex + 1);
        }, 3200);
      }
    };

    const stopCarousel = () => {
      if (autoAdvanceId) {
        window.clearInterval(autoAdvanceId);
        autoAdvanceId = null;
      }
      setActiveSlide(activeSlide, true);
    };

    launchTrack?.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "transform") {
        return;
      }

      if (trackIndex === launchCards.length + 1) {
        setActiveSlide(0, true);
        return;
      }

      if (trackIndex === 0) {
        setActiveSlide(launchCards.length - 1, true);
        return;
      }

      setActiveSlide(trackIndex - 1);
    });

    const syncCarouselMode = () => {
      if (desktopCarousel.matches) {
        startCarousel();
      } else {
        stopCarousel();
      }
    };

    setActiveSlide(0, true);
    syncCarouselMode();
    window.addEventListener("resize", () => setTrackPosition(trackIndex, true));
    desktopCarousel.addEventListener("change", syncCarouselMode);
  }

  if (!window.gsap || prefersReducedMotion) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".nav", {
    y: -24,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.from(".hero-copy > *", {
    y: 34,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out"
  });

  gsap.fromTo(".hero-card", {
    scale: 0.86,
    opacity: 0.4,
    rotate: -2
  }, {
    scale: 1,
    opacity: 1,
    rotate: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "elastic.out(1, 0.72)"
  });

  gsap.fromTo(".launch-feature", {
    y: 48
  }, {
    y: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".launch-showcase",
      start: "top 82%",
      end: "top 38%",
      scrub: true
    }
  });

  gsap.fromTo(".phone-shot, .game-asset, .browser-mock", {
    y: 42,
    opacity: 0.55
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".launch-showcase",
      start: "top 86%",
      end: "bottom 42%",
      scrub: true
    }
  });

  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.fromTo(card, {
      scale: 0.92,
      opacity: 0.34
    }, {
      scale: 1,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        end: "bottom 28%",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".stack-card").forEach((card, index) => {
    gsap.fromTo(card, {
      y: 36,
      opacity: 0.42
    }, {
      y: 0,
      opacity: 1,
      delay: index * 0.04,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        end: "top 52%",
        scrub: true
      }
    });
  });
})();
