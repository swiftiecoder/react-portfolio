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

export const letterWall = (container, options = {}) => {
  const {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    density = 80,
    speed = 1.5,
    backgroundColor = "rgba(0, 0, 0, 0.8)",
    textColor = "rgba(0, 255, 150, 0.8)",
    fadeInDuration = 0.5,
    letterFallDuration = 2
  } = options;
  
  return new Promise((resolve) => {
    // Create container for the letter wall if it doesn't exist
    const letterWallContainer = document.createElement('div');
    letterWallContainer.className = 'letter-wall-container';
    container.appendChild(letterWallContainer);
    
    // Set styles for the container
    gsap.set(letterWallContainer, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0
    });
    
    // Create background element
    const background = document.createElement('div');
    background.className = 'letter-wall-background';
    letterWallContainer.appendChild(background);
    
    // Set styles for the background
    gsap.set(background, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: backgroundColor,
      opacity: 0
    });
    
    // Create letters
    const width = window.innerWidth;
    const height = window.innerHeight;
    const letterElements = [];
    
    for (let i = 0; i < density; i++) {
      const letter = document.createElement('div');
      letter.className = 'letter-wall-letter';
      letter.textContent = letters.charAt(Math.floor(Math.random() * letters.length));
      letterWallContainer.appendChild(letter);
      
      // Set random position
      const xPos = Math.random() * width;
      const yPos = -100 - (Math.random() * height);
      const size = 10 + Math.random() * 24;
      const duration = letterFallDuration * (0.8 + (Math.random() * 0.4));
      
      gsap.set(letter, {
        position: 'absolute',
        x: xPos,
        y: yPos,
        color: textColor,
        fontSize: `${size}px`,
        fontWeight: 'bold',
        opacity: 0.1 + Math.random() * 0.9
      });
      
      letterElements.push({
        element: letter,
        duration,
        delay: Math.random() * 1.5,
      });
    }
    
    // Animate letter wall container appearing
    gsap.to(letterWallContainer, {
      opacity: 1,
      duration: fadeInDuration
    });
    
    // Animate background fading in
    gsap.to(background, {
      opacity: 0.85,
      duration: letterFallDuration * 0.8,
      delay: letterFallDuration * 0.3
    });
    
    // Animate letters falling
    const animations = letterElements.map(({element, duration, delay}) => {
      return gsap.to(element, {
        y: height + 100,
        duration: duration * speed,
        delay,
        ease: 'none',
        onComplete: () => {
          // Remove element when animation is complete
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }
      });
    });
    
    // Wait for most letters to complete before resolving
    gsap.delayedCall(letterFallDuration * 0.8, resolve);
  });
};
