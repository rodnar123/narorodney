"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export default function Window({
  id,
  title,
  icon,
  isActive,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
  children
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevState, setPrevState] = useState<{ position: { x: number; y: number }; size: { width: number; height: number } } | null>(null);

  // Window open animation
  useEffect(() => {
    if (windowRef.current && !isMinimized) {
      setIsAnimating(true);
      
      gsap.fromTo(windowRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: 100,
          rotationX: -15,
          transformPerspective: 1000,
          transformOrigin: 'center bottom'
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
          onComplete: () => setIsAnimating(false)
        }
      );
      
      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
        );
      }
    }
  }, []);

  // Handle close with animation
  const handleClose = useCallback(() => {
    if (windowRef.current && !isAnimating) {
      setIsAnimating(true);
      
      gsap.to(windowRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 30,
        rotationX: 10,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setIsAnimating(false);
          onClose();
        }
      });
    }
  }, [onClose, isAnimating]);

  // Handle minimize with genie effect
  const handleMinimize = useCallback(() => {
    if (windowRef.current && !isAnimating) {
      setIsAnimating(true);
      
      // Store current state for restore
      setPrevState({ position, size });
      
      gsap.to(windowRef.current, {
        scaleX: 0.1,
        scaleY: 0.05,
        y: window.innerHeight - 100,
        opacity: 0,
        transformOrigin: 'bottom center',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          setIsAnimating(false);
          onMinimize();
        }
      });
    }
  }, [onMinimize, isAnimating, position, size]);

  // Handle maximize with smooth transition
  const handleMaximize = useCallback(() => {
    if (windowRef.current && !isAnimating) {
      setIsAnimating(true);
      
      if (!isMaximized) {
        // Store current state
        setPrevState({ position, size });
        
        // Maximize animation
        gsap.to(windowRef.current, {
          left: 0,
          top: 25,
          width: '100%',
          height: 'calc(100vh - 95px)',
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            setIsAnimating(false);
            onMaximize();
          }
        });
      } else {
        // Restore animation
        if (prevState) {
          gsap.to(windowRef.current, {
            left: prevState.position.x,
            top: prevState.position.y,
            width: prevState.size.width,
            height: prevState.size.height,
            duration: 0.4,
            ease: 'power3.inOut',
            onComplete: () => {
              setIsAnimating(false);
              onMaximize();
            }
          });
        }
      }
    }
  }, [onMaximize, isAnimating, isMaximized, position, size, prevState]);

  // Focus animation
  const handleFocus = useCallback(() => {
    if (windowRef.current && !isActive) {
      gsap.fromTo(windowRef.current,
        { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
        { 
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          duration: 0.3,
          yoyo: true,
          repeat: 1
        }
      );
    }
    onFocus();
  }, [onFocus, isActive]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isMaximized) return;
    handleFocus();
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(25, e.clientY - dragOffset.y);
      
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? { left: 0, top: 25, right: 0, bottom: 70, width: '100%', height: 'calc(100% - 95px)' }
    : { left: position.x, top: position.y, width: size.width, height: size.height };

  return (
    <motion.div
      ref={windowRef}
      className="absolute"
      style={{
        ...windowStyle,
        zIndex,
      }}
      onMouseDown={handleFocus}
    >
      {/* Window Container with enhanced glass effect */}
      <div className={`relative w-full h-full rounded-xl flex flex-col overflow-hidden transition-shadow duration-300 ${
        isActive 
          ? 'shadow-2xl shadow-black/50' 
          : 'shadow-xl shadow-black/30'
      }`}>
        {/* Window glass background */}
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-2xl rounded-xl" />
        <div className={`absolute inset-0 rounded-xl border transition-colors duration-300 ${
          isActive ? 'border-white/20' : 'border-white/10'
        }`} />
        
        {/* Title Bar */}
        <div
          className={`relative h-10 flex items-center justify-between px-4 cursor-move border-b transition-colors duration-300 ${
            isActive ? 'bg-gray-800/60 border-white/10' : 'bg-gray-900/40 border-white/5'
          }`}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleMaximize}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 group">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57] transition-all duration-200 flex items-center justify-center relative overflow-hidden group/btn"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X className="w-2 h-2 text-[#990000] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e] transition-all duration-200 flex items-center justify-center relative overflow-hidden"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minus className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840] transition-all duration-200 flex items-center justify-center relative overflow-hidden"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Maximize2 className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </button>
          </div>

          {/* Title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span className={`text-sm font-medium transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-gray-500'
            }`}>
              {title}
            </span>
          </div>

          <div className="w-20" />
        </div>

        {/* Window Content */}
        <div 
          ref={contentRef}
          className="relative flex-1 overflow-auto bg-gradient-to-br from-gray-900/50 to-gray-950/50"
        >
          {children}
        </div>

        {/* Bottom resize handle indicator */}
        {!isMaximized && (
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white/30">
              <path fill="currentColor" d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
