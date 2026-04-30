(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  gsap.fromTo(".confetti-field span", {
    y: -18,
    rotate: -18,
    opacity: 0
  }, {
    y: 24,
    rotate: 18,
    opacity: 0.76,
    duration: 1.1,
    stagger: 0.08,
    ease: "power2.out"
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

  gsap.fromTo(".place-card", {
    y: 16,
    rotate: -8,
    opacity: 0
  }, {
    y: 0,
    rotate: -3,
    opacity: 1,
    duration: 0.9,
    delay: 0.34,
    ease: "power3.out"
  });

  gsap.fromTo(".featured-launch", {
    y: 48,
    opacity: 0.34
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".launch-showcase",
      start: "top 82%",
      end: "top 38%",
      scrub: true
    }
  });

  gsap.fromTo(".phone-shot", {
    y: 42,
    opacity: 0.55
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".phone-strip",
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

  gsap.utils.toArray(".panel, .phone-shot, .game-preview, .project-card").forEach((item) => {
    gsap.fromTo(item, {
      filter: "brightness(0.82)",
      opacity: 0.48
    }, {
      filter: "brightness(1)",
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top 92%",
        end: "center 48%",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".stack-card").forEach((card, index) => {
    gsap.to(card, {
      y: index * -18,
      scale: 1 - index * 0.025,
      scrollTrigger: {
        trigger: card,
        start: "top 76%",
        end: "bottom 24%",
        scrub: true
      }
    });
  });
})();
