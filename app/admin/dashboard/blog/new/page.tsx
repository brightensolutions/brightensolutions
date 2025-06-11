"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Save, X, Upload, Trash2, Star, StarOff, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/components/ui/use-toast"
import RichTextEditor from "../rich-text-editor"

export default function NewBlogPostPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: "",
    author: {
      name: "",
      avatar: "",
    },
    readingTime: "5 min read",
    featured: false,
    isPublished: false,
  })

  const [coverImagePreview, setCoverImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "UI/UX Design",
    "Technology",
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }))
  }

  const handleToggleFeatured = () => {
    setFormData((prev) => ({
      ...prev,
      featured: !prev.featured,
    }))
  }

  const handleTogglePublished = () => {
    setFormData((prev) => ({
      ...prev,
      isPublished: !prev.isPublished,
    }))
  }

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview the image
    const reader = new FileReader()
    reader.onload = () => {
      setCoverImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the image
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "brightensolution/blog/covers")

      const response = await fetch("/api/blog/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setFormData((prev) => ({
        ...prev,
        coverImage: data.url,
      }))
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload cover image")
    }
  }

  const handleRemoveCoverImage = () => {
    setCoverImagePreview("")
    setFormData((prev) => ({
      ...prev,
      coverImage: "",
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      setError("Please fill in all required fields")
      return
    }

    // Process tags
    const processedTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: processedTags,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create blog post")
      }

      // toast({
      //   title: "Success",
      //   description: "Blog post created successfully",
      // })

      // Redirect to blog management page
      router.push("/admin/dashboard/blog")
    } catch (err: any) {
      console.error("Error creating blog post:", err)
      setError(err.message || "Failed to create blog post")
      // toast({
      //   title: "Error",
      //   description: err.message || "Failed to create blog post",
      //   variant: "destructive",
      // })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard/blog" className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleToggleFeatured}
            className={formData.featured ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
          >
            {formData.featured ? <Star className="mr-2 h-4 w-4" /> : <StarOff className="mr-2 h-4 w-4" />}
            {formData.featured ? "Featured" : "Not Featured"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleTogglePublished}
            className={formData.isPublished ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {formData.isPublished ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
            {formData.isPublished ? "Published" : "Draft"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="enter-blog-post-slug"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    URL-friendly version of the title. Auto-generated but can be edited.
                  </p>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the blog post"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor value={formData.content} onChange={handleContentChange} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="new">+ Add new category</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="mt-1 text-sm text-gray-500">Comma-separated list of tags</p>
                </div>

                <div>
                  <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Reading Time
                  </label>
                  <Input
                    id="readingTime"
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleInputChange}
                    placeholder="5 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author Information</label>
                  <div className="space-y-3">
                    <Input
                      name="author.name"
                      value={formData.author.name}
                      onChange={handleInputChange}
                      placeholder="Author Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    {coverImagePreview ? (
                      <div className="relative w-full">
                        <Image
                          src={coverImagePreview || "/placeholder.svg"}
                          alt="Cover image preview"
                          width={300}
                          height={200}
                          className="mx-auto h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveCoverImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="cover-image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#F66526] hover:text-[#E55415] focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="cover-image-upload"
                              name="cover-image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleCoverImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <div className="flex justify-center">
                          <Upload className="h-10 w-10 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Link href="/admin/dashboard/blog">
                <Button variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
