"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// @ts-ignore
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { useTheme } from "next-themes"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (params.id && isMounted) {
      const foundPost = blogPosts.find(p => p.id.toString() === params.id.toString())
      if (foundPost) {
        setPost(foundPost)
      } else {
        router.push("/blog")
      }
      setLoading(false)
    }
  }, [params.id, router, isMounted])

  if (!isMounted || loading || !post) {
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
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-video rounded-xl overflow-hidden border mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8 hidden sm:block" />
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <Separator orientation="vertical" className="h-8 hidden sm:block" />
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={isDark ? vscDarkPlus : vs}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}