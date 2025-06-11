import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Achievement from "@/lib/Models/achievement"

// GET a single achievement by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const achievement = await Achievement.findById(params.id)

    if (!achievement) {
      return NextResponse.json({ message: "Achievement not found" }, { status: 404 })
    }

    return NextResponse.json(achievement)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch achievement" }, { status: 500 })
  }
}

// PUT/UPDATE an achievement
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()

    // Update the achievement
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      params.id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    )

    if (!updatedAchievement) {
      return NextResponse.json({ message: "Achievement not found" }, { status: 404 })
    }

    return NextResponse.json(updatedAchievement)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update achievement" }, { status: 500 })
  }
}

// DELETE an achievement
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedAchievement = await Achievement.findByIdAndDelete(params.id)

    if (!deletedAchievement) {
      return NextResponse.json({ message: "Achievement not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Achievement deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete achievement" }, { status: 500 })
  }
}
