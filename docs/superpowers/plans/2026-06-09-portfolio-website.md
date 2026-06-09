# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio website for Hoang Dung (dungnotnull) by forking MoncyDev/Portfolio-Website, preserving the 3D character animation architecture, and customizing all content, theme, and sections.

**Architecture:** Fork-and-adapt approach. Keep the raw Three.js 3D scene with GSAP scroll animations, replace gsap-trial ScrollSmoother with Lenis and SplitText with a custom utility, strip unused R3F dependencies, rewrite all sections with user's content, and apply a dark theme with purple accent.

**Tech Stack:** React 18, TypeScript, Vite, Three.js, GSAP + ScrollTrigger, Lenis, React Fast Marquee, React Icons

---

## File Map

### Files to KEEP and MODIFY
| File | Change |
|------|--------|
| `package.json` | Remove unused deps, add Lenis |
| `src/index.css` | Update theme variables to purple accent |
| `src/App.css` | Keep as-is |
| `src/App.tsx` | Keep as-is |
| `src/main.tsx` | Keep as-is |
| `src/context/LoadingProvider.tsx` | Keep as-is |
| `src/components/MainContainer.tsx` | Remove Career/WhatIDo, add Vision, update links |
| `src/components/Loading.tsx` | Replace branding text, simplify |
| `src/components/Navbar.tsx` | Replace ScrollSmoother with Lenis, update links |
| `src/components/Landing.tsx` | Replace name/titles |
| `src/components/About.tsx` | Replace with real bio |
| `src/components/Work.tsx` | Replace with real projects |
| `src/components/TechStack.tsx` | Complete rewrite as icon grid (remove R3F) |
| `src/components/Contact.tsx` | Replace with real info |
| `src/components/SocialIcons.tsx` | Replace links, remove Instagram/Twitter |
| `src/components/Cursor.tsx` | Keep as-is (color comes from CSS) |
| `src/components/HoverLinks.tsx` | Keep as-is |
| `src/components/WorkImage.tsx` | Keep as-is |
| `src/components/Character/Scene.tsx` | Cap DPR at 2 |
| `src/components/Character/utils/character.ts` | Remove encryption, load GLTF directly |
| `src/components/Character/utils/animationUtils.ts` | Update GLTF import from three-stdlib to three/examples/jsm |
| `src/components/Character/utils/mouseUtils.ts` | Keep as-is |
| `src/components/Character/utils/lighting.ts` | Update RGBELoader import from three-stdlib to three/examples/jsm |
| `src/components/Character/utils/resizeUtils.ts` | Keep as-is |
| `src/components/utils/GsapScroll.ts` | Remove Career/WhatIDo timelines |
| `src/components/utils/initialFX.ts` | Replace SplitText/ScrollSmoother with custom/Lenis |
| `src/components/utils/splitText.ts` | Replace SplitText with custom utility |
| `src/data/boneData.ts` | Keep as-is |
| `src/components/styles/Cursor.css` | Update colors to purple |
| `src/components/styles/Landing.css` | Update accent colors |
| `src/components/styles/Loading.css` | Update accent colors |
| `public/draco/*` | Keep as-is |
| `public/models/character.glb` | Keep (will be replaced later with user's model) |
| `public/models/char_enviorment.hdr` | Keep as-is |

### Files to CREATE
| File | Purpose |
|------|---------|
| `src/components/Vision.tsx` | New Vision & Goals section |
| `src/components/styles/Vision.css` | Styles for Vision section |
| `src/components/styles/TechStack.css` | Styles for rewritten TechStack grid |
| `src/utils/textSplitter.ts` | Custom SplitText replacement (splits DOM text into chars/words) |

### Files to DELETE
| File | Reason |
|------|--------|
| `src/components/WhatIDo.tsx` | Replaced by Vision section |
| `src/components/styles/WhatIDo.css` | No longer needed |
| `src/components/Career.tsx` | Replaced by Vision section |
| `src/components/styles/Career.css` | No longer needed |
| `src/components/Character/utils/decrypt.ts` | No encryption needed |
| `public/models/character.enc` | Unencrypted GLB used directly |
| `public/models/encrypt.cjs` | No longer needed |
| `public/images/*` | Replace with tech stack icons later |

---

## Task 1: Fork, Clone, and Verify

**Files:**
- Clone: `https://github.com/MoncyDev/Portfolio-Website` into `D:/my-modern-portfolio-space`

- [ ] **Step 1: Fork the repo via GitHub CLI**

```bash
gh repo fork MoncyDev/Portfolio-Website --clone=false
```

If `gh` is not authenticated, fork manually via browser at https://github.com/MoncyDev/Portfolio-Website/fork then clone.

- [ ] **Step 2: Clone the fork into the working directory**

```bash
cd D:/my-modern-portfolio-space
git clone https://github.com/dungnotnull/Portfolio-Website.git .
```

If the directory has existing files (docs/), clone to a temp dir and copy:

```bash
git clone https://github.com/dungnotnull/Portfolio-Website.git /tmp/portfolio-temp
cp -r /tmp/portfolio-temp/* D:/my-modern-portfolio-space/
cp /tmp/portfolio-temp/.* D:/my-modern-portfolio-space/ 2>/dev/null || true
rm -rf /tmp/portfolio-temp
```

- [ ] **Step 3: Install dependencies and verify dev server starts**

```bash
cd D:/my-modern-portfolio-space
npm install
npm run dev
```

Expected: Vite dev server starts at `http://localhost:5173` with the original portfolio rendering.

- [ ] **Step 4: Verify build works**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 5: Commit baseline**

```bash
git add -A
git commit -m "chore: initial fork from MoncyDev/Portfolio-Website"
```

---

## Task 2: Clean Dependencies and Install New Ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused dependencies**

Remove these from `dependencies` in `package.json`:
- `@react-three/cannon`
- `@react-three/drei`
- `@react-three/fiber`
- `@react-three/postprocessing`
- `@react-three/rapier`
- `gsap-trial`
- `three-stdlib`

The `dependencies` section should become:

```json
"dependencies": {
  "@gsap/react": "^2.1.1",
  "@vercel/analytics": "^1.4.1",
  "gsap": "^3.12.7",
  "lenis": "^1.1.18",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-fast-marquee": "^1.6.5",
  "react-icons": "^5.3.0",
  "three": "^0.168.0"
}
```

- [ ] **Step 2: Install updated dependencies**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: Install succeeds, Lenis is installed, unused packages removed.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: Build will fail because of removed imports - that's expected. We'll fix those in subsequent tasks. Just verify package.json is valid JSON and npm install worked.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: clean dependencies, add Lenis, remove unused R3F packages"
```

---

## Task 3: Global Theme and Color Variables

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/styles/Cursor.css`
- Modify: `src/components/styles/Landing.css`
- Modify: `src/components/styles/Loading.css`

- [ ] **Step 1: Update CSS custom properties in `src/index.css`**

Replace the `:root` variables. Change `--accentColor` from `#c2a4ff` to `#8b5cf6` (vivid purple) and `--backgroundColor` from `#0b080c` to `#0a0a0a`:

In `src/index.css`, find:
```css
--accentColor: #c2a4ff;
--backgroundColor: #0b080c;
```

Replace with:
```css
--accentColor: #8b5cf6;
--backgroundColor: #0a0a0a;
```

Also update the `gsap.to("body", { backgroundColor: "#0b080c" ...})` in `initialFX.ts` later (tracked in Task 8).

- [ ] **Step 2: Update Cursor colors in `src/components/styles/Cursor.css`**

Find:
```css
background-color: #e6c3ff;
box-shadow: 0px 0px 30px 0px rgb(175, 131, 255);
```

Replace with:
```css
background-color: #c4b5fd;
box-shadow: 0px 0px 30px 0px rgb(139, 92, 246);
```

- [ ] **Step 3: Update Landing circle colors in `src/components/styles/Landing.css`**

Find the `.landing-circle1` and `.landing-circle2` blocks. Change:
```css
background-color: #fb8dff;
box-shadow: inset -50px 40px 50px rgba(84, 0, 255, 0.6);
```

Replace with:
```css
background-color: #a78bfa;
box-shadow: inset -50px 40px 50px rgba(139, 92, 246, 0.6);
```

Do this for both `.landing-circle1` and `.landing-circle2`.

Also update `.landing-intro h2` color. Find:
```css
.landing-intro h2 {
  ...
  color: var(--accentColor);
```
This already uses the variable, so no change needed.

Update `h2.landing-info-h2` color. Find:
```css
h2.landing-info-h2 {
  color: #c481ff;
```

Replace with:
```css
h2.landing-info-h2 {
  color: #8b5cf6;
```

- [ ] **Step 4: Update Loading screen accent colors in `src/components/styles/Loading.css`**

Find:
```css
.loading-hover {
  background-color: #a87cff;
```

Replace with:
```css
.loading-hover {
  background-color: #8b5cf6;
```

Find:
```css
.loaderGame-ball {
  ...
  background-color: #a87cff;
```

Replace with:
```css
.loaderGame-ball {
  ...
  background-color: #8b5cf6;
```

- [ ] **Step 5: Update `character-rim` color in `src/components/styles/Landing.css`**

Find:
```css
.character-rim {
  ...
  background-color: #f59bf8;
  box-shadow: inset 66px 35px 85px 0px rgba(85, 0, 255, 0.65);
```

Replace with:
```css
.character-rim {
  ...
  background-color: #a78bfa;
  box-shadow: inset 66px 35px 85px 0px rgba(139, 92, 246, 0.65);
```

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/components/styles/Cursor.css src/components/styles/Landing.css src/components/styles/Loading.css
git commit -m "style: update theme to dark with purple accent"
```

---

## Task 4: Custom Text Splitting Utility

**Files:**
- Create: `src/utils/textSplitter.ts`

The original uses `gsap-trial/SplitText` which is a paid plugin. We create a free replacement that splits DOM text nodes into wrapped characters, words, and lines.

- [ ] **Step 1: Create the text splitting utility**

Create `src/utils/textSplitter.ts`:

```typescript
interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export function splitText(
  element: HTMLElement | HTMLElement[],
  options: {
    type?: string;
    linesClass?: string;
  } = {}
): SplitResult {
  const elements = Array.isArray(element) ? element : [element];
  const allChars: HTMLElement[] = [];
  const allWords: HTMLElement[] = [];
  const allLines: HTMLElement[] = [];
  const revertFns: (() => void)[] = [];

  const needChars = options.type?.includes("chars") ?? false;
  const needWords = options.type?.includes("words") || needChars;
  const needLines = options.type?.includes("lines") ?? false;

  elements.forEach((el) => {
    const originalHTML = el.innerHTML;
    const originalNodes = Array.from(el.childNodes);

    const words: HTMLElement[] = [];
    const chars: HTMLElement[] = [];

    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalHTML;

    const processNode = (node: Node, parent: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const wordTexts = text.split(/(\s+)/);

        wordTexts.forEach((wordText) => {
          if (!wordText) return;

          if (/^\s+$/.test(wordText)) {
            parent.appendChild(document.createTextNode(wordText));
            return;
          }

          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.className = "split-word";

          if (needChars) {
            for (const char of wordText) {
              const charSpan = document.createElement("span");
              charSpan.style.display = "inline-block";
              charSpan.className = "split-char";
              charSpan.textContent = char === " " ? " " : char;
              wordSpan.appendChild(charSpan);
              chars.push(charSpan);
            }
          } else {
            wordSpan.textContent = wordText;
          }

          parent.appendChild(wordSpan);
          words.push(wordSpan);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as HTMLElement;
        const clone = elem.cloneNode(false) as HTMLElement;
        parent.appendChild(clone);
        Array.from(elem.childNodes).forEach((child) =>
          processNode(child, clone)
        );
      }
    };

    Array.from(tempDiv.childNodes).forEach((node) => processNode(node, el));

    allChars.push(...chars);
    allWords.push(...words);

    revertFns.push(() => {
      el.innerHTML = originalHTML;
    });

    if (needLines) {
      const lineMap = new Map<number, HTMLElement[]>();
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const top = Math.round(rect.top);
        if (!lineMap.has(top)) {
          lineMap.set(top, []);
        }
        lineMap.get(top)!.push(word);
      });

      const lines: HTMLElement[] = [];
      lineMap.forEach((lineWords) => {
        const lineSpan = document.createElement("div");
        if (options.linesClass) {
          lineSpan.className = options.linesClass;
        }
        lineSpan.style.overflow = "hidden";
        lineWords.forEach((w) => lineSpan.appendChild(w));
        el.appendChild(lineSpan);
        lines.push(lineSpan);
        allLines.push(lineSpan);
      });
    }
  });

  return {
    chars: allChars,
    words: allWords,
    lines: allLines,
    revert: () => revertFns.forEach((fn) => fn()),
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/textSplitter.ts
git commit -m "feat: add custom text splitting utility to replace gsap-trial SplitText"
```

---

## Task 5: Lenis Integration and Remove GSAP-Trial References

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/utils/initialFX.ts`
- Modify: `src/components/utils/splitText.ts`

- [ ] **Step 1: Rewrite `src/components/Navbar.tsx` to use Lenis**

Replace the entire file content:

```tsx
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenisInstance: Lenis;

const Navbar = () => {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenisInstance.scrollTo(0);
    lenisInstance.stop();

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          if (section) {
            const target = document.querySelector(section);
            if (target) {
              lenisInstance.scrollTo(target, { offset: 0 });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          dungnotnull
        </a>
        <a
          href="mailto:contact@dungnotnull.dev"
          className="navbar-connect"
          data-cursor="disable"
        >
          contact@dungnotnull.dev
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#projects" href="#projects">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#techstack" href="#techstack">
              <HoverLinks text="TECH STACK" />
            </a>
          </li>
          <li>
            <a data-href="#vision" href="#vision">
              <HoverLinks text="VISION" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
```

- [ ] **Step 2: Rewrite `src/components/utils/initialFX.ts` to use custom SplitText and Lenis**

Replace the entire file content:

```tsx
import { splitText } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenisInstance } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  lenisInstance.start();
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0a0a",
    duration: 0.5,
    delay: 1,
  });

  const landingH3 = document.querySelector(".landing-info h3") as HTMLElement;
  const landingH2 = document.querySelector(".landing-intro h2") as HTMLElement;
  const landingH1 = document.querySelector(".landing-intro h1") as HTMLElement;

  const landingTextElems = [landingH3, landingH2, landingH1].filter(
    Boolean
  ) as HTMLElement[];
  const landingText = splitText(landingTextElems, {
    type: "chars,lines",
    linesClass: "split-line",
  });

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const landingH2Info = document.querySelector(
    ".landing-h2-info"
  ) as HTMLElement;
  if (landingH2Info) {
    const landingText2 = splitText(landingH2Info, {
      type: "chars,lines",
      linesClass: "split-h2",
    });
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingH2Info1 = document.querySelector(
    ".landing-h2-info-1"
  ) as HTMLElement;
  const landingH21 = document.querySelector(".landing-h2-1") as HTMLElement;
  const landingH22 = document.querySelector(".landing-h2-2") as HTMLElement;

  if (landingH2Info && landingH2Info1) {
    const text1 = splitText(landingH2Info, {
      type: "chars,lines",
      linesClass: "split-h2",
    });
    const text2 = splitText(landingH2Info1, {
      type: "chars,lines",
      linesClass: "split-h2",
    });
    loopText(text1, text2);
  }

  if (landingH21 && landingH22) {
    const text3 = splitText(landingH21, {
      type: "chars,lines",
      linesClass: "split-h2",
    });
    const text4 = splitText(landingH22, {
      type: "chars,lines",
      linesClass: "split-h2",
    });
    loopText(text3, text4);
  }
}

function loopText(
  text1: { chars: HTMLElement[] },
  text2: { chars: HTMLElement[] }
) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
```

- [ ] **Step 3: Rewrite `src/components/utils/splitText.ts` to use custom SplitText**

Replace the entire file content:

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "../../utils/textSplitter";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: ReturnType<typeof splitText>;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const triggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const toggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = splitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = splitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/utils/initialFX.ts src/components/utils/splitText.ts
git commit -m "feat: replace gsap-trial ScrollSmoother/SplitText with Lenis and custom text splitter"
```

---

## Task 6: Update Loading Screen

**Files:**
- Modify: `src/components/Loading.tsx`

- [ ] **Step 1: Update Loading.tsx branding and simplify**

Replace the entire file content:

```tsx
import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          dungnotnull
        </a>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full-stack Engineer</span>
            <span> AI Agent Builder</span>
            <span> Chaos Engineering</span>
            <span> Full-stack Engineer</span>
            <span> AI Agent Builder</span>
            <span> Chaos Engineering</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
```

Key changes: removed the mini-game (`loaderGame` div), updated logo text to "dungnotnull", updated marquee text to user's titles.

- [ ] **Step 2: Commit**

```bash
git add src/components/Loading.tsx
git commit -m "feat: update loading screen with dungnotnull branding"
```

---

## Task 7: Update Landing/Hero Section

**Files:**
- Modify: `src/components/Landing.tsx`

- [ ] **Step 1: Update Landing.tsx with user's name and titles**

Replace the entire file content:

```tsx
import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              HOANG
              <br />
              <span>DUNG</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full-stack Engineer</div>
              <div className="landing-h2-2">AI Agent Builder</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Full-stack Engineer</div>
              <div className="landing-h2-info-1">AI Agent Builder</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Landing.tsx
git commit -m "feat: update hero section with Hoang Dung name and titles"
```

---

## Task 8: Update About Section

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Update About.tsx with real bio**

Replace the entire file content:

```tsx
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Hoang Dung, a Full-stack Engineer with an M.Sc. in Information
          and Digital Technology, based in Vietnam. I specialize in building
          AI-powered agent frameworks, GenAI workflows, and chaos engineering
          pipelines. With deep expertise in Python, TypeScript, Rust, and C, I
          bridge the gap between cutting-edge AI research and production-ready
          systems. When I'm not shipping agents, I'm exploring the math behind
          it all.
        </p>
      </div>
    </div>
  );
};

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: update about section with real bio"
```

---

## Task 9: Create Vision & Goals Section

**Files:**
- Create: `src/components/Vision.tsx`
- Create: `src/components/styles/Vision.css`

- [ ] **Step 1: Create Vision.tsx**

```tsx
import "./styles/Vision.css";

const Vision = () => {
  return (
    <div className="vision-section" id="vision">
      <div className="vision-container">
        <h2 className="title">
          Vision <span>&</span> Goals
        </h2>
        <div className="vision-content">
          <p className="para">
            Pushing the boundaries of autonomous AI agents and agentic coding
            workflows. Building frameworks that make engineering more
            autonomous, resilient, and intelligent. Harnessing chaos engineering
            principles to create systems that don't just survive failure, they
            learn from it.
          </p>
          <p className="para">
            My goal is to democratize AI agent development, making it
            accessible for every engineer to build, test, and deploy intelligent
            agents that handle the complexity of modern software systems. From
            computer vision pipelines to scam detection platforms, from DevOps
            automation to self-improving CLIs, the future is agentic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
```

- [ ] **Step 2: Create Vision.css**

```css
.vision-section {
  display: flex;
  align-items: center;
  justify-content: center;
  place-items: center;
  position: relative;
  height: auto;
  width: var(--cWidth);
  max-width: 1920px;
  margin: auto;
  padding: 100px 0;
}

.vision-container {
  width: 100%;
  max-width: 900px;
}

.vision-section h2 {
  font-size: 60px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 50px 0;
  letter-spacing: 2px;
}

.vision-section h2 > span {
  color: var(--accentColor);
}

.vision-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.vision-content p {
  font-size: 24px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.5px;
  color: #d4d4d4;
}

@media only screen and (max-width: 1400px) {
  .vision-section h2 {
    font-size: 50px;
  }
  .vision-content p {
    font-size: 20px;
  }
}

@media only screen and (max-width: 900px) {
  .vision-section {
    padding: 50px 0;
  }
  .vision-section h2 {
    font-size: 40px;
  }
  .vision-content p {
    font-size: 16px;
  }
  .vision-container {
    width: calc(100% - 25px);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Vision.tsx src/components/styles/Vision.css
git commit -m "feat: add Vision & Goals section"
```

---

## Task 10: Update Projects/Work Section

**Files:**
- Modify: `src/components/Work.tsx`

- [ ] **Step 1: Update Work.tsx with real GitHub projects**

Replace the entire file content:

```tsx
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "Hybrid Harness Chaos PRM",
    category: "AI Agent Framework",
    description:
      "Comprehensive AI Agent skill framework standardizing Harness & Chaos Engineering workflows",
    tools: "Python, AI Agents, DevOps",
    link: "https://github.com/dungnotnull/hybrid-harness-chaos-process-prm",
  },
  {
    name: "OpenCLI",
    category: "AI CLI Agent",
    description:
      "Unified self-improving AI CLI agent optimized for 12+ LLMs with context compression and cost tracking",
    tools: "TypeScript, LLMs, Docker",
    link: "https://github.com/dungnotnull/openCLI-all-your-LLM-just-need",
  },
  {
    name: "Futureminal2",
    category: "AI-Native Environment",
    description:
      "AI-native operating environment for developers combining intelligent terminals and automation",
    tools: "Rust, AI, Workflows",
    link: "https://github.com/dungnotnull/futureminal2",
  },
  {
    name: "Scam Whisperer",
    category: "Computer Vision",
    description:
      "Vision-first scam analysis platform detecting phishing, impersonation, and social engineering attacks",
    tools: "TypeScript, CV, Security",
    link: "https://github.com/dungnotnull/scam-whisperer-agent",
  },
  {
    name: "WiFi Elderly Care",
    category: "Deep Learning",
    description:
      "Contactless elderly care monitoring using WiFi CSI with deep learning for activity recognition",
    tools: "C, Python, Deep Learning",
    link: "https://github.com/dungnotnull/wifi-sensing-based-elderlycare-deeplearning",
  },
  {
    name: "Multi-Camera Pipeline",
    category: "Computer Vision",
    description:
      "Multi-camera video analytics for detecting suspected cases with multi-object tracking and ReID",
    tools: "Jupyter, Python, CV",
    link: "https://github.com/dungnotnull/ticket-suspicion-multicamera-pipeline-computer-vision",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="projects">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Description</h4>
                <p>{project.description}</p>
                <h4>Tech Stack</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image="/images/placeholder.webp"
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Work.tsx
git commit -m "feat: update projects section with real GitHub repos"
```

---

## Task 11: Rewrite Tech Stack Section

**Files:**
- Rewrite: `src/components/TechStack.tsx`
- Create: `src/components/styles/TechStack.css`

The original uses R3F + Rapier physics for 3D bouncing spheres. We replace it with a clean icon grid since we removed all R3F dependencies.

- [ ] **Step 1: Rewrite TechStack.tsx as a simple grid**

```tsx
import {
  FaPython,
  FaRust,
  FaReact,
  FaDocker,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiC,
  SiThreedotjs,
  SiTensorflow,
  SiPytorch,
  SiPostgresql,
  SiLinux,
  SiGit,
} from "react-icons/si";
import "./styles/TechStack.css";

const skills = [
  { name: "Python", icon: FaPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Rust", icon: FaRust },
  { name: "C", icon: SiC },
  { name: "React", icon: FaReact },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Docker", icon: FaDocker },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "PyTorch", icon: SiPytorch },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: FaGithub },
];

const TechStack = () => {
  return (
    <div className="techstack" id="techstack">
      <h2>
        My <span>Tech Stack</span>
      </h2>
      <div className="tech-grid">
        {skills.map((skill, index) => (
          <div className="tech-item" key={index}>
            <skill.icon className="tech-icon" />
            <span className="tech-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
```

- [ ] **Step 2: Create TechStack.css**

```css
.techstack {
  width: 100%;
  max-width: 1920px;
  margin: auto;
  padding: 100px 0;
  position: relative;
}

.techstack h2 {
  font-size: 60px;
  text-align: center;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 60px;
  letter-spacing: 2px;
}

.techstack h2 > span {
  color: var(--accentColor);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px 15px;
  border-radius: 12px;
  background-color: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.3s ease;
}

.tech-item:hover {
  background-color: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-5px);
}

.tech-icon {
  font-size: 36px;
  color: var(--accentColor);
}

.tech-name {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #d4d4d4;
}

@media only screen and (max-width: 900px) {
  .techstack h2 {
    font-size: 40px;
  }
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
  }
  .tech-item {
    padding: 20px 10px;
  }
  .tech-icon {
    font-size: 28px;
  }
}

@media only screen and (max-width: 600px) {
  .techstack {
    padding: 50px 0;
  }
  .techstack h2 {
    font-size: 30px;
    margin-bottom: 30px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TechStack.tsx src/components/styles/TechStack.css
git commit -m "feat: rewrite tech stack as icon grid, remove R3F physics"
```

---

## Task 12: Update Contact Section

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Update Contact.tsx with user's info**

Replace the entire file content:

```tsx
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:contact@dungnotnull.dev"
                data-cursor="disable"
              >
                contact@dungnotnull.dev
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/dungnotnull"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/truonghoangdung57/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Hoang Dung</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: update contact section with real info"
```

---

## Task 13: Update Social Icons

**Files:**
- Modify: `src/components/SocialIcons.tsx`

- [ ] **Step 1: Update SocialIcons.tsx with user's links**

Replace the entire file content:

```tsx
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { useEffect } from "react";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/dungnotnull" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/truonghoangdung57/"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
```

Removed: Instagram, Twitter, Resume button (not applicable). Kept: GitHub, LinkedIn with real URLs.

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialIcons.tsx
git commit -m "feat: update social icons with real GitHub and LinkedIn links"
```

---

## Task 14: Update 3D Character System (Remove Encryption)

**Files:**
- Modify: `src/components/Character/utils/character.ts`
- Modify: `src/components/Character/Scene.tsx`

- [ ] **Step 1: Update `character.ts` to load GLTF directly**

Replace the entire file content:

```typescript
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<THREE.GLTF | null>((resolve, reject) => {
      try {
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
```

Key changes: imports GLTFLoader/DRACOLoader from `three/examples/jsm/loaders/` instead of `three-stdlib`, removed encryption/decryption, loads `character.glb` directly.

- [ ] **Step 2: Update Scene.tsx to cap DPR at 2**

In `src/components/Character/Scene.tsx`, find:
```typescript
renderer.setPixelRatio(window.devicePixelRatio);
```

Replace with:
```typescript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

Also update the GLTF type import. Find:
```typescript
import { GLTF } from "three-stdlib";
```

This import will fail since we removed `three-stdlib`. The original uses `GLTF` type from `three-stdlib`. Replace with the Three.js built-in type. In `animationUtils.ts`, the GLTF type is used. We need to check what Three.js provides.

Actually, Three.js exports `GLTF` from `three/examples/jsm/loaders/GLTFLoader.js` starting from r152+. But it's a runtime import, not a type. Let's use a simple interface instead.

In `src/components/Character/utils/animationUtils.ts`, find:
```typescript
import { GLTF } from "three-stdlib";
```

Replace with:
```typescript
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
```

Same in `src/components/Character/utils/character.ts` if the `GLTF` type is used (it's not in our rewritten version, but the `THREE.GLTF` reference needs fixing).

Actually, in our rewritten `character.ts` above, we used `THREE.GLTF` which doesn't exist. Fix the return type:

Find:
```typescript
return new Promise<THREE.GLTF | null>((resolve, reject) => {
```

Replace with:
```typescript
return new Promise<any>((resolve, reject) => {
```

This is simpler and avoids the type import issue.

- [ ] **Step 3: Update lighting.ts to remove three-stdlib import**

In `src/components/Character/utils/lighting.ts`, find:
```typescript
import { RGBELoader } from "three-stdlib";
```

Replace with:
```typescript
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Character/utils/character.ts src/components/Character/Scene.tsx src/components/Character/utils/animationUtils.ts src/components/Character/utils/lighting.ts
git commit -m "feat: remove encryption, load GLTF directly, cap DPR, fix three-stdlib imports"
```

---

## Task 15: Update MainContainer and GsapScroll

**Files:**
- Modify: `src/components/MainContainer.tsx`
- Modify: `src/components/utils/GsapScroll.ts`

- [ ] **Step 1: Update MainContainer.tsx**

Replace the entire file content:

```tsx
import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Vision from "./Vision";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Vision />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
```

Changes: removed Career and WhatIDo imports, added Vision, kept section order per spec.

- [ ] **Step 2: Update GsapScroll.ts to remove Career/WhatIDo references**

Replace the entire file content:

```typescript
import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#8b5cf6");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });

  let neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(
          ".character-model",
          { x: 0 },
          { x: "-25%", duration: 1 },
          0
        )
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(
          character.rotation,
          { y: 0.92, x: 0.12, delay: 3, duration: 3 },
          0
        )
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(
          monitor.material,
          { opacity: 1, duration: 0.8, delay: 3.2 },
          0
        )
        .to(
          screenLight.material,
          { opacity: 1, duration: 0.8, delay: 4.5 },
          0
        )
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );
    }
  }
}

export function setAllTimeline() {
  // Career/WhatIDo timelines removed.
  // Scroll-triggered animations for Vision/Projects/TechStack
  // are handled by their own components via GSAP ScrollTrigger.
}
```

Key changes: removed `tl3` (WhatIDo trigger), removed Career timeline, changed emissive color to `#8b5cf6` (purple accent).

- [ ] **Step 3: Commit**

```bash
git add src/components/MainContainer.tsx src/components/utils/GsapScroll.ts
git commit -m "feat: update MainContainer section order and clean GsapScroll timelines"
```

---

## Task 16: Delete Unused Files

**Files:**
- Delete: `src/components/WhatIDo.tsx`
- Delete: `src/components/styles/WhatIDo.css`
- Delete: `src/components/Career.tsx`
- Delete: `src/components/styles/Career.css`
- Delete: `src/components/Character/utils/decrypt.ts`
- Delete: `public/models/encrypt.cjs`

- [ ] **Step 1: Delete the files**

```bash
rm src/components/WhatIDo.tsx
rm src/components/styles/WhatIDo.css
rm src/components/Career.tsx
rm src/components/styles/Career.css
rm src/components/Character/utils/decrypt.ts
rm public/models/encrypt.cjs
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove unused WhatIDo, Career, decrypt, and encrypt files"
```

---

## Task 17: Performance Optimizations

**Files:**
- Modify: `src/components/Character/Scene.tsx` (DPR cap already done in Task 14)
- Modify: `vite.config.ts`

- [ ] **Step 1: Update Vite config for production optimization**

Replace `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
  },
});
```

- [ ] **Step 2: Verify the index.html has proper meta tags**

In `index.html`, ensure the `<head>` includes:

```html
<meta name="description" content="Hoang Dung - Full-stack Engineer | AI Agent Builder | Chaos Engineering" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Update the `<title>` to:

```html
<title>Hoang Dung | Portfolio</title>
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts index.html
git commit -m "perf: optimize Vite build config and update HTML meta"
```

---

## Task 18: Build Verification and Bug Fixes

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors. Fix any type errors that arise from the changes above. Common issues:
- Missing type for `Lenis` - may need `@types/lenis` or declare module
- `GLTF` type from Three.js examples may need adjustment

If Lenis types are missing, create `src/lenis.d.ts`:

```typescript
declare module "lenis" {
  class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (t: number) => number;
      smoothWheel?: boolean;
    });
    on(event: string, callback: (args: any) => void): void;
    scrollTo(target: string | number | Element, options?: any): void;
    raf(time: number): void;
    start(): void;
    stop(): void;
    destroy(): void;
  }
  export default Lenis;
}
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build completes successfully with no errors.

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Loading screen shows with "dungnotnull" branding
- Loading completes and reveals hero section
- Hero shows "HOANG DUNG" with rotating titles
- 3D character loads and responds to mouse
- Navbar shows correct links
- About section has real bio
- Vision section renders
- Projects section shows 6 cards with horizontal scroll
- Tech Stack shows icon grid
- Contact shows GitHub and LinkedIn
- All colors are purple accent on dark background
- Custom cursor works

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: fix build issues and verify all sections"
```

---

## Self-Review Checklist

After completing all tasks, run this checklist:

1. **Spec coverage**: Each section in the design spec (Loading, Navbar, Landing, About, Vision, Projects, Tech Stack, Contact) has a corresponding task.

2. **Placeholder scan**: No TBD/TODO in any code. Email uses placeholder `contact@dungnotnull.dev` (acknowledged in spec).

3. **Type consistency**: All `lenisInstance` references use the same variable exported from `Navbar.tsx`. All `splitText` references use the custom utility from `src/utils/textSplitter.ts`.

4. **Removed dependencies**: gsap-trial, three-stdlib, @react-three/* all removed from package.json AND all import statements updated.

5. **Color consistency**: All accent colors updated to `#8b5cf6`, all background colors to `#0a0a0a`.
