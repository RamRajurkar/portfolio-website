"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Float } from "@react-three/drei"
import { motion, useAnimation, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Cpu, Database, Network, Code, Server, Globe } from "lucide-react"
import { useEffect, useRef } from "react"

// 3D Models for skills
function SkillModel({ skill, position }) {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={skill.color} roughness={0.3} metalness={0.7} />
        <Html position={[0, 0, 1.2]} center transform occlude>
          <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">{skill.name}</h3>
            <p className="text-sm text-muted-foreground">{skill.level}%</p>
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

function SkillsScene() {
  const skills = [
    { name: "React", level: 90, color: "#61dafb", position: [-2.5, 1, 0] },
    { name: "Node.js", level: 85, color: "#68a063", position: [2.5, 1, 0] },
    { name: "Three.js", level: 80, color: "#049ef4", position: [0, -1.5, 0] },
    { name: "MongoDB", level: 75, color: "#13aa52", position: [-2.5, -1.5, 0] },
    { name: "Express", level: 85, color: "#f5f5f5", position: [2.5, -1.5, 0] },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {skills.map((skill) => (
        <SkillModel key={skill.name} skill={skill} position={skill.position} />
      ))}

      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Skills data
const skills = [
  { name: "Python", level: 97, category: "backend" },
  // { name: "Tailwind CSS", level: 85, category: "frontend" },
  // { name: "JavaScript", level: 90, category: "frontend" },
  // { name: "TypeScript", level: 85, category: "frontend" },
  { name: "AI/ML Development", level: 95, category: "backend" },
  { name: "Django", level: 90, category: "backend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "MongoDB", level: 90, category: "backend" },
  { name: "RESTful APIs", level: 85, category: "backend" },
  { name: "Automations", level: 90, category: "backend" },
  { name: "OpenCV", level: 85, category: "backend" },
  { name: "AI Proctoring Systems", level: 90, category: "backend" },
  { name: "Gemini API", level: 80, category: "backend" },
  // { name: "Viva Automation", level: 90, category: "backend" },
  { name: "Database Management", level: 85, category: "backend" },
  { name: "SaaS Development", level: 80, category: "backend" },
  { name: "React.js", level: 70, category: "frontend" },
  { name: "Entrepreneurship", level: 95, category: "non-technical" },
  { name: "Project Management", level: 90, category: "non-technical" },
  { name: "Public Speaking", level: 85, category: "non-technical" },
  { name: "Client Collaboration", level: 80, category: "non-technical" },
  { name: "Innovation & Problem-Solving", level: 95, category: "non-technical" }

]

// Experience data
const experiences = [
  {
    title: "AI & Web Devloper Intern",
    company: "Perpetual Solutions Inc.",
    period: "2025 - Present",
    description:
    "Specializing in building advanced automations, intelligent chatbots, and recommendation systems. Developing systems that streamline client interactions through automated workflows and machine learning-driven features.",
  },
  {
    title: "Co-Founder & Lead Developer – VivaVista",
    company: "VivaVista AI",
    period: "2023 - Present",
    description:
    "Designed and developed an AI-powered SaaS-PaaS hybrid platform for automated viva assessments and real-time proctoring. Spearheaded the creation of advanced AI and ML modules using Django, OpenCV, and the Gemini API, enabling intelligent behavior analysis and adaptive assessments.",
  },
  {
    title: "Backend Developer – eCommerce Platform",
    company: "Freelance",
    period: "2024",
    description:
    "Developed an eCommerce platform using Django and MongoDB. Engineered advanced features like inventory management, secure payments (Razorpay), delivery partner integration, and ML-driven personalized product recommendations to enhance user experience and streamline operations.",
  },

  {
    title: "Technical Paper Presenter",
    company: "Government Polytechnic Yavatmal",
    period: "2024",
    description:
      "Participated and Presented a technical research paper on AI-Based Viva Assessment in State Level Competition, showcasing innovations in automated evaluations and AI proctoring technologies.",
  },
];


// Education data
const education = [
  {
    degree: "Diploma in Artificial Intelligence & Machine Learning",
    institution: "Government Polytechnic Nagpur",
    period: "2022 - 2025",
    description:
      "Focused on AI, machine learning, and advanced software development. Led multiple projects, including an AI-powered viva assessment & proctoring platform and Web Apps. Participated and Presented a technical paper on AI-Based Viva Assessment in State Level Competition.",
  },
  {
    degree: "Secondary Education (SSC) ",
    institution: "Khandelwal English High School, Akola, Maharashtra",
    period: "2012 - 2022",
    description:
      "Achieved strong academic performance with a focus on mathematics, science, and computer fundamentals.",
  },
];


// New Tech Grid component to replace the 3D Canvas
function TechGrid() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])
  
  const techItems = [
    { icon: Brain, color: "#6366f1", label: "AI" },
    { icon: Cpu, color: "#8b5cf6", label: "ML" },
    { icon: Database, color: "#ec4899", label: "Data" },
    { icon: Code, color: "#10b981", label: "Code" },
    { icon: Network, color: "#f59e0b", label: "Networks" },
    { icon: Server, color: "#3b82f6", label: "Systems" },
  ]
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  return (
    <motion.div 
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full w-full"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {techItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative bg-background/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden border border-muted hover:border-primary transition-all duration-300"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          }}
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-20 animate-pulse" 
            style={{ 
              background: `radial-gradient(circle at center, ${item.color}80 0%, transparent 70%)`,
              animation: `pulse 3s infinite ${index * 0.5}s`
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  background: item.color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="relative z-10 mb-4"
          >
            <item.icon size={48} style={{ color: item.color }} />
          </motion.div>
          
          <h3 className="text-xl font-bold relative z-10">{item.label}</h3>
          
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
            <motion.line 
              x1="50%" y1="50%" 
              x2="100%" y2="100%" 
              stroke={item.color} 
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.line 
              x1="50%" y1="50%" 
              x2="0%" y2="100%" 
              stroke={item.color} 
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function About() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("all")

  const filteredSkills = skills.filter(
    (skill) => activeSkillCategory === "all" || skill.category === activeSkillCategory,
  )

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate software engineer specializing in building intelligent systems and immersive digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-lg text-muted-foreground mb-6">
              I’m <b>Ram Rajurkar</b>—an innovative AI architect, software engineer, and entrepreneur with a passion for building intelligent systems and immersive digital experiences. With a strong foundation in <b>AI, full-stack development, and scalable digital solutions</b>, I specialize in turning bold ideas into reality through advanced technology and thoughtful design.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              My expertise spans both frontend and backend development, with a focus on <b>Python, AI, Machine Learning, and LLMs</b>. I’ve successfully built and deployed intelligent platforms—ranging from AI-driven assessment systems to dynamic eCommerce solutions—emphasizing performance, accessibility, and user-centric design.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Beyond technology, I’m driven by an <b>entrepreneurial spirit</b>, leading innovative projects that merge AI with real-world applications. My work extends to creating <b>AI-powered SaaS solutions</b>, managing startup ventures, and delivering cutting-edge software products that push the boundaries of what’s possible.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              I’m not just a developer—I’m a problem solver and a visionary, constantly exploring new technologies to <b>shape the future of intelligent digital solutions</b>.
            </p>

            {/* <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                <Code size={18} className="text-primary" />
                <span>Frontend Developer</span>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                <Server size={18} className="text-primary" />
                <span>Backend Developer</span>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                <Globe size={18} className="text-primary" />
                <span>3D Web Developer</span>
              </div>
            </div> */}

            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Code size={18} className="text-primary" />, label: "AI & ML Devloper" },
                { icon: <Server size={18} className="text-primary" />, label: "Backend Developer" },
                { icon: <Globe size={18} className="text-primary" />, label: "Scalable AI Solutions" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] w-full"
          >
            {/* Replace the Canvas with our new TechGrid component */}
            <TechGrid />
          </motion.div>
        </div>

        <Tabs defaultValue="skills" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant={activeSkillCategory === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveSkillCategory("all")}
                  >
                    All
                  </Badge>
                  <Badge
                    variant={activeSkillCategory === "non-technical" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveSkillCategory("non-technical")}
                  >
                  
                  Non-technical
                  </Badge>
                  <Badge
                    variant={activeSkillCategory === "frontend" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveSkillCategory("frontend")}
                  >
                    Frontend
                  </Badge>
                  <Badge
                    variant={activeSkillCategory === "backend" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveSkillCategory("backend")}
                  >
                    Backend
                  </Badge>
                 
                </div>

                <div className="space-y-6">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l-2 border-muted"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="mb-1 text-sm text-muted-foreground">{exp.period}</div>
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <div className="text-primary mb-2">{exp.company}</div>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l-2 border-muted"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="mb-1 text-sm text-muted-foreground">{edu.period}</div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <div className="text-primary mb-2">{edu.institution}</div>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

