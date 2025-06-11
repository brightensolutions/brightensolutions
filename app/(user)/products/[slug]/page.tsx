import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDb()
  const product = await Product.findOne({ slug: params.slug })

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.title} | Our Products`,
    description: product.shortDescription,
  }
}

// Generate static params for static generation
export async function generateStaticParams() {
  await connectDb()
  const products = await Product.find({}, { slug: 1 })

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    await connectDb()
    const product = await Product.findOne({ slug: params.slug })

    if (!product) {
      notFound()
    }

    // Map icon names to components (for server component, we can't use the iconMap directly)
    const getIconName = (iconKey: string) => {
      return iconKey || "Code"
    }

    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link href="/products" className="inline-flex items-center gap-2 mb-8 text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <span className="text-sm font-medium text-gray-700">IT Solution</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{product.title}</h1>
              <p className="text-xl text-gray-700 mb-8">{product.description}</p>

              {product.comingSoon ? (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">COMING SOON</p>
                  <p className="text-gray-700">
                    This product is currently in development. Sign up to get notified when it launches.
                  </p>
                </div>
              ) : product.popular ? (
                <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm uppercase tracking-wider text-amber-700 mb-2">POPULAR CHOICE</p>
                  <p className="text-gray-700">
                    This is one of our most popular products, trusted by thousands of businesses.
                  </p>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Request Demo</Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Contact Sales
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=800&query=product interface"}
                alt={product.title}
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>
          </div>

          {/* Features section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mt-1">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">{feature}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed content */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">About {product.title}</h2>
            <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div
                dangerouslySetInnerHTML={{ __html: product.content || "<p>Detailed information coming soon...</p>" }}
              />
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to get started with {product.title}?</h3>
              <p className="text-lg opacity-90 mb-8">
                Our team of experts is ready to help you implement this solution for your business.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Schedule a Demo</Button>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in product page:", error)
    // Return a fallback UI
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link href="/products" className="inline-flex items-center gap-2 mb-8 text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Product Information</h1>
            <p className="text-xl mb-8">We're currently updating information for this product.</p>
            <p>Please check back later or contact us for more details.</p>
          </div>
        </div>
      </div>
    )
  }
}
