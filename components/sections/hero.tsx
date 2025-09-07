"use client"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowDown, Github, Linkedin, Instagram } from "lucide-react"
import { useState, useEffect } from "react"
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
  const [showSocials, setShowSocials] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mounted) return
    const blogsSection = document.getElementById("blog")
    if (blogsSection) {
      const blogsSectionTop = blogsSection.offsetTop
      setShowSocials(latest < blogsSectionTop)
    }
  })

  const socialLinks = [
    {
      icon: Github,
      url: "https://github.com/RamRajurkar",
      color: "hover:text-[#333333]",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ram-rajurkar-647b90258/",
      color: "hover:text-[#0077B5]",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/ram_rajurkar_007?igsh=MXJ4anJkaXVyNG5qdQ==",
      color: "hover:text-[#E4405F]",
      label: "Instagram",
    },
  ]

  if (!mounted) {
    return null // Return null on server-side and during hydration
  }

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Base background */}
      <div className="absolute inset-0 " />
      
      {/* Particles container - moved above background gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Particles component here */}
      </div>

      {/* Theme-aware background gradient overlay - above particles */}
      <div className="absolute inset-0 " />
      
      {/* Main content - highest z-index */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
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

            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              AI Architect & Software Engineer specializing in intelligent systems, immersive user experiences, and scalable digital solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <button
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </button>

              <button
                className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-3 rounded-full text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
              </button>
              <a
                href="/Ram_Rajurkar_CV.pdf"
                download
                className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-3 rounded-full text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <div className="flex-1 flex justify-center items-center">
            <HeroImage />
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              {/* <Canvas><Scene /></Canvas> */}
            </div>
          </div>
        </div>
      </div>
      {/* Update z-indices for other elements */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: showSocials ? 1 : 0, x: showSocials ? 0 : -50 }}
        transition={{ duration: 0.4 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-[60]"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full 
              border border-gray-200 dark:border-zinc-800 hover:border-primary transition-all duration-300 ${social.color}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <social.icon className="w-5 h-5 transition-colors duration-300" />
            </motion.div>
            <span className="absolute left-14 bg-background/80 dark:bg-background/20 backdrop-blur-sm 
              px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 whitespace-nowrap border border-muted">
              {social.label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Mobile social icons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSocials ? 1 : 0, y: showSocials ? 0 : 20 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex lg:hidden gap-6 z-[60]"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full 
              border border-gray-200 dark:border-zinc-800 hover:border-primary transition-all duration-300 ${social.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-[60]">
        <span className="text-sm mb-2">Scroll Down</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  )
}
