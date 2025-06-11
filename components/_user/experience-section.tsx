"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Calendar, Users, TrendingUp, Star, Trophy } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Define icon map for dynamic icon rendering
const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Calendar: <Calendar className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  Trophy: <Trophy className="h-6 w-6" />,
}

// Interface for the experience data
interface Achievement {
  icon: string
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
  isYearsOfExperience: boolean
}

interface AwardData {
  icon: string
  title: string
  year: string
  color: string
  textColor: string
}

interface ExperienceData {
  _id: string
  title: string
  subtitle: string
  description: string
  foundingDate: string
  buttonText: string
  buttonLink: string
  image: string
  achievements: Achievement[]
  stats: Stat[]
  awards: AwardData[]
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0)

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/experience")
        console.log("response",response);
        if (!response.ok) {
          throw new Error("Failed to fetch experience data")
        }

        const data = await response.json()

        if (Object.keys(data).length === 0) {
          throw new Error("No experience data found")
        }

        setExperienceData(data)

        // Calculate years of experience
        const foundingDate = new Date(data.foundingDate)
        const currentDate = new Date()
        const years = currentDate.getFullYear() - foundingDate.getFullYear()

        // Adjust for months (if we haven't reached the anniversary month yet)
        if (
          currentDate.getMonth() < foundingDate.getMonth() ||
          (currentDate.getMonth() === foundingDate.getMonth() && currentDate.getDate() < foundingDate.getDate())
        ) {
          setYearsOfExperience(years - 1)
        } else {
          setYearsOfExperience(years)
        }
      } catch (err) {
        console.error("Error fetching experience data:", err)
        setError("Error loading experience data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchExperienceData()
  }, [])

  // Skeleton loader for the entire section
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-bl from-brightencolor-offwhite via-brightencolor-offwhite to-brightencolor-brightentwo/20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left column skeleton */}
            <div className="flex flex-col justify-center">
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-16 w-3/4 mb-4" />
              <Skeleton className="h-24 w-full mb-8" />
              <Skeleton className="h-12 w-48" />

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-3xl" />
                ))}
              </div>
            </div>

            {/* Right column skeleton */}
            <div>
              <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !experienceData) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-bl from-brightencolor-offwhite via-brightencolor-offwhite to-brightencolor-brightentwo/20 py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error || "Failed to load experience data"}</p>
        </div>
      </section>
    )
  }

  // Update stats with dynamic years of experience
  const updatedStats = experienceData.stats.map((stat) => {
    if (stat.isYearsOfExperience) {
      return { ...stat, value: `${yearsOfExperience}+` }
    }
    return stat
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-bl from-brightencolor-offwhite via-brightencolor-offwhite to-brightencolor-brightentwo/20 md:py-24 text-white"
      id="experience"
    >
      {/* Decorative elements */}
      <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-brightencolor-brightenone/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-brightencolor-brightentwo/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="mb-2 inline-block rounded-full bg-brightencolor-brightenone/20 px-4 py-1 text-sm font-medium text-brightencolor-brightenone">
                1. Proven Experience
              </span>
              <h2 className="mb-6 text-4xl font-bold text-zinc-900 leading-tight md:text-5xl lg:text-6xl">
                <span className="text-brightencolor-brightenone font-extrabold">{yearsOfExperience} years</span>{" "}
                {experienceData.title}
              </h2>
              <p className="mb-8 text-xl text-zinc-800 font-roboto-slab">{experienceData.description}</p>

              <Link href={experienceData.buttonLink}>
                <button className="group flex items-center gap-2 rounded-full border border-brightencolor-brightenone px-6 py-3 transition-all duration-300 bg-brightencolor-brightenone text-white hover:bg-brightencolor-brightenone/90">
                  {experienceData.buttonText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {updatedStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/15 backdrop-blur-3xl shadow-xl border py-7 rounded-3xl"
                >
                  <div className="text-3xl font-bold text-brightencolor-brightenone md:text-4xl">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-roboto-slab">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image and achievements */}
          <div>
            <div className="relative mb-8 overflow-hidden rounded-2xl">
              <div className="aspect-w-16 aspect-h-9 relative h-[400px] w-full">
                <Image
                  src={experienceData.image || "/placeholder.svg?height=400&width=600&query=team celebration"}
                  alt="Team celebration"
                  fill
                  className="object-fill"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Anniversary badge */}
                <div className="absolute -right-6 -top-6 h-32 w-32 rotate-12">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-brightencolor-brightenone/30 blur-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-brightencolor-brightenone text-white">
                      <span className="text-xs font-semibold">CELEBRATING</span>
                      <span className="text-2xl font-bold">{yearsOfExperience}</span>
                      <span className="text-xs font-semibold">YEARS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Award badges */}
              <div className="absolute bottom-4 left-0 flex w-full justify-center space-x-4">
                {experienceData.awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex h-16 w-16 items-center justify-center rounded-full p-1"
                    style={{ backgroundColor: award.color }}
                  >
                    <div
                      className="flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-dashed border-black"
                      style={{
                        backgroundColor: `${award.color}DD`,
                        color: award.textColor,
                      }}
                    >
                      {iconMap[award.icon] || <Trophy className="h-6 w-6" />}
                      <span className="text-[8px] font-bold">{award.title}</span>
                      <span className="text-[6px]">{award.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid gap-4 md:grid-cols-3">
              {experienceData.achievements.map((item, index) => (
                <div key={index} className="rounded-xl bg-white/35 shadow-lg p-4 backdrop-blur-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brightencolor-brightenone text-white">
                    {iconMap[item.icon] || <Award className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 text-lg font-inter text-brightencolor-brightentwo font-bold">{item.title}</h3>
                  <p className="text-sm text-slate-800 font-roboto-slab">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
