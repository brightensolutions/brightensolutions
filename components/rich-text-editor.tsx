"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Import React Quill with NO SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 border rounded-md flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brightencolor-brightenone"></div>
    </div>
  ),
})

// Import styles in a separate component to avoid SSR issues
const QuillStyles = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .rich-text-editor .ql-container {
          min-height: 200px;
        }
        .rich-text-editor .ql-toolbar.ql-snow {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
      `,
      }}
    />
  )
}

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const quillRef = useRef<any>(null)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

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
        const editor = quillRef.current?.getEditor()
        if (editor) {
          const range = editor.getSelection(true)
          editor.insertEmbed(range.index, "image", result.data.url)
          editor.setSelection(range.index + 1)
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

  // Don't render anything on the server
  if (!mounted) {
    return (
      <div className="h-64 border rounded-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brightencolor-brightenone"></div>
      </div>
    )
  }

  // Configure Quill modules
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  }

  return (
    <div className="rich-text-editor">
      <QuillStyles />
      <div className="mb-2 flex justify-end">
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
              <Upload className="mr-1 h-3 w-3" /> Upload Image
            </>
          )}
        </Button>
      </div>
      <ReactQuill ref={quillRef} theme="snow" value={value} onChange={onChange} modules={modules} className="h-64" />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  )
}
