"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Code,
  Database,
  Server,
  Smartphone,
  Cloud,
  Layers,
  PenToolIcon as Tool,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Globe,
  FileCode,
  Wind,
  Palette,
  LayoutGrid,
  Cpu,
  Coffee,
  FileJson,
  Flame,
  Leaf,
  Box,
  Boxes,
  Fingerprint,
  Key,
  Lock,
  Rocket,
  Sparkles,
  Store,
  Workflow,
  Lightbulb,
  Gauge,
  Puzzle,
  Atom,
  Aperture,
  Hexagon,
  Droplet,
  Feather,
  Github,
  FigmaIcon,
  Eye,
  ImageIcon,
  Package,
  Search,
  ShoppingCart,
  Terminal,
  ZapIcon,
} from "lucide-react"

// Map technology names to icons
const getTechIcon = (techName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    // Frontend
    React: <Atom className="h-8 w-8 text-blue-500" />,
    "Next.js": <Globe className="h-8 w-8 text-black" />,
    Angular: <Box className="h-8 w-8 text-red-600" />,
    "Vue.js": <Hexagon className="h-8 w-8 text-green-500" />,
    TypeScript: <FileCode className="h-8 w-8 text-blue-600" />,
    JavaScript: <FileJson className="h-8 w-8 text-yellow-500" />,
    HTML5: <Code className="h-8 w-8 text-orange-600" />,
    CSS3: <Palette className="h-8 w-8 text-blue-500" />,
    "Tailwind CSS": <Wind className="h-8 w-8 text-cyan-500" />,
    SASS: <Feather className="h-8 w-8 text-pink-500" />,

    // Backend
    "Node.js": <Server className="h-8 w-8 text-green-600" />,
    "Express.js": <Workflow className="h-8 w-8 text-gray-600" />,
    Python: <Terminal className="h-8 w-8 text-yellow-600" />,
    Django: <Layers className="h-8 w-8 text-green-800" />,
    PHP: <Hexagon className="h-8 w-8 text-purple-600" />,
    Laravel: <Flame className="h-8 w-8 text-red-500" />,
    Java: <Coffee className="h-8 w-8 text-brown-600" />,
    "Spring Boot": <Leaf className="h-8 w-8 text-green-500" />,
    "Ruby on Rails": <Rocket className="h-8 w-8 text-red-600" />,
    GraphQL: <Hexagon className="h-8 w-8 text-pink-600" />,

    // Database
    MongoDB: <Leaf className="h-8 w-8 text-green-500" />,
    MySQL: <Database className="h-8 w-8 text-blue-600" />,
    PostgreSQL: <Database className="h-8 w-8 text-blue-800" />,
    Firebase: <Flame className="h-8 w-8 text-orange-500" />,
    Redis: <Cpu className="h-8 w-8 text-red-500" />,
    Elasticsearch: <Search className="h-8 w-8 text-teal-500" />,
    "SQL Server": <Database className="h-8 w-8 text-blue-700" />,
    DynamoDB: <Database className="h-8 w-8 text-blue-400" />,

    // Mobile
    "React Native": <Smartphone className="h-8 w-8 text-blue-500" />,
    Flutter: <Sparkles className="h-8 w-8 text-cyan-500" />,
    Swift: <Zap className="h-8 w-8 text-orange-500" />,
    Kotlin: <Hexagon className="h-8 w-8 text-purple-500" />,
    Ionic: <Aperture className="h-8 w-8 text-blue-500" />,
    Android: <Smartphone className="h-8 w-8 text-green-500" />,
    iOS: <Smartphone className="h-8 w-8 text-gray-500" />,

    // DevOps
    Docker: <Box className="h-8 w-8 text-blue-500" />,
    Kubernetes: <Boxes className="h-8 w-8 text-blue-600" />,
    AWS: <Cloud className="h-8 w-8 text-orange-400" />,
    Azure: <Cloud className="h-8 w-8 text-blue-500" />,
    "Google Cloud": <Cloud className="h-8 w-8 text-red-400" />,
    Jenkins: <Workflow className="h-8 w-8 text-red-500" />,
    "GitHub Actions": <Github className="h-8 w-8 text-purple-500" />,
    Terraform: <Boxes className="h-8 w-8 text-purple-600" />,
    Ansible: <Terminal className="h-8 w-8 text-red-600" />,

    // Design
    Figma: <FigmaIcon className="h-8 w-8 text-purple-500" />,
    "Adobe XD": <Hexagon className="h-8 w-8 text-pink-600" />,
    Photoshop: <ImageIcon className="h-8 w-8 text-blue-700" />,
    Illustrator: <Tool className="h-8 w-8 text-orange-600" />,
    Sketch: <Tool className="h-8 w-8 text-yellow-500" />,
    InVision: <Eye className="h-8 w-8 text-red-500" />,
    "After Effects": <Aperture className="h-8 w-8 text-blue-600" />,

    // CMS
    WordPress: <Globe className="h-8 w-8 text-blue-600" />,
    Shopify: <Store className="h-8 w-8 text-green-500" />,
    Drupal: <Droplet className="h-8 w-8 text-blue-500" />,
    Magento: <ShoppingCart className="h-8 w-8 text-orange-600" />,
    Strapi: <Layers className="h-8 w-8 text-blue-500" />,
    Contentful: <LayoutGrid className="h-8 w-8 text-blue-400" />,
    Sanity: <Puzzle className="h-8 w-8 text-red-500" />,

    // Security
    OAuth: <Key className="h-8 w-8 text-green-600" />,
    JWT: <Fingerprint className="h-8 w-8 text-purple-500" />,
    "HTTPS/SSL": <Lock className="h-8 w-8 text-green-500" />,
    "Penetration Testing": <Shield className="h-8 w-8 text-red-500" />,
    Encryption: <Key className="h-8 w-8 text-blue-600" />,
    "Security Auditing": <Shield className="h-8 w-8 text-blue-500" />,

    // Performance
    Webpack: <Package className="h-8 w-8 text-blue-500" />,
    Vite: <ZapIcon className="h-8 w-8 text-purple-500" />,
    Lighthouse: <Lightbulb className="h-8 w-8 text-orange-400" />,
    "Performance Testing": <Gauge className="h-8 w-8 text-green-500" />,
    "CDN Integration": <Globe className="h-8 w-8 text-blue-500" />,
    "Image Optimization": <ImageIcon className="h-8 w-8 text-green-600" />,
    "Code Splitting": <Puzzle className="h-8 w-8 text-blue-500" />,
  }

  return iconMap[techName] || <Code className="h-8 w-8 text-gray-500" />
}

export function TechnologiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("frontend")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  const categories = [
    {
      id: "frontend",
      name: "Frontend",
      icon: <Code className="h-6 w-6" />,
      description: "Creating responsive, interactive user interfaces with modern frameworks and libraries",
      technologies: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Angular", level: 85 },
        { name: "Vue.js", level: 80 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 95 },
        { name: "Tailwind CSS", level: 92 },
        { name: "SASS", level: 88 },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Server className="h-6 w-6" />,
      description: "Building robust, scalable server-side applications and APIs",
      technologies: [
        { name: "Node.js", level: 92 },
        { name: "Express.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "Django", level: 80 },
        { name: "PHP", level: 85 },
        { name: "Laravel", level: 82 },
        { name: "Java", level: 75 },
        { name: "Spring Boot", level: 70 },
        { name: "Ruby on Rails", level: 65 },
        { name: "GraphQL", level: 85 },
      ],
    },
    {
      id: "database",
      name: "Database",
      icon: <Database className="h-6 w-6" />,
      description: "Managing and optimizing data storage with SQL and NoSQL solutions",
      technologies: [
        { name: "MongoDB", level: 90 },
        { name: "MySQL", level: 88 },
        { name: "PostgreSQL", level: 85 },
        { name: "Firebase", level: 90 },
        { name: "Redis", level: 80 },
        { name: "Elasticsearch", level: 75 },
        { name: "SQL Server", level: 82 },
        { name: "DynamoDB", level: 78 },
      ],
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: <Smartphone className="h-6 w-6" />,
      description: "Developing native and cross-platform mobile applications",
      technologies: [
        { name: "React Native", level: 90 },
        { name: "Flutter", level: 85 },
        { name: "Swift", level: 75 },
        { name: "Kotlin", level: 78 },
        { name: "Ionic", level: 80 },
        { name: "Android", level: 82 },
        { name: "iOS", level: 80 },
      ],
    },
    {
      id: "devops",
      name: "DevOps",
      icon: <Cloud className="h-6 w-6" />,
      description: "Streamlining development and deployment with modern tools and practices",
      technologies: [
        { name: "Docker", level: 88 },
        { name: "Kubernetes", level: 80 },
        { name: "AWS", level: 85 },
        { name: "Azure", level: 82 },
        { name: "Google Cloud", level: 80 },
        { name: "Jenkins", level: 78 },
        { name: "GitHub Actions", level: 85 },
        { name: "Terraform", level: 75 },
        { name: "Ansible", level: 72 },
      ],
    },
    {
      id: "design",
      name: "Design",
      icon: <Tool className="h-6 w-6" />,
      description: "Creating beautiful, user-friendly interfaces and experiences",
      technologies: [
        { name: "Figma", level: 92 },
        { name: "Adobe XD", level: 85 },
        { name: "Photoshop", level: 88 },
        { name: "Illustrator", level: 85 },
        { name: "Sketch", level: 80 },
        { name: "InVision", level: 78 },
        { name: "After Effects", level: 75 },
      ],
    },
    {
      id: "cms",
      name: "CMS",
      icon: <Layers className="h-6 w-6" />,
      description: "Building and managing content with powerful content management systems",
      technologies: [
        { name: "WordPress", level: 95 },
        { name: "Shopify", level: 88 },
        { name: "Drupal", level: 80 },
        { name: "Magento", level: 75 },
        { name: "Strapi", level: 85 },
        { name: "Contentful", level: 82 },
        { name: "Sanity", level: 80 },
      ],
    },
    {
      id: "security",
      name: "Security",
      icon: <Shield className="h-6 w-6" />,
      description: "Implementing robust security measures to protect applications and data",
      technologies: [
        { name: "OAuth", level: 90 },
        { name: "JWT", level: 92 },
        { name: "HTTPS/SSL", level: 95 },
        { name: "Penetration Testing", level: 85 },
        { name: "Encryption", level: 88 },
        { name: "Security Auditing", level: 82 },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      icon: <Zap className="h-6 w-6" />,
      description: "Optimizing applications for speed, efficiency, and scalability",
      technologies: [
        { name: "Webpack", level: 88 },
        { name: "Vite", level: 90 },
        { name: "Lighthouse", level: 92 },
        { name: "Performance Testing", level: 85 },
        { name: "CDN Integration", level: 90 },
        { name: "Image Optimization", level: 92 },
        { name: "Code Splitting", level: 88 },
      ],
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden  bg-gradient-to-tl from-brightencolor-offwhite via-brightencolor-offwhite to-brightencolor-brightentwo/20 py-24 text-white"
      id="technologies"
    >
      <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-brightencolor-brightenone/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-brightencolor-brightentwo/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-brightencolor-brightenone/20 px-4 py-1 text-sm font-medium text-brightencolor-brightenone">
            Our Technical Expertise
          </span>
          <h2 className="mb-4 text-brightencolor-brightenone font-roboto-slab md:text-5xl text-5xl  font-bold ">
            Technologies & Stack
          </h2>
          <p className="mx-auto max-w-4xl text-xl text-zinc-800 font-roboto-slab">
            With 8 years of experience, we've mastered a wide range of technologies to deliver cutting-edge solutions
            for our clients. Our technical expertise spans across frontend, backend, mobile, and more.
          </p>
        </motion.div>

        {/* Desktop view - Tabs */}
        <div className="mb-12 hidden md:block">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300",
                  activeTab === category.id
                    ? "bg-brightencolor-brightenone text-black"
                    : "bg-brightencolor-cream text-zinc-800 shadow-xl hover:bg-white/10",
                )}
                onClick={() => setActiveTab(category.id)}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>

          <div className="mt-12">
            {categories.map(
              (category) =>
                activeTab === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-8 text-center py-7">
                      <h3 className="mb-2 text-4xl font-inter text-zinc-900 font-bold">{category.name} Technologies</h3>
                      <p className="mx-auto max-w-2xl text-zinc-800 font-roboto-slab">{category.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                      {category.technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group flex flex-col items-center border bg-white shadow-md p-5 rounded-xl"
                        >
                          <div className="relative mb-4 flex  items-center justify-center rounded-2xl bg-white/5   ">
                            <div className="relative z-10 flex  h-full w-full items-center justify-center">
                              {getTechIcon(tech.name)}
                            </div>
                          </div>
                          <h4 className="text-center font-medium text-2xl font-roboto-slab text-brightencolor-brightentwo">{tech.name}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ),
            )}
          </div>
        </div>

        {/* Mobile view - Accordion */}
        <div className="md:hidden">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="mb-4 overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brightencolor-brightenone/20 text-brightencolor-brightenone">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-medium text-black">{category.name}</h3>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedCategory === category.id && (
                <div className="p-4 pt-0">
                  <p className="mb-4 text-sm text-gray-400">{category.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {category.technologies.slice(0, 6).map((tech, techIndex) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: techIndex * 0.05 }}
                        className="flex flex-col items-center "
                      >
                        <div className="mb-2 flex h-16 w-16  items-center justify-center rounded-lg bg-white/5 p-3">
                          {getTechIcon(tech.name)}
                        </div>
                        <h4 className="text-center text-sm">{tech.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                  {category.technologies.length > 6 && (
                    <button className="mt-4 w-full rounded-lg bg-white/5 py-2 text-sm text-brightencolor-brightenone">
                      View all {category.technologies.length} technologies
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
