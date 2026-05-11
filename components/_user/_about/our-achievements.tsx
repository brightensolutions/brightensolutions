"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Trophy, Award, Star, BadgeIcon as Certificate, Medal, Crown } from 'lucide-react'

interface Achievement {
  _id: string
  title: string
  organization: string
  year: string
  image: string
  icon: string
  isFeatured: boolean
  description: string
  category: string
  order: number
  isActive: boolean
}

export function OurAchievements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [featuredAchievement, setFeaturedAchievement] = useState<Achievement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about/achievements?isActive=true")

        if (!response.ok) {
          throw new Error("Failed to fetch achievements")
        }

        const data = await response.json()

        // Find featured achievement
        const featured = data.find((item: Achievement) => item.isFeatured)
        setFeaturedAchievement(featured || null)

        // Set all achievements
        setAchievements(data.filter((item: Achievement) => !item.isFeatured))
      } catch (err: any) {
        console.error("Error fetching achievements:", err)
        setError(err.message || "Failed to load achievements")
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-6 w-6 text-white" />
      case "award":
        return <Award className="h-6 w-6 text-white" />
      case "star":
        return <Star className="h-6 w-6 text-white" />
      case "certificate":
        return <Certificate className="h-6 w-6 text-white" />
      case "medal":
        return <Medal className="h-6 w-6 text-white" />
      case "crown":
        return <Crown className="h-6 w-6 text-white" />
      default:
        return <Trophy className="h-6 w-6 text-white" />
    }
  }

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded-md mx-auto mb-4"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md mx-auto"></div>
            </div>
          </div>

          <div className="relative mb-20 animate-pulse">
            <div className="bg-gray-200 rounded-2xl p-8 md:p-12 h-80"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-[#F66526]">Awards</span> & Achievements
            </h2>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error loading achievements. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header - Removed motion animation */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              RECOGNITION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-[#F66526]">Awards</span> & Achievements
            </h2>
            <p className="text-xl text-gray-600">
              We're proud to be recognized for our commitment to excellence and innovation in the digital space.
            </p>
          </div>
        </div>

        {/* Main trophy/award showcase - Removed motion animation */}
        {featuredAchievement && (
          <div className="relative mb-20">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F66526]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F2502C]/10 rounded-full blur-3xl"></div>

            <div className="bg-gradient-to-r from-[#F66526] to-[#F2502C] p-1 rounded-2xl">
              <div className="bg-white rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/3">
                    <div className="relative h-80 w-full">
                      <Image
                        src={featuredAchievement.image || "/placeholder.svg?height=320&width=240&query=award trophy"}
                        alt={featuredAchievement.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
                      FEATURED ACHIEVEMENT
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{featuredAchievement.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredAchievement.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-gray-100 rounded-full px-4 py-2 text-sm">
                        <span className="font-medium">Category:</span>{" "}
                        {featuredAchievement.category || "Agency Excellence"}
                      </div>
                      <div className="bg-gray-100 rounded-full px-4 py-2 text-sm">
                        <span className="font-medium">Presented by:</span> {featuredAchievement.organization}
                      </div>
                      <div className="bg-gray-100 rounded-full px-4 py-2 text-sm">
                        <span className="font-medium">Date:</span> {featuredAchievement.year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Awards grid - Removed motion animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No achievements found.</p>
            </div>
          ) : (
            achievements.map((achievement, index) => (
              <div
                key={achievement._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={achievement.image || `/placeholder.svg?height=192&width=384&query=award`}
                    alt={achievement.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                        {getIconComponent(achievement.icon)}
                      </div>
                      <span className="text-white font-medium">{achievement.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{achievement.organization}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{achievement.year}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
