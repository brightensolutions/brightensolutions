"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#F66526]/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2502C]/5 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F66526]/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#F2502C]/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title with Company Logo */}
        <div className="flex flex-col items-center mb-12">
          <SectionTitle
            badge="Contact Us"
            title="Get in Touch With Brighten Solutions"
            highlight="Brighten Solutions"
            subtitle="We're here to answer your questions and help transform your digital presence. Reach out to us for web development, app development, digital marketing, and graphic design services."
            titleClassName="text-gray-800"
            subtitleClassName="text-gray-600"
          />
        </div>

        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {/* Phone Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#F66526] hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Our team is available during business hours
                </p>
                <Link
                  href="tel:+917265993989"
                  className="text-[#F66526] font-medium hover:underline"
                >
                  +91 72659 93989
                </Link>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#F66526] hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <Link
                  href="mailto:brightensolutions@gmail.com"
                  className="text-[#F66526] font-medium hover:underline"
                >
                  brightensolutions@gmail.com
                </Link>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#F66526] hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">
                A-424,4th Floor The Grand Plaza, VIP Road, Vesu, Surat, Gujarat 395007
                </p>
                <Link
                  href="https://maps.app.goo.gl/9jbbkkP"
                  target="_blank"
                  className="text-[#F66526] font-medium hover:underline"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#F66526] hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                <p className="text-gray-600 mb-2">
                  Monday - Saturday: 10:00 AM - 7:00 PM
                </p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
