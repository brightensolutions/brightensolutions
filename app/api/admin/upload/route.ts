import { type NextRequest, NextResponse } from "next/server"
import { uploadToBlob } from "@/lib/blob-utils"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const token = req.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "brightensolution"

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    const result = await uploadToBlob(file, folder)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to upload file" }, { status: 500 })
  }
}
