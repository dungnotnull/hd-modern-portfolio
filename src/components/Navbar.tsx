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
    const isDesktop = window.innerWidth > 1024;

    lenisInstance = new Lenis({
      duration: 1.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: isDesktop,
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
            const target = document.querySelector(section) as HTMLElement;
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
          href="mailto:truonghoangdung57@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          truonghoangdung57@gmail.com
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
