"use client";

import { useState, useEffect } from "react";
import "./HeroImage.css";

const HeroImage: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateY = ((x / width) - 0.5) * -30; // Left-Right tilt
    const rotateX = ((y / height) - 0.5) * 30; // Up-Down tilt

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <div
      className={`hero-image-container ${isLoaded ? "fade-in" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="RamProfile-modified.png"
        alt="Ram Rajurkar"
        className="hero-image"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      />
    </div>
  );
};

export default HeroImage;
