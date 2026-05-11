import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"

// GET all products
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")
    const popular = searchParams.get("popular")
    const comingSoon = searchParams.get("comingSoon")

    // If slug is provided, return a single product
    if (slug) {
      const product = await Product.findOne({ slug, isActive: true })

      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 })
      }

      return NextResponse.json(product)
    }

    // Build query
    const query: any = { isActive: true }

    if (popular === "true") {
      query.popular = true
    }

    if (comingSoon === "true") {
      query.comingSoon = true
    }

    // Get products
    const products = await Product.find(query).sort({ createdAt: -1 })

    // If no products found, return empty array
    if (!products || products.length === 0) {
      return NextResponse.json([])
    }

    return NextResponse.json(products)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}

// POST a new product
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Creating product with data:", body)

    // Create slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const product = await Product.create(body)
    console.log("Product created:", product)

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error("Error creating product:", error)
    return NextResponse.json({ message: error.message || "Failed to create product" }, { status: 500 })
  }
}
