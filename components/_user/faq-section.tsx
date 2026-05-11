"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const faqItems: FAQItem[] = [
    {
      id: "website-1",
      question: "What technologies do you use for website development?",
      answer:
        "We use cutting-edge technologies including React, Next.js, Vue.js, and other modern frameworks to build fast, responsive, and scalable websites. Our development approach ensures your site is optimized for performance, SEO, and user experience.",
      category: "website",
    },
    {
      id: "website-2",
      question: "How long does it take to build a custom website?",
      answer:
        "The timeline for a custom website depends on its complexity and requirements. A basic website can be completed in 2-4 weeks, while more complex projects with custom functionality may take 8-12 weeks. We'll provide a detailed timeline during our initial consultation.",
      category: "website",
    },
    {
      id: "website-3",
      question: "Do you provide website maintenance services?",
      answer:
        "Yes, we offer comprehensive website maintenance packages to keep your site secure, updated, and performing optimally. Our maintenance services include regular updates, security monitoring, performance optimization, and technical support.",
      category: "website",
    },
    {
      id: "mobile-1",
      question: "Do you develop both iOS and Android apps?",
      answer:
        "Yes, we develop native apps for both iOS and Android platforms, as well as cross-platform solutions using technologies like React Native and Flutter. Our approach is tailored to your specific needs, audience, and budget.",
      category: "mobile",
    },
    {
      id: "mobile-2",
      question: "How much does mobile app development cost?",
      answer:
        "Mobile app development costs vary based on complexity, features, and platforms. Simple apps typically start at $15,000, while more complex applications with advanced features can range from $50,000 to $250,000+. We provide detailed estimates after understanding your specific requirements.",
      category: "mobile",
    },
    {
      id: "ecommerce-1",
      question: "Which e-commerce platforms do you work with?",
      answer:
        "We work with all major e-commerce platforms including Shopify, WooCommerce, Magento, and custom solutions. We'll recommend the best platform based on your business needs, scalability requirements, and budget.",
      category: "ecommerce",
    },
    {
      id: "ecommerce-2",
      question: "Can you migrate my existing online store to a new platform?",
      answer:
        "Yes, we specialize in e-commerce migrations with minimal disruption to your business. Our process includes thorough data transfer, design implementation, functionality testing, and SEO preservation to ensure a smooth transition.",
      category: "ecommerce",
    },
    {
      id: "design-1",
      question: "What is your UI/UX design process?",
      answer:
        "Our UI/UX design process includes research, wireframing, prototyping, visual design, and usability testing. We focus on creating intuitive, accessible, and visually appealing interfaces that enhance user engagement and satisfaction.",
      category: "design",
    },
    {
      id: "design-2",
      question: "Do you provide brand identity design services?",
      answer:
        "Yes, we offer comprehensive brand identity design services including logo design, color palette development, typography selection, brand guidelines, and visual asset creation to establish a cohesive and memorable brand presence.",
      category: "design",
    },
    {
      id: "gamification-1",
      question: "How can gamification benefit my business?",
      answer:
        "Gamification can significantly increase user engagement, retention, and conversion rates by incorporating game elements like points, badges, leaderboards, and rewards. It creates emotional connections with your brand and motivates desired user behaviors.",
      category: "gamification",
    },
    {
      id: "gamification-2",
      question: "What types of gamification solutions do you offer?",
      answer:
        "We offer various gamification solutions including loyalty programs, interactive onboarding experiences, achievement systems, progress tracking, social challenges, and immersive learning experiences tailored to your specific business goals.",
      category: "gamification",
    },
  ]

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "website", label: "Website" },
    { id: "mobile", label: "Mobile App" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "design", label: "UI/UX Design" },
    { id: "gamification", label: "Gamification" },
  ]

  const filteredItems =
    activeCategory === "all" ? faqItems : faqItems.filter((item) => item.category === activeCategory)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="relative overflow-hidden bg-brightencolor-offwhite py-24 text-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brightencolor-offwhite via-brightencolor-cream to-brightencolor-offwhite"></div>

        {/* Animated gradient orbs */}
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-brightencolor-brightenone/5 blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-brightencolor-brightentwo/5 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-2 inline-block rounded-full bg-brightencolor-brightenone/20 px-4 py-1 text-sm font-medium text-brightencolor-brightenone"
          >
            Got Questions?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl text-black font-inter font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Frequently Asked <span className="text-brightencolor-brightenone">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-lg text-zinc-800 font-roboto-slab"
          >
            Find answers to common questions about our services, process, and expertise. If you don't see your question
            here, feel free to contact us directly.
          </motion.p>
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                    ? "bg-brightencolor-brightenone text-white"
                    : "bg-brightencolor-cream text-zinc-800 shadow-xl hover:bg-white/10",
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-4xl">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="relative">
                {/* Connecting line */}
                {index < filteredItems.length - 1 && (
                  <div className="absolute left-[30px] top-full bottom-0 w-px h-6 bg-gradient-to-b from-brightencolor-brightenone/50 to-transparent"></div>
                )}

                {/* Question button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="group relative flex w-full items-center justify-between rounded-2xl bg-white/20 backdrop-blur-3xl shadow-md border p-4 text-left text-lg font-medium transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-center">
                    <div className="mr-6 flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brightencolor-brightenone to-brightencolor-brightentwo">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-xl text-black">{item.question}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {openItem === item.id ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brightencolor-brightenone">
                        <Minus className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white backdrop-blur-3xl border shadow-md group-hover:bg-white/20">
                        <Plus className="h-5 w-5 text-black" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Answer panel */}
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-b-2xl mt-6 p-6 pt-0">
                        <div className="ml-[84px] border-l-2 border-brightencolor-brightenone/30 pl-6 text-zinc-900 font-roboto-slab">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-brightencolor-brightenone font-inter ">Still have questions?</h3>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-900 font-roboto-slab">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <button className="rounded-full bg-gradient-to-r from-brightencolor-brightenone to-brightencolor-brightentwo px-8 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-brightencolor-brightenone/20">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}
