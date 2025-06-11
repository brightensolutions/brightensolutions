"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { BlogPost, blogPosts } from "@/lib/blog-data"

interface BlogSidebarProps {
  post: BlogPost
}

export function BlogSidebar({ post }: BlogSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sidebarRef, { once: true, margin: "-100px" })
  
  // Get popular posts (excluding current post)
  const popularPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => b.readingTime - a.readingTime)
    .slice(0, 3)
  
  return (
    <div ref={sidebarRef} className="space-y-8">
      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{post.author.name}</h3>
            <p className="text-gray-600 text-sm">{post.author.role}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {post.author.bio || `${post.author.name} is a professional with expertise in ${post.category} and related technologies.`}
        </p>
        <div className="flex gap-2">
          <Link 
            href="#" 
            className="px-4 py-2 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white text-sm font-medium rounded-full"
          >
            View Profile
          </Link>
          <Link 
            href="#" 
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            All Posts
          </Link>
        </div>
      </motion.div>
      
      {/* Popular posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <h3 className="font-bold text-gray-800 mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="flex gap-3 group">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 group-hover:text-[#F66526] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500">{post.readingTime} min read</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
      
      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
        <div className="space-y-2">
          {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing'].map((category, index) => (
            <Link 
              key={index} 
              href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:text-[#F66526] transition-colors"
            >
              <span>{category}</span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {Math.floor(Math.random() * 10) + 1}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
      
      {/* Tags cloud */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <h3 className="font-bold text-gray-800 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'JavaScript', 'TypeScript', 'UI Design', 'UX', 'SEO', 'Mobile', 'API', 'Performance'].map((tag, index) => (
            <Link 
              key={index} 
              href={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </motion.div>
      
      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-[#F66526] to-[#F2502C] rounded-xl p-6 shadow-md text-white"
      >
        <h3 className="font-bold mb-2">Subscribe to our Newsletter</h3>
        <p className="text-white/80 text-sm mb-4">Get the latest articles and resources straight to your inbox.</p>
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm outline-none"
          />
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-white text-[#F66526] font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  )
}