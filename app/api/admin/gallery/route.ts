import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import galleryImage from "@/lib/Models/gallery-image"

export async function GET(request: NextRequest) {
  try {
    await connectDb()

    const images = await galleryImage.find().sort({ createdAt: -1 })

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}
