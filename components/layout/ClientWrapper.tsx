"use client"

import ParticleBackground from './ParticleBackground'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        body {
          /* background: transparent !important; */
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      <ParticleBackground />
      {children}
    </>
  )
}