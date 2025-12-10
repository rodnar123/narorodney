"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useRef, useCallback, useEffect } from 'react';

// Register plugins (safe for SSR)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// ============================================
// CUSTOM TEXT SPLIT UTILITY (Free alternative to SplitText)
// ============================================
export function splitTextToSpans(element: HTMLElement, type: 'chars' | 'words' | 'lines' = 'chars'): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  if (type === 'chars') {
    return text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  } else if (type === 'words') {
    return text.split(' ').map((word, i, arr) => {
      const span = document.createElement('span');
      span.textContent = word + (i < arr.length - 1 ? '\u00A0' : '');
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  }
  
  return [];
}

// ============================================
// STUNNING TEXT ANIMATIONS
// ============================================

/**
 * Character-by-character reveal with 3D rotation
 */
export function animateTextReveal3D(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    rotationX?: number;
    y?: number;
  } = {}
) {
  const {
    duration = 0.8,
    stagger = 0.03,
    delay = 0,
    ease = 'back.out(1.7)',
    rotationX = -90,
    y = 100
  } = options;

  const chars = splitTextToSpans(element, 'chars');
  
  // Set perspective on parent
  element.style.perspective = '1000px';
  
  return gsap.fromTo(chars,
    {
      opacity: 0,
      y,
      rotationX,
      transformOrigin: '50% 50% -50px'
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration,
      stagger,
      delay,
      ease
    }
  );
}

/**
 * Wave text animation
 */
export function animateTextWave(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    repeat?: number;
  } = {}
) {
  const {
    duration = 0.6,
    stagger = 0.05,
    y = -20,
    repeat = -1
  } = options;

  const chars = splitTextToSpans(element, 'chars');
  
  return gsap.to(chars, {
    y,
    duration,
    stagger: {
      each: stagger,
      repeat,
      yoyo: true
    },
    ease: 'sine.inOut'
  });
}

/**
 * Scramble/decode text effect (Matrix-style)
 */
export function animateTextScramble(
  element: HTMLElement,
  finalText: string,
  options: {
    duration?: number;
    scrambleChars?: string;
    revealDelay?: number;
  } = {}
) {
  const {
    duration = 2,
    scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789',
    revealDelay = 0.5
  } = options;

  const chars = finalText.split('');
  element.textContent = '';
  
  const spans = chars.map(char => {
    const span = document.createElement('span');
    span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });

  const tl = gsap.timeline();
  
  spans.forEach((span, i) => {
    const targetChar = chars[i];
    const scrambleTime = (duration * (i / chars.length)) + revealDelay;
    
    // Scramble animation
    tl.to(span, {
      duration: scrambleTime,
      onUpdate: () => {
        if (Math.random() > 0.8) {
          span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
    }, 0);
    
    // Final reveal
    tl.to(span, {
      duration: 0.1,
      onComplete: () => {
        span.textContent = targetChar === ' ' ? '\u00A0' : targetChar;
      }
    }, scrambleTime);
  });

  return tl;
}

/**
 * Glitch text effect
 */
export function animateTextGlitch(
  element: HTMLElement,
  options: {
    duration?: number;
    intensity?: number;
  } = {}
) {
  const {
    duration = 0.3,
    intensity = 10
  } = options;

  const originalText = element.textContent || '';
  
  return gsap.timeline({ repeat: 3, yoyo: true })
    .to(element, {
      duration: duration / 6,
      x: () => gsap.utils.random(-intensity, intensity),
      y: () => gsap.utils.random(-intensity / 2, intensity / 2),
      skewX: () => gsap.utils.random(-5, 5),
      ease: 'steps(1)',
      color: '#ff0000',
      textShadow: `${intensity}px 0 #00ffff, -${intensity}px 0 #ff00ff`
    })
    .to(element, {
      duration: duration / 6,
      x: 0,
      y: 0,
      skewX: 0,
      color: '',
      textShadow: 'none'
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Parallax scroll effect
 */
export function createParallax(
  element: HTMLElement | string,
  options: {
    speed?: number;
    trigger?: string;
  } = {}
) {
  const { speed = 0.5, trigger } = options;

  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * Section reveal with pinning
 */
export function createPinnedSection(
  section: HTMLElement | string,
  content: HTMLElement | string,
  options: {
    duration?: string;
    animation?: gsap.TweenVars;
  } = {}
) {
  const { duration = '+=100%', animation = {} } = options;

  return gsap.to(content, {
    ...animation,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: duration,
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  });
}

/**
 * Stagger reveal for grid items
 */
export function createStaggerReveal(
  items: HTMLElement[] | string,
  options: {
    trigger?: string;
    start?: string;
    stagger?: number | object;
    y?: number;
    scale?: number;
    rotation?: number;
  } = {}
) {
  const {
    trigger,
    start = 'top 80%',
    stagger = 0.1,
    y = 100,
    scale = 0.8,
    rotation = 0
  } = options;

  return gsap.from(items, {
    y,
    opacity: 0,
    scale,
    rotation,
    duration: 1,
    stagger,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: trigger || items,
      start,
      toggleActions: 'play none none reverse'
    }
  });
}

// ============================================
// MAGNETIC / HOVER EFFECTS
// ============================================

/**
 * Magnetic hover effect for buttons/icons
 */
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// ============================================
// DOCK MAGNIFICATION (macOS-style)
// ============================================

/**
 * Creates authentic macOS dock magnification
 */
export function createDockMagnification(
  dockElement: HTMLElement,
  iconSelector: string,
  options: {
    maxScale?: number;
    neighborScale?: number;
    distance?: number;
  } = {}
) {
  const {
    maxScale = 1.8,
    neighborScale = 1.4,
    distance = 150
  } = options;

  const icons = dockElement.querySelectorAll(iconSelector) as NodeListOf<HTMLElement>;

  const handleMouseMove = (e: MouseEvent) => {
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distanceFromMouse = Math.abs(e.clientX - iconCenterX);
      
      // Calculate scale based on distance
      let scale = 1;
      if (distanceFromMouse < distance) {
        const normalizedDistance = distanceFromMouse / distance;
        scale = maxScale - (maxScale - 1) * normalizedDistance;
      }
      
      // Clamp scale
      scale = gsap.utils.clamp(1, maxScale, scale);
      
      // Apply with smooth animation
      gsap.to(icon, {
        scale,
        y: -(scale - 1) * 20,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  };

  const handleMouseLeave = () => {
    icons.forEach((icon) => {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto'
      });
    });
  };

  dockElement.addEventListener('mousemove', handleMouseMove);
  dockElement.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    dockElement.removeEventListener('mousemove', handleMouseMove);
    dockElement.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// ============================================
// FLIP-STYLE STATE TRANSITIONS
// ============================================

/**
 * Capture state for FLIP animation
 */
export function captureState(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    opacity: parseFloat(getComputedStyle(element).opacity)
  };
}

/**
 * Animate from captured state to new state
 */
export function flipFrom(
  element: HTMLElement,
  state: ReturnType<typeof captureState>,
  options: {
    duration?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.5, ease = 'power2.inOut' } = options;
  
  const newRect = element.getBoundingClientRect();
  
  const deltaX = state.x - newRect.left;
  const deltaY = state.y - newRect.top;
  const scaleX = state.width / newRect.width;
  const scaleY = state.height / newRect.height;

  return gsap.fromTo(element,
    {
      x: deltaX,
      y: deltaY,
      scaleX,
      scaleY,
      transformOrigin: '0 0'
    },
    {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration,
      ease
    }
  );
}

// ============================================
// WINDOW ANIMATIONS
// ============================================

/**
 * Window open animation (macOS-style)
 */
export function animateWindowOpen(
  element: HTMLElement,
  fromElement?: HTMLElement
) {
  const tl = gsap.timeline();
  
  if (fromElement) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = element.getBoundingClientRect();
    
    tl.fromTo(element,
      {
        x: fromRect.left - toRect.left + (fromRect.width - toRect.width) / 2,
        y: fromRect.top - toRect.top + (fromRect.height - toRect.height) / 2,
        scale: 0.1,
        opacity: 0,
        borderRadius: '50%'
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: '12px',
        duration: 0.5,
        ease: 'back.out(1.4)'
      }
    );
  } else {
    tl.fromTo(element,
      {
        scale: 0.8,
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }
    );
  }
  
  return tl;
}

/**
 * Window close animation
 */
export function animateWindowClose(
  element: HTMLElement,
  toElement?: HTMLElement
) {
  const tl = gsap.timeline();
  
  if (toElement) {
    const fromRect = element.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    
    tl.to(element, {
      x: toRect.left - fromRect.left + (toRect.width - fromRect.width) / 2,
      y: toRect.top - fromRect.top + (toRect.height - fromRect.height) / 2,
      scale: 0.1,
      opacity: 0,
      borderRadius: '50%',
      duration: 0.4,
      ease: 'power2.in'
    });
  } else {
    tl.to(element, {
      scale: 0.8,
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in'
    });
  }
  
  return tl;
}

/**
 * Window minimize animation (genie effect simulation)
 */
export function animateWindowMinimize(
  element: HTMLElement,
  targetElement: HTMLElement
) {
  const fromRect = element.getBoundingClientRect();
  const toRect = targetElement.getBoundingClientRect();
  
  return gsap.to(element, {
    x: toRect.left - fromRect.left,
    y: toRect.top - fromRect.top,
    scaleX: toRect.width / fromRect.width,
    scaleY: 0.1,
    transformOrigin: 'bottom center',
    opacity: 0,
    duration: 0.5,
    ease: 'power3.in'
  });
}

/**
 * Window maximize animation
 */
export function animateWindowMaximize(
  element: HTMLElement,
  isMaximized: boolean
) {
  const tl = gsap.timeline();
  
  if (isMaximized) {
    // Maximize
    tl.to(element, {
      duration: 0.4,
      ease: 'power3.inOut'
    });
  } else {
    // Restore
    tl.to(element, {
      duration: 0.4,
      ease: 'power3.inOut'
    });
  }
  
  return tl;
}

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook for using GSAP context with auto-cleanup
 */
export function useGSAPContext() {
  const ref = useRef<HTMLElement>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return () => {
      ctx.current?.revert();
    };
  }, []);

  const createContext = useCallback((callback: (self: gsap.Context) => void) => {
    if (ref.current) {
      ctx.current = gsap.context(callback, ref.current);
    }
  }, []);

  return { ref, createContext };
}

// ============================================
// EASING PRESETS
// ============================================
export const GSAP_EASINGS = {
  // Smooth & elegant
  smooth: 'power2.inOut',
  smoothIn: 'power2.in',
  smoothOut: 'power2.out',
  
  // Bouncy & playful
  bounce: 'bounce.out',
  elastic: 'elastic.out(1, 0.3)',
  back: 'back.out(1.7)',
  
  // Sharp & snappy
  sharp: 'power4.out',
  snap: 'steps(5)',
  
  // Natural
  sine: 'sine.inOut',
  expo: 'expo.out',
  
  // Custom cubic-bezier equivalents
  easeOutQuart: 'power4.out',
  easeInOutQuint: 'power5.inOut'
} as const;

// ============================================
// RESPONSIVE ANIMATIONS
// ============================================

/**
 * Create responsive animations with matchMedia
 */
export function createResponsiveAnimation(
  animations: {
    desktop?: () => gsap.core.Timeline | gsap.core.Tween;
    tablet?: () => gsap.core.Timeline | gsap.core.Tween;
    mobile?: () => gsap.core.Timeline | gsap.core.Tween;
  }
) {
  if (typeof window === 'undefined') return;

  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: '(min-width: 1024px)',
    isTablet: '(min-width: 768px) and (max-width: 1023px)',
    isMobile: '(max-width: 767px)'
  }, (context) => {
    const { isDesktop, isTablet, isMobile } = context.conditions as Record<string, boolean>;
    
    if (isDesktop && animations.desktop) {
      return animations.desktop();
    }
    if (isTablet && animations.tablet) {
      return animations.tablet();
    }
    if (isMobile && animations.mobile) {
      return animations.mobile();
    }
  });

  return mm;
}
