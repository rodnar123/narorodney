"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Apple, Wifi, Battery, Search } from 'lucide-react';

interface MenuBarProps {
  currentTime: string;
}

export default function MenuBar({ currentTime }: MenuBarProps) {
  const menuItemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Staggered entrance animation
  useEffect(() => {
    const menuItems = menuItemsRef.current.filter(Boolean);
    const icons = iconsRef.current.filter(Boolean);

    gsap.fromTo(menuItems,
      { opacity: 0, y: -10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        stagger: 0.05, 
        delay: 0.3,
        ease: 'back.out(1.7)' 
      }
    );

    gsap.fromTo(icons,
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3, 
        stagger: 0.08, 
        delay: 0.5,
        ease: 'back.out(2)' 
      }
    );
  }, []);

  // Menu hover effect
  const handleMenuHover = (index: number) => {
    const item = menuItemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleMenuLeave = (index: number) => {
    const item = menuItemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  };

  const menuItems = ['Finder', 'File', 'Edit', 'View', 'Go'];

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[25px] bg-black/40 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-3 text-white text-xs font-medium z-50"
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Left Section */}
      <div className="relative flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Apple className="w-4 h-4" />
        </motion.div>
        <div className="flex items-center gap-1">
          {menuItems.map((item, index) => (
            <span
              key={item}
              ref={el => { menuItemsRef.current[index] = el; }}
              onMouseEnter={() => handleMenuHover(index)}
              onMouseLeave={() => handleMenuLeave(index)}
              className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex items-center gap-3">
        <div ref={el => { iconsRef.current[0] = el; }}>
          <Search className="w-3.5 h-3.5 cursor-pointer hover:opacity-70 transition" />
        </div>
        <div ref={el => { iconsRef.current[1] = el; }}>
          <Battery className="w-3.5 h-3.5" />
        </div>
        <div ref={el => { iconsRef.current[2] = el; }}>
          <Wifi className="w-3.5 h-3.5" />
        </div>
        <motion.span 
          className="font-mono tabular-nums"
          key={currentTime}
          initial={{ opacity: 0.5, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentTime}
        </motion.span>
      </div>
    </motion.div>
  );
}
