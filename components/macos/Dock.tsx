"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface App {
  id: string;
  name: string;
  icon: string;
}

interface WindowState {
  id: string;
  appId: string;
  isMinimized: boolean;
}

interface DockProps {
  apps: App[];
  openWindows: WindowState[];
  onAppClick: (appId: string) => void;
  onWindowClick: (windowId: string) => void;
}

interface DockIconProps {
  app: App;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  mouseX: number | null;
  dockRef: React.RefObject<HTMLDivElement | null>;
}

function DockIcon({ app, isOpen, onClick, index, mouseX, dockRef }: DockIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate scale based on mouse distance (authentic macOS dock effect)
  useEffect(() => {
    if (!iconRef.current || mouseX === null) {
      // Reset when mouse leaves dock
      gsap.to(iconRef.current, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
      return;
    }

    const icon = iconRef.current;
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenterX);
    
    // Magnification parameters
    const maxScale = 1.8;
    const maxDistance = 150;
    
    // Calculate scale based on distance (closer = bigger)
    let scale = 1;
    if (distance < maxDistance) {
      const normalizedDistance = distance / maxDistance;
      // Use cosine for smooth falloff
      scale = 1 + (maxScale - 1) * Math.cos(normalizedDistance * Math.PI / 2);
    }
    
    // Clamp scale
    scale = gsap.utils.clamp(1, maxScale, scale);
    
    // Apply animation
    gsap.to(icon, {
      scale,
      y: -(scale - 1) * 25,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [mouseX]);

  // Bounce animation on click
  const handleClick = useCallback(() => {
    if (iconRef.current) {
      // Bouncing animation
      gsap.timeline()
        .to(iconRef.current, {
          y: -30,
          duration: 0.15,
          ease: 'power2.out'
        })
        .to(iconRef.current, {
          y: 0,
          duration: 0.4,
          ease: 'bounce.out'
        });
    }
    onClick();
  }, [onClick]);

  return (
    <div 
      className="relative flex flex-col items-center dock-icon-wrapper"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
    >
      {/* App Name Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute -top-12 bg-gray-800/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium whitespace-nowrap shadow-xl border border-white/10 z-50"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {app.name}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800/95 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Icon */}
      <div
        ref={iconRef}
        onClick={handleClick}
        className="relative w-14 h-14 rounded-2xl cursor-pointer dock-icon"
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Icon Background with Glass Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent opacity-60" />
          
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 shadow-inner rounded-2xl" />
        </div>
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl z-10">
          {app.icon}
        </div>

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute -inset-2 bg-white/20 rounded-3xl blur-xl -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Running Indicator */}
      {isOpen && (
        <motion.div
          className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-white/90 shadow-lg shadow-white/50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        />
      )}
    </div>
  );
}

export default function Dock({ apps, openWindows, onAppClick, onWindowClick }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  // Track mouse position over dock
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseX(e.clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  // Initial dock entrance animation
  useEffect(() => {
    if (iconsContainerRef.current) {
      const icons = iconsContainerRef.current.querySelectorAll('.dock-icon-wrapper');
      
      gsap.fromTo(icons,
        {
          y: 100,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <motion.div
      ref={dockRef}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dock Container */}
      <div className="relative">
        {/* Dock Background with enhanced glass effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-[22px] border border-white/20 shadow-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-white/10 rounded-[22px]" />
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] rounded-[22px]" />
        
        {/* Dock Icons */}
        <div 
          ref={iconsContainerRef}
          className="relative flex items-end gap-2 px-3 py-2"
        >
          {apps.map((app, index) => {
            const isOpen = openWindows.some(w => w.appId === app.id);
            
            return (
              <DockIcon
                key={app.id}
                app={app}
                isOpen={isOpen}
                onClick={() => onAppClick(app.id)}
                index={index}
                mouseX={mouseX}
                dockRef={dockRef}
              />
            );
          })}

          {/* Divider */}
          <div className="w-[1px] h-12 bg-white/20 mx-1 self-center" />

          {/* Trash */}
          <DockIcon
            app={{ id: 'trash', name: 'Trash', icon: '🗑️' }}
            isOpen={false}
            onClick={() => {}}
            index={apps.length}
            mouseX={mouseX}
            dockRef={dockRef}
          />
        </div>

        {/* Dock Reflection */}
        <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-t from-white/5 to-transparent rounded-b-[18px] blur-md opacity-50" />
      </div>
    </motion.div>
  );
}
