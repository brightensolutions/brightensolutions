import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "brightensolution"

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Generate a unique filename
    const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    console.log(`Uploading file to Vercel Blob: ${filename}`)

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("Upload successful:", blob)

    return NextResponse.json({
      success: true,
      data: {
        url: blob.url,
        filename: blob.pathname,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload file",
      },
      { status: 500 },
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
