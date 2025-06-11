"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Code, Smartphone, LineChart, Globe, Palette, Search } from "lucide-react"
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
  sequence?: number
}

interface ServiceCardProps {
  service: Service
  index: number
}

const ServiceCardSkeleton = () => {
  return (
    <div className="h-full rounded-2xl border shadow-lg bg-white">
      <Skeleton className="h-32 w-full rounded-t-2xl bg-gray-200" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-8 w-3/4 bg-gray-200" />
        <Skeleton className="h-16 w-full bg-gray-200" />
        <Skeleton className="h-10 w-32 rounded-full bg-gray-200" />
      </div>
    </div>
  )
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { title, description, icon, image, slug } = service
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

  // Safely get the icon or use a default
  const iconComponent = icon && iconMap[icon] ? iconMap[icon] : <Code className="h-6 w-6" />

  // Truncate description to keep cards shorter
  const truncatedDescription =
    description && description.length > 100 ? `${description.substring(0, 100)}...` : description

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
        className="group relative h-full overflow-hidden rounded-2xl border shadow-lg bg-white hover:shadow-2xl transition-all duration-500"
      >
        {/* Service image banner */}
        <div className="relative h-32 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brightencolor-brightenone to-brightencolor-brightentwo opacity-90"></div>
          <Image
            src={image || "/placeholder.svg?height=400&width=600&query=service"}
            alt={title || "Service"}
            fill
            className="object-cover"
          />
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-1/2 left-6 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brightencolor-brightenone shadow-lg"
          >
            {iconComponent}
          </motion.div>
        </div>

        <div className="relative z-10 p-5">
          <motion.h3 style={{ transform: "translateZ(30px)" }} className="mb-2 text-xl font-bold text-zinc-900">
            {title || "Service Title"}
          </motion.h3>
          <motion.p style={{ transform: "translateZ(20px)" }} className="mb-4 text-zinc-600 text-sm">
            {truncatedDescription || "Service description"}
          </motion.p>

          <Link href={`/services/${slug || "#"}`}>
            <motion.button
              style={{ transform: "translateZ(40px)" }}
              className="group flex items-center gap-1 rounded-full bg-brightencolor-brightenone px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-brightencolor-brightentwo"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        {/* Highlight accent */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brightencolor-brightenone to-brightencolor-brightentwo transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </motion.div>
    </motion.div>
  )
}

export function ServicesSection3D() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
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

        // Sort services by sequence if available
        const sortedServices = [...data].sort((a, b) => {
          // If both have sequence, sort by sequence
          if (a.sequence !== undefined && b.sequence !== undefined) {
            return a.sequence - b.sequence
          }
          // If only one has sequence, prioritize the one with sequence
          if (a.sequence !== undefined) return -1
          if (b.sequence !== undefined) return 1
          // If neither has sequence, maintain original order
          return 0
        })

        setServices(sortedServices || [])
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
    <section
      ref={sectionRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-brightencolor-darkcream to-brightencolor-offwhite"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 inline-block font-roboto-slab text-brightencolor-brightenone md:text-5xl text-5xl font-bold">
            OUR SERVICES
          </h2>
          <div className="h-1 w-24 bg-brightencolor-brightentwo mx-auto mb-4"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-700 font-roboto-slab">
            The ways we help businesses grow and succeed in the digital landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Show skeleton loaders while loading
            <>
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
              <p className="text-xl text-gray-600">No services found. Add services through the admin panel.</p>
            </div>
          ) : (
            services.map((service, index) => <ServiceCard key={service._id} service={service} index={index} />)
          )}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brightencolor-brightenone/5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brightencolor-brightentwo/5 blur-3xl"></div>
    </section>
  )
}
