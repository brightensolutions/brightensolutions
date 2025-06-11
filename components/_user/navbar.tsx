"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronRight, Instagram, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsappSquare } from "react-icons/fa"

// Define menu items as a variable
const menuItems = [
  {
    title: "Services",
    href: "/Our-Services",
    comingSoon: false,
  },
  {
    title: "Our Products",
    href: "/",
    comingSoon: true,
  },
  {
    title: "About Us",
    href: "/about",
    comingSoon: false,
  },
  {
    title: "Snapshots",
    href: "/gallery",
    comingSoon: false,
  },
  {
    title: "Blog & Aricles",
    href: "/blog",
    comingSoon: false,
  },
  {
    title: "Contact Us",
    href: "/contact",
    comingSoon: false,
  },
]

// Social media icons
const socialIcons = [
  { icon: Instagram, href: "https://www.instagram.com/brightensolutions16/?utm_medium=copy_link" },
  { icon: Facebook, href: "https://www.facebook.com/people/Brighten-Solutions/100066476621484/" },
  { icon: Linkedin, href: "www.linkedin.com/in/brighten-solutions-3a561227a" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-brightencolor-offwhite/15 backdrop-blur-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="lg:max-w-[1880px] mx-auto px-[20px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden border-yellow-500">
            <Image
              src="/logos/Brighten Solution Monogram.svg"
              alt="Brighten Solutions"
              width={60}
              height={60}
              className="object-cover"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="md:static md:transform-none md:ml-auto">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 rounded-full border border-white/50 bg-black/30 px-6 py-2 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-black/50"
            >
              PORTFOLIO
            </Link>
          </div>

          <Button size="icon" className="relative z-[100] bg-brightencolor-brightenone hover:bg-brightencolor-brightentwo" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Full screen menu with enhanced animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
            style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0 }}
          >
            {/* Backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brightencolor-cream backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
              style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0 }}
            />

            {/* Animated background elements */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ height: "100vh", width: "100vw" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </motion.div>

              {/* Animated gradient orbs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-[#F66526]/40 to-[#F2502C]/40 blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute bottom-[15%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-r from-[#F66526]/30 to-purple-500/30 blur-3xl"
              />
            </div>

            {/* Menu content container */}
            <div className="relative z-[95] w-full h-full flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row">
                {/* Left side - Menu items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 flex flex-col justify-center"
                >
                 

                  <nav className="flex flex-col space-y-1 md:space-y-2 ml-4 md:ml-8">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          delay: 0.1 + index * 0.08,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group flex items-center py-3 px-4 rounded-xl transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            whileHover={{ height: "2rem" }}
                            className="w-1 rounded-full bg-gradient-to-b from-[#F66526] to-[#F2502C] mr-4"
                          />
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xl md:text-2xl font-medium text-black group-hover:text-[#F66526] transition-colors">
                              {item.title}
                              {item.comingSoon && (
                                <span className="ml-3 rounded-full bg-yellow-400/20 text-yellow-400 px-2 py-0.5 text-xs font-medium">
                                  SOON
                                </span>
                              )}
                            </span>
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#F66526] transition-colors" />
                            </motion.div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>

                {/* Right side - Contact & Social */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 flex flex-col justify-center mt-10 md:mt-0"
                >
                  <div className="bg-black/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-xl font-bold text-black mb-6"
                    >
                      Get In Touch
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="space-y-4 mb-8"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#F66526]/10 flex items-center justify-center">
                          <span className="text-[#F66526]">📞</span>
                        </div>
                        <a href="tel:+91 7265993989" className="text-black hover:text-[#F66526] transition-colors">
                        +91 72659 93989
                        </a>
                      </div>
                                            <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#F66526]/10 flex items-center justify-center">
                          <span className="text-[#F66526]"><FaWhatsappSquare className="text-3xl" /></span>
                        </div>
                        <a href="tel:918511463297" className="text-black hover:text-[#F66526] transition-colors">
                        +91 85114 63297
                        </a>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#F66526]/10 flex items-center justify-center">
                          <span className="text-[#F66526]">✉️</span>
                        </div>
                        <a href="mailto:brightensolutions@gmail.com" className="text-black hover:text-[#F66526] transition-colors">
                        brightensolutions@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <h4 className="text-sm font-semibold text-black/70 mb-4">FOLLOW US</h4>
                      <div className="flex space-x-4">
                        {socialIcons.map((social, i) => (
                          <motion.a
                            key={i}
                            href={social.href}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-brightencolor-brightenone text-white hover:bg-gradient-to-r hover:from-[#F66526] hover:to-[#F2502C] transition-colors duration-300"
                          >
                            <social.icon className="h-5 w-5" />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-8 text-center md:text-left"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white font-medium hover:shadow-lg hover:shadow-[#F66526]/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Let's Work Together
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
