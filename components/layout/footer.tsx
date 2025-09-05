import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Instagram, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First column - Portfolio */}
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-muted-foreground mb-4">
              Creating innovative digital experiences with cutting-edge technologies.
            </p>
            <div className="flex space-x-5">
              <Link href="https://github.com/RamRajurkar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/ram-rajurkar-647b90258/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="mailto:ram.s.rajurkar@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Second column - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              {/* <li>
                <Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column - Call to Action */}
          <div className="flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ready to Create Something Amazing?
              </h3>
              
              <div className="relative group cursor-pointer bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowUp className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <motion.p 
                    className="text-center text-sm"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="block text-muted-foreground">Let's bring your ideas to life</span>
                    <span className="text-primary font-medium">Click to Connect with me →</span>
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 -z-10 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <p className="mt-1">Designed and developed with ❤️ using React, Three.js, and Node.js</p>
        </div>
      </div>
    </footer>
  )
}

