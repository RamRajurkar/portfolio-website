"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Code, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { projects as importedProjects } from "@/components/sections/projects"

// Fallback projects data in case the import fails
const fallbackProjects = [
  {
    id: 5,
    title: "AI-based Viva Assessment & Proctoring Platform",
    description: "An advanced AI-powered platform designed to conduct and evaluate viva exams in real time.",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    tags: ["Django", "OpenCV", "Gemini API", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    category: "featured",
    year: "2023"
  }
]

export default function ProjectDetails() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Use imported projects if available, otherwise use fallback
  const projects = Array.isArray(importedProjects) ? importedProjects : fallbackProjects

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Add console logs to debug
    console.log("Params ID:", params.id)
    console.log("Available projects:", projects)
    
    if (params.id) {
      try {
        // Convert both to strings for comparison and log the process
        const projectId = params.id.toString()
        console.log("Looking for project with ID:", projectId)
        
        const foundProject = projects.find(p => p.id.toString() === projectId)
        console.log("Found project:", foundProject)
        
        if (foundProject) {
          // Add images array if it doesn't exist
          if (!foundProject.images) {
            foundProject.images = [foundProject.image];
            // Generate additional image paths based on the project ID
            for (let i = 1; i <= 2; i++) {
              const imgPath = `/images/projects/${foundProject.id}-${i}.png`;
              foundProject.images.push(imgPath);
            }
          }
          setProject(foundProject)
        } else {
          console.log("Project not found, redirecting to home")
          router.push("/")
        }
      } catch (error) {
        console.error("Error finding project:", error)
        router.push("/")
      }
    }
    setLoading(false)
  }, [params.id, router, projects])

  // Function to navigate to the next image
  const nextImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance images every 5 seconds
  useEffect(() => {
    if (!project?.images?.length) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [project, currentImageIndex]);

  // If not mounted yet, show a simple loading state to prevent theme flash
  if (!mounted) {
    return null;
  }

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-64 bg-muted rounded-md"></div>
          <div className="h-64 w-full max-w-3xl bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Image carousel and links */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Image Carousel */}
            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-sm dark:shadow-none">
              {project.images && project.images.length > 0 ? (
                <>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                  
                  {/* Navigation buttons */}
                  {project.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentImageIndex === index 
                                ? "bg-white w-4" 
                                : "bg-white/50"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm dark:border-muted">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="mr-2 h-4 w-4" />
                Technical Overview
              </h3>
              <p className="text-muted-foreground">
                This project was built using {project.tags.join(", ")}. It demonstrates my ability to work with 
                {project.category === "featured" ? " complex systems and integrate multiple technologies." : 
                 project.category === "web" ? " web technologies and create responsive user interfaces." : 
                 project.category === "ai" ? " AI and machine learning models to solve real-world problems." : 
                 " various technologies to create practical applications."}
              </p>
            </div>
          </motion.div>

          {/* Right column - Details */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{project.year || "2023"}</span>
                <span className="mx-2">•</span>
                <Tag className="h-4 w-4 mr-2" />
                <span className="capitalize">{project.category}</span>
              </div>
              <p className="text-lg">{project.description}</p>
            </div>

            <Separator className="dark:bg-muted" />

            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-muted" />

            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {generateFeatures(project).map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <span className="text-primary mr-2">•</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Separator className="dark:bg-muted" />

            <div>
              <h3 className="text-xl font-semibold mb-4">Challenges & Solutions</h3>
              <div className="space-y-4">
                {generateChallenges(project).map((challenge, index) => (
                  <div key={index} className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4">
                    <h4 className="font-medium mb-2">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Helper functions remain the same
function generateFeatures(project) {
  const baseFeatures = [
    // "Responsive design for all device sizes",
    "Intuitive user interface with modern aesthetics",
    "Optimized performance and loading times"
  ]

  const categoryFeatures = {
    featured: [
      "Complex data processing and visualization",
      "Integration with multiple external APIs",
      "Advanced user authentication and authorization"
    ],
    web: [
      "Interactive UI elements with smooth animations",
      "Form validation and error handling",
      "Cross-browser compatibility"
    ],
    ai: [
      "Machine learning model integration",
      "Natural language processing capabilities",
      "Predictive analytics and recommendations"
    ],
    mobile: [
      "Native-like mobile experience",
      "Offline functionality and data persistence",
      "Push notifications and real-time updates"
    ]
  }

  return [...baseFeatures, ...(categoryFeatures[project.category] || [])].slice(0, 5)
}

function generateChallenges(project) {
  const baseChallenges = [
    {
      title: "Performance Optimization",
      solution: "Implemented code splitting, lazy loading, and optimized assets to improve loading times and overall performance."
    }
  ]

  const categoryChallenges = {
    featured: [
      {
        title: "Complex Data Management",
        solution: "Designed a robust state management system to handle complex data flows and maintain consistency across the application."
      }
    ],
    web: [
      {
        title: "Cross-browser Compatibility",
        solution: "Utilized progressive enhancement and feature detection to ensure a consistent experience across different browsers."
      }
    ],
    ai: [
      {
        title: "Model Accuracy and Training",
        solution: "Fine-tuned the machine learning model with additional training data and implemented feedback loops to improve accuracy over time."
      }
    ],
    mobile: [
      {
        title: "Responsive Design Challenges",
        solution: "Created a flexible layout system that adapts to various screen sizes while maintaining usability and visual appeal."
      }
    ]
  }

  return [...baseChallenges, ...(categoryChallenges[project.category] || [])].slice(0, 2)
}