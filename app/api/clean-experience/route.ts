import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Experience from "@/lib/Models/experience"

// This endpoint will clean up duplicate experience records
export async function GET() {
  try {
    await connectDb()

    // Find all experience records
    const experiences = await Experience.find().sort({ updatedAt: -1 })

    if (experiences.length <= 1) {
      return NextResponse.json({
        message: "No duplicate records found",
        count: experiences.length,
      })
    }

    // Keep the most recently updated record
    const mostRecentRecord = experiences[0]

    // Set all other records to inactive
    const idsToDeactivate = experiences.slice(1).map((exp) => exp._id)

    // Update all other records to inactive
    const updateResult = await Experience.updateMany({ _id: { $in: idsToDeactivate } }, { isActive: false })

    // Make sure the most recent record is active
    await Experience.findByIdAndUpdate(mostRecentRecord._id, { isActive: true })

    return NextResponse.json({
      message: "Successfully cleaned up experience records",
      keptRecord: mostRecentRecord._id,
      deactivatedCount: updateResult.modifiedCount,
    })
  } catch (error: any) {
    console.error("Clean-up error:", error)
    return NextResponse.json(
      {
        message: "Error cleaning up experience records",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
