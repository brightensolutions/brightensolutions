"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, X, Plus, Trash2, Save, Grid, Columns } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
// Remove framer-motion import
// import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface UploadedImage {
  id: string
  file: File
  preview: string
  title: string
  description: string
  category: string
  isUploading?: boolean
  progress?: number
  error?: string
}

export default function GalleryAdminPage() {
  const router = useRouter()
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Nature",
    "Architecture",
    "People",
    "Technology",
    "Travel",
    "Food",
    "Other",
  ])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "columns">("grid")

  useEffect(() => {
    // Fetch existing gallery images
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/gallery")
        if (response.ok) {
          const data = await response.json()
          setExistingImages(data)
        } else {
          // toast({
          //   title: "Error",
          //   description: "Failed to fetch gallery images",
          //   variant: "destructive",
          // })
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      title: file.name.split(".")[0].replace(/-|_/g, " "),
      description: "",
      category: "Other",
    }))

    setImages((prev) => [...prev, ...newImages])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 10485760, // 10MB
  })

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id))
  }

  const handleInputChange = (id: string, field: keyof UploadedImage, value: string) => {
    setImages((prev) => prev.map((image) => (image.id === id ? { ...image, [field]: value } : image)))
  }

  const handleUpload = async () => {
    if (images.length === 0) {
      // toast({
      //   title: "No images selected",
      //   description: "Please select at least one image to upload",
      //   variant: "destructive",
      // })
      return
    }

    setIsUploading(true)

    try {
      // Mark all images as uploading
      setImages((prev) => prev.map((image) => ({ ...image, isUploading: true, progress: 0 })))

      // Upload each image
      const uploadPromises = images.map(async (image, index) => {
        try {
          const formData = new FormData()
          formData.append("file", image.file)
          formData.append("title", image.title)
          formData.append("description", image.description)
          formData.append("category", image.category)

          const response = await fetch("/api/admin/gallery/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error(`Failed to upload ${image.title}`)
          }

          // Update progress
          setImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, progress: 100 } : img)))

          return await response.json()
        } catch (error) {
          console.error(`Error uploading ${image.title}:`, error)

          // Mark image as failed
          setImages((prev) =>
            prev.map((img) => (img.id === image.id ? { ...img, isUploading: false, error: "Upload failed" } : img)),
          )

          throw error
        }
      })

      await Promise.all(uploadPromises)

      // toast({
      //   title: "Success",
      //   description: `Successfully uploaded ${images.length} images`,
      // })

      // Refresh the gallery
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setExistingImages(data)
      }

      // Clear uploaded images
      setImages([])
    } catch (error) {
      console.error("Error uploading images:", error)
      // toast({
      //   title: "Error",
      //   description: "Some images failed to upload. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // toast({
        //   title: "Success",
        //   description: "Image deleted successfully",
        // })

        // Remove from state
        setExistingImages((prev) => prev.filter((image) => image._id !== id))
      } else {
        // toast({
        //   title: "Error",
        //   description: "Failed to delete image",
        //   variant: "destructive",
        // })
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to delete image",
      //   variant: "destructive",
      // })
    }
  }

  const filteredImages =
    selectedCategory === "All" ? existingImages : existingImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>

      <Tabs defaultValue="upload">
        <TabsList className="mb-6">
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="manage">Manage Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <p className="text-lg font-medium">
                    {isDragActive ? "Drop the images here..." : "Drag & drop images here, or click to select"}
                  </p>
                  <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WEBP (Max: 10MB)</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Selected Images ({images.length})</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setImages([])} disabled={isUploading}>
                        <X className="mr-2 h-4 w-4" />
                        Clear All
                      </Button>
                      <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Upload All
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={image.preview || "/placeholder.svg"}
                            alt={image.title}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveImage(image.id)}
                            disabled={isUploading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          {image.isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="text-white text-center">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                                <p>{image.progress}%</p>
                              </div>
                            </div>
                          )}

                          {image.error && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <div className="bg-white p-2 rounded">
                                <p className="text-red-500 text-sm">{image.error}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-4 space-y-3">
                          <div>
                            <Label htmlFor={`title-${image.id}`}>Title</Label>
                            <Input
                              id={`title-${image.id}`}
                              value={image.title}
                              onChange={(e) => handleInputChange(image.id, "title", e.target.value)}
                              disabled={isUploading}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`description-${image.id}`}>Description</Label>
                            <Textarea
                              id={`description-${image.id}`}
                              value={image.description}
                              onChange={(e) => handleInputChange(image.id, "description", e.target.value)}
                              rows={2}
                              disabled={isUploading}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`category-${image.id}`}>Category</Label>
                            <Select
                              value={image.category}
                              onValueChange={(value) => handleInputChange(image.id, "category", value)}
                              disabled={isUploading}
                            >
                              <SelectTrigger id={`category-${image.id}`}>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories
                                  .filter((c) => c !== "All")
                                  .map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="filter-category">Filter by:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="filter-category" className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label>View:</Label>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "columns" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("columns")}
                >
                  <Columns className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="ml-2">Loading gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-lg text-gray-500">No images found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.querySelector('[data-value="upload"]')?.click()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Images
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image._id}
                  className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1 rounded-md shadow-md"
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className={`relative ${viewMode === "columns" ? "h-80" : "h-48"}`}>
                      <Image
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleDeleteGalleryImage(image._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-500 mb-2 flex-1">{image.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <Badge variant="outline">{image.category}</Badge>
                        <span className="text-xs text-gray-500">{new Date(image.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
