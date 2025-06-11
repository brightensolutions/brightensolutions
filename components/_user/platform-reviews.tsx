"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"

interface PlatformReview {
  platform: string
  logo: string
  stars: number
  count: string
  link?: string
}

export function PlatformReviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const platformReviews: PlatformReview[] = [
    // {
    //   platform: "Google",
    //   logo: "/reviews/google1.png",
    //   stars: 5,
    //   count: "718 + Reviews",
    //   link: "https://www.google.com/search?q=brighten+solutions+surat",
    // },
    {
      platform: "Facebook",
      logo: "/reviews/facebook1.png",
      stars: 5,
      count: "500 + Reviews",
      link: "https://www.facebook.com/people/Brighten-Solutions/100066476621484/",
    },
    {
      platform: "JustDial",
      logo: "/reviews/justdial.png",
      stars: 5,
      count: "1000 + Reviews",
      link: "https://www.justdial.com/Surat/Brighten-Solutions",
    },
    {
      platform: "Shortlist",
      logo: "/reviews/lost.png",
      stars: 5,
      count: "10+ REVIEW",
      link: "https://www.shortlist.co/in/brighten-solutions",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {platformReviews.map((review, index) => (
            <motion.div
              key={review.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Link
                href={review.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105"
              >
                <div className="relative h-12 w-36 mb-3">
                  <Image
                    src={review.logo || "/placeholder.svg"}
                    alt={`${review.platform} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center mb-1">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" strokeWidth={0.5} />
                  ))}
                </div>
                <p className="text-center font-bold text-gray-800">{review.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
