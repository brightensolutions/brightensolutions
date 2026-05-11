"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Check,
  CreditCard,
  Smartphone,
  Globe,
  Shield,
  Zap,
  RefreshCw,
  BarChart3,
  ArrowRight,
  Code,
  Database,
  Server,
  Cloud,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
}

interface Product {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  icon: string
  image: string
  features: string[]
  popular: boolean
  comingSoon: boolean
}

export function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)

        // Set the first product as active if there are products
        if (data.length > 0) {
          setActiveProduct(data[0]._id)
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Error loading products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const activeProductData = products.find((product) => product._id === activeProduct) || null

  if (loading) {
    return (
      <section className="md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-3" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-1 w-24 mx-auto mb-6" />
            <Skeleton className="h-16 w-full max-w-3xl mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3  ">
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </div>
      </section>
    )
  }

  if (error || products.length === 0) {
    return (
      <></>
    )
  }

  return (
    <section className="md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">IT Solutions</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Our Innovative Products</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of IT solutions designed to help your business grow and succeed in the
            digital landscape.
          </p>
        </div>

        {/* Product navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {products.map((product) => (
            <button
              key={product._id}
              onClick={() => setActiveProduct(product._id)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  activeProduct === product._id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }
              `}
            >
              <span className="relative z-10">{iconMap[product.icon] || <Code className="w-6 h-6" />}</span>
              <span className="relative z-10">{product.title}</span>
              {product.popular && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              {product.comingSoon && (
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Product showcase */}
        {activeProductData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Product details */}
            <motion.div
              key={activeProductData._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  {iconMap[activeProductData.icon] || <Code className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{activeProductData.title}</h3>
                  {activeProductData.comingSoon && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-6">{activeProductData.description}</p>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {activeProductData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 p-0.5 rounded-full bg-blue-100 text-blue-600">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href={`/products/${activeProductData.slug}`}>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>

                {!activeProductData.comingSoon && (
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Request Demo
                  </Button>
                )}

                {activeProductData.comingSoon && (
                  <Button variant="outline" className="border-gray-300 text-gray-500 hover:bg-gray-50">
                    Get Notified
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Product image */}
            <motion.div
              key={`image-${activeProductData._id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
                <Image
                  src={activeProductData.image || "/placeholder.svg?height=600&width=800&query=product interface"}
                  alt={activeProductData.title}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>

                {/* Product badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-medium text-blue-600">Enterprise Solution</span>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Enterprise Ready</p>
                    <p className="text-xs text-gray-500">Highest security standards</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fast Integration</p>
                    <p className="text-xs text-gray-500">Ready in minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* CTA section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your business?</h3>
              <p className="text-gray-600 mb-8">
                Join thousands of businesses that trust our IT solutions. Our products are designed to grow with your
                business.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
