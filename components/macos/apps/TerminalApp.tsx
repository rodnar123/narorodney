"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'tree' | 'highlight' | 'empty';
  isTyping?: boolean;
}

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const terminalContent: TerminalLine[] = [
    { text: "rodney@macOS ~ % whoami", type: 'command' },
    { text: "Rodney Naro - Full-Stack Developer", type: 'output' },
    { text: "", type: 'empty' },
    { text: "rodney@macOS ~ % ls ~/skills", type: 'command' },
    { text: "├── Frontend/", type: 'tree' },
    { text: "│   ├── Next.js", type: 'tree' },
    { text: "│   ├── React", type: 'tree' },
    { text: "│   ├── TypeScript", type: 'tree' },
    { text: "│   ├── Tailwind CSS", type: 'tree' },
    { text: "│   └── Three.js", type: 'tree' },
    { text: "├── Backend/", type: 'tree' },
    { text: "│   ├── Node.js", type: 'tree' },
    { text: "│   ├── Prisma ORM", type: 'tree' },
    { text: "│   ├── PostgreSQL", type: 'tree' },
    { text: "│   └── Supabase", type: 'tree' },
    { text: "├── Mobile/", type: 'tree' },
    { text: "│   ├── React Native", type: 'tree' },
    { text: "│   ├── Expo Go", type: 'tree' },
    { text: "│   └── Flutter", type: 'tree' },
    { text: "└── DevOps/", type: 'tree' },
    { text: "    ├── Vercel", type: 'tree' },
    { text: "    └── Git", type: 'tree' },
    { text: "", type: 'empty' },
    { text: "rodney@macOS ~ % cat experience.txt", type: 'command' },
    { text: "→ IT Tutor @ PNG Unitech (2017-Present)", type: 'highlight' },
    { text: "→ Logistics Specialist @ Digicel PNG (2007-2011)", type: 'highlight' },
    { text: "", type: 'empty' },
    { text: "rodney@macOS ~ % echo $EDUCATION", type: 'command' },
    { text: "Master of IT - Southern Institute of Technology (2021)", type: 'output' },
    { text: "Bachelor of Commerce IT - PNG Unitech (2016)", type: 'output' },
    { text: "", type: 'empty' },
    { text: "rodney@macOS ~ % ", type: 'command' }
  ];

  // Scramble text effect for commands
  const scrambleText = useCallback((element: HTMLElement, finalText: string, onComplete?: () => void) => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const duration = Math.min(1.5, finalText.length * 0.05);
    
    let currentText = '';
    const tl = gsap.timeline({
      onComplete: () => {
        element.textContent = finalText;
        onComplete?.();
      }
    });

    // Typing effect with scramble
    for (let i = 0; i <= finalText.length; i++) {
      tl.to(element, {
        duration: 0.03,
        onUpdate: () => {
          const revealed = finalText.substring(0, i);
          const scrambled = Array(Math.min(3, finalText.length - i))
            .fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
          element.textContent = revealed + scrambled;
        }
      });
    }

    return tl;
  }, []);

  // Fast typewriter for output lines
  const typewriterEffect = useCallback((element: HTMLElement, text: string, onComplete?: () => void) => {
    element.textContent = '';
    
    gsap.to(element, {
      duration: text.length * 0.02,
      text: {
        value: text,
        delimiter: ''
      },
      ease: 'none',
      onComplete
    });
  }, []);

  // Tree structure reveal with stagger
  const revealTreeLine = useCallback((element: HTMLElement, text: string, onComplete?: () => void) => {
    element.textContent = text;
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';
    
    gsap.to(element, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete
    });
  }, []);

  // Highlight effect for special lines
  const highlightEffect = useCallback((element: HTMLElement, text: string, onComplete?: () => void) => {
    element.textContent = text;
    element.style.opacity = '0';
    
    const tl = gsap.timeline({ onComplete });
    
    tl.fromTo(element,
      { opacity: 0, x: -30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
    
    // Glow effect
    tl.fromTo(element,
      { textShadow: '0 0 0px rgba(250, 204, 21, 0)' },
      { textShadow: '0 0 10px rgba(250, 204, 21, 0.5)', duration: 0.3 },
      '-=0.2'
    );
    
    return tl;
  }, []);

  // Process each line
  useEffect(() => {
    if (currentLineIndex >= terminalContent.length) {
      setIsComplete(true);
      return;
    }

    const currentContent = terminalContent[currentLineIndex];
    const lineElement = lineRefs.current[currentLineIndex];
    
    if (!lineElement) {
      // Add new line to state
      setLines(prev => [...prev, { ...currentContent, isTyping: true }]);
      return;
    }

    // Determine animation based on line type
    let delay = 100;
    
    const animateLine = () => {
      switch (currentContent.type) {
        case 'command':
          delay = currentContent.text ? 800 : 100;
          if (currentContent.text) {
            scrambleText(lineElement, currentContent.text, () => {
              setLines(prev => prev.map((l, i) => 
                i === currentLineIndex ? { ...l, isTyping: false } : l
              ));
              setTimeout(() => setCurrentLineIndex(prev => prev + 1), delay);
            });
          } else {
            setCurrentLineIndex(prev => prev + 1);
          }
          break;
          
        case 'output':
          delay = 300;
          typewriterEffect(lineElement, currentContent.text, () => {
            setLines(prev => prev.map((l, i) => 
              i === currentLineIndex ? { ...l, isTyping: false } : l
            ));
            setTimeout(() => setCurrentLineIndex(prev => prev + 1), delay);
          });
          break;
          
        case 'tree':
          delay = 80;
          revealTreeLine(lineElement, currentContent.text, () => {
            setLines(prev => prev.map((l, i) => 
              i === currentLineIndex ? { ...l, isTyping: false } : l
            ));
            setTimeout(() => setCurrentLineIndex(prev => prev + 1), delay);
          });
          break;
          
        case 'highlight':
          delay = 400;
          highlightEffect(lineElement, currentContent.text, () => {
            setLines(prev => prev.map((l, i) => 
              i === currentLineIndex ? { ...l, isTyping: false } : l
            ));
            setTimeout(() => setCurrentLineIndex(prev => prev + 1), delay);
          });
          break;
          
        case 'empty':
          lineElement.textContent = '\u00A0';
          setTimeout(() => setCurrentLineIndex(prev => prev + 1), 100);
          break;
      }
    };

    const timer = setTimeout(animateLine, 50);
    return () => clearTimeout(timer);
  }, [currentLineIndex, lines.length, scrambleText, typewriterEffect, revealTreeLine, highlightEffect, terminalContent]);

  // Blinking cursor animation
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)'
      });
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Initial terminal boot effect
  useEffect(() => {
    if (terminalRef.current) {
      gsap.fromTo(terminalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-green-400';
      case 'tree':
        return 'text-blue-400';
      case 'highlight':
        return 'text-yellow-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="h-full p-4 bg-black/95 font-mono text-sm overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700"
    >
      {/* Terminal header effect */}
      <div className="mb-4 text-gray-500 text-xs">
        Last login: {new Date().toLocaleString()} on ttys000
      </div>
      
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div
            key={index}
            ref={el => { lineRefs.current[index] = el; }}
            className={`min-h-[1.25rem] ${getLineColor(line.type)} whitespace-pre`}
          >
            {line.type === 'empty' ? '\u00A0' : ''}
            {index === lines.length - 1 && line.type === 'command' && isComplete && (
              <span ref={cursorRef} className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle" />
            )}
          </div>
        ))}
      </div>

      {/* Scanline effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
        }}
      />
    </div>
  );
}
