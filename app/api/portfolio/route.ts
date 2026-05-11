import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Portfolio from "@/lib/Models/portfolio"

// GET all portfolio items
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    // Build query
    const query: any = { isActive: true }

    if (category && category !== "all") {
      query.category = category
    }

    if (featured === "true") {
      query.featured = true
    }

    // Get portfolio items
    const portfolioItems = await Portfolio.find(query).sort({ createdAt: -1 })

    // If no items found, return empty array
    if (!portfolioItems || portfolioItems.length === 0) {
      return NextResponse.json([])
    }

    return NextResponse.json(portfolioItems)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch portfolio items" }, { status: 500 })
  }
}

// POST a new portfolio item
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Creating portfolio item with data:", body)

    // Create slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    // Ensure both image and logo are included
    if (!body.image) {
      return NextResponse.json({ message: "Project image is required" }, { status: 400 })
    }

    const portfolioItem = await Portfolio.create(body)
    console.log("Portfolio item created:", portfolioItem)

    return NextResponse.json(portfolioItem, { status: 201 })
  } catch (error: any) {
    console.error("Error creating portfolio item:", error)
    return NextResponse.json({ message: error.message || "Failed to create portfolio item" }, { status: 500 })
  }
}
