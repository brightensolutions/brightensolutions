"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Search, Palette, FileCode, Layers, Rocket, Zap, ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Define a type for the icon props
interface IconProps {
  className?: string
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const processSteps = [
    {
      number: 1,
      title: "Discover",
      icon: <Search />,
      description: "Understand your goals, audience, and map out obstacles",
      color: "from-blue-600 to-cyan-400",
      delay: 0.1,
    },
    {
      number: 2,
      title: "Style",
      icon: <Palette />,
      description: "Define your project's creative direction",
      color: "from-purple-600 to-pink-400",
      delay: 0.2,
    },
    {
      number: 3,
      title: "Plan",
      icon: <Layers />,
      description: "Finalize roadmap for design and execution",
      color: "from-emerald-600 to-green-400",
      delay: 0.3,
    },
    {
      number: 4,
      title: "Create",
      icon: <FileCode />,
      description: "Craft visuals that bring your ideas to life",
      color: "from-orange-600 to-amber-400",
      delay: 0.4,
    },
    {
      number: 5,
      title: "Assemble",
      icon: <Zap />,
      description: "Seamlessly package all assets for launch",
      color: "from-red-600 to-rose-400",
      delay: 0.5,
    },
    {
      number: 6,
      title: "Launch",
      icon: <Rocket />,
      description: "Share your project with the world",
      color: "from-brightencolor-brightenone to-brightencolor-brightentwo",
      delay: 0.6,
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-tr from-brightencolor-offwhite/5 via-brightencolor-offwhite/5 py-10 overflow-hidden text-gray-800"
      id="process"
    >
      <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-brightencolor-brightenone/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-brightencolor-brightentwo/10 blur-3xl"></div>

      <motion.div style={{ opacity, scale }} className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-2 inline-block rounded-full bg-brightencolor-brightenone/10 px-4 py-1 text-sm font-medium text-brightencolor-brightenone"
          >
            Transparent Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold font-roboto-slab leading-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            Our crystal-clear approach, <br className="hidden md:block" />
            <span className="text-brightencolor-brightenone">every step</span> of the way.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-4xl font-roboto-slab text-lg text-gray-600"
          >
            No surprises, no shortcuts. We follow six proven steps and keep you in the loop at every stage, so you
            always know what's happening next. This allows us to deliver high-quality results, every time.
          </motion.p>
        </div>

        {/* Process steps - Desktop */}
        <div className="relative hidden md:block">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-brightencolor-brightenone via-brightencolor-brightentwo to-transparent"></div>

          <div className="relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: step.delay }}
                className={cn("mb-8 flex items-center", index % 2 === 0 ? "justify-start" : "justify-end")}
              >
                <div
                  className={cn(
                    "relative flex w-[45%] items-center gap-6 rounded-xl bg-white p-6 shadow-lg",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse",
                  )}
                >
                  {/* Step number with icon */}
                  <div className="relative">
                    <div className={cn("absolute -inset-3 rounded-full bg-gradient-to-r opacity-20", step.color)}></div>
                    <div
                      className={cn(
                        "relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-md",
                        step.color,
                      )}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        {/* Fixed: Use the icon directly with className */}
                        <div className="h-8 w-8">{step.icon}</div>
                      </div>
                    </div>

                    {/* Connector to timeline */}
                    <div
                      className={cn(
                        "absolute top-1/2 h-0.5 w-8 -translate-y-1/2 bg-gradient-to-r",
                        index % 2 === 0
                          ? "left-full from-brightencolor-brightentwo to-transparent"
                          : "right-full from-transparent to-brightencolor-brightentwo",
                      )}
                    ></div>

                    {/* Step number */}
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-2xl font-bold font-inter text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 font-roboto-slab">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process steps - Mobile */}
        <div className="md:hidden">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="mb-6"
            >
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-md">
                <div
                  className={cn(
                    "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-sm",
                    step.color,
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    {/* Fixed: Use the icon directly with a wrapper div */}
                    <div className="h-6 w-6">{step.icon}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>

              {index < processSteps.length - 1 && (
                <div className="ml-7 mt-1 flex h-6 w-px items-center justify-center bg-gradient-to-b from-brightencolor-brightenone to-transparent">
                  <ChevronRight className="h-4 w-4 -rotate-90 text-brightencolor-brightenone" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-4xl font-bold text-gray-900 font-roboto-slab">
            Ready to start your project with us?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-2xl text-gray-600 font-roboto-slab">
            Experience our transparent process firsthand and see how we can transform your ideas into reality.
          </p>
          <div className="text-center justify-center items-center flex">
            <button className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brightencolor-brightenone to-brightencolor-brightentwo px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-brightencolor-brightenone/20">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
