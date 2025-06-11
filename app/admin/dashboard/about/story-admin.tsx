"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Milestone {
  year: string
  title: string
  description: string
  achievements: string[]
  icon: string
}

interface OurStoryData {
  _id: string
  title: string
  subtitle: string
  description: string
  milestones: Milestone[]
}

export default function StoryAdmin() {
//   const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [storyData, setStoryData] = useState<OurStoryData | null>(null)

  useEffect(() => {
    fetchStoryData()
  }, [])

  const fetchStoryData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/about/story")

      if (!response.ok) {
        throw new Error("Failed to fetch story data")
      }

      const data = await response.json()
      setStoryData(data)
    } catch (err: any) {
      console.error("Error fetching story data:", err)
      setError(err.message || "Failed to load story data")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (!storyData) return

    setStoryData({
      ...storyData,
      [name]: value,
    })
  }

  const handleMilestoneChange = (index: number, field: string, value: string) => {
    if (!storyData) return

    const updatedMilestones = [...storyData.milestones]
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    }

    setStoryData({
      ...storyData,
      milestones: updatedMilestones,
    })
  }

  const handleAchievementChange = (milestoneIndex: number, achievementIndex: number, value: string) => {
    if (!storyData) return

    const updatedMilestones = [...storyData.milestones]
    const updatedAchievements = [...updatedMilestones[milestoneIndex].achievements]
    updatedAchievements[achievementIndex] = value

    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      achievements: updatedAchievements,
    }

    setStoryData({
      ...storyData,
      milestones: updatedMilestones,
    })
  }

  const addMilestone = () => {
    if (!storyData) return

    setStoryData({
      ...storyData,
      milestones: [
        ...storyData.milestones,
        {
          year: new Date().getFullYear().toString(),
          title: "",
          description: "",
          achievements: [""],
          icon: "✨",
        },
      ],
    })
  }

  const removeMilestone = (index: number) => {
    if (!storyData) return

    const updatedMilestones = [...storyData.milestones]
    updatedMilestones.splice(index, 1)

    setStoryData({
      ...storyData,
      milestones: updatedMilestones,
    })
  }

  const addAchievement = (milestoneIndex: number) => {
    if (!storyData) return

    const updatedMilestones = [...storyData.milestones]
    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      achievements: [...updatedMilestones[milestoneIndex].achievements, ""],
    }

    setStoryData({
      ...storyData,
      milestones: updatedMilestones,
    })
  }

  const removeAchievement = (milestoneIndex: number, achievementIndex: number) => {
    if (!storyData) return

    const updatedMilestones = [...storyData.milestones]
    const updatedAchievements = [...updatedMilestones[milestoneIndex].achievements]
    updatedAchievements.splice(achievementIndex, 1)

    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      achievements: updatedAchievements,
    }

    setStoryData({
      ...storyData,
      milestones: updatedMilestones,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!storyData) return

    try {
      setSaving(true)

      // Update the story content
      const response = await fetch("/api/about/story", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyData),
      })

      if (!response.ok) {
        throw new Error("Failed to update story content")
      }

      const updatedData = await response.json()
      setStoryData(updatedData)

    //   toast({
    //     title: "Success",
    //     description: "Story content updated successfully",
    //   })
    } catch (err: any) {
      console.error("Error saving story content:", err)
      setError(err.message || "Failed to save story content")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to save story content",
    //     variant: "destructive",
    //   })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading story content...</div>
  }

  if (!storyData) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>Error: Could not load story content. Please try refreshing the page.</p>
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={storyData.title}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle Badge</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={storyData.subtitle}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={storyData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Milestones</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                <Plus className="h-4 w-4 mr-1" /> Add Milestone
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {storyData.milestones.map((milestone, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-lg">Milestone #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`milestone-year-${index}`}>Year</Label>
                        <Input
                          id={`milestone-year-${index}`}
                          value={milestone.year}
                          onChange={(e) => handleMilestoneChange(index, "year", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`milestone-icon-${index}`}>Icon (Emoji)</Label>
                        <Input
                          id={`milestone-icon-${index}`}
                          value={milestone.icon}
                          onChange={(e) => handleMilestoneChange(index, "icon", e.target.value)}
                          required
                          className="mt-1"
                          placeholder="🚀, 📈, 🏆, etc."
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                      <Input
                        id={`milestone-title-${index}`}
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="mb-6">
                      <Label htmlFor={`milestone-description-${index}`}>Description</Label>
                      <Textarea
                        id={`milestone-description-${index}`}
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                        required
                        rows={2}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Achievements</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addAchievement(index)}
                          className="h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        {milestone.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2">
                            <Input
                              value={achievement}
                              onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                              required
                              placeholder={`Achievement ${achievementIndex + 1}`}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAchievement(index, achievementIndex)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              disabled={milestone.achievements.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {storyData.milestones.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <p className="text-gray-500">No milestones added yet. Click "Add Milestone" to add one.</p>
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
