"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import ImageUpload from "@/components/image-upload"
import dynamic from "next/dynamic"

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/simple-editor"), {
  ssr: false,
  loading: () => <div className="h-64 border rounded-md flex items-center justify-center">Loading editor...</div>,
})

interface ProductFormProps {
  productData?: {
    _id: string
    title: string
    slug: string
    shortDescription: string
    description: string
    icon: string
    image: string
    features: string[]
    content: string
    popular: boolean
    comingSoon: boolean
    isActive: boolean
  }
}

export default function ProductForm({ productData }: ProductFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: productData?.title || "",
    slug: productData?.slug || "",
    shortDescription: productData?.shortDescription || "",
    description: productData?.description || "",
    icon: productData?.icon || "CreditCard",
    image: productData?.image || "",
    features: productData?.features || [""],
    content: productData?.content || "",
    popular: productData?.popular || false,
    comingSoon: productData?.comingSoon || false,
    isActive: productData?.isActive ?? true,
  })
  const [content, setContent] = useState(productData?.content || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const iconOptions = [
    { value: "CreditCard", label: "Credit Card" },
    { value: "Smartphone", label: "Smartphone" },
    { value: "Globe", label: "Globe" },
    { value: "Shield", label: "Shield" },
    { value: "Zap", label: "Lightning" },
    { value: "RefreshCw", label: "Refresh" },
    { value: "BarChart3", label: "Bar Chart" },
    { value: "Code", label: "Code" },
    { value: "Database", label: "Database" },
    { value: "Server", label: "Server" },
    { value: "Cloud", label: "Cloud" },
    { value: "Lock", label: "Lock" },
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

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    })
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

  const handleImageChange = (url: string) => {
    setFormData({
      ...formData,
      image: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form data
      if (
        !formData.title ||
        !formData.shortDescription ||
        !formData.description ||
        !formData.icon ||
        !formData.image ||
        formData.features.length === 0
      ) {
        throw new Error("Please fill in all required fields")
      }

      // Filter out empty features
      const filteredFeatures = formData.features.filter((feature) => feature.trim() !== "")
      if (filteredFeatures.length === 0) {
        throw new Error("Please add at least one feature")
      }

      // Include the rich text editor content
      const dataToSubmit = {
        ...formData,
        features: filteredFeatures,
        content,
      }

      console.log("Submitting product data:", dataToSubmit)

      const url = productData?._id ? `/api/products/${productData._id}` : "/api/products"
      const method = productData?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save product")
      }

      // Redirect to the products admin page
      router.push("/admin/dashboard/products")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the product")
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
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => !formData.slug && generateSlug()}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="flex-1"
              />
              <Button type="button" onClick={generateSlug} variant="outline" size="sm">
                Generate
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description * <span className="text-xs text-gray-500">(max 200 characters)</span>
            </label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              maxLength={200}
              rows={2}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/200 characters</div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full"
            />
          </div>

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
              className="w-full px-4 py-2 border rounded-md"
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              folder="products"
              label="Product Image"
              id="product-image"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features *</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g., Easy integration, 24/7 support, etc."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="popular"
              checked={formData.popular}
              onCheckedChange={(checked) => setFormData({ ...formData, popular: checked === true })}
            />
            <Label htmlFor="popular">Popular Product</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="comingSoon"
              checked={formData.comingSoon}
              onCheckedChange={(checked) => setFormData({ ...formData, comingSoon: checked === true })}
            />
            <Label htmlFor="comingSoon">Coming Soon</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked === true })}
            />
            <Label htmlFor="isActive">Active (visible on website)</Label>
          </div>

          <div className="mt-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Content *
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/products")}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : productData?._id ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
