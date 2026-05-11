"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionTitle } from "@/components/ui/section-title"
import { Calendar, Clock, ArrowRight, Search, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Blog post type definition
type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  readTime: string
  author: {
    name: string
    avatar: string
  }
}

// Categories for filtering
const categories = ["All", "Web Development", "Mobile Apps", "Design", "Marketing", "Technology"]

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Essential UI/UX Design Principles for Creating Exceptional User Experiences",
    excerpt:
      "Learn the fundamental principles that guide effective UI/UX design and how to apply them to your next project.",
    category: "Design",
    image: "/images/blog/blog-1.jpg",
    date: "Apr 15, 2024",
    readTime: "8 min read",
    author: {
      name: "Priya Sharma",
      avatar: "/images/team/team-member-1.jpg",
    },
  },
  {
    id: 2,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the emerging technologies and methodologies that are shaping the future of web development.",
    category: "Web Development",
    image: "/images/blog/blog-2.jpg",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    author: {
      name: "Rahul Patel",
      avatar: "/images/team/team-member-2.jpg",
    },
  },
  {
    id: 3,
    title: "How to Optimize Your Mobile App for Better Performance",
    excerpt: "Practical tips and strategies to improve the speed and performance of your mobile applications.",
    category: "Mobile Apps",
    image: "/images/blog/blog-3.jpg",
    date: "Apr 5, 2024",
    readTime: "7 min read",
    author: {
      name: "Ananya Desai",
      avatar: "/images/team/team-member-3.jpg",
    },
  },
  {
    id: 4,
    title: "SEO Strategies That Actually Work in Today's Digital Landscape",
    excerpt: "Cut through the noise and discover SEO techniques that deliver real results for your business.",
    category: "Marketing",
    image: "/images/blog/blog-4.jpg",
    date: "Mar 28, 2024",
    readTime: "9 min read",
    author: {
      name: "Vikram Singh",
      avatar: "/images/team/team-member-4.jpg",
    },
  },
  {
    id: 5,
    title: "Building Scalable Applications with Microservices Architecture",
    excerpt: "A comprehensive guide to implementing microservices for more resilient and scalable applications.",
    category: "Technology",
    image: "/images/blog/blog-5.jpg",
    date: "Mar 22, 2024",
    readTime: "10 min read",
    author: {
      name: "Neha Gupta",
      avatar: "/images/team/team-member-5.jpg",
    },
  },
  {
    id: 6,
    title: "The Psychology of Color in Web Design: Choosing the Right Palette",
    excerpt: "Understanding how color choices impact user perception and behavior on your website.",
    category: "Design",
    image: "/images/blog/blog-6.jpg",
    date: "Mar 18, 2024",
    readTime: "5 min read",
    author: {
      name: "Arjun Mehta",
      avatar: "/images/team/team-member-6.jpg",
    },
  },
]

export function BlogArticlesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get featured post (first post or first filtered post)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : blogPosts[0]

  // Get remaining posts
  const remainingPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : blogPosts.slice(1)

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F66526]/20 via-[#F2502C] to-[#F66526]/20"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F66526]/20 via-[#F2502C] to-[#F66526]/20"></div>

      {/* Decorative circles */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#F66526]/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-[#F2502C]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <SectionTitle
          badge="Blog & Articles"
          title="Insights & Knowledge Sharing"
          highlight="Knowledge Sharing"
          subtitle="Explore our collection of articles, guides, and industry insights written by our experts to help you stay informed and inspired."
          titleClassName="text-gray-800"
          subtitleClassName="text-gray-600"
        />

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F66526]/30 focus:border-[#F66526] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Category Filter - Desktop */}
          <div className="hidden md:flex items-center gap-2 flex-wrap justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Filter - Mobile */}
          <div className="relative w-full md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                      selectedCategory === category ? "text-[#F66526] font-medium" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured Article */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
              {/* Featured Image */}
              <div className="lg:col-span-3 h-64 md:h-96 lg:h-auto relative">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#F66526] px-3 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-3 hover:text-[#F66526] transition-colors">
                    <Link href={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Author and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative">
                      <Image
                        src={featuredPost.author.avatar || "/placeholder.svg"}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{featuredPost.author.name}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="flex items-center gap-1 text-[#F66526] font-medium hover:gap-2 transition-all"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col group">
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#F66526] px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#F66526] transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden relative">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1 text-[#F66526] font-medium hover:gap-2 transition-all"
                  >
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
