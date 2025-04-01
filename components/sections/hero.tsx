"use client"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import HeroImage from "@/components/HeroImage"

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
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center bg-white">
      <div className="container mx-auto px-6 z-10 flex flex-col-reverse lg:flex-row items-center justify-between">

        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Hi, I'm</span>
            <span className="block text-primary mt-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ram Rajurkar
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            AI Architect & Software Engineer specializing in intelligent systems, immersive user experiences, and scalable digital solutions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <button
              className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-900 transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get in Touch
            </button>

            <button
              className="border-2 border-black px-8 py-3 rounded-full text-lg hover:bg-black hover:text-white transition-all duration-300"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </button>
          </div>
        </motion.div>

        {/* Floating + 3D Animated Image */}
        <div className="flex-1 flex justify-center items-center">
          <HeroImage />
          {/* Hide 3D objects on smaller devices for performance */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* <Canvas>
              <Scene />
            </Canvas> */}
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm mb-2">Scroll Down</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  )
}
