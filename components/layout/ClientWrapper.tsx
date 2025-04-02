"use client"

import ParticleBackground from './ParticleBackground'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        body {
        //   background: transparent !important;
        }
      `}</style>
      <ParticleBackground />
      {children}
    </>
  )
}