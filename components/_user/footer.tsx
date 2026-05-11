"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
  Globe,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your API
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Website Development", href: "/services/website" },
    { name: "Mobile App Development", href: "/services/mobile" },
    { name: "E-Commerce Solutions", href: "/services/ecommerce" },
    { name: "UI/UX Design", href: "/services/design" },
    { name: "Digital Marketing", href: "/services/marketing" },
    { name: "SEO Optimization", href: "/services/seo" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Support Center", href: "/support" },
  ];

  // Global presence locations
  const globalLocations = [
    { name: "Dubai", flag: "🇦🇪" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "USA", flag: "🇺🇸" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-brightencolor-brightenone/15 backdrop-blur-3xl rounded-t-3xl text-white"
    >
      <div className="container mx-auto px-4 py-16 relative z-50">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-20 w-20 overflow-hidden flex items-center justify-center rounded-full border-2 border-brightencolor-brightenone">
                <Image
                  src="/logos/Brighten Solution Monogram.svg"
                  alt="Brighten Solutions"
                  width={48}
                  height={48}
                  className="object-contain m-auto justify-center items-center"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-brightencolor-brightenone font-bold text-xl leading-none tracking-wider group-hover:translate-x-1 transition-transform">
                  BRIGHTEN
                </span>
                <span className="text-black font-bold text-xl leading-none tracking-wider group-hover:translate-x-1 transition-transform delay-75">
                  SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-zinc-900 font-roboto-slab">
              <span className="font-bold">
                Brighten Solutions is the best Web Solutions provider company in
                Surat, Gujarat
              </span>
              , with a global client base spanning Dubai, Canada, Germany, USA
              and beyond. Award-winning Software Development & Web Development
              with 8 years of experience delivering exceptional Customized
              Software, websites, apps, and digital marketing solutions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-sm border">
                  <Phone className="h-5 w-5 text-brightencolor-brightenone" />
                </div>
                <div>
                  <p className="text-sm text-brightencolor-brightenone font-inter font-bold">
                    Call Us
                  </p>
                  <a
                    href="tel:+917265993989"
                    className="hover:text-brightencolor-brightenone text-black font-roboto-slab"
                  >
                    +91 72659 93989
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-sm border">
                  <Mail className="h-5 w-5 text-brightencolor-brightenone" />
                </div>
                <div>
                  <p className="text-sm text-brightencolor-brightenone font-inter font-bold">
                    Email Us
                  </p>
                  <a
                    href="mailto:brightensolutions@gmail.com"
                    className="hover:text-brightencolor-brightenone text-black font-roboto-slab"
                  >
                    brightensolutions@gmail.com, sales@brightensolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-sm border">
                  <MapPin className="h-5 w-5 text-brightencolor-brightenone" />
                </div>
                <div>
                  <p className="text-sm text-brightencolor-brightenone font-inter font-bold">
                    Visit Us
                  </p>
                  <address className="hover:text-brightencolor-brightenone text-black font-roboto-slab">
                    A-424,4th Floor The Grand Plaza, VIP Road, Vesu, Surat,
                    Gujarat 395007
                  </address>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-6 text-2xl font-bold font-inter  text-brightencolor-brightentwo">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center text-zinc-900 font-roboto-slab text-xl transition-colors hover:text-brightencolor-brightenone"
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-brightencolor-brightenone" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 text-2xl font-bold font-inter  text-brightencolor-brightentwo">
              Services
            </h3>
            <ul className="space-y-4">
              {serviceLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center text-zinc-900 font-roboto-slab text-xl transition-colors hover:text-brightencolor-brightenone"
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-brightencolor-brightenone" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Global Presence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-6 text-2xl font-bold font-inter text-brightencolor-brightentwo">
              Global Presence
            </h3>
            <div className="space-y-6">
              <p className="text-zinc-900 font-roboto-slab">
                Delivering exceptional web solutions to clients worldwide from
                our base in Surat, Gujarat.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {globalLocations.map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="bg-brightencolor-brightentwo rounded-lg p-3 border border-brightencolor-brightenone/20  transition-colors"
                  >
                    <div className="flex items-center  gap-2">
                      <span className=" bg-white h-7 rounded-full text-black flex items-center justify-center w-7">
                        {location.flag}
                      </span>
                      <span className="font-bold text-lg text-black">
                        {location.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social media and copyright */}
        <div className="mt-16 border-t  border-zinc-950/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-center text-xl text-zinc-950 font-inter md:text-left">
                © {currentYear} Brighten Solutions. All rights reserved.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex space-x-4"
            >
              {[
                {
                  icon: <Instagram className="h-5 w-5" />,
                  href: "https://www.instagram.com/brightensolutions16/?utm_medium=copy_link",
                  label: "Instagram",
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  href: "https://www.facebook.com/people/Brighten-Solutions/100066476621484/",
                  label: "Facebook",
                },

                {
                  icon: <Linkedin className="h-5 w-5" />,
                  href: "www.linkedin.com/in/brighten-solutions-3a561227a",
                  label: "LinkedIn",
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6 + index * 0.1,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-md border text-brightencolor-brightenone transition-all duration-300 hover:bg-brightencolor-brightenone hover:text-white hover:scale-110"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-2 bg-gradient-to-r from-brightencolor-brightenone via-brightencolor-brightentwo to-brightencolor-brightenone"></div>
    </footer>
  );
}
