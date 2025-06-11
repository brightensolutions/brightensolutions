"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

type FAQItem = {
  question: string
  answer: string
}

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: "What services does Brighten Solutions offer?",
      answer:
        "We offer a comprehensive range of digital services including website development, mobile app development, e-visiting cards, UI/UX design, SEO optimization, digital marketing, and graphic & printing solutions. Our team specializes in creating custom solutions tailored to your specific business needs.",
    },
    {
      question: "How quickly can you respond to my inquiry?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer support line directly for immediate assistance.",
    },
    {
      question: "Where is Brighten Solutions located?",
      answer:
        "Our office is located at A-1003, Evershine Tower, Vesu, Surat, Gujarat 395007. We're easily accessible and welcome visitors during our business hours from Monday to Saturday, 10:00 AM to 7:00 PM.",
    },
    {
      question: "What is your typical project process?",
      answer:
        "Our typical project process includes discovery and requirements gathering, planning and strategy, design and development, testing and quality assurance, deployment, and post-launch support. We maintain transparent communication throughout each phase to ensure your project meets all objectives.",
    },
    {
      question: "How do you handle project pricing?",
      answer:
        "Our pricing is based on the scope, complexity, and timeline of your project. We offer flexible engagement models including fixed price, time and materials, and retainer options. We provide detailed quotes after understanding your specific requirements.",
    },
    {
      question: "Can I see examples of your previous work?",
      answer:
        "Yes, we're happy to share relevant case studies and examples of our previous work. For certain projects, we can also arrange demonstrations or provide access to live projects (with client permission). Please contact us to request our portfolio relevant to your industry or project type.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          highlight="Questions"
          subtitle="Find answers to common questions about our services, process, and how we can help with your digital needs."
          titleClassName="text-gray-800"
          subtitleClassName="text-gray-600"
        />

        <div className="max-w-3xl mx-auto mt-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-4"
            >
              <div
                className={`border rounded-xl overflow-hidden ${
                  openIndex === index ? "border-[#F66526] shadow-lg" : "border-gray-200"
                }`}
              >
                <button
                  className={`w-full flex justify-between items-center p-5 text-left font-medium ${
                    openIndex === index ? "bg-gradient-to-r from-[#F66526]/10 to-[#F2502C]/10" : "bg-white"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={`text-lg ${openIndex === index ? "text-[#F66526]" : "text-gray-800"}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#F66526]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Still have questions? Contact us directly at{" "}
            <a href="tel:+917265993989" className="text-[#F66526] font-medium hover:underline">
              +91 72659 93989
            </a>{" "}
            or{" "}
            <a href="mailto:brightensolutions@gmail.com" className="text-[#F66526] font-medium hover:underline">
            brightensolutions@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
