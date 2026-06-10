import {
  FaPython,
  FaRust,
  FaReact,
  FaDocker,
  FaNodeJs,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiPostgresql,
  SiLinux,
} from "react-icons/si";
import "./styles/TechStack.css";

const skills = [
  { name: "Python", icon: FaPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Rust", icon: FaRust },
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "PyTorch", icon: SiPytorch },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: FaDocker },
  { name: "AWS", icon: FaAws },
  { name: "Linux", icon: SiLinux },
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
