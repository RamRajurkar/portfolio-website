"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import AnimatedLoader from "@/components/ui/AnimatedLoader";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false);

  // Handle completion of the loader
  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  // Show main content with a slight delay for smooth transition
  useEffect(() => {
    if (loadingComplete) {
      const timer = setTimeout(() => {
        setMainContentVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loadingComplete]);

  return (
    <main className="min-h-screen bg-background">
      {!loadingComplete && (
        <AnimatedLoader onLoadingComplete={handleLoadingComplete} />
      )}
      
      <div 
        className={`transition-opacity duration-500 ${
          mainContentVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ display: loadingComplete ? "block" : "none" }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        {/* <Blog /> */}
        <Contact />
        <Footer />
      </div>
    </main>
  );
}