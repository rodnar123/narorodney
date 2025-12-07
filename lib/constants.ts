/**
 * Application Constants
 * Centralized configuration and magic numbers
 */

// Social Media Links
export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/rodnar123',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/rodney-naro-74378062/',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/rodney.naro.965',
  email: process.env.NEXT_PUBLIC_EMAIL || 'rodney.naro@gmail.com',
} as const;

// Site Configuration
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Rodney Naro Portfolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Full-Stack Developer specializing in TypeScript, React, React Native, and 3D Web Experiences',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rodneynaro.vercel.app',
  location: process.env.NEXT_PUBLIC_LOCATION || 'PNG Unitech, Papua New Guinea',
} as const;

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 1,
  verySlow: 2,
} as const;

// 3D Scene Configuration
export const SCENE_CONFIG = {
  particleCount: 500,
  cameraFov: 75,
  cameraPosition: [0, 0, 5] as [number, number, number],
  orbitSpeed: 0.5,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Tech Stack Data
export const TECH_STACK = [
  { name: "TypeScript", level: 90, color: "#3178c6", description: "Type-safe JavaScript" },
  { name: "React/Next.js", level: 95, color: "#61dafb", description: "Modern web frameworks" },
  { name: "React Native", level: 85, color: "#61dafb", description: "Cross-platform mobile" },
  { name: "Node.js", level: 80, color: "#339933", description: "Backend runtime" },
  { name: "Tailwind CSS", level: 90, color: "#06b6d4", description: "Utility-first CSS" },
  { name: "Three.js/WebGL", level: 75, color: "#000000", description: "3D graphics" },
  { name: "PostgreSQL", level: 80, color: "#4169e1", description: "Relational database" }
] as const;

// Project Colors
export const PROJECT_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ef4444", // red
  "#06b6d4", // cyan
] as const;
