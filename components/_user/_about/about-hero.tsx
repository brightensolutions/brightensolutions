"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface AboutHeroData {
  _id: string
  title: string
  titleHighlight: string
  subtitle: string
  description1: string
  description2: string
  image: string
  stats: Array<{
    value: string
    label: string
  }>
  buttons: Array<{
    text: string
    link: string
    isPrimary: boolean
  }>
}

export function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [heroData, setHeroData] = useState<AboutHeroData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about/hero")

        if (!response.ok) {
          throw new Error("Failed to fetch hero data")
        }

        const data = await response.json()
        setHeroData(data)
      } catch (err: any) {
        console.error("Error fetching hero data:", err)
        setError(err.message || "Failed to load hero data")
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-24 w-full bg-gray-200 rounded-md mb-8"></div>
              <div className="h-24 w-full bg-gray-200 rounded-md mb-8"></div>
              <div className="flex gap-4">
                <div className="h-14 w-40 bg-gray-200 rounded-lg"></div>
                <div className="h-14 w-40 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-[450px] bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !heroData) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              We Are <span className="text-[#F66526]">Brighten Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {error ? "Error loading content. Please try again later." : "Loading content..."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              {heroData.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {heroData.title} <span className="text-[#F66526]">{heroData.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{heroData.description1}</p>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{heroData.description2}</p>
            <div className="flex flex-wrap gap-4">
              {heroData.buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.link}
                  className={`group flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                    button.isPrimary
                      ? "bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white hover:shadow-lg hover:shadow-[#F66526]/30"
                      : "border-2 border-[#F66526] text-[#F66526] hover:bg-[#F66526]/5"
                  }`}
                >
                  {button.text}
                  {button.isPrimary && (
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-[#F66526]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[#F2502C]/10 rounded-full blur-xl"></div>

              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroData.image || "/placeholder.svg?height=600&width=450&query=team"}
                  alt="Brighten Solutions Team"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />

                {/* Overlay with company stats */}
                {heroData.stats.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex justify-between text-white">
                      {heroData.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-3xl font-bold">{stat.value}</div>
                          <div className="text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
