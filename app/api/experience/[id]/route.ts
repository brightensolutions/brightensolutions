import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Experience from "@/lib/Models/experience"

// GET experience data
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get the active experience data
    const experience = await Experience.findOne({ isActive: true })

    // If no experience data found, return empty object
    if (!experience) {
      return NextResponse.json({})
    }

    return NextResponse.json(experience)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch experience data" }, { status: 500 })
  }
}

// POST new experience data
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Creating/updating experience data:", body)

    // Check if experience data already exists
    const existingExperience = await Experience.findOne({ isActive: true })

    let experience

    if (existingExperience) {
      // Update existing record instead of creating a new one
      experience = await Experience.findByIdAndUpdate(
        existingExperience._id,
        { ...body, updatedAt: Date.now() },
        { new: true, runValidators: true },
      )
      console.log("Experience data updated:", experience)
    } else {
      // Create new experience data only if none exists
      experience = await Experience.create(body)
      console.log("Experience data created:", experience)
    }

    return NextResponse.json(experience, { status: existingExperience ? 200 : 201 })
  } catch (error: any) {
    console.error("Error creating/updating experience data:", error)
    return NextResponse.json({ message: error.message || "Failed to save experience data" }, { status: 500 })
  }
}
