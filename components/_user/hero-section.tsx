"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { IoIosReturnRight } from "react-icons/io"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"
import { FaSquareWhatsapp } from "react-icons/fa6"
import { Marquee } from "../magicui/marquee"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AuroraBackground } from "../ui/aurora-background"
import { Skeleton } from "../ui/skeleton"

// Define types for the hero section data
interface SocialLink {
  platform: string
  url: string
  order: number
  id: string // Added unique ID field
}

interface Service {
  text: string
  order: number
  id: string // Added unique ID field
}

interface ClientLogo {
  name: string
  logoUrl: string
  order: number
  id: string // Added unique ID field
}

interface ClientSection {
  title: string
  enabled: boolean
}

interface HeroSectionData {
  _id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  heroImage: string
  services: Service[]
  socialLinks: SocialLink[]
  clientSection: ClientSection
  clientLogos: ClientLogo[]
  isActive: boolean
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const [heroData, setHeroData] = useState<HeroSectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/admin/hero-section")
        const result = await response.json()
        console.log("result hero sections",result);
        if (result.success) {
          setHeroData(result.data)
        } else {
          setError(result.error || "Failed to fetch hero section data")
        }
      } catch (err) {
        setError("An error occurred while fetching hero section data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  // Effect to cycle through services
  useEffect(() => {
    if (!heroData?.services || heroData.services.length === 0) return

    const sortedServices = [...heroData.services].sort((a, b) => a.order - b.order)

    const interval = setInterval(
      () => {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % sortedServices.length)
          setIsAnimating(false)
        }, 500) // Animation duration
      },
      currentServiceIndex === 0 ? 3000 : 2000,
    ) // First service shows longer (3s), others for 2s

    return () => clearInterval(interval)
  }, [currentServiceIndex, heroData?.services])

  // Get social icon component based on platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram className="text-[#fe2a62]" />
      case "facebook":
        return <FaFacebook className="text-[#2377ff]" />
      case "linkedin":
        return <FaLinkedin className="text-[#0077b5]" />
      case "whatsapp":
        return <FaSquareWhatsapp className="text-[#5bdc89]" />
      case "twitter":
        return <FaTwitter className="text-[#1DA1F2]" />
      case "youtube":
        return <FaYoutube className="text-[#FF0000]" />
      default:
        return <FaInstagram className="text-[#fe2a62]" />
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className="w-full overflow-hidden">
        <div className="overflow-hidden backdrop-blur-sm border-brightencolor-brightenone/10 border-[1px] flex flex-col justify-center relative lg:max-w-[1800px] m-auto mt-24 rounded-3xl">
          <div className="px-[20px]">
            <div className="flex md:flex-row flex-col items-center justify-center w-full py-12 md:py-20">
              <div className="md:w-[50%] w-full items-start justify-start">
                <Skeleton className="h-24 w-full md:h-32 md:w-3/4" />
                <Skeleton className="h-32 w-full md:w-3/4 mt-5" />
                <div className="mt-12 flex items-center gap-6 md:gap-11">
                  <Skeleton className="h-12 w-40" />
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={`skeleton-${i}`} className="h-10 w-10 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-[50%] w-full m-auto mt-10 md:mt-0">
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          </div>

          <div className="relative z-50 max-w-[95%] md:max-w-[100%] mx-auto">
            <div className="flex-1 md:flex-row items-center overflow-hidden shadow-xl">
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error || !heroData) {
    return (
      <section className="w-full overflow-hidden">
        <div className="overflow-hidden backdrop-blur-sm border-brightencolor-brightenone/10 border-[1px] flex flex-col justify-center relative lg:max-w-[1800px] m-auto mt-24 rounded-3xl p-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500">Error Loading Hero Section</h2>
            <p className="mt-4">{error || "Failed to load hero section data"}</p>
          </div>
        </div>
      </section>
    )
  }

  // Sort services and client logos by order
  const sortedServices = [...heroData.services].sort((a, b) => a.order - b.order)
  const sortedClientLogos = [...heroData.clientLogos]
  const sortedSocialLinks = [...heroData.socialLinks].sort((a, b) => a.order - b.order)

  return (
    <section className="w-full overflow-hidden">
      <motion.div
        ref={containerRef}
        className="overflow-hidden backdrop-blur-sm border-brightencolor-brightenone/10 border-[1px] flex flex-col justify-center relative lg:max-w-[1800px] m-auto mt-24 rounded-3xl"
      >
        <AuroraBackground className="px-[20px]">
          <div className="flex z-50 relative md:flex-row flex-col items-center justify-center w-full py-12 md:py-20">
            <div className="md:w-[50%] w-full items-start justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Animated services text */}
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`service-${currentServiceIndex}-${sortedServices[currentServiceIndex]?.id || "default"}`}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.5,
                      }}
                      className="relative font-inter font-bold text-6xl md:text-5xl lg:text-5xl  text-clip text-brightencolor-brightenone"
                    >
                      {sortedServices[currentServiceIndex]?.text || heroData.title}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-lg md:text-2xl font-roboto-slab mt-5 text-black/80 max-w-2xl"
              >
                {heroData.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex md:flex-row flex-col items-center gap-6 md:gap-11"
              >
                <Button
                  asChild
                  className="py-3 px-5 md:py-6 md:px-7 flex flex-row gap-3 items-center justify-center group bg-brightencolor-brightenone text-white hover:bg-brightencolor-brightentwo transition-all duration-300"
                >
                  <Link href={heroData.buttonLink || "#"}>
                    {heroData.buttonText}{" "}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <IoIosReturnRight />
                    </motion.span>
                  </Link>
                </Button>
                <div className="flex gap-3 text-2xl md:text-3xl">
                  {sortedSocialLinks.map((social, index) => (
                    <motion.div
                      key={`social-${index}-${social.id || social.platform}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1.3 + index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 shadow-lg rounded-full block"
                      >
                        {getSocialIcon(social.platform)}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="md:w-[50%] w-full m-auto mt-10 md:mt-0"
            >
              <img
                src={heroData.heroImage || "/placeholder.svg"}
                alt="best web development company"
                width={800}
                height={800}
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </AuroraBackground>

        {/* WHO WE WORK WITH section */}
        {heroData.clientSection.enabled && (
          <div className="relative z-50 max-w-[95%] md:max-w-[100%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 md:flex-row items-center overflow-hidden shadow-xl"
            >
              {/* Left side - Title */}
              <div className="bg-gradient-to-r from-brightencolor-brightenone to-brightencolor-brightentwo text-white py-4 px-6 md:px-8 md:w-auto md:min-w-[180px] flex items-center justify-center md:justify-start">
                <div className="text-center md:text-left">
                  <h3 className="font-inter font-bold text-2xl md:text-3xl">{heroData.clientSection.title}</h3>
                </div>
              </div>

              {/* Right side - Marquee */}
              <div className="bg-white/90 backdrop-blur-sm">
                <Marquee pauseOnHover className="[--duration:25s]">
                  {sortedClientLogos.map((client, index) => (
                    <ClientLogo
                      key={`client-${index}-${client.id || client.name}`}
                      img={client.logoUrl}
                      name={client.name}
                    />
                  ))}
                </Marquee>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

// Client logo component
const ClientLogo = ({ img, name }: { img: string; name: string }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.2 }}
      className="mx-4 flex w-32 items-center justify-center rounded-lg hover:bg-gray-50/50 transition-all duration-300"
    >
      <div className="relative">
        <img src={img || "/placeholder.svg"} alt={`${name} Logo`} width={80} height={80} className="object-contain" />
      </div>
    </motion.div>
  )
}
