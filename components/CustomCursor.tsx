"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<Array<HTMLDivElement | null>>([null, null, null])

  // Wait for client-side hydration to complete
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Animate trail dots only after mounting
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          setTimeout(() => {
            dot.style.opacity = '0.3'
            setTimeout(() => {
              dot.style.opacity = '0'
            }, 150)
          }, i * 50)
        }
      })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      const isClickable = 
        hoveredElement?.tagName === "BUTTON" || 
        hoveredElement?.tagName === "A" ||
        hoveredElement?.closest("button") || 
        hoveredElement?.closest("a") ||
        window.getComputedStyle(hoveredElement || document.body).cursor === "pointer"
      
      setIsPointer(isClickable)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseover", updateCursorType)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseover", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mounted, position])

  // Don't render anything during SSR
  if (!mounted) return null;

  // Use resolvedTheme instead of theme for more consistent behavior
  const isDark = resolvedTheme === 'dark'
  const cursorColor = isDark ? '#6366f1' : '#4f46e5'
  const accentColor = isDark ? '#818cf8' : '#4338ca'

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        
        @keyframes fadeOut {
          0% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        
        .trail-dot {
          position: fixed;
          pointer-events: none;
          z-index: 9996;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease;
        }
        
        .cursor-dot {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: opacity 0.3s ease;
        }
        
        .cursor-ring {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        }
        
        .cursor-fx {
          position: fixed;
          pointer-events: none;
          z-index: 9997;
          transition: opacity 0.3s ease;
        }
      `}</style>
      
      {/* Main cursor dot */}
      <div 
        ref={cursorRef}
        className="cursor-dot"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          width: clicked ? '8px' : '12px',
          height: clicked ? '8px' : '12px',
          backgroundColor: cursorColor,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px ${cursorColor}`,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s ease, transform 0.1s ease'
        }}
      />
      
      {/* Cursor ring */}
      <div 
        className="cursor-ring"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: isVisible ? (isPointer ? 0.8 : 0.4) : 0,
          width: clicked ? '20px' : isPointer ? '40px' : '30px',
          height: clicked ? '20px' : isPointer ? '40px' : '30px',
          border: `1.5px solid ${cursorColor}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Click effect */}
      {clicked && (
        <div 
          className="cursor-fx"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            width: '60px',
            height: '60px',
            border: `1.5px solid ${cursorColor}`,
            borderRadius: '50%',
            animation: 'ripple 0.6s ease-out forwards'
          }}
        />
      )}
      
      {/* Pointer indicator */}
      {isPointer && (
        <div 
          className="cursor-fx"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            width: '60px',
            height: '60px',
            border: `1px solid ${cursorColor}`,
            borderRadius: '50%',
            opacity: 0.2,
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 1.5s infinite'
          }}
        />
      )}
      
      {/* Trail dots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={el => trailRefs.current[i] = el}
          className="trail-dot"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${8 - i * 2}px`,
            height: `${8 - i * 2}px`,
            backgroundColor: cursorColor,
            opacity: 0,
            transitionDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </>
  )
}