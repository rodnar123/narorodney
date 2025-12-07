'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Facebook, Mail } from 'lucide-react';
import { Button } from './ui/button';

interface MobileMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MobileMenu({ activeSection, setActiveSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/rodnar123', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rodney-naro-74378062/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/rodney.naro.965', label: 'Facebook' },
    { icon: Mail, href: 'mailto:rodney.naro@gmail.com', label: 'Email' },
  ];

  const handleMenuClick = (href: string, section: string) => {
    setIsOpen(false);
    setActiveSection(section);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className={`lg:hidden fixed top-4 right-4 p-3 rounded-xl backdrop-blur-xl transition-all ${
          scrolled
            ? 'bg-gray-900/90 border border-gray-700/50 shadow-xl'
            : 'bg-gray-800/50 border border-gray-700/30'
        }`}
        style={{ zIndex: 9999 }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden"
              style={{ zIndex: 9997 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-black border-l border-gray-700/50 lg:hidden overflow-y-auto shadow-2xl"
              style={{ zIndex: 9998 }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full p-8 pt-20">
                {/* Profile Section */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.img
                    src="/images/profile.jpg"
                    alt="Rodney Naro"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500/50 shadow-xl shadow-blue-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Rodney Naro
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">Full-Stack Developer</p>
                </motion.div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2" role="navigation" aria-label="Mobile navigation">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.href, item.label.toLowerCase());
                      }}
                      className={`block px-6 py-4 rounded-xl text-lg font-semibold transition-all ${
                        activeSection === item.label.toLowerCase()
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Social Links */}
                <motion.div
                  className="pt-6 border-t border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-400 text-sm mb-4">Connect with me</p>
                  <div className="grid grid-cols-4 gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all group"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl font-semibold shadow-lg shadow-blue-500/25"
                    onClick={() => {
                      setIsOpen(false);
                      handleMenuClick('#contact', 'contact');
                    }}
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
