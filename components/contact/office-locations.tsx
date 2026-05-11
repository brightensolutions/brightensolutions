"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ExternalLink, Clock, Calendar } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function OfficeLocations() {
  const [activeLocation, setActiveLocation] = useState("surat")

  const locations = {
    surat: {
      name: "Surat, Gujarat",
      address: "A-424,4th Floor The Grand Plaza, VIP Road, Vesu, Surat, Gujarat 395007",
      phone: "+91 72659 93989",
      email: "brightensolutions@gmail.com",
      image: "/2022-10-11.webp",
      mapUrl: "https://maps.app.goo.gl/TDcc6JAWX653TpHA7",
      hours: "Monday - Saturday: 10:00 AM - 7:00 PM",
      established: "2018",
      team: "15+ Digital Experts",
      specialties: ["Web Development", "App Development", "Digital Marketing", "E-Visiting Cards"],
    },
  }

  const activeOffice = locations[activeLocation as keyof typeof locations]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F66526]/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#F2502C]/5 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#F66526]/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-[#F2502C]/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          badge="Our Location"
          title="Visit Brighten Solutions"
          highlight="Brighten Solutions"
          subtitle="We'd love to meet you in person and discuss how we can help with your digital needs. Visit our office in Surat to learn more about our services."
          titleClassName="text-gray-800"
          subtitleClassName="text-gray-600"
        />

        {/* Office Details */}
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12"
        >
          {/* Office Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={activeOffice.image || "/placeholder.svg?height=400&width=600"}
              alt={`${activeOffice.name} Office`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{activeOffice.name}</h3>
                <p className="text-white/80">{activeOffice.hours}</p>
              </div>
            </div>
          </div>

          {/* Office Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F66526]">
            <h3 className="text-2xl font-bold mb-6">{activeOffice.name}</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Address</h4>
                  <p className="text-gray-600">{activeOffice.address}</p>
                  <a
                    href={activeOffice.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F66526] font-medium mt-2 hover:underline"
                  >
                    Get directions <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Phone</h4>
                  <a href={`tel:${activeOffice.phone}`} className="text-gray-600 hover:text-[#F66526]">
                    {activeOffice.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <a href={`mailto:${activeOffice.email}`} className="text-gray-600 hover:text-[#F66526]">
                    {activeOffice.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-[#F66526] to-[#F2502C] flex items-center justify-center shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Business Hours</h4>
                  <p className="text-gray-600">{activeOffice.hours}</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href={"https://api.whatsapp.com/send/?phone=918511463297"}
                className="w-full bg-gradient-to-r flex items-center justify-center py-3 rounded-lg  from-[#F66526] to-[#F2502C] text-white hover:shadow-lg transition-shadow"
                
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Meeting
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Google Maps Embed */}
        <div className="mt-16 relative rounded-2xl overflow-hidden shadow-lg h-[450px]">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.6982456553344!2d72.77975!3d21.1406898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e74e7e7b68f%3A0xaa92e8dcb816e306!2sBrighten%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1714675355!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Brighten Solutions Office Location"
            className="rounded-2xl"
          ></iframe>

          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">Brighten Solutions</h3>
            <p className="text-sm text-gray-600">A-424,4th Floor The Grand Plaza, VIP Road, Vesu</p>
            <p className="text-sm text-gray-600">Surat, Gujarat 395007</p>
          </div>
        </div>
      </div>
    </section>
  )
}
