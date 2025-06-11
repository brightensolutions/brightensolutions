"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Code, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Define project types
type ProjectCategory = "all" | "web" | "mobile" | "design" | "socialMedia"

interface Project {
  _id: string
  title: string
  description: string
  category: string[] // Changed from ProjectCategory[] to string[] to match API data
  image: string
  logo?: string
  technologies: string[]
  liveUrl?: string
  codeUrl?: string
  featured?: boolean
  color?: string
}

// Skeleton for portfolio item
const PortfolioItemSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl shadow-lg h-[400px] bg-white">
    <Skeleton className="absolute inset-0 bg-gray-200" />
    <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-gray-300" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full bg-gray-300" />
            <Skeleton className="h-5 w-20 rounded-full bg-gray-300" />
          </div>
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 bg-gray-300" />
        <Skeleton className="h-20 w-full bg-gray-300" />
        <Skeleton className="h-10 w-36 rounded-full bg-gray-300" />
      </div>
    </div>
  </div>
)

export function PortfolioGrid() {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/portfolio")

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items")
        }

        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError("Error loading portfolio items. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects client-side based on activeFilter
  useEffect(() => {
    if (projects.length === 0) return

    if (activeFilter === "all") {
      setFilteredProjects(projects)
      return
    }

    // Handle the case for "socialMedia" filter specifically
    if (activeFilter === "socialMedia") {
      const filtered = projects.filter((project) => {
        return project.category.some(
          (cat) => cat.toLowerCase() === "social media" || cat.toLowerCase() === "socialmedia",
        )
      })
      setFilteredProjects(filtered)
      return
    }

    // Handle other filters normally
    const filtered = projects.filter((project) => {
      return project.category.some((cat) => cat.toLowerCase() === activeFilter.toLowerCase())
    })
    setFilteredProjects(filtered)
  }, [activeFilter, projects])

  // Debug logging
  useEffect(() => {
    if (projects.length > 0) {
      console.log("All projects:", projects)
      console.log(
        "All categories:",
        projects.flatMap((p) => p.category),
      )
      console.log("Current filter:", activeFilter)
      console.log("Filtered projects:", filteredProjects)
    }
  }, [projects, activeFilter, filteredProjects])

  // Filter categories
  const filterCategories: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX Design" },
    { id: "socialMedia", label: "Social Media" },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-[#FAF1E6]" id="portfolio">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#F66526]/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#F2502C]/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4" ref={containerRef}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-[#F66526]/10 text-[#F66526]">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Showcasing Our <span className="text-[#F66526]">Creative Work</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Explore our diverse collection of projects that demonstrate our expertise and passion for creating
            exceptional digital experiences.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filterCategories.map((category, index) => (
              <button
                key={category.id}
                className={cn(
                  "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === category.id
                    ? "bg-[#F66526] text-white shadow-lg shadow-[#F66526]/20"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md",
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show skeleton loaders while loading
            <>
              <PortfolioItemSkeleton />
              <PortfolioItemSkeleton />
              <PortfolioItemSkeleton />
            </>
          ) : error ? (
            <div className="col-span-full">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">
                {activeFilter === "all"
                  ? "No portfolio items found. Add some through the admin panel."
                  : `No projects found in the ${
                      filterCategories.find((c) => c.id === activeFilter)?.label || activeFilter
                    } category.`}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative h-[400px] overflow-hidden rounded-xl shadow-xl"
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={project.image || "/placeholder.svg?height=600&width=800&query=project"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-start">
                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-[#F66526] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        >
                          Featured
                        </motion.div>
                      )}

                      {/* Project logo */}
                      {project.logo && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="h-12 w-12 rounded-full bg-white p-1 shadow-lg"
                        >
                          <div className="relative h-full w-full overflow-hidden rounded-full">
                            <Image
                              src={project.logo || "/placeholder.svg"}
                              alt={`${project.title} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div>
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.category.slice(0, 2).map((cat, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[#F66526]/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Title and description */}
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F66526] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/80 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        {project.description}
                      </p>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full bg-[#F66526] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#F2502C]"
                          >
                            <Eye className="h-4 w-4" /> View Project
                          </a>
                        )}
                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/30"
                          >
                            <Code className="h-4 w-4" /> Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  {/* <div className="absolute inset-0 z-0 border-4 border-transparent transition-all duration-300 group-hover:border-[#F66526]"></div> */}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

       
      </div>
    </section>
  )
}
