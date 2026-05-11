"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"

interface SimpleEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Initialize editor content
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value
    }
  }, [])

  // Update editor content when value changes externally
  useEffect(() => {
    if (mounted && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value, mounted])

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true)

      // Get auth token from localStorage or wherever you store it
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("Authentication required")
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "brightensolution/content")

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()

      if (result.success && result.data.url) {
        // Insert the image at the current cursor position
        document.execCommand("insertImage", false, result.data.url)

        // Update the onChange value
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML)
        }
      } else {
        throw new Error("Upload failed")
      }
    } catch (err: any) {
      console.error("Error uploading image:", err)
      alert(err.message || "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file)
    }
  }

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  if (!mounted) {
    return (
      <div className="h-64 border rounded-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brightencolor-brightenone"></div>
      </div>
    )
  }

  return (
    <div className="simple-editor border rounded-md overflow-hidden">
      <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-2">
        <div className="flex gap-1">
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => handleCommand("formatBlock", "<h1>")}
          >
            H1
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => handleCommand("formatBlock", "<h2>")}
          >
            H2
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => handleCommand("formatBlock", "<p>")}
          >
            P
          </button>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50 font-bold"
            onClick={() => handleCommand("bold")}
          >
            B
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50 italic"
            onClick={() => handleCommand("italic")}
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50 underline"
            onClick={() => handleCommand("underline")}
          >
            U
          </button>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => handleCommand("insertUnorderedList")}
          >
            • List
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => handleCommand("insertOrderedList")}
          >
            1. List
          </button>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="px-2 py-1 bg-white border rounded hover:bg-gray-50"
            onClick={() => {
              const url = prompt("Enter link URL")
              if (url) handleCommand("createLink", url)
            }}
          >
            Link
          </button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleImageUpload}
            disabled={isUploading}
            className="h-8 px-2 py-1 text-xs"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-1 h-3 w-3" /> Image
              </>
            )}
          </Button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        onInput={() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
          }
        }}
        onBlur={() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
          }
        }}
      />

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  )
}
