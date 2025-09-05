"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Creating Immersive 3D Experiences with React Three Fiber",
    excerpt: "Learn how to build interactive 3D web experiences using React Three Fiber and Three.js.",
    image: "/placeholder.svg?height=600&width=800",
    date: "March 15, 2023",
    readTime: "8 min read",
    category: "Development",
    tags: ["React", "Three.js", "WebGL"],
  },
  {
    id: 2,
    title: "Building a Full-Stack Application with MERN Stack",
    excerpt: "A comprehensive guide to creating a full-stack application using MongoDB, Express, React, and Node.js.",
    image: "/placeholder.svg?height=600&width=800",
    date: "February 28, 2023",
    readTime: "12 min read",
    category: "Development",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: 3,
    title: "Optimizing Performance in React Applications",
    excerpt: "Tips and techniques for improving the performance of your React applications.",
    image: "/placeholder.svg?height=600&width=800",
    date: "January 20, 2023",
    readTime: "10 min read",
    category: "Development",
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 4,
    title: "Designing User-Friendly Interfaces",
    excerpt: "Principles and practices for creating intuitive and accessible user interfaces.",
    image: "/placeholder.svg?height=600&width=800",
    date: "December 10, 2022",
    readTime: "7 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "Accessibility"],
  },
]

export default function Blog() {
  if (blogPosts.length === 0) {
    return null
  }
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge>{post.category}</Badge>
                  </div>
                </div>

                <CardContent className="flex-1 p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0">
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <Button asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div> */}
      </div>
    </section>
  )
}

