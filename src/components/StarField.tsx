import { useMemo } from "react";
import "./styles/StarField.css";

const StarField = () => {
  const stars = useMemo(() => {
    const result: {
      id: number;
      className: string;
      style: React.CSSProperties;
    }[] = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random();
      let className = "star ";
      if (size < 0.6) {
        className += "star--small";
      } else if (size < 0.9) {
        className += "star--medium star--twinkle";
      } else {
        className += "star--large star--twinkle";
      }
      result.push({
        id: i,
        className,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        },
      });
    }
    return result;
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <div key={star.id} className={star.className} style={star.style} />
      ))}
      <div className="nebula nebula--1" />
      <div className="nebula nebula--2" />
      <div className="nebula nebula--3" />
    </div>
  );
};

export default StarField;
