"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Award, Users, Clock, Shield, Zap, ArrowRight } from "lucide-react"

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Key advantages with icons
  const advantages = [
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "8+ Years Experience",
      description: "We've been delivering exceptional digital solutions since 2016, with proven expertise and results.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Expert Team",
      description: "Our team consists of skilled professionals with specialized knowledge in various digital domains.",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Quality Assurance",
      description: "We follow rigorous quality standards to ensure every project meets the highest expectations.",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Fast Turnaround",
      description: "We deliver projects efficiently without compromising on quality or attention to detail.",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Award-Winning Work",
      description: "Our projects have been recognized with multiple industry awards for excellence and innovation.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Client Satisfaction",
      description: "We maintain a 95% client satisfaction rate with most clients returning for additional projects.",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F66526]/5 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#F2502C]/5 blur-[120px]"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We Deliver <span className="text-[#F66526]">Excellence</span> in Every Project
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality, innovation, and client satisfaction sets us apart in the digital landscape.
            </p>
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: "200+", label: "Projects Completed" },
            { value: "95%", label: "Client Satisfaction" },
            { value: "15+", label: "Industry Awards" },
            { value: "8+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#F66526]"
            >
              <div className="text-[#F66526] text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#F66526] rounded-xl"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/images/19826.jpg"
                  alt="Our expert team at work"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right side - Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-3xl font-bold mb-8">What Sets Us Apart</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#F66526]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                      {advantage.icon}
                    </div>
                    <h4 className="text-xl font-bold">{advantage.title}</h4>
                  </div>
                  <p className="text-gray-600">{advantage.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10"
            >
              <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#F66526]/30 transition-all duration-300">
                Learn More About Our Approach
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
