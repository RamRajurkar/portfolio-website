"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// ✅ Project Data
const projects = [
  {
    id: 1,
    title: "E-commerce Grocery Recommendation Website",
    description: "An ML-powered e-commerce website with grocery recommendations and REST API integration.",
    images: ["/images/grocery-recommendation.png", "/images/grocery-recommendation-2.png"],
    tags: ["Django", "Machine Learning", "REST API", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/ecommerce-grocery",
    category: "featured",
  },
  {
    id: 2,
    title: "MyTodo Flask App",
    description: "A simple task management application built using Flask and MongoDB.",
    images: ["/images/mytodo-flask.png", "/images/mytodo-flask-2.png"],
    tags: ["Flask", "Python", "MongoDB", "REST API"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/mytodo-flask",
    category: "web",
  },
  {
    id: 5,
    title: "AI-based Viva Assessment Platform",
    description: "A real-time proctoring platform using AI to automate viva exams and ensure integrity.",
    images: ["/images/viva-platform.png", "/images/viva-platform-2.png"],
    tags: ["Django", "OpenCV", "Gemini API", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/RamRajurkar/viva-assessment",
    category: "featured",
  },
];

// ✅ Project Card Component
const Project3DCard = ({ project }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      className="relative h-full rounded-xl overflow-hidden"
    >
      <Card className="h-full border-0 overflow-hidden">
        <Swiper pagination={{ clickable: true }} modules={[Pagination]} loop>
          {project.images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imgSrc}
                alt={project.title}
                width={800}
                height={600}
                priority
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Button size="sm" variant="secondary" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Code">
                <Github size={16} className="mr-2" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MemoizedProjectCard = useMemo(() => Project3DCard, []);

// ✅ Projects Section
export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          loop
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <MemoizedProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
