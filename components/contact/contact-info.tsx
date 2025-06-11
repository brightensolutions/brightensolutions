"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Users, Briefcase, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-64 md:h-full">
              <Image
                src="/IMG-20210224-WA0001.webp"
                alt="Brighten Solutions Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Brighten Solutions
                </h3>
                <p className="text-white/90 text-sm">
                  Web Development & Digital Services in Surat
                </p>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white text-xs">Established 2018</span>
                  </div>
                  <div className="w-1 h-1 bg-white/50 rounded-full mx-2"></div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white text-xs">15+ Experts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                How Can We Help You?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Services</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Customized Software</li>
                      <li>• Website Development</li>
                      <li>• Application Development</li>
                      <li>• E-Visiting Cards</li>
                      <li>• UI/UX Design</li>
                      <li>• SEO & Digital Marketing</li>
                      <li>• Graphic & Printing Solutions</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email Inquiries</h3>
                    <p className="text-gray-600 mb-2">
                      For quotes, projects, and information
                    </p>
                    <Link
                      href="mailto:brightensolutions@gmail.com"
                      className="text-[#F66526] font-medium hover:underline"
                    >
                      brightensolutions@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Website</h3>
                    <p className="text-gray-600 mb-2">
                      Visit our website for more information
                    </p>
                    <Link
                      href="https://www.brightensolutions.com"
                      target="_blank"
                      className="text-[#F66526] font-medium hover:underline"
                    >
                      www.brightensolutions.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
