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

// POST new experience data or update existing
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Processing experience data:", body)

    // Check if the document has an _id field
    if (body._id) {
      // If _id exists, update the existing document
      console.log("Updating existing experience with ID:", body._id)

      // Remove the _id from the update data to avoid the duplicate key error
      const { _id, ...updateData } = body

      const updatedExperience = await Experience.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true })

      if (!updatedExperience) {
        return NextResponse.json({ message: "Experience not found" }, { status: 404 })
      }

      console.log("Experience data updated:", updatedExperience)
      return NextResponse.json(updatedExperience)
    } else {
      // If no _id, create a new document
      console.log("Creating new experience data")
      const experience = await Experience.create(body)
      console.log("Experience data created:", experience)
      return NextResponse.json(experience, { status: 201 })
    }
  } catch (error: any) {
    console.error("Error processing experience data:", error)
    return NextResponse.json({ message: error.message || "Failed to process experience data" }, { status: 500 })
  }
}
