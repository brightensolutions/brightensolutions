"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Home, ArrowRight, Mail } from 'lucide-react'
import { ErrorIllustration } from "@/components/_error/ErrorIllustration"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
    // Redirect to search results page
  }

  const popularPages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar would typically be here but is handled by layout.tsx */}
      
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-[#F66526]/10 to-[#F2502C]/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-[#F66526]/10 to-[#F2502C]/10 blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        {/* Left side - Illustration */}
        <motion.div 
          className="w-full md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ErrorIllustration />
        </motion.div>
        
        {/* Right side - Content */}
        <motion.div 
          className="w-full md:w-1/2 md:pl-8 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-8xl font-bold bg-gradient-to-r from-[#F66526] to-[#F2502C] bg-clip-text text-transparent mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Oops! The page you're looking for seems to have gone on vacation. 
            Let's help you find your way back.
          </p>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for content..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F66526]/50 focus:border-[#F66526]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white p-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
          
          {/* Back to home button */}
          <Link 
            href="/" 
            className="bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow mb-8 group"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Popular pages */}
          <div className="w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Popular Pages:</h3>
            <div className="flex flex-wrap gap-2">
              {popularPages.map((page) => (
                <Link 
                  key={page.name} 
                  href={page.href}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-sm transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact support */}
          <div className="mt-8 text-gray-600 flex items-center gap-2">
            <Mail size={16} className="text-[#F66526]" />
            <span>Still can't find what you need? <Link href="/contact" className="text-[#F66526] hover:underline font-medium">Contact Support</Link></span>
          </div>
        </motion.div>
      </main>
      
      {/* Footer would typically be here but is handled by layout.tsx */}
    </div>
  )
}