"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon } from "lucide-react"

interface SimpleEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [mounted, value])

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "brightensolution/content")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()

      if (result.url) {
        // Insert the image at the current cursor position
        const imgHtml = `<img src="${result.url}" alt="Uploaded image" style="max-width: 100%; margin: 10px 0;" />`
        document.execCommand("insertHTML", false, imgHtml)

        // Make sure to update the onChange value
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

  const handleEditorChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value ? value.toString() : "")
    handleEditorChange()
  }

  // Don't render anything on the server
  if (!mounted) {
    return (
      <div className="h-64 border rounded-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F66526]"></div>
      </div>
    )
  }

  return (
    <div className="simple-editor border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("bold")}
          className="h-8 px-2 py-1 text-xs"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("italic")}
          className="h-8 px-2 py-1 text-xs"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 px-2 py-1 text-xs"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 px-2 py-1 text-xs"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = prompt("Enter link URL:")
            if (url) execCommand("createLink", url)
          }}
          className="h-8 px-2 py-1 text-xs"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleImageUpload}
          disabled={isUploading}
          className="h-8 px-2 py-1 text-xs ml-auto"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <ImageIcon className="mr-1 h-4 w-4" /> Upload Image
            </>
          )}
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] p-4 focus:outline-none"
        onInput={handleEditorChange}
        onBlur={handleEditorChange}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  )
}
