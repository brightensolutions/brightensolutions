"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Heart, Shield, Users, Star, Lightbulb, Target, ThumbsUp, Check, Zap } from "lucide-react"

interface Value {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  image: string
  order: number
  isActive: boolean
}

export function OurValues() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Lower threshold to trigger animations earlier
  const isInView = useInView(sectionRef, { once: true })
  const [values, setValues] = useState<Value[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Update the OurValues component to include an image carousel

  // First, add a state for the current image index and a useEffect for rotation
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // First, add a new state for tracking the previous image to enable crossfade
  const [previousImageIndex, setPreviousImageIndex] = useState(-1)

  useEffect(() => {
    const fetchValues = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about/values?isActive=true")

        if (!response.ok) {
          throw new Error("Failed to fetch values")
        }

        const data = await response.json()
        setValues(data)

        // If no values are returned, try to seed initial values
        if (data.length === 0) {
          await fetch("/api/about/values/seed", { method: "POST" })
          // Fetch values again after seeding
          const seedResponse = await fetch("/api/about/values?isActive=true")
          if (seedResponse.ok) {
            const seedData = await seedResponse.json()
            setValues(seedData)
          }
        }
      } catch (err: any) {
        console.error("Error fetching values:", err)
        setError(err.message || "Failed to load values")
      } finally {
        setLoading(false)
      }
    }

    fetchValues()
  }, [])

  // Add this useEffect after the existing useEffect
  useEffect(() => {
    // Only start the rotation if we have values with images
    if (values.filter((v) => v.image).length > 1) {
      const interval = setInterval(() => {
        setPreviousImageIndex(currentImageIndex)
        setCurrentImageIndex((prevIndex) => {
          // Get all values with images
          const valuesWithImages = values.filter((v) => v.image)
          // If no values with images, return 0
          if (valuesWithImages.length === 0) return 0
          // Otherwise, rotate to the next image
          return (prevIndex + 1) % valuesWithImages.length
        })
      }, 5000) // Change image every 5 seconds

      return () => clearInterval(interval)
    }
  }, [values, currentImageIndex])

  const getIconComponent = (iconName: string, className = "h-6 w-6 text-white") => {
    switch (iconName) {
      case "heart":
        return <Heart className={className} />
      case "shield":
        return <Shield className={className} />
      case "users":
        return <Users className={className} />
      case "star":
        return <Star className={className} />
      case "lightbulb":
        return <Lightbulb className={className} />
      case "target":
        return <Target className={className} />
      case "thumbs-up":
        return <ThumbsUp className={className} />
      case "check":
        return <Check className={className} />
      case "zap":
        return <Zap className={className} />
      default:
        return <Heart className={className} />
    }
  }

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side - Image placeholder */}
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-[500px] bg-gray-200 rounded-xl"></div>
            </div>

            {/* Right side - Content placeholder */}
            <div className="w-full lg:w-1/2">
              <div className="h-6 w-32 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-10"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
                      <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                      <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-[#F66526]">Values</span>
            </h2>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error loading values. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Replace the displayImage logic with this:
  // Find all values with images
  const valuesWithImages = values.filter((v) => v.image)
  // Get the current image to display, or use default if none available
  const displayImage =
    valuesWithImages.length > 0
      ? valuesWithImages[currentImageIndex % valuesWithImages.length].image
      : "/images/collaborative-growth.png"

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Image */}
          <div
            className="w-full lg:w-1/2 opacity-100"
            style={{
              transform: "translateX(0)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Update the image container in the JSX to ensure consistent dimensions */}
            {/* Replace the existing image container with this: */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#F66526] rounded-xl transform rotate-3"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#F2502C] rounded-xl transform -rotate-3"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl aspect-[4/3]">
                {valuesWithImages.length > 0 &&
                  valuesWithImages.map((value, index) => {
                    const isActive = index === currentImageIndex % valuesWithImages.length
                    const isLeaving = index === previousImageIndex % valuesWithImages.length

                    return (
                      <div
                        key={value._id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          isActive ? "opacity-100 z-10" : isLeaving ? "opacity-0 z-0" : "opacity-0 -z-10"
                        }`}
                      >
                        <Image
                          src={value.image || "/images/collaborative-growth.png"}
                          alt={`${value.title} - Our company values`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )
                  })}

                {valuesWithImages.length === 0 && (
                  <Image
                    src="/images/collaborative-growth.png"
                    alt="Our company values"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                {valuesWithImages.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {valuesWithImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setPreviousImageIndex(currentImageIndex)
                          setCurrentImageIndex(index)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex % valuesWithImages.length
                            ? "w-6 bg-white"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className="w-full lg:w-1/2 opacity-100"
            style={{
              transform: "translateX(0)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              OUR VALUES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-[#F66526]">Principles</span> That Guide Us
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Our core values define who we are and how we work. They shape our culture, guide our decisions, and drive
              our commitment to delivering exceptional results for our clients.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">No values found. Please check back later.</p>
                </div>
              ) : (
                values.map((value, index) => (
                  <div
                    key={value._id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 opacity-100"
                    style={{
                      borderColor: value.color,
                      transform: "translateY(0)",
                      transition: `opacity 0.5s ease, transform 0.5s ease`,
                      transitionDelay: `${0.3 + index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          background: `linear-gradient(to right, ${value.color}, ${
                            value.color === "#F66526" ? "#F2502C" : "#F66526"
                          })`,
                        }}
                      >
                        {getIconComponent(value.icon)}
                      </div>
                      <h4 className="text-xl font-bold">{value.title}</h4>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
