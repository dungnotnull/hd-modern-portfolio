import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Projects.css";

gsap.registerPlugin(ScrollTrigger);

const myProjects = [
  {
    name: "ACB Bank",
    category: "Official Website",
    description:
      "New official website for ACB Bank - one of Vietnam's leading commercial banks, delivering a modern digital banking experience.",
    tools: "Full-stack, Banking system",
    thumbnail: "/images/projects/acb.png",
  },
  {
    name: "Ski",
    category: "Official System",
    description:
      "Platform dedicated to simplifying and enhancing ski vacation planning and booking experiences and blogs.",
    tools: "Full-stack, System Design",
    thumbnail: "/images/projects/ski.png",
  },
  {
    name: "VALOvietnam",
    category: "E-commerce Platform",
    description:
      "Platform designed for suppliers and administrators to manage supplier side, and ecommerce website for buyers.",
    tools: "Technical Lead, AI Focused",
    thumbnail: "/images/projects/valo.png",
  },
  {
    name: "Balance",
    category: "E-commerce Platform",
    description:
      "Agriculture E-commerce platform for connecting products and services between farmers and consumers.",
    tools: "Full-stack, Solution Focused",
    thumbnail: "/images/projects/balance.webp",
  },
  {
    name: "Thermomix",
    category: "Product Platform",
    description:
      "Digital platform and companion experience for Thermomix smart kitchen appliances, enhancing the cooking journey",
    tools: "Full-stack, Frontend Focused",
    thumbnail: "/images/projects/thermomix.png",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.innerWidth <= 1024) return;

    const cards = containerRef.current.querySelectorAll(".project-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="projects-section section-container" id="projects">
      <h2>
        My <span>Projects</span>
      </h2>
      <div className="projects-grid" ref={containerRef}>
        {myProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-card__img">
              <img src={project.thumbnail ?? "/images/placeholder.webp"} alt={project.name} />
            </div>
            <div className="project-card__body">
              <div className="project-card__tag">{project.category}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="project-card__tech">{project.tools}</span>
            </div>
          </div>
        ))}
        <a
          href="https://www.linkedin.com/in/truonghoangdung57/"
          target="_blank"
          className="project-card project-card--cta"
          data-cursor="disable"
        >
          <div className="project-card__body">
            <div className="project-cta-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <h3>And more</h3>
            <p>View all my projects and experience on LinkedIn</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Projects;
