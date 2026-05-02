(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const launchShowcase = document.querySelector(".launch-showcase");
  const launchCards = launchShowcase ? Array.from(launchShowcase.querySelectorAll(".launch-feature")) : [];

  if (launchShowcase && launchCards.length > 0) {
    let activeSlide = 0;
    const setActiveSlide = (index) => {
      activeSlide = index % launchCards.length;
      const cardStep = launchCards[0].getBoundingClientRect().width + 18;
      launchShowcase.style.setProperty("--active-slide", activeSlide);
      launchShowcase.style.setProperty("--slide-offset", `${activeSlide * cardStep}px`);
      launchCards.forEach((card, cardIndex) => {
        card.classList.toggle("is-active", cardIndex === activeSlide);
      });
    };

    setActiveSlide(0);
    window.addEventListener("resize", () => setActiveSlide(activeSlide));

    if (!prefersReducedMotion && window.matchMedia("(min-width: 641px)").matches) {
      window.setInterval(() => setActiveSlide(activeSlide + 1), 3200);
    }
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

  gsap.fromTo(".phone-shot, .game-asset", {
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
