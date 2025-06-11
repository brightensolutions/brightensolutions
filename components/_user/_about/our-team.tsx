"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "framer-motion"

interface TeamMember {
  _id: string
  name: string
  position: string
  image: string
  department?: string
  isActive?: boolean
}

export function OurTeam() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0)
  const itemsPerSlide = 4

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about/team?isActive=true")

        if (!response.ok) {
          throw new Error("Failed to fetch team members")
        }

        const data = await response.json()

        // If no team members are returned, try to seed initial data
        if (data.length === 0) {
          await fetch("/api/about/team/seed", { method: "POST" })
          // Fetch team members again after seeding
          const seedResponse = await fetch("/api/about/team?isActive=true")
          if (seedResponse.ok) {
            const seedData = await seedResponse.json()
            setTeamMembers(seedData)
          }
        } else {
          setTeamMembers(data)
        }
      } catch (err: any) {
        console.error("Error fetching team members:", err)
        setError(err.message || "Failed to load team members")
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  // Calculate total number of slides
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide)

  // Get current slide members
  const currentMembers = teamMembers.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded-md mx-auto mb-4"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-full h-48 w-48 mx-auto mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet The <span className="text-[#F66526]">Experts</span>
            </h2>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error loading team members. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div
          >
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              OUR TEAM
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet The <span className="text-[#F66526]">Experts</span> Behind Our Success
            </h2>
            <p className="text-xl text-gray-600">
              Our talented team of professionals brings diverse skills and expertise to deliver exceptional results for
              our clients.
            </p>
          </div>
        </div>

        {/* Team members slider */}
        <div className="relative">
          {/* Slider navigation - Previous button */}
          {teamMembers.length > itemsPerSlide && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          )}

          {/* Slider container */}
          <div className="overflow-hidden py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {currentMembers.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No team members found.</p>
                  </div>
                ) : (
                  currentMembers.map((member, index) => (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="group"
                    >
                      <div className="flex flex-col items-center">
                        {/* Hexagon-shaped image container */}
                        <div className="relative mb-6">
                          {/* Hexagon SVG mask */}
                          <div className="relative w-64 h-64">
                            <svg
                              className="absolute inset-0"
                              viewBox="0 0 100 100"
                              width="100%"
                              height="100%"
                              preserveAspectRatio="xMidYMid slice"
                            >
                              <defs>
                                <clipPath id={`hexagon-clip-${member._id}`}>
                                  <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" />
                                </clipPath>
                              </defs>
                              <foreignObject width="100" height="100" clipPath={`url(#hexagon-clip-${member._id})`}>
                                <div
                                  className="w-full h-full bg-cover bg-center"
                                  style={{
                                    backgroundImage: `url(${member.image || `/placeholder.svg?height=256&width=256&query=person`})`,
                                  }}
                                ></div>
                              </foreignObject>
                            </svg>

                            {/* Hexagon border */}
                            <svg
                              className="absolute inset-0 pointer-events-none"
                              viewBox="0 0 100 100"
                              width="100%"
                              height="100%"
                            >
                              <path
                                d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                                fill="none"
                                stroke="#F66526"
                                strokeWidth="1"
                                className="group-hover:stroke-[3] transition-all duration-300"
                              />
                            </svg>

                          
                          </div>
                        </div>

                        {/* Name with animated underline */}
                        <h3 className="text-2xl font-bold mb-1 relative">
                          {member.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F66526] group-hover:w-full transition-all duration-500"></span>
                        </h3>

                        {/* Position with gradient background */}
                        <div className="relative">
                          <span className="px-6 py-2 bg-gradient-to-r from-[#F66526] to-[#FF8A50] text-white rounded-full font-medium inline-block">
                            {member.position}
                          </span>

                          {/* Decorative dots */}
                          <div className="absolute -right-4 -top-4">
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-[#F66526] opacity-70"></div>
                              ))}
                            </div>
                          </div>
                          <div className="absolute -left-4 -bottom-4">
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-[#F66526] opacity-70"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider navigation - Next button */}
          {teamMembers.length > itemsPerSlide && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          )}
        </div>

        {/* Pagination dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-8 bg-[#F66526]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
