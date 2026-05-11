"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, Smartphone, Globe, Shield, ArrowRight, Zap, RefreshCw, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  features: string[]
  icon: React.ReactNode
  image: string
  popular?: boolean
  comingSoon?: boolean
}

export function OurProductsSection() {
  const [activeProduct, setActiveProduct] = useState<string>("payment-gateway")

  const products: Product[] = [
    {
      id: "payment-gateway",
      name: "BrightenPay Gateway",
      description:
        "Our flagship payment gateway solution for businesses of all sizes with industry-leading success rates and minimal transaction fees.",
      features: [
        "99.99% uptime guarantee",
        "Support for 100+ currencies",
        "Advanced fraud detection",
        "Real-time transaction monitoring",
        "Seamless checkout experience",
      ],
      icon: <CreditCard className="w-6 h-6" />,
      image: "/images/products/payment-gateway.jpg",
    },
    {
      id: "mobile-payments",
      name: "BrightenPay Mobile",
      description: "Accept payments anywhere with our mobile payment solution. Perfect for businesses on the go.",
      features: [
        "Contactless payments",
        "QR code transactions",
        "Mobile wallet integration",
        "Offline transaction capability",
        "Instant payment notifications",
      ],
      icon: <Smartphone className="w-6 h-6" />,
      image: "/images/products/mobile-payments.jpg",
    },
    {
      id: "global-payments",
      name: "BrightenPay Global",
      description: "Expand your business globally with our international payment processing solution.",
      features: [
        "Multi-currency support",
        "Automatic currency conversion",
        "Local payment methods",
        "Compliance with international regulations",
        "Reduced cross-border fees",
      ],
      icon: <Globe className="w-6 h-6" />,
      image: "/images/products/global-payments.jpg",
    },
    {
      id: "secure-checkout",
      name: "SecureCheckout",
      description: "Enhanced security features for your online transactions with advanced fraud prevention.",
      features: [
        "3D Secure 2.0",
        "Biometric authentication",
        "AI-powered fraud detection",
        "PCI DSS Level 1 compliance",
        "Tokenization for recurring payments",
      ],
      icon: <Shield className="w-6 h-6" />,
      image: "/images/products/secure-checkout.jpg",
    },
    {
      id: "instant-settlement",
      name: "InstantSettle",
      description: "Get your funds instantly with our revolutionary settlement solution.",
      features: [
        "Real-time fund transfers",
        "24/7 settlement availability",
        "Automated reconciliation",
        "Flexible payout options",
        "Detailed settlement reports",
      ],
      icon: <Zap className="w-6 h-6" />,
      image: "/images/products/instant-settlement.jpg",
      comingSoon: true,
    },
    {
      id: "subscription-billing",
      name: "RecurringPro",
      description: "Manage subscriptions and recurring payments with ease.",
      features: [
        "Flexible billing cycles",
        "Smart dunning management",
        "Customer lifecycle notifications",
        "Revenue recovery tools",
        "Subscription analytics dashboard",
      ],
      icon: <RefreshCw className="w-6 h-6" />,
      image: "/images/products/subscription-billing.jpg",
      popular: true,
    },
    {
      id: "payment-analytics",
      name: "PaymentInsights",
      description: "Advanced analytics and reporting for your payment data.",
      features: [
        "Real-time transaction analytics",
        "Customizable dashboards",
        "Revenue forecasting",
        "Customer payment behavior analysis",
        "Exportable reports in multiple formats",
      ],
      icon: <BarChart3 className="w-6 h-6" />,
      image: "/images/products/payment-analytics.jpg",
      comingSoon: true,
    },
  ]

  const activeProductData = products.find((product) => product.id === activeProduct) || products[0]

  return (
    <section className="py-20 bg-brightencolor-offwhite relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#F66526_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brightencolor-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brightencolor-darkcream/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-brightencolor-cream border border-brightencolor-orange/20">
              <span className="h-2 w-2 rounded-full bg-brightencolor-orange animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Payment Solutions</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-brightencolor-brightenone">
            Our Payment Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brightencolor-orange to-brightencolor-darkorange mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of payment gateway solutions designed to help your business accept payments
            securely and efficiently across all channels.
          </p>
        </div>

        {/* Product navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  activeProduct === product.id
                    ? "bg-gradient-to-r from-brightencolor-orange to-brightencolor-darkorange bg-brightencolor-brightenone text-white shadow-lg shadow-brightencolor-orange/20"
                    : "bg-brightencolor-cream text-gray-700 hover:bg-brightencolor-darkcream border border-brightencolor-darkcream"
                }
              `}
            >
              <span className="relative z-10">{product.icon}</span>
              <span className="relative z-10">{product.name}</span>
              {product.popular && (
                <span className="absolute -top-2 -right-2 bg-brightencolor-darkorange text-white text-xs px-2 py-0.5 rounded-full">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Product details */}
          <motion.div
            key={activeProductData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-brightencolor-cream"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-brightencolor-orange to-brightencolor-darkorange text-white">
                {activeProductData.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{activeProductData.name}</h3>
                {activeProductData.comingSoon && (
                  <span className="inline-block bg-brightencolor-cream text-gray-600 text-xs px-2 py-1 rounded-full">
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
                    <div className="mt-1 p-0.5 rounded-full bg-brightencolor-darkcream text-brightencolor-orange">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-brightencolor-orange to-brightencolor-darkorange hover:from-brightencolor-darkorange hover:to-brightencolor-orange text-white">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              {!activeProductData.comingSoon && (
                <Button
                  variant="outline"
                  className="border-brightencolor-orange text-brightencolor-orange hover:bg-brightencolor-cream"
                >
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
            key={`image-${activeProductData.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
              <img
                src={activeProductData.image || "/placeholder.svg"}
                alt={activeProductData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLImageElement).src =
                    `/placeholder.svg?height=600&width=800&query=payment gateway interface ${activeProductData.name}`
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>

              {/* Product badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium text-brightencolor-darkorange">BrightenPay Solution</span>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-xl shadow-lg border border-brightencolor-cream">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-brightencolor-cream">
                  <Check className="w-5 h-5 text-brightencolor-orange" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">PCI DSS Compliant</p>
                  <p className="text-xs text-gray-500">Highest security standards</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 p-4 bg-white rounded-xl shadow-lg border border-brightencolor-cream">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-brightencolor-cream">
                  <Zap className="w-5 h-5 text-brightencolor-orange" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Fast Integration</p>
                  <p className="text-xs text-gray-500">Ready in minutes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-brightencolor-orange/10 to-brightencolor-darkcream/30 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your payment experience?</h3>
              <p className="text-gray-600 mb-8">
                Join thousands of businesses that trust BrightenPay for their payment processing needs. Our solutions
                are designed to grow with your business.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-brightencolor-brightenone  text-white px-8 py-6 text-lg">
                  Get Started Today
                </Button>
                <Button
                  variant="outline"
                  className="border-brightencolor-orange text-brightencolor-orange hover:bg-brightencolor-cream px-8 py-6 text-lg"
                >
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
