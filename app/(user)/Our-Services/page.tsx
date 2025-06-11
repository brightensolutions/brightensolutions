"use client"

import type React from "react"
import { ArrowRight, Code, Smartphone, LineChart, Globe, Palette, Search } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import WhyChooseUs from "@/components/_user/why-choose-us"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  LineChart: <LineChart className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
}

interface Service {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  image: string
  featuredProject?: string
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  index: number
  featuredProject?: string
  slug?: string
}

const ServiceCard = ({ title, description, icon, image, index, featuredProject, slug }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 5
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 5

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-2xl border p-8 bg-brightencolor-cream shadow-lg transition-all duration-500"
      >
        <div className="relative z-10">
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brightencolor-brightenone text-white shadow-md"
          >
            {icon}
          </motion.div>
          <motion.h3
            style={{ transform: "translateZ(30px)" }}
            className="mb-3 text-3xl font-inter font-bold text-zinc-900"
          >
            {title}
          </motion.h3>
          <motion.p
            style={{ transform: "translateZ(20px)" }}
            className="mb-8 font-roboto-slab font-normal text-2xl text-zinc-800"
          >
            {description}
          </motion.p>

          {featuredProject && (
            <motion.div style={{ transform: "translateZ(25px)" }} className="mb-6">
              <p className="text-sm uppercase tracking-wider text-gray-400">FEATURED PROJECT: {featuredProject}</p>
            </motion.div>
          )}

          <Link href={`/services/${slug || "#"}`}>
            <motion.button
              style={{ transform: "translateZ(40px)" }}
              className="group flex items-center gap-2 rounded-full border border-brightencolor-brightenone bg-transparent px-6 py-3 text-brightencolor-brightenone transition-all duration-300 hover:bg-brightencolor-brightenone hover:text-white"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
          <div className="relative h-full w-full">
            <Image
              src={image || "/placeholder.svg?height=400&width=600&query=service"}
              alt={title}
              fill
              className="object-cover rounded-l-full"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-brightencolor-brightenone/20 blur-xl"></div>
        <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-brightencolor-brightentwo/20 blur-xl"></div>
      </motion.div>
    </motion.div>
  )
}

// Skeleton card for loading state
const ServiceCardSkeleton = () => {
  return (
    <div className="h-full rounded-2xl border p-8 bg-brightencolor-cream shadow-lg">
      <div className="space-y-4">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
        <Skeleton className="h-10 w-3/4 bg-gray-200" />
        <Skeleton className="h-24 w-full bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-12 w-40 rounded-full bg-gray-200" />
      </div>
    </div>
  )
}

const OurServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/services")

        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }

        const data = await response.json()
        setServices(data || [])
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("Error loading services. Please try again later.")
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div ref={sectionRef} className="relative pt-24 overflow-hidden">
      {/* Enhanced background with light effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF1E6] to-[#FDFAF6] z-0">
        {/* Left side light effect */}
        <div className="absolute left-0 top-1/4 w-[30vw] h-[60vh] bg-[#F66526]/10 rounded-full blur-[100px] transform -translate-x-1/2"></div>

        {/* Right side light effect */}
        <div className="absolute right-0 bottom-1/4 w-[30vw] h-[60vh] bg-[#F2502C]/10 rounded-full blur-[100px] transform translate-x-1/2"></div>

        {/* Additional subtle light elements */}
        <div className="absolute left-1/4 bottom-0 w-[20vw] h-[20vh] bg-[#F66526]/5 rounded-full blur-[80px]"></div>
        <div className="absolute right-1/4 top-0 w-[20vw] h-[20vh] bg-[#F2502C]/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container relative z-10 px-[20px] mx-auto pb-24">
        {/* Enhanced title section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-6 py-2 rounded-full bg-[#F66526]/10 text-[#F66526] font-medium text-sm mb-4">
            OUR EXPERTISE
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Comprehensive <span className="text-[#F66526]">Digital Services</span> <br />
            For Modern Businesses
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-roboto-slab">
            We deliver end-to-end digital solutions that help businesses thrive in today's competitive landscape. From
            stunning websites to powerful applications, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {loading ? (
            // Show skeleton loaders while loading
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          ) : error ? (
            <div className="col-span-full">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">No services found. Please check back later.</p>
            </div>
          ) : (
            services.map((service, index) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                description={service.description}
                icon={iconMap[service.icon] || <Code className="h-6 w-6" />}
                image={service.image}
                index={index}
                featuredProject={service.featuredProject}
                slug={service.slug}
              />
            ))
          )}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-[#F66526] text-white rounded-full font-bold text-lg hover:bg-[#F2502C] transition-colors duration-300 shadow-lg">
            Discuss Your Project With Us
          </button>
        </motion.div>
      </div>

      <div>
        <WhyChooseUs />
      </div>
    </div>
  )
}

export default OurServices
