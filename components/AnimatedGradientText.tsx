'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animation?: 'wave' | 'reveal' | 'scramble' | 'glitch' | 'gradient';
  delay?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Animated Gradient Text with GSAP Effects
 * Premium text animations with stunning visual effects
 */
export default function AnimatedGradientText({
  children,
  className = '',
  colors = ['from-blue-400', 'via-purple-500', 'to-pink-500'],
  animation = 'reveal',
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
}: AnimatedGradientTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const [isAnimated, setIsAnimated] = useState(false);

  // Split text into characters
  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  useEffect(() => {
    if (!containerRef.current || chars.length === 0 || isAnimated) return;
    
    const charElements = charsRef.current.filter(Boolean);
    if (charElements.length === 0) return;

    setIsAnimated(true);
    
    // Set perspective for 3D effects
    if (containerRef.current) {
      containerRef.current.style.perspective = '1000px';
    }

    switch (animation) {
      case 'reveal':
        // 3D character reveal with rotation
        gsap.fromTo(charElements,
          {
            opacity: 0,
            y: 80,
            rotationX: -90,
            transformOrigin: '50% 50% -50px'
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration,
            stagger,
            delay,
            ease: 'back.out(1.7)'
          }
        );
        break;

      case 'wave':
        // Continuous wave animation
        gsap.fromTo(charElements,
          { y: 0 },
          {
            y: -15,
            duration: 0.6,
            stagger: {
              each: 0.05,
              repeat: -1,
              yoyo: true
            },
            ease: 'sine.inOut',
            delay
          }
        );
        break;

      case 'scramble':
        // Matrix-style scramble reveal
        const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';
        
        charElements.forEach((char, i) => {
          const finalChar = chars[i];
          const timeline = gsap.timeline({ delay: delay + (i * 0.05) });
          
          // Scramble phase
          timeline.to(char, {
            duration: 0.8,
            onUpdate: function() {
              const progress = this.progress();
              if (progress < 0.7) {
                char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              }
            }
          });
          
          // Reveal final character
          timeline.to(char, {
            duration: 0.1,
            onStart: () => {
              char.textContent = finalChar === ' ' ? '\u00A0' : finalChar;
            }
          });
        });
        break;

      case 'glitch':
        // Glitch effect on load
        const glitchTl = gsap.timeline({ delay });
        
        charElements.forEach((char, i) => {
          glitchTl.fromTo(char,
            {
              opacity: 0,
              x: gsap.utils.random(-20, 20),
              y: gsap.utils.random(-10, 10),
              skewX: gsap.utils.random(-20, 20),
              color: ['#ff0000', '#00ff00', '#0000ff'][Math.floor(Math.random() * 3)]
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              skewX: 0,
              color: 'inherit',
              duration: 0.15,
              ease: 'steps(2)'
            },
            i * 0.02
          );
        });
        
        // Add occasional glitch after initial animation
        glitchTl.call(() => {
          gsap.delayedCall(gsap.utils.random(3, 6), function glitchLoop() {
            const randomChar = charElements[Math.floor(Math.random() * charElements.length)];
            if (randomChar) {
              gsap.timeline()
                .to(randomChar, {
                  x: gsap.utils.random(-5, 5),
                  skewX: gsap.utils.random(-10, 10),
                  duration: 0.1,
                  ease: 'steps(1)'
                })
                .to(randomChar, {
                  x: 0,
                  skewX: 0,
                  duration: 0.1
                });
            }
            gsap.delayedCall(gsap.utils.random(3, 6), glitchLoop);
          });
        });
        break;

      case 'gradient':
      default:
        // Simple fade in with gradient animation
        gsap.fromTo(charElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            delay,
            ease: 'power2.out'
          }
        );
        
        // Animate gradient position
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            backgroundPosition: '200% center',
            duration: 5,
            repeat: -1,
            ease: 'none'
          });
        }
        break;
    }

    return () => {
      // Cleanup GSAP animations
      gsap.killTweensOf(charElements);
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
    };
  }, [animation, chars, delay, duration, stagger, isAnimated]);

  // Handle hover effects
  const handleMouseEnter = () => {
    if (animation === 'gradient') return;
    
    const charElements = charsRef.current.filter(Boolean);
    gsap.to(charElements, {
      scale: 1.1,
      duration: 0.3,
      stagger: {
        each: 0.02,
        from: 'center'
      },
      ease: 'back.out(1.7)'
    });
  };

  const handleMouseLeave = () => {
    if (animation === 'gradient') return;
    
    const charElements = charsRef.current.filter(Boolean);
    gsap.to(charElements, {
      scale: 1,
      duration: 0.3,
      stagger: {
        each: 0.02,
        from: 'center'
      },
      ease: 'power2.out'
    });
  };

  return (
    <span
      ref={containerRef}
      className={`bg-gradient-to-r ${colors.join(' ')} bg-clip-text text-transparent font-black inline-block ${className}`}
      style={{
        backgroundSize: '200% auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {chars.map((char, index) => (
        <span
          key={index}
          ref={el => { if (el) charsRef.current[index] = el; }}
          className="inline-block"
          style={{ 
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
