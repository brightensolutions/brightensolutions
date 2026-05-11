import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { nanoid } from "nanoid"
import connectDb from "@/lib/db/db"
import galleryImage from "@/lib/Models/gallery-image"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP and GIF are allowed." },
        { status: 400 },
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `gallery/${nanoid()}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
    })

    // Connect to database
    await connectDb()

    // Create gallery image record
    const GalleryImage = await galleryImage.create({
      title: title || file.name,
      description: description || "",
      category: category || "Other",
      imageUrl: blob.url,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type,
    })

    return NextResponse.json({
      success: true,
      image: GalleryImage,
    })
  } catch (error) {
    console.error("Error uploading gallery image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
