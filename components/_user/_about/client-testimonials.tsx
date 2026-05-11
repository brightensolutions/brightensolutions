"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function ClientTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      quote:
        "Brighten Solutions transformed our online presence completely. Their team's expertise in web development and digital marketing helped us increase our conversion rate by 150% within just three months.",
      name: "Arjun Mehta",
      position: "CEO, TechStart Innovations",
      company: "TechStart Innovations",
      image: "/images/testimonials/client-1.jpg",
      logo: "/images/testimonials/company-logo-1.png",
    },
    {
      quote:
        "Working with Brighten Solutions was a game-changer for our business. Their mobile app development team created an intuitive, feature-rich application that our customers love. The results have exceeded our expectations.",
      name: "Sunita Reddy",
      position: "Marketing Director",
      company: "GlobalReach Enterprises",
      image: "/images/testimonials/client-2.jpg",
      logo: "/images/testimonials/company-logo-2.png",
    },
    {
      quote:
        "The SEO and digital marketing strategies implemented by Brighten Solutions helped us achieve a 200% increase in organic traffic and significantly improved our search rankings for key industry terms.",
      name: "Vikram Malhotra",
      position: "Founder",
      company: "EcoSmart Solutions",
      image: "/images/testimonials/client-3.jpg",
      logo: "/images/testimonials/company-logo-3.png",
    },
    {
      quote:
        "Brighten Solutions delivered an e-commerce platform that not only looks beautiful but also performs exceptionally well. Our sales have increased by 120% since launch, and the user experience feedback has been overwhelmingly positive.",
      name: "Anita Sharma",
      position: "E-commerce Director",
      company: "Fashion Forward",
      image: "/images/testimonials/client-4.jpg",
      logo: "/images/testimonials/company-logo-4.png",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#F66526]/10 text-[#F66526] font-medium text-sm rounded-md mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-[#F66526]">Clients</span> Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. Here's what our clients have to say about their experience working with
              us.
            </p>
          </motion.div>
        </div>

        {/* Testimonial slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#F66526] to-[#F2502C] p-1 shadow-xl">
            <div className="h-full w-full rounded-xl bg-white p-8 md:p-12">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="flex h-full flex-col justify-between"
                >
                  {/* Quote icon */}
                  <div className="mb-6 flex justify-center md:justify-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F66526]/10">
                      <Quote className="h-6 w-6 text-[#F66526]" />
                    </div>
                  </div>

                  {/* Quote text */}
                  <div className="mb-8 text-center md:text-left">
                    <p className="text-xl font-medium italic text-gray-700 md:text-2xl">
                      "{testimonials[currentIndex].quote}"
                    </p>
                  </div>

                  {/* Author info */}
                  <div className="mt-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full">
                        <Image
                          src={testimonials[currentIndex].image || "/placeholder.svg?height=56&width=56&query=person"}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                        <p className="text-gray-600">
                          {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                    <div className="relative h-10 w-24">
                      <Image
                        src={testimonials[currentIndex].logo || "/placeholder.svg?height=40&width=96&query=logo"}
                        alt={`${testimonials[currentIndex].company} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
            <button
              onClick={prevTestimonial}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-transform hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-transform hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-[#F66526]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}