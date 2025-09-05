"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Portfolio
          </Link>
        </motion.div>

        <div className="perspective-1000">
          <div 
            className={`relative transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ height: isMobile ? 'auto' : '400px' }}
          >
            {/* Front of card */}
            <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-2/5 p-8 flex flex-col justify-center items-center bg-black bg-opacity-30">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg mb-4">
                      <Image 
                        src="RamProfile-modified.jpg" 
                        alt="Profile" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Your Name</h1>
                    <p className="text-blue-300 font-medium mt-1">AI Startup Founder & CEO</p>
                  </div>
                  
                  <div className="md:w-3/5 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-semibold text-blue-300">About</h2>
                        <p className="text-gray-200 mt-1">
                          Pioneering AI solutions that transform industries. Focused on developing 
                          cutting-edge machine learning applications with real-world impact.
                        </p>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold text-blue-300">Contact</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <a href="https://linkedin.com/in/yourprofile" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <FaLinkedin className="mr-2" /> LinkedIn
                          </a>
                          <a href="https://github.com/yourusername" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <FaGithub className="mr-2" /> GitHub
                          </a>
                          <a href="mailto:you@example.com" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <FaEnvelope className="mr-2" /> Email
                          </a>
                          <a href="tel:+1234567890" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <FaPhone className="mr-2" /> Phone
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mt-6 text-sm italic">Click to see company details</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Back of card */}
            <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl overflow-hidden h-full"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-400">AI Innovations Inc.</h2>
                      <p className="text-gray-300">Transforming Tomorrow, Today</p>
                    </div>
                    <div className="w-20 h-20 relative">
                      <Image 
                        src="/company-logo.png" 
                        alt="Company Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-300">Our Mission</h3>
                        <p className="text-gray-200 mt-1">
                          To democratize artificial intelligence and create solutions that empower 
                          businesses and individuals to achieve more through cutting-edge technology.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-blue-300">Core Services</h3>
                        <ul className="mt-1 text-gray-200 list-disc list-inside">
                          <li>Enterprise AI Solutions</li>
                          <li>Machine Learning Consulting</li>
                          <li>Computer Vision Systems</li>
                          <li>Natural Language Processing</li>
                          <li>AI Strategy Development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-gray-300 text-sm">
                      123 Tech Boulevard, Innovation District<br />
                      San Francisco, CA 94105<br />
                      www.aiinnovations.example.com
                    </p>
                    <p className="text-gray-300 mt-4 text-sm italic">Click to see personal details</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}