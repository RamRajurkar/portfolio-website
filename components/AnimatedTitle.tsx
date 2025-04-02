'use client'

import { useEffect } from 'react'

export default function AnimatedTitle() {
  useEffect(() => {
    const titles = [
      "Ram Rajurkar | Portfolio",
      "Ram | AI Architect",
      "Ram | Software Engineer",
      "Ram | Full Stack Developer"
    ];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      document.title = titles[currentIndex];
      currentIndex = (currentIndex + 1) % titles.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}