"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

interface AboutHeroData {
  _id: string
  title: string
  titleHighlight: string
  subtitle: string
  description1: string
  description2: string
  image: string
  stats: Array<{
    value: string
    label: string
  }>
  buttons: Array<{
    text: string
    link: string
    isPrimary: boolean
  }>
}

export default function HeroAdmin() {
  // const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [heroData, setHeroData] = useState<AboutHeroData | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/about/hero")

      if (!response.ok) {
        throw new Error("Failed to fetch hero data")
      }

      const data = await response.json()
      setHeroData(data)
      setImagePreview(data.image)
    } catch (err: any) {
      console.error("Error fetching hero data:", err)
      setError(err.message || "Failed to load hero data")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (!heroData) return

    setHeroData({
      ...heroData,
      [name]: value,
    })
  }

  const handleStatChange = (index: number, field: string, value: string) => {
    if (!heroData) return

    const updatedStats = [...heroData.stats]
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    }

    setHeroData({
      ...heroData,
      stats: updatedStats,
    })
  }

  const handleButtonChange = (index: number, field: string, value: any) => {
    if (!heroData) return

    const updatedButtons = [...heroData.buttons]
    updatedButtons[index] = {
      ...updatedButtons[index],
      [field]: field === "isPrimary" ? value === "true" : value,
    }

    setHeroData({
      ...heroData,
      buttons: updatedButtons,
    })
  }

  const addStat = () => {
    if (!heroData) return

    setHeroData({
      ...heroData,
      stats: [...heroData.stats, { value: "", label: "" }],
    })
  }

  const removeStat = (index: number) => {
    if (!heroData) return

    const updatedStats = [...heroData.stats]
    updatedStats.splice(index, 1)

    setHeroData({
      ...heroData,
      stats: updatedStats,
    })
  }

  const addButton = () => {
    if (!heroData) return

    setHeroData({
      ...heroData,
      buttons: [...heroData.buttons, { text: "", link: "", isPrimary: false }],
    })
  }

  const removeButton = (index: number) => {
    if (!heroData) return

    const updatedButtons = [...heroData.buttons]
    updatedButtons.splice(index, 1)

    setHeroData({
      ...heroData,
      buttons: updatedButtons,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImageSelection = () => {
    setImageFile(null)
    if (heroData) {
      setImagePreview(heroData.image)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroData) return

    try {
      setSaving(true)

      // First, handle image upload if there's a new image
      let imageUrl = heroData.image
      if (imageFile) {
        // Create a FormData object to send the file
        const uploadFormData = new FormData()
        uploadFormData.append("file", imageFile)
        uploadFormData.append("folder", "about-hero")

        // Upload the image using Vercel Blob
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image")
        }

        const uploadData = await uploadResponse.json()

        if (!uploadData.success) {
          throw new Error(uploadData.error || "Failed to upload image")
        }

        imageUrl = uploadData.data.url
      }

      // Prepare the data to send
      const dataToSend = {
        ...heroData,
        image: imageUrl,
      }

      // Update the hero content
      const response = await fetch("/api/about/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Failed to update hero content")
      }

      const updatedData = await response.json()
      setHeroData(updatedData)
      setImagePreview(updatedData.image)
      setImageFile(null)

      // toast({
      //   title: "Success",
      //   description: "Hero content updated successfully",
      // })
    } catch (err: any) {
      console.error("Error saving hero content:", err)
      setError(err.message || "Failed to save hero content")
      // toast({
      //   title: "Error",
      //   description: err.message || "Failed to save hero content",
      //   variant: "destructive",
      // })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading hero content...</div>
  }

  if (!heroData) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>Error: Could not load hero content. Please try refreshing the page.</p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="subtitle">Subtitle Badge</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={heroData.subtitle}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={heroData.title}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="titleHighlight">Title Highlight</Label>
            <Input
              id="titleHighlight"
              name="titleHighlight"
              value={heroData.titleHighlight}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">This part of the title will be highlighted in orange.</p>
          </div>

          <div>
            <Label htmlFor="description1">Description (First Paragraph)</Label>
            <Textarea
              id="description1"
              name="description1"
              value={heroData.description1}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description2">Description (Second Paragraph)</Label>
            <Textarea
              id="description2"
              name="description2"
              value={heroData.description2}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Hero Image</Label>
            <div className="mt-2 flex items-start gap-4">
              {imagePreview ? (
                <div className="relative">
                  <div className="relative h-40 w-64 rounded-md overflow-hidden">
                    <Image
                      src={imagePreview || "/placeholder.svg?height=160&width=256&query=hero image"}
                      alt="Hero image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {imageFile && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={clearImageSelection}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex h-40 w-64 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <div className="mt-1 text-xs text-gray-500">No image</div>
                  </div>
                </div>
              )}

              <div className="flex-1">
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                <p className="text-xs text-gray-500">
                  Upload a high-quality image for the hero section. Recommended size: 600x450px.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Statistics</Label>
              <Button type="button" variant="outline" size="sm" onClick={addStat}>
                <Plus className="h-4 w-4 mr-1" /> Add Stat
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {heroData.stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Stat #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStat(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`stat-value-${index}`}>Value</Label>
                        <Input
                          id={`stat-value-${index}`}
                          value={stat.value}
                          onChange={(e) => handleStatChange(index, "value", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`stat-label-${index}`}>Label</Label>
                        <Input
                          id={`stat-label-${index}`}
                          value={stat.label}
                          onChange={(e) => handleStatChange(index, "label", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {heroData.stats.length === 0 && (
                <div className="text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <p className="text-gray-500">No statistics added yet. Click "Add Stat" to add one.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Buttons</Label>
              <Button type="button" variant="outline" size="sm" onClick={addButton}>
                <Plus className="h-4 w-4 mr-1" /> Add Button
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {heroData.buttons.map((button, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Button #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeButton(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`button-text-${index}`}>Button Text</Label>
                        <Input
                          id={`button-text-${index}`}
                          value={button.text}
                          onChange={(e) => handleButtonChange(index, "text", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`button-link-${index}`}>Button Link</Label>
                        <Input
                          id={`button-link-${index}`}
                          value={button.link}
                          onChange={(e) => handleButtonChange(index, "link", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`button-style-${index}`}>Button Style</Label>
                        <select
                          id={`button-style-${index}`}
                          value={button.isPrimary.toString()}
                          onChange={(e) => handleButtonChange(index, "isPrimary", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        >
                          <option value="true">Primary (Orange)</option>
                          <option value="false">Secondary (Outline)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {heroData.buttons.length === 0 && (
                <div className="text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <p className="text-gray-500">No buttons added yet. Click "Add Button" to add one.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
