"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  highlight?: string
  align?: "left" | "center" | "right"
  className?: string
  subtitleClassName?: string
  badge?: string
  badgeClassName?: string
  titleClassName?: string
}

export function SectionTitle({
  title,
  subtitle,
  highlight,
  align = "center",
  className,
  subtitleClassName,
  badge,
  badgeClassName,
  titleClassName,
}: SectionTitleProps) {
  // Replace the highlighted part of the title with a span
  const titleWithHighlight = highlight
    ? title.replace(highlight, `<span class="text-[#F66526]">${highlight}</span>`)
    : title

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-16 flex flex-col", alignmentClasses[align], className)}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className={cn(
              "relative inline-block  rounded-full bg-[#F66526]/10 px-6 py-2 text-sm font-bold uppercase tracking-wider text-[#F66526] before:absolute before:-inset-1 before:block before:rounded-full before:border before:border-[#F66526]/30 before:content-['']",
              badgeClassName,
            )}
          >
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "relative mb-6 text-5xl font-bold font-roboto-slab leading-tight md:text-6xl lg:text-7xl",
          titleClassName,
          align === "center" && "mx-auto max-w-4xl",
        )}
        dangerouslySetInnerHTML={{ __html: titleWithHighlight }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "text-lg text-gray-600 md:text-xl",
            align === "center" && "mx-auto max-w-3xl",
            subtitleClassName,
          )}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mt-8 h-px w-full overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F66526] to-transparent"></span>
      </motion.div>
    </motion.div>
  )
}
