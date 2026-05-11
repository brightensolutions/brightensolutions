"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react"

interface Milestone {
  year: string
  title: string
  description: string
  achievements: string[]
  icon: string
}

interface OurStoryData {
  _id: string
  title: string
  subtitle: string
  description: string
  milestones: Milestone[]
}

export function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Increase threshold to make animations trigger earlier and ensure content is visible
  const isInView = useInView(sectionRef, { once: true, threshold: 0.05 })
  const [storyData, setStoryData] = useState<OurStoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about/story")

        if (!response.ok) {
          throw new Error("Failed to fetch story data")
        }

        const data = await response.json()
        setStoryData(data)
      } catch (err: any) {
        console.error("Error fetching story data:", err)
        setError(err.message || "Failed to load story data")
      } finally {
        setLoading(false)
      }
    }

    fetchStoryData()
  }, [])

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded-md mx-auto mb-4"></div>
            <div className="h-12 w-full bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded-md mx-auto"></div>
          </div>

          <div className="space-y-24">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row items-stretch animate-pulse">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <div className="h-full flex flex-col items-center md:items-end justify-center md:pr-10">
                    <div className="w-24 h-24 rounded-2xl bg-gray-200"></div>
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <div className="bg-gray-200 rounded-2xl p-8 h-64"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || !storyData) {
    return (
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error || "Failed to load story content. Please try again later."}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#F66526]/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#F2502C]/5 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-[#F66526]/5 blur-2xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-[#F2502C]/5 blur-2xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header - Make content visible by default with animations as enhancements */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div
            className="opacity-100 transition-all duration-700"
            style={{ transform: isInView ? "translateY(0)" : "translateY(8px)" }}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#F66526]"></span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white font-medium text-sm rounded-full mx-3">
                {storyData.subtitle}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#F2502C]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F66526] to-[#F2502C]">
              {storyData.title}
            </h2>
            <p className="text-xl text-gray-600">{storyData.description}</p>
          </div>
        </div>

        {/* Modern Timeline - Make content visible by default */}
        <div className="relative mt-32">
          {storyData.milestones.map((milestone, index) => (
            <div
              key={index}
              className="mb-24 last:mb-0 opacity-100 transition-all duration-700"
              style={{
                transform: isInView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${0.2 + index * 0.2}s`,
              }}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Year column */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <div className="h-full flex flex-col items-center md:items-end justify-center md:pr-10">
                    <div className="relative hover:scale-105 hover:rotate-3 transition-all duration-300">
                      <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-3xl font-bold shadow-[0_0_15px_rgba(246,101,38,0.3)] text-transparent bg-clip-text bg-gradient-to-br from-[#F66526] to-[#F2502C]">
                        {milestone.year}
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                        {milestone.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content column */}
                <div className="w-full md:w-3/4 relative">
                  {/* Connector line (visible on desktop) */}
                  <div className="hidden md:block absolute top-1/2 -left-6 w-12 h-0.5 bg-gradient-to-r from-[#F66526] to-[#F2502C]"></div>

                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-8 shadow-[0_5px_30px_rgba(246,101,38,0.1)] border-l-4 border-[#F66526] hover:shadow-[0_8px_30px_rgba(246,101,38,0.15)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left content */}
                      <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">{milestone.title}</h3>
                        <p className="text-gray-600 mb-6 text-lg">{milestone.description}</p>

                        <div className="inline-flex items-center text-[#F66526] font-medium group cursor-pointer hover:translate-x-1 transition-all duration-200">
                          <span className="mr-2 group-hover:mr-3 transition-all">Learn more</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Right content - achievements - Make visible by default */}
                      <div className="w-full md:w-1/2 bg-gradient-to-br from-white to-[#F66526]/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="h-5 w-5 text-[#F66526]" />
                          <h4 className="font-semibold text-lg">Key Achievements</h4>
                        </div>
                        <div className="space-y-3">
                          {milestone.achievements.map((achievement, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 opacity-100 transition-all duration-500"
                              style={{
                                transform: isInView ? "translateX(0)" : "translateX(-4px)",
                                transitionDelay: `${0.4 + index * 0.2 + i * 0.1}s`,
                              }}
                            >
                              <CheckCircle className="h-5 w-5 text-[#F66526] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element - Make visible by default */}
        <div
          className="mt-20 flex justify-center opacity-100 transition-all duration-500"
          style={{
            transform: isInView ? "scale(1)" : "scale(0)",
            transitionDelay: "0.8s",
          }}
        >
          <div className="h-1 w-24 bg-gradient-to-r from-[#F66526] to-[#F2502C] rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
