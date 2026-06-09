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
