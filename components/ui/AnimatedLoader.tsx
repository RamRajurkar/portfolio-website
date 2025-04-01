"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import "../../styles/loader.css";

const AnimatedLoader: React.FC<{ onLoadingComplete?: () => void }> = ({
  onLoadingComplete,
}) => {
  const [showText, setShowText] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const message = "Welcome to My Portfolio!";
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Typing Animation (Completes in ~1.5s)
  useEffect(() => {
    const typingSpeed = 1500 / message.length; // Dynamic speed to finish in 1.5s
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= message.length) {
        setShowText(message.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  // Progress Animation (Completes in 3s)
  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const updateInterval = 50; // Update progress every 50ms
    const increment = (100 / (totalDuration / updateInterval));

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(progressInterval);
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 300); // Ensure UI settles
          }
          return 100;
        }
        return prev + increment;
      });
    }, updateInterval);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  // Three.js Scene Setup
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainerRef.current.appendChild(renderer.domElement);

    // Rotating TorusKnot
    const geometry = new THREE.TorusKnotGeometry(3, 0.8, 100, 16);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: isDarkTheme ? 0x4488ff : 0x228899,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 15;

    const animate = () => {
      torusKnot.rotation.x += 0.02;
      torusKnot.rotation.y += 0.02;
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      threeContainerRef.current?.removeChild(renderer.domElement);
    };
  }, [isDarkTheme]);

  return (
    <div className={`loading-screen ${isDarkTheme ? "dark" : ""}`}>
      <div className="three-container" ref={threeContainerRef}></div>

      <div className={`content-container ${isDarkTheme ? "dark" : ""}`}>
        <div className="logo-container">
          <img
            src="RamProfile-modified.png"
            alt="Logo"
            className={`logo ${isDarkTheme ? "dark" : ""}`}
          />
          <div className={`logo-ring ${isDarkTheme ? "dark" : ""}`} />
        </div>

        <h1 className={`typing-effect ${isDarkTheme ? "dark" : ""}`}>
          {showText}
          <span className="cursor"></span>
        </h1>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className={`progress-fill ${isDarkTheme ? "dark" : ""}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>

        <div className="wave-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`wave ${isDarkTheme ? "dark" : ""}`}
            />
          ))}
        </div>

        <div className="tech-dots">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`tech-dot ${isDarkTheme ? "dark" : ""}`}
              style={{
                animationDelay: `${0.05 * i}s`,
                animationDuration: "0.5s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
