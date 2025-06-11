import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

export async function uploadToBlob(file: File, folder = "brightensolution") {
  try {
    // Generate a unique filename
    const filename = `${folder}/${uuidv4()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    })

    return {
      success: true,
      url: blob.url,
      filename: blob.pathname,
    }
  } catch (error) {
    console.error("Error uploading to blob:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

export function getBlobFilename(url: string) {
  try {
    const pathname = new URL(url).pathname
    return pathname.startsWith("/") ? pathname.substring(1) : pathname
  } catch (error) {
    return url
  }
}
