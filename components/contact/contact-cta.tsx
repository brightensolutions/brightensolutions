"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function ContactCta() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#F66526]/10 to-[#F2502C]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Experience?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's start a conversation about your business needs and how our team can help you achieve your goals.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white px-8 py-3 rounded-lg font-medium text-lg hover:shadow-lg transition-shadow">
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 rounded-lg font-medium text-lg border-[#F66526] text-[#F66526] hover:bg-[#F66526]/5"
              >
                View Our Services
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center">
              <div className="flex items-center gap-2 text-[#F66526]">
                <Mail className="h-5 w-5" />
                <span className="font-medium">Subscribe to our newsletter</span>
              </div>
              <div className="h-6 border-r border-gray-300 mx-6"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Follow us on social media</span>
                <ArrowRight className="h-4 w-4 text-[#F66526]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

