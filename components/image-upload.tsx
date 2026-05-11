"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  id?: string
}

export default function ImageUpload({
  value,
  onChange,
  folder = "brightensolution",
  label = "Image",
  id = "default",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Set initial preview from value when component mounts or value changes
  useEffect(() => {
    if (value) {
      setPreview(value)
    }
  }, [value])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      setError(null)

      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      console.log(`Uploading ${label} to folder: ${folder}`)

      // Upload the file
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      console.log(`Upload result for ${label}:`, result)

      if (!response.ok) {
        throw new Error(result.error || `Failed to upload ${label.toLowerCase()}`)
      }

      if (result.success && result.data?.url) {
        console.log(`Successfully uploaded ${label}:`, result.data.url)
        setPreview(result.data.url)
        onChange(result.data.url)
      } else {
        throw new Error(`Upload failed - No URL returned for ${label.toLowerCase()}`)
      }
    } catch (err: any) {
      console.error(`Error uploading ${label}:`, err)
      setError(err.message || `Failed to upload ${label.toLowerCase()}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url)
    onChange(url)
  }

  // Create a unique ID for the file input to prevent conflicts between multiple instances
  const uniqueId = `file-upload-${id}-${folder}`

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(uniqueId)?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading {label}...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Upload {label}
            </>
          )}
        </Button>
        <input id={uniqueId} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={`Or enter ${label.toLowerCase()} URL directly`}
            value={value || ""}
            onChange={handleUrlChange}
            className="flex-1"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* Always show preview area, even if empty */}
      <div className="relative h-40 w-full overflow-hidden rounded-md border">
        {preview ? (
          <Image
            src={preview || "/placeholder.svg"}
            alt={`${label} preview`}
            fill
            className="object-contain"
            onError={() => {
              setError(`Invalid ${label.toLowerCase()} URL or domain not configured in Next.js config`)
            }}
            unoptimized={true}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <ImageIcon className="h-10 w-10 text-gray-400" />
            <p className="ml-2 text-sm text-gray-500">No {label.toLowerCase()} selected</p>
          </div>
        )}
      </div>
    </div>
  )
}
