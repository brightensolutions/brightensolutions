"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Share2, Facebook, Twitter, Linkedin, LinkIcon } from 'lucide-react'
import { BlogPost } from "@/lib/blog-data"

interface BlogContentProps {
  post: BlogPost
}

export function BlogContent({ post }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-100px" })
  
  return (
    <div ref={contentRef}>
      {/* Featured image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-video rounded-xl overflow-hidden mb-8"
      >
        <Image
          src={post.detailImage || post.coverImage}
          alt={post.title}
          width={1200}
          height={675}
          className="object-cover w-full h-full"
        />
      </motion.div>
      
      {/* Social sharing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="text-gray-700 font-medium flex items-center gap-1">
          <Share2 className="h-4 w-4" /> Share:
        </span>
        <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Facebook className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
          <Twitter className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
          <Linkedin className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors">
          <LinkIcon className="h-4 w-4" />
        </button>
      </motion.div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}