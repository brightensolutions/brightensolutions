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

interface PortfolioFormProps {
  portfolioData?: {
    _id: string
    title: string
    description: string
    category: string[]
    image: string
    logo?: string
    technologies: string[]
    liveUrl?: string
    codeUrl?: string
    featured?: boolean
    color?: string
    isActive: boolean
  }
}

export default function PortfolioForm({ portfolioData }: PortfolioFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: portfolioData?.title || "",
    description: portfolioData?.description || "",
    category: portfolioData?.category || ["web"],
    image: portfolioData?.image || "",
    logo: portfolioData?.logo || "",
    technologies: portfolioData?.technologies || [""],
    liveUrl: portfolioData?.liveUrl || "",
    codeUrl: portfolioData?.codeUrl || "",
    featured: portfolioData?.featured || false,
    color: portfolioData?.color || "#F66526",
    isActive: portfolioData?.isActive ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categoryOptions = [
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "design", label: "UI/UX Design" },
    { value: "Social Media", label: "Social Media" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        category: [...formData.category, category],
      })
    } else {
      setFormData({
        ...formData,
        category: formData.category.filter((c) => c !== category),
      })
    }
  }

  const handleTechnologyChange = (index: number, value: string) => {
    const updatedTechnologies = [...formData.technologies]
    updatedTechnologies[index] = value
    setFormData({
      ...formData,
      technologies: updatedTechnologies,
    })
  }

  const addTechnology = () => {
    setFormData({
      ...formData,
      technologies: [...formData.technologies, ""],
    })
  }

  const removeTechnology = (index: number) => {
    const updatedTechnologies = [...formData.technologies]
    updatedTechnologies.splice(index, 1)
    setFormData({
      ...formData,
      technologies: updatedTechnologies,
    })
  }

  const handleImageChange = (url: string) => {
    console.log("Project Image URL changed:", url)
    setFormData({
      ...formData,
      image: url,
    })
  }

  const handleLogoChange = (url: string) => {
    console.log("Project Logo URL changed:", url)
    setFormData({
      ...formData,
      logo: url,
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
        !formData.description ||
        formData.category.length === 0 ||
        !formData.image ||
        formData.technologies.length === 0
      ) {
        throw new Error("Please fill in all required fields")
      }

      // Filter out empty technologies
      const filteredTechnologies = formData.technologies.filter((tech) => tech.trim() !== "")
      if (filteredTechnologies.length === 0) {
        throw new Error("Please add at least one technology")
      }

      // Generate slug from title if not provided
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const dataToSubmit = {
        ...formData,
        slug,
        technologies: filteredTechnologies,
      }

      console.log("Submitting portfolio data:", dataToSubmit)

      const url = portfolioData?._id ? `/api/portfolio/${portfolioData._id}` : "/api/portfolio"
      const method = portfolioData?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save portfolio item")
      }

      const result = await response.json()
      console.log("Portfolio saved successfully:", result)

      // Redirect to the portfolio admin page
      router.push("/admin/dashboard/portfolio")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving portfolio:", err)
      setError(err.message || "An error occurred while saving the portfolio item")
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
              required
              className="w-full"
            />
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
              rows={3}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categories *</label>
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <Checkbox
                    id={`category-${option.value}`}
                    checked={formData.category.includes(option.value)}
                    onCheckedChange={(checked) => handleCategoryChange(option.value, checked === true)}
                  />
                  <Label htmlFor={`category-${option.value}`} className="ml-2">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Live URL
            </label>
            <Input
              type="url"
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="codeUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Code URL
            </label>
            <Input
              type="url"
              id="codeUrl"
              name="codeUrl"
              value={formData.codeUrl}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-12 h-10 p-1"
              />
              <Input type="text" name="color" value={formData.color} onChange={handleChange} className="flex-1" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleCheckboxChange("isActive", checked === true)}
            />
            <Label htmlFor="isActive">Active (visible on website)</Label>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies *</label>
            <div className="space-y-2">
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder="e.g., React, Node.js, etc."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeTechnology(index)}
                    disabled={formData.technologies.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addTechnology} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Technology
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Project Images</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image * <span className="text-xs text-gray-500">(Main project screenshot)</span>
              </label>
              <ImageUpload
                value={formData.image}
                onChange={handleImageChange}
                folder="portfolio/images"
                label="Project Image"
                id="project-image"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Logo <span className="text-xs text-gray-500">(Company/brand logo)</span>
              </label>
              <ImageUpload
                value={formData.logo}
                onChange={handleLogoChange}
                folder="portfolio/logos"
                label="Logo"
                id="project-logo"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/portfolio")}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : portfolioData?._id ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
