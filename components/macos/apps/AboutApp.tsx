"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Mail, MapPin, Download } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute -bottom-12 left-8">
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-gray-900 overflow-hidden shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <img
              src="/images/profile.jpg"
              alt="Rodney Naro"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-white mb-1">Rodney Naro</h1>
          <p className="text-gray-400 mb-1">Full-Stack Developer</p>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>PNG Unitech, Lae, Papua New Guinea</span>
          </div>

          {/* Bio */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-300 text-sm leading-relaxed">
              Master&apos;s degree holder in Information Technology with specialized expertise in cloud computing, AI, 
              and full-stack development. Passionate about creating modern web experiences with React, Next.js, and Three.js. 
              Currently serving as IT Tutor at PNG University of Technology.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">6+</div>
              <div className="text-xs text-gray-400">Projects</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">10+</div>
              <div className="text-xs text-gray-400">Technologies</div>
            </div>
            <div className="text-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
              <div className="text-2xl font-bold text-pink-400">5+</div>
              <div className="text-xs text-gray-400">Years Exp</div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="space-y-2 mb-6">
            <a
              href="https://github.com/rodnar123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition group"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              <span className="text-gray-300 group-hover:text-white transition">github.com/rodnar123</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rodney-naro-74378062/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition group"
            >
              <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition" />
              <span className="text-gray-300 group-hover:text-white transition">LinkedIn Profile</span>
            </a>

            <a
              href="mailto:rodney.naro@gmail.com"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition group"
            >
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
              <span className="text-gray-300 group-hover:text-white transition">rodney.naro@gmail.com</span>
            </a>
          </div>

          {/* Download CV Button */}
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold transition"
          >
            <Download className="w-4 h-4" />
            Back to Portfolio
          </a>
        </motion.div>
      </div>
    </div>
  );
}
