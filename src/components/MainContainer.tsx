import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import BackToTop from "./BackToTop";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import ProfileArt from "./ProfileArt";
import Projects from "./Projects";
import SocialIcons from "./SocialIcons";
import Vision from "./Vision";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import StarField from "./StarField";

const TechStack = lazy(() => import("./TechStack"));
const AIAgents = lazy(() => import("./AIAgents"));

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
      {isDesktopView && <StarField />}
      {isDesktopView && <Cursor />}
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Vision />
            <Projects />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Suspense fallback={<div>Loading....</div>}>
              <AIAgents />
            </Suspense>
            <ProfileArt />
            <Contact />
            <BackToTop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
