"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment, PerspectiveCamera, Float, MeshDistortMaterial, Sparkles, Stars, MeshWobbleMaterial, shaderMaterial, Edges } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Button } from '@/components/ui/button';

import { Github, Linkedin, Facebook, ExternalLink, Mail, MapPin, Code2, Sparkles as SparklesIcon, Layers, Terminal, Smartphone, Globe, Database, Cpu, Zap, Rocket, Shield, ArrowRight } from 'lucide-react';
import { extend } from '@react-three/fiber';
import MobileMenu from '@/components/MobileMenu';
import TiltCard from '@/components/TiltCard';
import GlassCard from '@/components/GlassCard';
import AnimatedGradientText from '@/components/AnimatedGradientText';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleField from '@/components/ParticleField';
import DNAHelix from '@/components/DNAHelix';

// Only register plugins on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Custom shader material for holographic effect
const HolographicMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.1, 0.3, 1) },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      float stripes = sin((vPosition.y - time) * 20.0);
      vec3 finalColor = mix(color, vec3(1.0, 0.0, 1.0), stripes * 0.5 + 0.5);
      gl_FragColor = vec4(finalColor, 0.7);
    }
  `
);

extend({ HolographicMaterial });

// Animated cursor component
// function CustomCursor() {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const cursorDotRef = useRef<HTMLDivElement>(null);
//   const [isClient, setIsClient] = useState(false);
  
//   useEffect(() => {
//     setIsClient(true);
//     const cursor = cursorRef.current;
//     const cursorDot = cursorDotRef.current;
    
//     const moveCursor = (e: MouseEvent) => {
//       if (cursor && cursorDot) {
//         gsap.to(cursor, {
//           x: e.clientX - 20,
//           y: e.clientY - 20,
//           duration: 0.5,
//           ease: "power2.out"
//         });
//         gsap.to(cursorDot, {
//           x: e.clientX - 5,
//           y: e.clientY - 5,
//           duration: 0.1
//         });
//       }
//     };
    
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);
  
//   if (!isClient) return null;
  
//   return (
//     <>
//       <div ref={cursorRef} className="fixed w-10 h-10 border-2 border-blue-500 rounded-full pointer-events-none z-[100] mix-blend-difference hidden lg:block" />
//       <div ref={cursorDotRef} className="fixed w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-[100] hidden lg:block" />
//     </>
//   );
// }

// Loading screen
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{ 
        zIndex: 99999,
        pointerEvents: progress === 100 ? 'none' : 'auto'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Logo/Initials */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-7xl sm:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          >
            RN
          </motion.div>
          
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 border-4 border-dashed border-purple-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 sm:w-80 mx-auto">
          <div className="relative">
            <div className="h-2 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Progress text */}
          <motion.p
            className="mt-4 text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
          <p className="text-xs text-gray-500 mt-1">Loading experience...</p>
        </div>
      </div>
    </motion.div>
  );
}

// Profile Image Component with fallback


// Main Portfolio Component
export default function Portfolio3D() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    // Intersection Observer for dynamic nav underline
    if (typeof window !== 'undefined') {
      const sectionRefs = [
        { ref: heroRef, name: 'home' },
        { ref: projectsRef, name: 'projects' },
        { ref: skillsRef, name: 'skills' },
        { ref: contactRef, name: 'contact' }
      ];
      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const found = sectionRefs.find(s => s.ref.current === entry.target);
            if (found) setActiveSection(found.name);
          }
        });
      };
      const observer = new window.IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      });
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) observer.observe(ref.current);
      });
      return () => {
        sectionRefs.forEach(({ ref }) => {
          if (ref.current) observer.unobserve(ref.current);
        });
        observer.disconnect();
      };
    }
  }, []);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Enhanced projects data
  // Latest 9 public GitHub repositories for rodnar123
  const projects = [
    {
      title: "timetable",
      description: "A smart timetable app for organizing your classes and events.",
      github: "https://github.com/rodnar123/timetable",
      color: "#3b82f6"
    },
    {
      title: "tutis325",
      description: "A modern tutorial management system for students and teachers.",
      github: "https://github.com/rodnar123/tutis325",
      color: "#10b981"
    },
    {
      title: "onlineappliation",
      description: "Online application platform for seamless submissions.",
      github: "https://github.com/rodnar123/onlineappliation",
      color: "#f59e0b"
    },
    {
      title: "taskmanager",
      description: "Effortlessly manage your daily tasks and boost productivity.",
      github: "https://github.com/rodnar123/taskmanager",
      color: "#8b5cf6"
    },
    {
      title: "testreacnative",
      description: "A React Native playground for testing mobile features.",
      github: "https://github.com/rodnar123/testreacnative",
      color: "#ef4444"
    },
    {
      title: "3dportfolio",
      description: "A stunning 3D portfolio to showcase your creative work.",
      github: "https://github.com/rodnar123/3dportfolio",
      color: "#06b6d4"
    },
    {
      title: "rodneynaroprofile",
      description: "Personal profile site built with Next.js and modern tech.",
      github: "https://github.com/rodnar123/rodneynaroprofile",
      color: "#f59e0b"
    },
    {
      title: "patientunitechclinic",
      description: "Clinic management system for patient records and appointments.",
      github: "https://github.com/rodnar123/patientunitechclinic",
      color: "#3b82f6"
    },
    {
      title: "hrcasemanagement",
      description: "HR case management tool for efficient workflow.",
      github: "https://github.com/rodnar123/hrcasemanagement",
      color: "#10b981"
    }
  ];

  const techStack = [
    { name: "TypeScript", icon: Code2, level: 90, color: "#3178c6", description: "Type-safe JavaScript" },
    { name: "React/Next.js", icon: Layers, level: 95, color: "#61dafb", description: "Modern web frameworks" },
    { name: "React Native", icon: Smartphone, level: 85, color: "#61dafb", description: "Cross-platform mobile" },
    { name: "Node.js", icon: Terminal, level: 80, color: "#339933", description: "Backend runtime" },
    { name: "Tailwind CSS", icon: SparklesIcon, level: 90, color: "#06b6d4", description: "Utility-first CSS" },
    { name: "Three.js/WebGL", icon: Globe, level: 75, color: "#000000", description: "3D graphics" },
    { name: "PostgreSQL", icon: Database, level: 80, color: "#4169e1", description: "Relational database" }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // GSAP animations - only run on client
    if (typeof window !== 'undefined' && containerRef.current) {
      const ctx = gsap.context(() => {
        // Text scramble effect
        gsap.to(".scramble-text", {
          duration: 2,
          text: "Freebie Techie! Coding as a search!",
          ease: "none",
          delay: 1
        });

        // Hero section animations
        gsap.from(".hero-title", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.5
        });

        gsap.from(".hero-subtitle", {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: "power3.out"
        });

        // Floating animation for 3D canvas
        gsap.to(".canvas-container", {
          y: -30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });

        // Project cards animation with stagger
        ScrollTrigger.batch(".project-card", {
          onEnter: (elements) => {
            gsap.from(elements, {
              y: 100,
              opacity: 0,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true
            });
          },
          once: true,
          start: "top 85%"
        });

        // Tech stack animation with wave effect
        gsap.from(".tech-item", {
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          x: -100,
          opacity: 0,
          duration: 0.8,
          stagger: {
            each: 0.1,
            from: "start"
          },
          ease: "power3.out"
        });

        // Progress bars animation
        gsap.to(".progress-bar", {
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          width: (i, el) => el.getAttribute("data-width"),
          duration: 2,
          ease: "power2.out",
          stagger: 0.1
        });

        // Parallax effect on scroll
        gsap.to(".parallax-bg", {
          scrollTrigger: {
            scrub: true
          },
          y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
          ease: "none"
        });
      }, containerRef);

      return () => {
        ctx.revert();
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // Generate deterministic particle positions
  const particlePositions = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      left: `${(i * 7.3) % 100}%`,
      top: `${(i * 13.7) % 100}%`,
      duration: 5 + (i % 10),
      delay: i * 0.05
    }));
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Rodney Naro',
            url: 'https://rodneynaro.vercel.app',
            image: '/images/profile.jpg',
            jobTitle: 'Full-Stack Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'PNG Unitech'
            },
            description: 'Full-Stack Developer specializing in TypeScript, React, React Native, Next.js, and 3D Web Experiences',
            sameAs: [
              'https://github.com/rodnar123',
              'https://www.linkedin.com/in/rodney-naro-74378062/',
              'https://www.facebook.com/rodney.naro.965'
            ],
            knowsAbout: [
              'TypeScript',
              'React',
              'React Native',
              'Next.js',
              'Three.js',
              'Node.js',
              'Full-Stack Development',
              '3D Web Development'
            ],
            alumniOf: 'PNG University of Technology'
          })
        }}
      />
      
      {mounted && <LoadingScreen progress={loadingProgress} />}
      {/* {mounted && <CustomCursor />} */}
      <ScrollProgress />
      
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden" style={{ isolation: 'isolate', position: 'relative', zIndex: 1 }}>
        {mounted && (
          <style jsx global>{`
            @keyframes glitch-1 {
              0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
              20% { clip-path: inset(0 100% 0 0); transform: translate(-2px); }
              40% { clip-path: inset(0 0 0 100%); transform: translate(2px); }
              60% { clip-path: inset(100% 0 0 0); transform: translate(-1px); }
              80% { clip-path: inset(0 0 100% 0); transform: translate(1px); }
            }
            
            @keyframes glitch-2 {
              0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
              20% { clip-path: inset(0 0 100% 0); transform: translate(2px); }
              40% { clip-path: inset(100% 0 0 0); transform: translate(-2px); }
              60% { clip-path: inset(0 100% 0 0); transform: translate(1px); }
              80% { clip-path: inset(0 0 0 100%); transform: translate(-1px); }
            }
            
            .animate-glitch-1 { animation: glitch-1 0.3s linear; }
            .animate-glitch-2 { animation: glitch-2 0.3s linear; }
          `}</style>
        )}

        {/* Enhanced Navigation */}
        <motion.nav 
          className="fixed top-0 w-full bg-gray-900/20 backdrop-blur-xl border-b border-gray-800/50"
          style={{ zIndex: 50 }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-2 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.a
                href="#home"
                className="flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src="/images/profile.jpg"
                  alt="Rodney Naro"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/fallback-profile.jpg';
                  }}
                />
              </motion.a>
            </motion.div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex gap-3 lg:gap-4 xl:gap-6 items-center">
              {['Home', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative hover:text-blue-400 transition-colors font-medium text-sm lg:text-base whitespace-nowrap cursor-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.toLowerCase());
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600"
                      layoutId="navbar-indicator"
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation - Outside nav for proper z-index */}
        <MobileMenu 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Hero Section with Modern Glassmorphism */}
        <section
          id="home"
          ref={heroRef}
          className="min-h-screen lg:h-screen flex items-center justify-center relative px-3 sm:px-4 lg:px-6 pt-16 pb-8 overflow-x-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Premium animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-3 sm:px-4 relative z-[5] max-w-7xl w-full py-4 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
              {/* Left Column - Content in single card */}
              <motion.div 
                style={{ y, opacity }} 
                className="order-2 lg:order-1 flex flex-col"
              >
                <GlassCard className="p-4 sm:p-5 lg:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Name with AnimatedGradientText */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      <AnimatedGradientText>Rodney Naro</AnimatedGradientText>
                    </h1>

                    {/* Tagline */}
                    <p className="text-sm sm:text-base lg:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 font-semibold">
                      <span className="scramble-text">{mounted ? "" : "Freebie Techie! Coding as a search!"}</span>
                    </p>

                    {/* Description */}
                    <motion.p
                      className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Full-Stack Developer specializing in <span className="text-blue-400 font-semibold">TypeScript</span>, <span className="text-cyan-400 font-semibold">React</span>, and <span className="text-purple-400 font-semibold">React Native</span>.
                      Building innovative solutions from PNG Unitech.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.a
                        href="https://github.com/rodnar123"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="h-9 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300"
                        >
                          <Github className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          GitHub
                        </Button>
                      </motion.a>
                      
                      <motion.a
                        href="https://www.linkedin.com/in/rodney-naro-74378062/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="h-9 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/50 transition-all duration-300"
                        >
                          <Linkedin className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          LinkedIn
                        </Button>
                      </motion.a>
                      
                      <motion.a
                        href="https://www.facebook.com/rodney.naro.965"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="h-9 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-xs sm:text-sm font-semibold shadow-lg shadow-pink-500/50 transition-all duration-300"
                        >
                          <Facebook className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          Facebook
                        </Button>
                      </motion.a>
                    </motion.div>

                    {/* Stats inline */}
                    <motion.div
                      className="grid grid-cols-3 gap-2 pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      {[
                        { label: "Projects", value: "6+", icon: Rocket, color: "from-blue-500 to-cyan-500" },
                        { label: "Technologies", value: "15+", icon: Cpu, color: "from-purple-500 to-pink-500" },
                        { label: "Experience", value: "5 Years", icon: Zap, color: "from-orange-500 to-red-500" }
                      ].map((stat, idx) => (
                        <div
                          key={stat.label}
                          className="p-2 sm:p-2.5 text-center bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + idx * 0.1 }}
                          >
                            <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                            <div className={`text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                              {stat.value}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-400 font-medium">{stat.label}</div>
                          </motion.div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </GlassCard>
              </motion.div>

              {/* Right Column - Profile Image & 3D Scene stacked */}
              <motion.div
                className="order-1 lg:order-2 flex flex-col items-center gap-3 lg:gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Profile Image with 3D Scene combined in GlassCard */}
                <GlassCard className="w-full p-3 sm:p-4 lg:p-5">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    {/* Profile Image */}
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 animate-pulse transition-opacity" />
                      
                      {/* Profile Image */}
                      <motion.img
                        src="/images/profile.jpg"
                        alt="Rodney Naro"
                        className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          borderColor: "rgba(168, 85, 247, 0.6)"
                        }}
                        transition={{ duration: 0.4 }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/256/3b82f6/ffffff?text=RN';
                        }}
                      />
                      
                      {/* Decorative ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    {/* 3D Scene */}
                    {mounted && (
                      <div className="w-full">
                        <div className="h-[140px] xs:h-[160px] sm:h-[180px] lg:h-[200px] relative rounded-lg overflow-hidden bg-black/20 touch-none select-none">
                          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />

                            <Suspense fallback={null}>
                              <Environment preset="city" />
                              <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                                enableDamping={true}
                                dampingFactor={0.05}
                                autoRotate
                                autoRotateSpeed={0.8}
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={Math.PI / 2}
                                touches={{
                                  ONE: 0,
                                  TWO: 0
                                }}
                              />

                              <Stars radius={50} depth={30} count={2000} factor={3} saturation={0} fade speed={1} />
                              <ParticleField />

                              <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
                                <DNAHelix />
                              </Float>

                              <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
                                <mesh>
                                  <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
                                  <MeshDistortMaterial
                                    color="#3b82f6"
                                    speed={2}
                                    distort={0.3}
                                    radius={1}
                                    metalness={0.9}
                                    roughness={0.1}
                                    emissive="#1e40af"
                                    emissiveIntensity={0.4}
                                  />
                                </mesh>
                              </Float>

                              <EffectComposer>
                                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
                                <Vignette eskil={false} offset={0.1} darkness={0.4} />
                              </EffectComposer>
                            </Suspense>
                          </Canvas>
                          
                          <motion.div
                            className="absolute bottom-1 left-0 right-0 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                          >
                            <p className="text-[9px] sm:text-[10px] text-gray-400 flex items-center justify-center gap-0.5">
                              <SparklesIcon className="w-2.5 h-2.5" />
                              Drag to explore
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>



          {/* Animated particles background */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {mounted &&
              particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
              ))}
          </div>
        </section>

        {/* Projects Section with Modern 3D Cards */}
        <section id="projects" ref={projectsRef} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden" style={{ zIndex: 1 }}>
          {/* Background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[5]">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <AnimatedGradientText>Featured Projects</AnimatedGradientText>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Explore my latest work showcasing cutting-edge technologies and innovative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <TiltCard className="h-full">
                    <GlassCard className="h-full p-6 sm:p-8 group cursor-pointer relative overflow-hidden">
                      {/* Top accent bar */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: project.color }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />

                      {/* Hover gradient effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)`
                        }}
                      />

                      <div className="relative z-[2] flex flex-col h-full">
                        {/* Project icon/color indicator */}
                        <motion.div
                          className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Code2 className="w-7 h-7" style={{ color: project.color }} />
                        </motion.div>

                        {/* Title & Link */}
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                            {project.title}
                          </h3>
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: 12 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                          </motion.a>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed flex-grow">
                          {project.description || "A cutting-edge project showcasing modern web technologies and best practices."}
                        </p>

                        {/* View project button */}
                        <motion.div
                          className="mt-6 pt-6 border-t border-white/10"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300 group/link"
                            style={{ color: project.color }}
                          >
                            View Project
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </motion.div>
                      </div>
                    </GlassCard>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section with Modern Circular Progress */}
        <section id="skills" ref={skillsRef} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden" style={{ zIndex: 1 }}>
          {/* Background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[5]">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <AnimatedGradientText>Tech Stack & Skills</AnimatedGradientText>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Expertise across modern web and mobile technologies
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Skills Grid with Circular Progress */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <GlassCard className="p-3 sm:p-4 lg:p-6 text-center group hover:scale-105 transition-transform duration-300 w-full">
                      <motion.div
                        className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-2 sm:mb-3 lg:mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Circular progress background */}
                        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 112 112">
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="6"
                            fill="none"
                          />
                          <motion.circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke={tech.color}
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 314" }}
                            whileInView={{
                              strokeDasharray: `${(tech.level / 100) * 314} 314`
                            }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            style={{
                              filter: `drop-shadow(0 0 8px ${tech.color})`
                            }}
                          />
                        </svg>
                        
                        {/* Icon & Percentage in center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <tech.icon 
                            className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mb-0.5 sm:mb-1" 
                            style={{ color: tech.color }}
                          />
                          <span 
                            className="text-sm sm:text-base lg:text-lg font-bold"
                            style={{ color: tech.color }}
                          >
                            {tech.level}%
                          </span>
                        </div>
                      </motion.div>
                      
                      {/* Tech name */}
                      <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                        {tech.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2">
                        {tech.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {mounted && (
                <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] mt-8 lg:mt-0">
                  <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
                    
                    <Suspense fallback={null}>
                      <OrbitControls 
                        enableZoom={false} 
                        autoRotate 
                        autoRotateSpeed={1}
                        enablePan={false}
                      />
                      
                      <Sparkles count={200} scale={10} size={2} speed={0.5} />
                      
                      {/* 3D skill visualization */}
                      {techStack.map((tech, index) => {
                        const angle = (index / techStack.length) * Math.PI * 2;
                        const radius = 3;
                        const x = Math.cos(angle) * radius;
                        const z = Math.sin(angle) * radius;
                        
                        return (
                          <Float
                            key={tech.name}
                            speed={1.5}
                            rotationIntensity={0.5}
                            floatIntensity={0.5}
                          >
                            <group position={[x, 0, z]}>
                              <mesh>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial 
                                  color={tech.color} 
                                  metalness={0.7} 
                                  roughness={0.2}
                                  emissive={tech.color}
                                  emissiveIntensity={0.3}
                                />
                                <Edges color="white" />
                              </mesh>
                              <Text
                                position={[0, 1.5, 0]}
                                fontSize={0.3}
                                color="white"
                                anchorX="center"
                                anchorY="middle"
                              >
                                {tech.name.split('/')[0]}
                              </Text>
                            </group>
                          </Float>
                        );
                      })}
                      
                      {/* Central animated sphere */}
                      <group>
                        <mesh>
                          <sphereGeometry args={[1.5, 64, 64]} />
                          <MeshWobbleMaterial
                            color="#8b5cf6"
                            speed={2}
                            factor={0.3}
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#8b5cf6"
                            emissiveIntensity={0.5}
                          />
                        </mesh>
                        <mesh scale={1.1}>
                          <sphereGeometry args={[1.5, 32, 32]} />
                          <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
                        </mesh>
                      </group>
                      
                      {/* Post-processing */}
                      <EffectComposer>
                        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} />
                        <Noise opacity={0.02} />
                      </EffectComposer>
                    </Suspense>
                  </Canvas>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section with Premium Design */}
        <section id="contact" ref={contactRef} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden" style={{ zIndex: 1 }}>
          {/* Background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[5]">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <AnimatedGradientText>Get In Touch</AnimatedGradientText>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Let&apos;s collaborate and build something extraordinary together
              </p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-[2]">
                  {/* Left column - Info */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Let&apos;s Build Something Amazing
                        </span>
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        I&apos;m always excited about new challenges and opportunities to create innovative solutions. 
                        Whether you have a project in mind or just want to connect, I&apos;d love to hear from you!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <GlassCard className="p-4 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                            <MapPin className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white mb-1">Location</p>
                            <p className="text-sm text-gray-400">PNG Unitech, Papua New Guinea</p>
                          </div>
                        </div>
                      </GlassCard>

                      <GlassCard className="p-4 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <Mail className="h-6 w-6 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white mb-1">Email</p>
                            <a 
                              href="mailto:rodney.naro@gmail.com"
                              className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                            >
                              rodney.naro@gmail.com
                            </a>
                          </div>
                        </div>
                      </GlassCard>

                      <GlassCard className="p-4 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                            <Zap className="h-6 w-6 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white mb-1">Availability</p>
                            <p className="text-sm text-gray-400">Open for opportunities</p>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </motion.div>

                  {/* Right column - Social connections */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Connect on Social</h3>
                    
                    <div className="space-y-3">
                      <motion.a
                        href="https://github.com/rodnar123"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-14 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group justify-start text-left"
                          size="lg"
                        >
                          <Github className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                          <span className="flex-grow">View GitHub Projects</span>
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                      </motion.a>

                      <motion.a
                        href="https://www.linkedin.com/in/rodney-naro-74378062/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-14 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group justify-start text-left"
                          size="lg"
                        >
                          <Linkedin className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                          <span className="flex-grow">Connect on LinkedIn</span>
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                      </motion.a>

                      <motion.a
                        href="https://www.facebook.com/rodney.naro.965"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-14 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-white/10 hover:border-indigo-400/50 transition-all duration-300 group justify-start text-left"
                          size="lg"
                        >
                          <Facebook className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                          <span className="flex-grow">Follow on Facebook</span>
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                      </motion.a>

                      <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="px-3 text-gray-400 bg-gray-900/50 backdrop-blur-sm">Or send direct email</span>
                        </div>
                      </div>

                      <motion.a
                        href="mailto:rodney.naro@gmail.com"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group"
                          size="lg"
                        >
                          <Mail className="mr-3 h-5 w-5" />
                          <span className="flex-grow">Send Direct Email</span>
                          <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                      </motion.a>
                    </div>

                    {/* Response time badge */}
                    <GlassCard className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span>Usually responds within 24 hours</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Footer with animations */}
        <footer className="py-12 border-t border-gray-800/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 mb-4">
                © 2025 Rodney Naro. Crafted with passion using Next.js, Three.js, GSAP & Framer Motion
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Cpu className="h-4 w-4" />
                  High Performance
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Lightning Fast
                </span>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}