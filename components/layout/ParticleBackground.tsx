"use client"

import { useCallback } from "react"
import Particles from "react-particles"
import { Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { useTheme } from "next-themes"

export default function ParticleBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 pointer-events-none"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: "transparent"
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "repulse"
            },
            onHover: {
              enable: true,
              mode: "bubble"
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              opacity: isDark ? 0.6 : 0.8,
              size: 6,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          color: {
            value: isDark 
              ? ["#6366f1", "#8b5cf6", "#38bdf8", "#2dd4bf"]  // Dark theme colors
              : ["#2dd4bf", "#818cf8", "#c084fc"]  // Light theme colors
          },
          links: {
            color: isDark ? "#4f46e5" : "#818cf8",
            distance: 150,
            enable: true,
            opacity: isDark ? 0.15 : 0.2,
            width: isDark ? 0.8 : 0.5,
            consent: false,
            blink: true
          },
          move: {
            enable: true,
            speed: isDark ? 2 : 3,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: isDark ? "bounce" : "out"
            },
            bounce: isDark,
            path: {
              enable: !isDark,
              delay: {
                value: 0.1
              },
              options: {
                size: 5,
                draw: false,
                increment: 0.001
              }
            }
          },
          number: {
            density: {
              enable: true,
              area: isDark ? 900 : 800
            },
            value: isDark ? 90 : 100,
            limit: 0
          },
          opacity: {
            value: isDark ? 0.35 : 0.4,
            random: {
              enable: true,
              minimumValue: 0.1
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          shape: {
            type: ["circle", "triangle", "star"]
          },
          size: {
            value: { min: 1, max: isDark ? 3 : 4 },
            random: {
              enable: true,
              minimumValue: 1
            },
            animation: {
              enable: true,
              speed: isDark ? 1.5 : 2,
              minimumValue: 0.1,
              sync: false
            }
          }
        },
        detectRetina: true
      }}
    />
  )
}