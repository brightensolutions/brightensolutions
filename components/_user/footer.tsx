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
     { name: "Terms & Conditions", href: "/terms-and-conditions" },
     { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  const serviceLinks = [
    { name: "Website Development", href: "/services/website-development-surat" },
    { name: "Mobile App Development", href: "/services/application-development-services-in-surat" },
    { name: "E-Commerce Solutions", href: "/services/ecommerce" },
    { name: "Custom Software Development", href: "/services/custom-software-development" },
    { name: "ERP Solutions", href: "/services/erp-solutions" },
    { name: "UI/UX Design", href: "/services/ui/ux-design-services-in-surat" },
    { name: "Graphic & Printing", href: "/services/graphic-and-printing-solutions-in-surat" },
    { name: "Digital Marketing", href: "/services/marketing" },
    { name: "SEO Optimization", href: "/services/seo-services-in-surat" },
    
  ];

  const resourceLinks = [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Support Center", href: "/support" },
  ];

  // Global presence locations
  const globalLocations = [
  {
    name: "Dubai",
    flag: "https://flagcdn.com/ae.svg",
    link: "/web-development-company-in-dubai",
  },
  {
    name: "Canada",
    flag: "https://flagcdn.com/ca.svg",
    link: "/web-development-company-in-canada",
  },
  {
    name: "Germany",
    flag: "https://flagcdn.com/de.svg",
    link: "/web-development-company-in-germany",
  },
  {
    name: "USA",
    flag: "https://flagcdn.com/us.svg",
    link: "/web-development-company-in-usa",
  },
  {
    name: "UAE",
    flag: "https://flagcdn.com/ae.svg",
    link: "/web-development-company-in-uae",
  },
  {
    name: "Oman",
    flag: "https://flagcdn.com/om.svg",
    link: "/web-development-company-in-oman",
  },
  {
    name: "Qatar",
    flag: "https://flagcdn.com/qa.svg",
    link: "/web-development-company-in-qatar",
  },
  {
    name: "Saudi Arabia",
    flag: "https://flagcdn.com/sa.svg",
    link: "/web-development-company-in-saudi-arabia",
  },
  {
    name: "Kuwait",
    flag: "https://flagcdn.com/kw.svg",
    link: "/web-development-company-in-kuwait",
  },
  {
    name: "Bahrain",
    flag: "https://flagcdn.com/bh.svg",
    link: "/web-development-company-in-bahrain",
  },
  {
    name: "Iran",
    flag: "https://flagcdn.com/ir.svg",
    link: "/web-development-company-in-iran",
  },
   {
    name: "Brazil",
    flag: "https://flagcdn.com/br.svg",
    link: "/web-development-company-in-brazil",
  },
   {
    name: "Iraq",
    flag: "https://flagcdn.com/iq.svg",
    link: "/web-development-company-in-iraq",
  },
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
              , with a global client base spanning Dubai, Canada, Germany, USA, UAE, Oman, Qatar, Saudi Arabia, Kuwait, Bahrain, Iran, Iraq, Brazil
              and beyond. Award-winning ERP Solutions, Software Development & Web Development
              with 10 years of experience delivering exceptional Customized
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
    >
      <Link href={location.link}>
        <div className="bg-brightencolor-brightentwo rounded-lg p-3 border border-brightencolor-brightenone/20 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
  <Image
    src={location.flag}
    alt={location.name}
    fill
    className="object-cover"
    sizes="32px"
  />
</div>

            <span className="font-bold text-lg text-black">
              {location.name}
            </span>
          </div>
        </div>
      </Link>
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
                  href: "https://www.instagram.com/brightensolutions16/",
                  label: "Instagram",
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  href: "https://www.facebook.com/people/Brighten-Solutions/100066476621484/",
                  label: "Facebook",
                },

                {
                  icon: <Linkedin className="h-5 w-5" />,
                  href: "https://www.linkedin.com/in/brighten-solutions-3a561227a",
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
