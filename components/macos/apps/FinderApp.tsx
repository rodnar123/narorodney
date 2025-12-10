"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Folder, FileCode, ExternalLink } from 'lucide-react';

export default function FinderApp() {
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      name: "narorodney",
      type: "Next.js Portfolio",
      icon: "🚀",
      tech: ["Next.js", "Three.js", "TypeScript"],
      github: "https://github.com/rodnar123/narorodney"
    },
    {
      name: "hrcasemanagement",
      type: "HR Management System",
      icon: "👥",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/rodnar123/hrcasemanagement"
    },
    {
      name: "Kumul Stoa",
      type: "E-commerce Mobile App",
      icon: "📱",
      tech: ["React Native", "Firebase"],
      github: "https://play.google.com/store/apps/details?id=ran.kumul.stoa"
    },
    {
      name: "Portfolio Projects",
      type: "Various Web Apps",
      icon: "💼",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/rodnar123"
    }
  ];

  // GSAP entrance animations
  useEffect(() => {
    const cards = projectCardsRef.current.filter(Boolean);
    
    // Sidebar slide in
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }

    // Cards staggered entrance with 3D effect
    gsap.fromTo(cards,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotationX: -15,
        transformPerspective: 800
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'back.out(1.4)'
      }
    );
  }, []);

  // Card hover effects
  const handleCardHover = (index: number) => {
    const card = projectCardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.02,
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleCardLeave = (index: number) => {
    const card = projectCardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="w-48 bg-gray-800/50 border-r border-white/5 p-3"
      >
        <div className="space-y-1">
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 text-white text-sm bg-blue-500/20 rounded-md cursor-pointer"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Folder className="w-4 h-4" />
            <span>Projects</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 text-gray-400 text-sm hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileCode className="w-4 h-4" />
            <span>Code</span>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={el => { projectCardsRef.current[index] = el; }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              className="group"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <motion.div 
                    className="text-4xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {project.icon}
                  </motion.div>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                <h3 className="text-white font-semibold mb-1">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.type}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 + techIndex * 0.05 }}
                      className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-md hover:bg-blue-500/30 transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
