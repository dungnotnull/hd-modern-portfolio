# Hoang Dung - Portfolio

A cinematic, dark-themed personal portfolio built with React, Three.js, and GSAP. Features a 3D character, smooth scroll-triggered animations, and a seamless loading-to-content transition.

---

## Sections

| Section | Description |
|---------|-------------|
| **Loading** | Animated progress bar with marquee roles, interactive hover effect, and cinematic button expansion transition |
| **Landing** | GSAP-powered character-by-character text entrance with blur and stagger effects |
| **About** | Brief introduction and background |
| **Vision & Goals** | Philosophy on AI agents, chaos engineering, and agentic workflows |
| **Projects** | Scroll-triggered project cards with hover animations (ACB Bank, Ski, VALOvietnam, Balance, Thermomix) |
| **Work** | Open-source work showcase (Harness Chaos, Multi-camera, Scam Detection, OpenCLI, etc.) |
| **Tech Stack** | Icon grid: Python, TypeScript, Rust, React, Node.js, TensorFlow, PyTorch, PostgreSQL, MongoDB, Docker, AWS, Linux |
| **AI Agents** | AI tool expertise: Claude, Gemini, ChatGPT, DeepSeek, GLM, Copilot, Cursor |
| **Contact** | Contact form and social links |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| 3D Rendering | Three.js (interactive character model) |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Build | Vite |
| Styling | CSS (custom properties, no framework) |
| Analytics | Vercel Analytics |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Architecture

```
src/
├── App.tsx                    # Root: LoadingProvider + lazy-loaded children
├── context/
│   └── LoadingProvider.tsx    # React context for loading state
├── components/
│   ├── Loading.tsx            # Cinematic loading screen + transition controller
│   ├── MainContainer.tsx      # Layout orchestrator (desktop/mobile detection)
│   ├── Landing.tsx            # Hero section with animated text
│   ├── About.tsx              # About section
│   ├── Vision.tsx             # Vision & Goals section
│   ├── Projects.tsx           # Project showcase with scroll animations
│   ├── Work.tsx               # Open-source work gallery
│   ├── TechStack.tsx          # Tech skills icon grid
│   ├── AIAgents.tsx           # AI tools expertise
│   ├── Contact.tsx            # Contact section
│   ├── Navbar.tsx             # Navigation bar (Lenis smooth scroll)
│   ├── SocialIcons.tsx        # Social media links
│   ├── ProfileArt.tsx         # Profile artwork display
│   ├── BackToTop.tsx          # Scroll-to-top button
│   ├── StarField.tsx          # Animated star background
│   ├── Cursor.tsx             # Custom cursor (desktop)
│   ├── Character/             # Three.js 3D character model
│   ├── HoverLinks.tsx         # Interactive hover links
│   ├── WorkImage.tsx          # Work item image component
│   ├── utils/
│   │   └── initialFX.ts       # Post-loading GSAP animation orchestrator
│   └── styles/                # Component CSS modules
└── utils/
    └── textSplitter.ts        # GSAP SplitText utility
```

### Loading Transition Flow

```
3D model loads → progress bar fills
        ↓ percent >= 100
  600ms pause → "Welcome" button appears
        ↓ 1000ms
  initialFX() fires immediately → main content starts animating
        ↓ 500ms (content now partially visible behind loading)
  Loading screen fades out (0.8s CSS transition)
        ↓ 800ms
  Loading screen unmounts → content fully visible
```

The key design decision: `initialFX()` runs **while** the loading screen is still visible, so by the time it fades out, the main content is already mid-animation with no visible gap.

---

## Features

- **Cinematic loading sequence** with progress tracking, marquee text, interactive hover glow, and button expansion animation
- **3D character model** rendered with Three.js (desktop only)
- **GSAP text splitting** with character-level blur/fade/stagger entrance animations
- **Scroll-triggered reveals** for project cards and content sections
- **Smooth scrolling** via Lenis with custom navbar integration
- **Custom cursor** on desktop viewports
- **Star field background** with animated particles
- **Responsive design** with desktop-specific features (3D, cursor, star field)
- **Hidden scrollbar** for immersive full-screen experience

---

## Usage Notice

This project is shared for learning purposes only.

Please do NOT:
- Clone or replicate the full website or design
- Repost it with minor content changes
- Use this project for commercial/client work
- Create tutorials or content using this exact project

If you use parts of the code, you must provide proper credit linking back to the original repository.

Build your own version - don't just copy.

---

## Deployment

Built for deployment on **Vercel** with zero configuration. Push to GitHub and connect the repo - Vercel auto-detects Vite.

---

## License

MIT
