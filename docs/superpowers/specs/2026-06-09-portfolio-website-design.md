# Portfolio Website Design Spec

## Overview

Personal portfolio website for Hoang Dung (dungnotnull), built on the animation architecture from MoncyDev/Portfolio-Website. Dark theme, purple accent, 3D animated character, GSAP scroll animations. Deployed to Vercel.

## Stack

- React 18 + TypeScript + Vite (from fork)
- Three.js (raw canvas, not R3F) + GLTFLoader + DRACOLoader
- GSAP + ScrollTrigger (free plugins)
- Lenis (replaces gsap-trial ScrollSmoother - free, MIT, smaller bundle)
- React Fast Marquee (loading screen text)
- React Icons
- Vercel Analytics

## Removed Dependencies (from original)

- `gsap-trial` - replaced by Lenis
- `@react-three/cannon` - unused
- `@react-three/drei` - unused (raw Three.js approach)
- `@react-three/fiber` - unused
- `@react-three/postprocessing` - unused
- `@react-three/rapier` - unused
- `three-stdlib` - GLTFLoader and DRACOLoader available from `three/examples/jsm/loaders/`

## Design Tokens

- **Background**: Dark (#0a0a0a or similar)
- **Text**: White/light gray
- **Accent**: Purple/Violet (e.g., #8b5cf6)
- **Font**: System font stack or single web font (to be decided)

## Sections (top to bottom)

### 1. Loading Screen

- Progress bar with purple accent fill
- "HOANGDUNG" branding text
- Tagline: "Full-stack Engineer | AI Agent Builder"
- Marquee text scroll
- Fades out once 3D model loaded
- Simplified from original (no mini-game)

### 2. Navbar (fixed)

- Left: "dungnotnull" as logo text
- Right: email (placeholder), section links (ABOUT, PROJECTS, TECH STACK, VISION, CONTACT)
- Hover text-swap animation from original
- Smooth scroll via Lenis
- Background circles and fade effect from original

### 3. Landing/Hero

- Split layout: text left, 3D character right (desktop); stacked on mobile
- Text content:
  - "Hello! I'm"
  - "HOANG DUNG" (large, animated reveal)
  - Rotating titles: "Full-stack Engineer" / "AI Agent Builder" / "Chaos Engineering"
- 3D character: idle animation, head mouse-tracking, typing animation

### 4. About Me

- Brief bio paragraph
- M.Sc. in IDT
- Expertise: GenAI, Harness/Chaos Engineering, Computer Vision, Math
- Scroll-triggered fade-in

### 5. Vision & Goals

- Statement-style section
- Direction: pushing boundaries of AI agents, agentic coding workflows, autonomous engineering
- Scroll-triggered stagger animation

### 6. Projects/Work

- Horizontal scroll (GSAP ScrollTrigger pin, from original)
- 6 cards from pinned GitHub repos:
  1. hybrid-harness-chaos-process-prm - AI Agent skill framework for Harness & Chaos Engineering (Python, 17 stars)
  2. openCLI-all-your-LLM-just-need - Unified AI CLI agent for 12+ LLMs (TypeScript)
  3. futureminal2 - AI-native operating environment for developers (Rust)
  4. scam-whisperer-agent - Vision-first scam analysis platform (TypeScript)
  5. wifi-sensing-based-elderlycare-deeplearning - WiFi CSI elderly care monitoring (C)
  6. ticket-suspicion-multicamera-pipeline-computer-vision - Multi-camera video analytics (Jupyter Notebook)
- Each card: number, project name, short description, tech stack
- Placeholder images (swappable later)

### 7. Tech Stack

- Grid of skill badges with icons
- Python, TypeScript, Rust, C, React, Three.js, Docker, GenAI, LLMs, etc.
- Scroll-triggered stagger entrance

### 8. Contact

- Email (placeholder for now)
- GitHub: https://github.com/dungnotnull
- LinkedIn: https://www.linkedin.com/in/truonghoangdung57/
- Footer: "Designed and Developed by Hoang Dung" + copyright 2025

## Custom Cursor

- Trailing circle that snaps to interactive elements
- Purple accent color (changed from original)
- `data-cursor` attribute system kept from original

## 3D Character Strategy

### Source

Free character from Mixamo or ReadyPlayerMe. Neutral standing/sitting pose with skeleton rig. Download as FBX, convert to GLTF via Blender, compress with Draco.

### Animations

- **Idle breathing/sway**: loop
- **Typing**: loop (character at desk coding)
- **Blink**: loop, periodic
- **Head mouse-tracking**: runtime procedural (from original)
- **Eyebrow raise on hover**: from original
- **Intro animation**: play once on load

If the free model lacks pre-built animations, procedural bone animations handle head tracking and blinking in code (original already does this). A simple idle clip suffices.

### Loading Flow

1. Draco-compressed GLTF loads directly (no encryption)
2. Progress bar tracks actual load percentage
3. Character fades in with intro animation
4. Head tracking activates after intro completes

### Responsive Behavior

- Desktop (>1024px): 3D character rendered alongside page content
- Mobile (<=1024px): 3D character rendered below landing text
- Same responsive logic as original

## Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| 3D Model Load | < 3s on fast 3G |
| Lighthouse Performance | > 85 |
| Total JS Bundle | < 300KB gzipped |
| Animation FPS | Stable 60fps |

## Performance Optimizations

- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` - cap DPR at 2 (original does not cap)
- `frustumCulled = true` on all meshes (from original)
- Lazy-load 3D scene, TechStack, and non-critical sections via `React.lazy`
- Remove unused dependencies (cannon, drei, fiber, postprocessing, rapier)
- Lenis replaces gsap-trial ScrollSmoother (smaller, free)
- Code-split each major section
- WebP images with responsive sizes

## Git Strategy

- Fork MoncyDev/Portfolio-Website to dungnotnull
- Build and verify everything locally first
- Git history wipe (orphan branch + force push) done at the end after 100% completion
- NOT done during development
