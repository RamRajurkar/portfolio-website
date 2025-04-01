"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, Server, Globe } from "lucide-react"

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
  { name: "React.js", level: 90, category: "frontend" },
  { name: "Three.js", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "MongoDB", level: 75, category: "backend" },
  { name: "RESTful APIs", level: 85, category: "backend" },
  { name: "GraphQL", level: 70, category: "backend" },
  { name: "UI/UX Design", level: 75, category: "design" },
  { name: "Figma", level: 70, category: "design" },
  { name: "Adobe XD", level: 65, category: "design" },
]

// Experience data
const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Leading development of cutting-edge web applications using React, Node.js, and Three.js. Managing a team of developers and implementing best practices for code quality and performance.",
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    period: "2019 - 2021",
    description:
      "Developed responsive and interactive user interfaces for enterprise clients. Implemented 3D visualizations and animations using Three.js and WebGL.",
  },
  {
    title: "Web Developer",
    company: "Creative Studio",
    period: "2017 - 2019",
    description:
      "Created user-centered designs and prototypes for mobile and web applications. Collaborated with clients to deliver engaging digital experiences.",
  },
]

// Education data
const education = [
  {
    degree: "Master of Computer Science",
    institution: "University of Technology",
    period: "2015 - 2017",
    description: "Specialized in Interactive Media and Web Technologies. Graduated with honors.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    period: "2011 - 2015",
    description:
      "Focused on Software Engineering and Web Development. Participated in multiple hackathons and coding competitions.",
  },
]

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
            I'm a passionate full-stack developer with expertise in creating immersive digital experiences.
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
              I'm a full-stack developer with over 5 years of experience creating innovative digital solutions. I
              specialize in building immersive web experiences that combine cutting-edge technology with thoughtful
              design.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              My expertise spans across frontend and backend technologies, with a particular focus on React.js,
              Three.js, Node.js, and MongoDB. I'm passionate about creating performant, accessible, and visually
              stunning applications.
            </p>

            <div className="flex flex-wrap gap-4">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] w-full"
          >
            <Suspense
              fallback={<div className="h-full w-full flex items-center justify-center">Loading 3D Skills...</div>}
            >
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <SkillsScene />
              </Canvas>
            </Suspense>
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
                  <Badge
                    variant={activeSkillCategory === "design" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveSkillCategory("design")}
                  >
                    Design
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

