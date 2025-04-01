"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

function AnimatedSphere({ position, color, scale = 1 }) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  )
}

function AnimatedTorus({ position, color, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <AnimatedSphere position={[-4, 2, -5]} color="#6366f1" scale={1.5} />
      <AnimatedSphere position={[4, -2, -3]} color="#8b5cf6" scale={1} />
      <AnimatedTorus position={[0, 0, -2]} color="#ec4899" scale={1.2} rotation={[Math.PI / 4, 0, 0]} />
      <AnimatedTorus position={[-3, -1, -4]} color="#14b8a6" scale={0.8} rotation={[0, Math.PI / 4, 0]} />

      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block">Hi, I'm</span>
            <span className="block text-primary mt-2">John Doe</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            A full-stack developer specializing in creating immersive digital experiences with React, Three.js, and
            Node.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Get in Touch
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm mb-2">Scroll Down</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  )
}

