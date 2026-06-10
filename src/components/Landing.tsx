import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello_world!&nbsp;I'm</h2>
            <h1>
              HOANG
              <br />
              <span>DUNG</span>
            </h1>
          </div>
          <div className="landing-info">
            {/* <h3>A</h3> */}
            <div className="landing-h2-info">Fullstack Engineer</div>
            <div className="landing-h2-info-1">AI-first Engineer</div>
            <div className="landing-subtitle">
              GenAI-powered &middot; Harness &middot; Chaos Engineering focused
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
