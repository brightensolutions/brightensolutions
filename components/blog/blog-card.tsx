"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image container with overlay */}
      <div className="relative h-56 overflow-hidden">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-full w-full overflow-hidden group">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          </div>
        </Link>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#F66526] text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[#F66526] transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <p>Author</p>
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Read more link */}
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-[#F66526] font-medium hover:gap-2 transition-all">
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}