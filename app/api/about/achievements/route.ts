import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Achievement from "@/lib/Models/achievement"

// GET all achievements
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const isFeatured = searchParams.get("featured")
    const isActive = searchParams.get("isActive") !== "false" // Default to true if not specified

    // Build query
    const query: any = {}

    if (isFeatured === "true") {
      query.isFeatured = true
    }

    if (isActive !== null) {
      query.isActive = isActive
    }

    // Get achievements
    const achievements = await Achievement.find(query).sort({ order: 1, year: -1 })

    return NextResponse.json(achievements)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch achievements" }, { status: 500 })
  }
}

// POST a new achievement
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()

    // Create new achievement
    const newAchievement = await Achievement.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(newAchievement, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to create achievement" }, { status: 500 })
  }
}
