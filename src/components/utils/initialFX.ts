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
