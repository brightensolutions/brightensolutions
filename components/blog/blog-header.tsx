"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { motion } from "framer-motion"

export function BlogHeader() {
  const [searchFocused, setSearchFocused] = useState(false)
  
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#F66526_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-[#F66526]">Blog</span> & Articles
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Insights, tips, and industry knowledge to help you stay ahead in the digital world.
            Explore our latest articles on web development, design, and digital marketing.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <div className={`flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ${searchFocused ? 'ring-2 ring-[#F66526]' : ''}`}>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-3 px-6 outline-none text-gray-700"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <button className="bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white p-3 mr-1 rounded-full">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}