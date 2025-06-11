"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Users, TrendingUp, Star, Trophy, Plus, Save, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import ImageUpload from "@/components/image-upload"

// Define icon options for the form
const iconOptions = [
  { value: "Award", label: "Award", icon: <Award className="h-4 w-4" /> },
  { value: "Users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { value: "TrendingUp", label: "Trending Up", icon: <TrendingUp className="h-4 w-4" /> },
  { value: "Calendar", label: "Calendar", icon: <Calendar className="h-4 w-4" /> },
  { value: "Star", label: "Star", icon: <Star className="h-4 w-4" /> },
  { value: "Trophy", label: "Trophy", icon: <Trophy className="h-4 w-4" /> },
]

interface Achievement {
  icon: string
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
  isYearsOfExperience: boolean
}

interface AwardData {
  icon: string
  title: string
  year: string
  color: string
  textColor: string
}

interface ExperienceData {
  _id?: string
  title: string
  subtitle: string
  description: string
  foundingDate: string
  buttonText: string
  buttonLink: string
  image: string
  achievements: Achievement[]
  stats: Stat[]
  awards: AwardData[]
  isActive: boolean
}

export default function ExperienceForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ExperienceData>({
    title: "delivering award-winning results.",
    subtitle: "Proven Experience",
    description:
      "Since 2016, we've been refining our craft, growing into a full-service digital agency with specialized departments under one roof. Our entire team works in-house, ensuring seamless collaboration and quick delivery to meet your business goals.",
    foundingDate: "2016-12-01",
    buttonText: "Learn more about our journey",
    buttonLink: "/about",
    image: "",
    achievements: [],
    stats: [],
    awards: [],
    isActive: true,
  })

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/experience")

        if (!response.ok) {
          throw new Error("Failed to fetch experience data")
        }

        const data = await response.json()

        if (Object.keys(data).length > 0) {
          // Format the date for the input field
          const formattedDate = data.foundingDate
            ? new Date(data.foundingDate).toISOString().split("T")[0]
            : "2016-12-01"

          setFormData({
            ...data,
            foundingDate: formattedDate,
          })
        }
      } catch (err) {
        console.error("Error fetching experience data:", err)
        setError("Error loading experience data. Using default values.")
      } finally {
        setLoading(false)
      }
    }

    fetchExperienceData()
  }, [])

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

  const handleImageChange = (url: string) => {
    setFormData({
      ...formData,
      image: url,
    })
  }

  // Achievement handlers
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { icon: "Award", title: "", description: "" }],
    })
  }

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = [...formData.achievements]
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    })
  }

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...formData.achievements]
    updatedAchievements.splice(index, 1)
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    })
  }

  // Stat handlers
  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { value: "", label: "", isYearsOfExperience: false }],
    })
  }

  const updateStat = (index: number, field: keyof Stat, value: any) => {
    const updatedStats = [...formData.stats]
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      stats: updatedStats,
    })
  }

  const removeStat = (index: number) => {
    const updatedStats = [...formData.stats]
    updatedStats.splice(index, 1)
    setFormData({
      ...formData,
      stats: updatedStats,
    })
  }

  // Award handlers
  const addAward = () => {
    setFormData({
      ...formData,
      awards: [
        ...formData.awards,
        {
          icon: "Trophy",
          title: "",
          year: new Date().getFullYear().toString(),
          color: "#F66526",
          textColor: "#FFFFFF",
        },
      ],
    })
  }

  const updateAward = (index: number, field: keyof AwardData, value: string) => {
    const updatedAwards = [...formData.awards]
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      awards: updatedAwards,
    })
  }

  const removeAward = (index: number) => {
    const updatedAwards = [...formData.awards]
    updatedAwards.splice(index, 1)
    setFormData({
      ...formData,
      awards: updatedAwards,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.image || !formData.foundingDate) {
        throw new Error("Please fill in all required fields")
      }

      // Always use POST method - our API will handle whether to update or create
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save experience data")
      }

      alert("Experience data saved successfully!")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the experience data")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Experience Section</h1>
        <p className="text-gray-600">
          Update your company's experience information, achievements, stats, and awards. Years of experience will be
          automatically calculated based on the founding date.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">This appears after the years count, e.g. "8 years [title]"</p>
              </div>

              <div>
                <Label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle *
                </Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </Label>
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
                <Label htmlFor="foundingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Founding Date *
                </Label>
                <Input
                  type="date"
                  id="foundingDate"
                  name="foundingDate"
                  value={formData.foundingDate}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Years of experience will be calculated automatically</p>
              </div>

              <div>
                <Label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </Label>
                <Input
                  id="buttonLink"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Image *
                </Label>
                <ImageUpload
                  value={formData.image}
                  onChange={handleImageChange}
                  folder="experience"
                  label="Team Image"
                  id="team-image"
                />
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
          </TabsContent>

          {/* Other tabs remain the same */}
          <TabsContent value="achievements" className="space-y-6">
            {/* Achievement content remains the same */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Achievements</h3>
              <Button type="button" onClick={addAchievement} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Achievement
              </Button>
            </div>

            {formData.achievements.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-gray-500">No achievements added yet. Click the button above to add one.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.achievements.map((achievement, index) => (
                  <Card key={index} className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      onClick={() => removeAchievement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Icon</Label>
                          <select
                            value={achievement.icon}
                            onChange={(e) => updateAchievement(index, "icon", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            {iconOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
                          <Input
                            value={achievement.title}
                            onChange={(e) => updateAchievement(index, "title", e.target.value)}
                            placeholder="e.g., Award-Winning Agency"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                          <Input
                            value={achievement.description}
                            onChange={(e) => updateAchievement(index, "description", e.target.value)}
                            placeholder="e.g., Recognized for excellence in digital marketing"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Stats content remains the same */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Stats</h3>
              <Button type="button" onClick={addStat} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Stat
              </Button>
            </div>

            {formData.stats.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-gray-500">No stats added yet. Click the button above to add one.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.stats.map((stat, index) => (
                  <Card key={index} className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      onClick={() => removeStat(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Value</Label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateStat(index, "value", e.target.value)}
                            placeholder="e.g., 200+"
                            disabled={stat.isYearsOfExperience}
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Label</Label>
                          <Input
                            value={stat.label}
                            onChange={(e) => updateStat(index, "label", e.target.value)}
                            placeholder="e.g., Projects Completed"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`isYearsOfExperience-${index}`}
                              checked={stat.isYearsOfExperience}
                              onCheckedChange={(checked) => updateStat(index, "isYearsOfExperience", checked === true)}
                            />
                            <Label htmlFor={`isYearsOfExperience-${index}`}>
                              This is the "Years of Experience" stat (will be calculated automatically)
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="awards" className="space-y-6">
            {/* Awards content remains the same */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Awards</h3>
              <Button type="button" onClick={addAward} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Award
              </Button>
            </div>

            {formData.awards.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-gray-500">No awards added yet. Click the button above to add one.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.awards.map((award, index) => (
                  <Card key={index} className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      onClick={() => removeAward(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Icon</Label>
                          <select
                            value={award.icon}
                            onChange={(e) => updateAward(index, "icon", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            {iconOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
                          <Input
                            value={award.title}
                            onChange={(e) => updateAward(index, "title", e.target.value)}
                            placeholder="e.g., EXCELLENCE"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Year</Label>
                          <Input
                            value={award.year}
                            onChange={(e) => updateAward(index, "year", e.target.value)}
                            placeholder="e.g., 2023"
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={award.color}
                              onChange={(e) => updateAward(index, "color", e.target.value)}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={award.color}
                              onChange={(e) => updateAward(index, "color", e.target.value)}
                              placeholder="#F66526"
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={award.textColor}
                              onChange={(e) => updateAward(index, "textColor", e.target.value)}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={award.textColor}
                              onChange={(e) => updateAward(index, "textColor", e.target.value)}
                              placeholder="#FFFFFF"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Skeleton className="h-4 w-4 mr-2 rounded-full" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Experience Data
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
