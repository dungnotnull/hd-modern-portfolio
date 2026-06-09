import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return;
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
      <div className="work-container section-container" ref={containerRef}>
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
          <div className="work-box work-box-cta" key="cta">
            <div className="work-info">
              <div className="work-title">
                <h3>0{projects.length + 1}</h3>
                <div>
                  <h4>And more...</h4>
                  <p>Explore all repos</p>
                </div>
              </div>
              <h4>Discover more</h4>
              <p>
                Check out 100+ projects spanning AI agents, computer vision,
                DevOps, security tools, and more on my GitHub profile.
              </p>
            </div>
            <a
              href="https://github.com/dungnotnull?tab=repositories"
              target="_blank"
              className="work-cta-link"
              data-cursor="disable"
            >
              <span>View All Repositories</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
