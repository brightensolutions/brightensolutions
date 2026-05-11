"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Code, Smartphone, LineChart, Globe, Palette, Search } from "lucide-react"

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => <div className="h-64 border rounded-md flex items-center justify-center">Loading editor...</div>,
})

interface ServiceFormProps {
  serviceData?: {
    _id: string
    title: string
    slug: string
    description: string
    icon: string
    image: string
    featuredProject?: string
    content: string
    isActive: boolean
  }
}

export default function ServiceForm({ serviceData }: ServiceFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: serviceData?.title || "",
    slug: serviceData?.slug || "",
    description: serviceData?.description || "",
    icon: serviceData?.icon || "Code",
    image: serviceData?.image || "",
    featuredProject: serviceData?.featuredProject || "",
    content: serviceData?.content || "",
    isActive: serviceData?.isActive ?? true,
  })
  const [content, setContent] = useState(serviceData?.content || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const iconOptions = [
    { value: "Code", label: "Code", icon: <Code className="h-5 w-5" /> },
    { value: "Smartphone", label: "Smartphone", icon: <Smartphone className="h-5 w-5" /> },
    { value: "LineChart", label: "LineChart", icon: <LineChart className="h-5 w-5" /> },
    { value: "Globe", label: "Globe", icon: <Globe className="h-5 w-5" /> },
    { value: "Palette", label: "Palette", icon: <Palette className="h-5 w-5" /> },
    { value: "Search", label: "Search", icon: <Search className="h-5 w-5" /> },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    setFormData({
      ...formData,
      slug,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Include the rich text editor content
      const dataToSubmit = {
        ...formData,
        content,
      }

      const url = serviceData?._id ? `/api/services/${serviceData._id}` : "/api/services"

      const method = serviceData?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save service")
      }

      // Redirect to the services admin page
      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the service")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => !formData.slug && generateSlug()}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
            />
          </div>

          <div>
            <label htmlFor="featuredProject" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Project
            </label>
            <input
              type="text"
              id="featuredProject"
              name="featuredProject"
              value={formData.featuredProject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
              Icon *
            </label>
            <select
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center gap-2">
              <span>Selected icon:</span>
              {iconOptions.find((option) => option.value === formData.icon)?.icon}
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-brightencolor-brightenone focus:border-brightencolor-brightenone"
              placeholder="/images/your-image.jpg"
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-brightencolor-brightenone focus:ring-brightencolor-brightenone border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (visible on website)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-brightencolor-brightenone text-white rounded-md hover:bg-brightencolor-brightenone/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : serviceData?._id ? "Update Service" : "Create Service"}
        </button>
      </div>
    </form>
  )
}
