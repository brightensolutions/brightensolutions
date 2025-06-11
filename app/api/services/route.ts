import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/services"

// GET all services
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    // If slug is provided, return a single service
    if (slug) {
      const service = await Service.findOne({ slug, isActive: true })

      if (!service) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 })
      }

      return NextResponse.json(service)
    }

    // Otherwise return all active services
    const services = await Service.find({ isActive: true }).sort({ sequence: 1, createdAt: -1 })

    // If no services found, return empty array
    if (!services || services.length === 0) {
      return NextResponse.json([])
    }

    return NextResponse.json(services)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 })
  }
}

// POST a new service
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()

    // Create slug from title
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    // Get the highest sequence number and add 1
    const highestSequence = await Service.findOne({}).sort({ sequence: -1 }).select("sequence")
    body.sequence = highestSequence ? highestSequence.sequence + 1 : 0

    const service = await Service.create(body)
    return NextResponse.json(service, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create service" }, { status: 500 })
  }
}
