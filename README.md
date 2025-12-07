# 🌟 Rodney Naro - Portfolio

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-Latest-black?logo=three.js)](https://threejs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  
  **A stunning 3D interactive portfolio showcasing full-stack development expertise**
  
  [Live Demo](https://rodneynaro.vercel.app) · [Report Bug](https://github.com/rodnar123/rodneynaroprofile/issues) · [Request Feature](https://github.com/rodnar123/rodneynaroprofile/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact](#contact)

---

## 🎯 About

This is my personal portfolio website built with cutting-edge web technologies. It features stunning 3D animations, smooth scroll interactions, and a modern, responsive design. The portfolio showcases my skills as a Full-Stack Developer specializing in TypeScript, React, React Native, and advanced web technologies.

### ✨ Highlights

- 🎨 **3D Graphics** - Interactive Three.js scenes with particle systems and animated geometries
- 🚀 **Performance** - Optimized for speed with Next.js 15 and Turbopack
- 📱 **Responsive** - Fully responsive design that works on all devices
- ♿ **Accessible** - Built with accessibility best practices
- 🎭 **Animations** - Smooth GSAP and Framer Motion animations
- 🔍 **SEO Optimized** - Comprehensive meta tags and structured data

---

## ✨ Features

- ✅ **Interactive 3D Hero Section** with floating tech spheres and DNA helix animation
- ✅ **Project Showcase** with animated cards and GitHub integration
- ✅ **Skills Visualization** with 3D tech stack representation
- ✅ **Contact Section** with social media integration
- ✅ **Smooth Scrolling** with parallax effects
- ✅ **Loading Animation** with progress indicator
- ✅ **Error Boundaries** for graceful error handling

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.3.4](https://nextjs.org/) with App Router & Turbopack
- **UI Library**: [React 19](https://reactjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rodnar123/rodneynaroprofile.git
cd rodneynaroprofile
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Create environment file**

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
rodneygithub/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page component
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── DNAHelix.tsx        # 3D DNA helix component
│   ├── ParticleField.tsx   # Particle system component
│   ├── TechSphere.tsx      # 3D tech sphere component
│   └── ErrorBoundary.tsx   # Error handling component
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # App constants
├── public/                  # Static assets
│   └── images/
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## 🔐 Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_EMAIL=your.email@example.com
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rodnar123/rodneynaroprofile)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

---

## ⚡ Performance

### Optimization Strategies

- ✅ **Code Splitting** - Automatic with Next.js
- ✅ **Lazy Loading** - Suspense for 3D components
- ✅ **Memoization** - useMemo for expensive calculations
- ✅ **Tree Shaking** - Removing unused code

---

## 📧 Contact

**Rodney Naro**

- 🌐 Website: [rodneynaro.vercel.app](https://rodneynaro.vercel.app)
- 💼 LinkedIn: [rodney-naro-74378062](https://www.linkedin.com/in/rodney-naro-74378062/)
- 🐙 GitHub: [@rodnar123](https://github.com/rodnar123)
- 📧 Email: rodney.naro@gmail.com
- 📍 Location: PNG Unitech, Papua New Guinea

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Three.js](https://threejs.org/) - 3D library
- [GSAP](https://greensock.com/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">
  
  **⭐ Star this repo if you found it helpful!**
  
  Made with ❤️ by [Rodney Naro](https://github.com/rodnar123)
  
</div>
