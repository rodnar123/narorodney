'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

/**
 * Animated Gradient Text
 * Smooth color transitions for premium feel
 */
export default function AnimatedGradientText({
  children,
  className = '',
  colors = ['from-blue-400', 'via-purple-500', 'to-pink-500'],
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${colors.join(' ')} bg-clip-text text-transparent font-black ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </motion.span>
  );
}
