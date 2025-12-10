"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import MenuBar from '@/components/macos/MenuBar';
import Dock from '@/components/macos/Dock';
import Window from '@/components/macos/Window';
import FinderApp from '@/components/macos/apps/FinderApp';
import TerminalApp from '@/components/macos/apps/TerminalApp';
import AboutApp from '@/components/macos/apps/AboutApp';

interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function MacOSPage() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Boot animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stunning background parallax on mouse move
  useEffect(() => {
    if (!backgroundRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.02;
      const moveY = (clientY - window.innerHeight / 2) * 0.02;
      
      gsap.to(backgroundRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { 
      id: 'finder', 
      name: 'Finder', 
      icon: '📁',
      component: FinderApp,
      defaultSize: { width: 900, height: 600 },
      defaultPosition: { x: 100, y: 80 }
    },
    { 
      id: 'terminal', 
      name: 'Terminal', 
      icon: '⌘',
      component: TerminalApp,
      defaultSize: { width: 800, height: 500 },
      defaultPosition: { x: 150, y: 120 }
    },
    { 
      id: 'about', 
      name: 'About Me', 
      icon: '👤',
      component: AboutApp,
      defaultSize: { width: 700, height: 550 },
      defaultPosition: { x: 200, y: 100 }
    },
    { 
      id: 'safari', 
      name: 'Safari', 
      icon: '🧭',
      component: null,
      defaultSize: { width: 1000, height: 700 },
      defaultPosition: { x: 80, y: 60 }
    },
  ];

  const openApp = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // Check if window already exists
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      // Bring to front and unminimize
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      }
      return;
    }

    // Create new window
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId: appId,
      title: app.name,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
      position: app.defaultPosition,
      size: app.defaultSize
    };

    setHighestZIndex(prev => prev + 1);
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  const focusWindow = (windowId: string) => {
    setActiveWindow(windowId);
    setHighestZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, zIndex: highestZIndex + 1 }
        : w
    ));
  };

  const toggleMinimize = (windowId: string) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId
        ? { ...w, isMinimized: !w.isMinimized }
        : w
    ));
  };

  const toggleMaximize = (windowId: string) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId
        ? { ...w, isMaximized: !w.isMaximized }
        : w
    ));
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId
        ? { ...w, position }
        : w
    ));
  };

  const updateWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId
        ? { ...w, size }
        : w
    ));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/25 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-500/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 0.95, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[80px]"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 80, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${(i * 3.7) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* macOS Wallpaper with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Menu Bar */}
      <MenuBar currentTime={currentTime} />

      {/* Desktop Area */}
      <div className="relative h-[calc(100vh-25px)] pt-[25px]">
        <AnimatePresence>
          {windows.map(window => {
            const app = apps.find(a => a.id === window.appId);
            if (!app || !app.component) return null;
            
            const AppComponent = app.component;
            
            return (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                icon={app.icon}
                isActive={activeWindow === window.id}
                isMinimized={window.isMinimized}
                isMaximized={window.isMaximized}
                zIndex={window.zIndex}
                position={window.position}
                size={window.size}
                onClose={() => closeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onMinimize={() => toggleMinimize(window.id)}
                onMaximize={() => toggleMaximize(window.id)}
                onPositionChange={(pos: { x: number; y: number }) => updateWindowPosition(window.id, pos)}
                onSizeChange={(size: { width: number; height: number }) => updateWindowSize(window.id, size)}
              >
                <AppComponent />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock 
        apps={apps}
        openWindows={windows}
        onAppClick={openApp}
        onWindowClick={focusWindow}
      />
    </div>
  );
}
