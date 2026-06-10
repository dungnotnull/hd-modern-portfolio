import { SiOpenai } from "react-icons/si";
import { SiClaude } from "react-icons/si";
import { SiGooglegemini } from "react-icons/si";
import { SiGithubcopilot } from "react-icons/si";
import "./styles/AIAgents.css";

/**
 * DeepSeek — stylized whale/fish silhouette (brand mascot).
 * Simplified path that reads clearly at small sizes.
 */
const DeepSeekIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" width="1em" height="1em" role="img" aria-label="DeepSeek">
    {/* Body */}
    <ellipse cx="15" cy="17" rx="10" ry="7" />
    {/* Tail fin */}
    <path d="M24 15 Q30 10 29 18 Q30 24 24 20 Z" />
    {/* Eye */}
    <circle cx="11" cy="15" r="1.5" fill="var(--backgroundColor, #0a0a0a)" />
    {/* Top fin */}
    <path d="M14 10 Q17 5 20 10 Z" />
    {/* Bubble */}
    <circle cx="7" cy="10" r="1.2" opacity="0.6" />
    <circle cx="5" cy="7" r="0.8" opacity="0.4" />
  </svg>
);

/**
 * GLM / ChatGLM (Zhipu AI) — stylized "Z" lettermark inside a rounded square.
 */
const GLMIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" role="img" aria-label="GLM">
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    {/* Bold Z shape */}
    <path d="M7 8h10L7 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

/**
 * Cursor AI — the actual editor icon: a sharp downward-pointing triangle
 * (the "cursor" arrow) with a small spark at the tip.
 */
const CursorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" role="img" aria-label="Cursor">
    <path d="M12 2L4 22l8-3.5 8 3.5L12 2z" />
    <line x1="12" y1="6" x2="12" y2="18.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const aiTools = [
  { name: "Claude", Icon: SiClaude },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "ChatGPT", Icon: SiOpenai },
  { name: "DeepSeek", Icon: DeepSeekIcon },
  { name: "GLM", Icon: GLMIcon },
  { name: "Copilot", Icon: SiGithubcopilot },
  { name: "Cursor", Icon: CursorIcon },
];

const AIAgents = () => {
  return (
    <div className="ai-agents" id="ai-agents">
      <h2>
        AI Agents <span>Expertise</span>
      </h2>
      <div className="ai-grid">
        {aiTools.map((tool) => (
          <div className="ai-item" key={tool.name}>
            <div className="ai-icon">
              <tool.Icon />
            </div>
            <span className="ai-name">{tool.name}</span>
          </div>
        ))}
        <div className="ai-item ai-item--more">
          <span className="ai-more-dots">+ &middot;&middot;&middot;</span>
          <span className="ai-name">more</span>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;
