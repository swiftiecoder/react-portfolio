import gsap, { Power3 } from "gsap";

export const stagger = (target, fromvVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromvVars },
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
  );
};

export const fallingText = (targets, delay = 0) => {
  return new Promise((resolve) => {
    gsap.fromTo(
      targets,
      { 
        y: -100, 
        opacity: 0, 
        rotation: gsap.utils.random(-20, 20, 1),
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1, 
        rotation: 0,
        scale: 1,
        duration: 1.5, 
        stagger: 0.15, 
        ease: "bounce.out",
        delay: delay,
        onComplete: resolve
      }
    );
  });
};
