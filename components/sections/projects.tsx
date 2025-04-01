"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 5,
    title: "AI-based Viva Assessment & Proctoring Platform",
    description: "An advanced AI-powered platform designed to conduct and evaluate viva exams in real time. It uses machine learning models for automated question generation, real-time video monitoring with facial detection, and behavior analysis to ensure academic integrity. The platform supports automated evaluation, report generation, and secure proctoring with adaptive learning insights, offering a scalable and unbiased examination experience.",
    image: "VivaVista-1.png",
    tags: ["Django", "OpenCV", "Gemini API", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/viva-assessment",
    category: "featured"
  },
  {
    id: 1,
    title: "E-commerce Grocery Recommendation Website",
    description: "An ML-powered e-commerce website with grocery recommendations and REST API integration.",
    image: "/images/grocery-recommendation.png",
    tags: ["Django", "Machine Learning", "REST API", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/ecommerce-grocery",
    category: "featured",
  },
  {
    id: 2,
    title: "MyTodo Flask App",
    description: "A simple task management application built using Flask and MongoDB.",
    image: "/images/mytodo-flask.png",
    tags: ["Flask", "Python", "MongoDB", "REST API"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/mytodo-flask",
    category: "web",
  },
  {
    id: 3,
    title: "Recipe Chatbot",
    description: "An AI-powered chatbot that provides personalized recipe suggestions.",
    image: "/images/recipe-chatbot.png",
    tags: ["AI", "Chatbot", "NLP", "Flask"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/recipe-chatbot",
    category: "ai",
  },
  {
    id: 4,
    title: "Markdown Converter",
    description: "A web app that converts Markdown syntax to HTML in real time.",
    image: "/images/markdown-converter.png",
    tags: ["Flask", "HTML", "CSS", "Markdown"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/markdown-converter",
    category: "web",
  },
  
  {
    id: 6,
    title: "CRM for Personalized Emails",
    description: "A CRM system for automating personalized follow-up emails with manual and OAuth-based SMTP.",
    image: "/images/crm-email.png",
    tags: ["Node.js", "MongoDB", "MVP Architecture", "OAuth"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/crm-email",
    category: "web",
  },
];


const categories = ["All", "Featured", "Web", "3D", "Mobile"]

function Project3DCard({ project }) {
  const cardRef = useRef(null)

  // Mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoother movement
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  // Transform values for rotation and shine effect
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15])
  const shineX = useTransform(springX, [-0.5, 0.5], [0, 100])
  const shineY = useTransform(springY, [-0.5, 0.5], [0, 100])

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate normalized mouse position
    const xPos = (e.clientX - rect.left) / width - 0.5
    const yPos = (e.clientY - rect.top) / height - 0.5

    x.set(xPos)
    y.set(yPos)
  }

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      className="relative h-full rounded-xl overflow-hidden cursor-pointer perspective-1000"
    >
      <Card className="h-full border-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(${shineX}deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`,
          }}
        />

        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
            <Button size="sm" variant="secondary" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-2" />
                Code
              </a>
            </Button>
          </div>
        </div>

        <CardContent className="p-6" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true
    if (activeCategory === "Featured") return project.category === "featured"
    if (activeCategory === "Web") return project.category === "web"
    if (activeCategory === "3D") return project.tags.includes("Three.js")
    if (activeCategory === "Mobile") return project.category === "mobile"
    return true
  })

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my latest work showcasing my skills in development, design, and problem-solving.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Project3DCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

