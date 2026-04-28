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
