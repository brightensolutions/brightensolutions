import { type NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"
import connectDb from "@/lib/db/db"
import galleryImage from "@/lib/Models/gallery-image"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const image = await galleryImage.findById(params.id)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete from Vercel Blob if fileName exists
    if (image.fileName) {
      try {
        await del(image.fileName)
      } catch (blobError) {
        console.error("Error deleting blob:", blobError)
        // Continue with deletion from database even if blob deletion fails
      }
    }

    // Delete from database
    await galleryImage.findByIdAndDelete(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
