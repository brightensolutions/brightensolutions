"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Mail, Phone, Briefcase, ComputerIcon as Windows, Globe } from "lucide-react"

export function PremiumApiServices() {
  const [activeService, setActiveService] = useState<number | null>(null)

  // Reset active service after delay
  useEffect(() => {
    if (activeService !== null) {
      const timer = setTimeout(() => {
        setActiveService(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [activeService])

  const services = [
    {
      id: 1,
      name: "WHATSAPP API",
      icon: <Phone className="h-6 w-6" />,
      description: "Connect with customers through WhatsApp messaging",
      color: "#25D366",
      link: "/services/whatsapp-api",
      category: "api",
    },
    {
      id: 2,
      name: "EMAIL API",
      icon: <Mail className="h-6 w-6" />,
      description: "Send transactional and marketing emails",
      color: "#4285F4",
      link: "/services/email-api",
      category: "api",
    },
    {
      id: 3,
      name: "MESSAGES API",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Deliver SMS and MMS messages globally",
      color: "#F66526",
      link: "/services/messages-api",
      category: "api",
    },
    {
      id: 4,
      name: "BUSINESS EMAIL",
      icon: <Briefcase className="h-6 w-6" />,
      description: "Professional email with your domain (Google Workspace)",
      color: "#EA4335",
      link: "/services/business-email",
      category: "email",
    },
    {
      id: 5,
      name: "MICROSOFT EMAIL",
      icon: <Windows className="h-6 w-6" />,
      description: "Enterprise email solutions with Microsoft 365",
      color: "#0078D4",
      link: "/services/microsoft-email",
      category: "email",
    },
  ]

  // Filter services by category
  const apiServices = services.filter((service) => service.category === "api")
  const emailServices = services.filter((service) => service.category === "email")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const serviceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.6,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden ] py-24">
      {/* Background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#0a2463]/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#F66526]/5 blur-3xl"></div>
      </div> */}

      <div className="container relative z-10 mx-auto px-4">
        <div
        >
          

          {/* Title */}
          <motion.h2 variants={titleVariants} className="mb-4 text-4xl font-bold text-center font-roboto-slab text-brightencolor-brightenone md:text-5xl">
            Communication Services
          </motion.h2>

          {/* Animated line */}
          <motion.div variants={lineVariants} className="mx-auto mb-16 h-1 w-24 rounded-full bg-[#F66526]"></motion.div>

          {/* API Services Category */}
          <motion.div variants={categoryVariants} className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-brightencolor-brightentwo px-6 py-2">
              <Globe className="h-5 w-5 text-white" />
              <h3 className="text-xl font-bold text-white">API Services</h3>
            </div>
          </motion.div>

          {/* API Services */}
          <motion.div variants={containerVariants} className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {apiServices.map((service) => (
              <motion.div
                key={service.id}
                variants={serviceVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300"
                onMouseEnter={() => setActiveService(service.id)}
                style={{
                  boxShadow: activeService === service.id ? `0 10px 25px ${service.color}20` : "",
                  borderTop: activeService === service.id ? `4px solid ${service.color}` : "4px solid transparent",
                }}
              >
                {/* Service icon */}
                <motion.div
                  variants={iconVariants}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${service.color}15`, color: service.color }}
                >
                  {service.icon}
                </motion.div>

                {/* Service name */}
                <h3 className="mb-4 text-xl font-bold text-[#0a2463] transition-colors duration-300 group-hover:text-[#0a2463]">
                  {service.name}
                </h3>

                {/* Service description */}
                <p className="mb-6 text-gray-600">{service.description}</p>

                {/* Learn more link */}
                {/* <Link
                  href={service.link}
                  className="group/link inline-flex items-center font-medium"
                  style={{ color: service.color }}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link> */}

                {/* Background decoration */}
                <div
                  className="absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: service.color }}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Email Services Category */}
          <motion.div variants={categoryVariants} className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-brightencolor-brightentwo  px-6 py-2">
              <Mail className="h-5 w-5 text-white" />
              <h3 className="text-xl font-bold text-white">Email Services</h3>
            </div>
          </motion.div>

          {/* Email Services */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {emailServices.map((service) => (
              <motion.div
                key={service.id}
                variants={serviceVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300"
                onMouseEnter={() => setActiveService(service.id)}
                style={{
                  boxShadow: activeService === service.id ? `0 10px 25px ${service.color}20` : "",
                  borderTop: activeService === service.id ? `4px solid ${service.color}` : "4px solid transparent",
                }}
              >
                {/* Service icon */}
                <motion.div
                  variants={iconVariants}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${service.color}15`, color: service.color }}
                >
                  {service.icon}
                </motion.div>

                {/* Service name */}
                <h3 className="mb-4 text-xl font-bold text-[#0a2463] transition-colors duration-300 group-hover:text-[#0a2463]">
                  {service.name}
                </h3>

                {/* Service description */}
                <p className="mb-6 text-gray-600">{service.description}</p>

                {/* Learn more link */}
                {/* <Link
                  href={service.link}
                  className="group/link inline-flex items-center font-medium"
                  style={{ color: service.color }}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link> */}

                {/* Background decoration */}
                <div
                  className="absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: service.color }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
