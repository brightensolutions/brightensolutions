"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Star,
  Trophy,
  Award,
  BadgeIcon as Certificate,
  Medal,
  Crown,
} from "lucide-react"
import Image from "next/image"
// import { useToast } from "@/hooks/use-toast"

interface Achievement {
  _id: string
  title: string
  organization: string
  year: string
  image: string
  icon: string
  isFeatured: boolean
  description: string
  category: string
  order: number
  isActive: boolean
}

export default function AchievementsAdmin() {
//   const { toast } = useToast()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    year: new Date().getFullYear().toString(),
    image: "",
    icon: "trophy",
    isFeatured: false,
    description: "",
    category: "Agency Excellence",
    order: 0,
    isActive: true,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/about/achievements")

      if (!response.ok) {
        throw new Error("Failed to fetch achievements")
      }

      const data = await response.json()
      setAchievements(data)

      // If no achievements are returned, try to seed initial data
      if (data.length === 0) {
        await fetch("/api/about/achievements/seed", { method: "POST" })
        // Fetch achievements again after seeding
        const seedResponse = await fetch("/api/about/achievements")
        if (seedResponse.ok) {
          const seedData = await seedResponse.json()
          setAchievements(seedData)
        }
      }
    } catch (err: any) {
      console.error("Error fetching achievements:", err)
      setError(err.message || "Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
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
    setImagePreview(null)
  }

  const openAddDialog = () => {
    setCurrentAchievement(null)
    setFormData({
      title: "",
      organization: "",
      year: new Date().getFullYear().toString(),
      image: "",
      icon: "trophy",
      isFeatured: false,
      description: "",
      category: "Agency Excellence",
      order: achievements.length,
      isActive: true,
    })
    setImagePreview(null)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setFormData({
      title: achievement.title,
      organization: achievement.organization,
      year: achievement.year,
      image: achievement.image,
      icon: achievement.icon,
      isFeatured: achievement.isFeatured,
      description: achievement.description || "",
      category: achievement.category || "Agency Excellence",
      order: achievement.order,
      isActive: achievement.isActive,
    })
    setImagePreview(achievement.image)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // First, handle image upload if there's a new image
      let imageUrl = formData.image
      if (imageFile) {
        try {
          // Show processing message
        //   toast({
        //     title: "Processing image",
        //     description: "Uploading image...",
        //   })

          // Create a FormData object to send the file
          const uploadFormData = new FormData()
          uploadFormData.append("file", imageFile)
          uploadFormData.append("folder", "achievements")

          // Upload the image
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

        //   toast({
        //     title: "Success",
        //     description: "Image uploaded successfully",
        //   })
        } catch (uploadError: any) {
          console.error("Error uploading image:", uploadError)
        //   toast({
        //     title: "Image Upload Error",
        //     description: uploadError.message || "Failed to upload image",
        //     variant: "destructive",
        //   })
          // Continue with the existing image if there's an error
        }
      }

      // Prepare the data to send
      const dataToSend = {
        ...formData,
        image: imageUrl,
      }

      // Determine if we're adding or updating
      if (currentAchievement) {
        // Update existing achievement
        const response = await fetch(`/api/about/achievements/${currentAchievement._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to update achievement")
        }

        // toast({
        //   title: "Success",
        //   description: "Achievement updated successfully",
        // })
      } else {
        // Add new achievement
        const response = await fetch("/api/about/achievements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to add achievement")
        }

        // toast({
        //   title: "Success",
        //   description: "Achievement added successfully",
        // })
      }

      // Refresh the achievements list
      await fetchAchievements()

      // Close the dialog
      setIsDialogOpen(false)
    } catch (err: any) {
      console.error("Error saving achievement:", err)
      setError(err.message || "Failed to save achievement")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to save achievement",
    //     variant: "destructive",
    //   })
    }
  }

  const handleDelete = async () => {
    if (!currentAchievement) return

    try {
      const response = await fetch(`/api/about/achievements/${currentAchievement._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete achievement")
      }

      // Refresh the achievements list
      await fetchAchievements()

      // Close the dialog
      setIsDeleteDialogOpen(false)

    //   toast({
    //     title: "Success",
    //     description: "Achievement deleted successfully",
    //   })
    } catch (err: any) {
      console.error("Error deleting achievement:", err)
      setError(err.message || "Failed to delete achievement")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to delete achievement",
    //     variant: "destructive",
    //   })
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-4 w-4" />
      case "award":
        return <Award className="h-4 w-4" />
      case "star":
        return <Star className="h-4 w-4" />
      case "certificate":
        return <Certificate className="h-4 w-4" />
      case "medal":
        return <Medal className="h-4 w-4" />
      case "crown":
        return <Crown className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  if (loading && achievements.length === 0) {
    return <div className="flex justify-center p-8">Loading achievements...</div>
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Achievements & Awards</h3>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Achievement
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="w-[100px]">Featured</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No achievements found. Add your first achievement to get started.
                </TableCell>
              </TableRow>
            ) : (
              achievements.map((achievement) => (
                <TableRow key={achievement._id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={achievement.image || "/placeholder.svg?height=40&width=40&query=award"}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{achievement.title}</TableCell>
                  <TableCell>{achievement.organization}</TableCell>
                  <TableCell>{achievement.year}</TableCell>
                  <TableCell>
                    {achievement.isFeatured && (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Featured</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${achievement.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {achievement.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(achievement)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(achievement)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentAchievement ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
            <DialogDescription>
              {currentAchievement
                ? "Update the details of this achievement."
                : "Add a new achievement to your about page."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>

                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" value={formData.year} onChange={handleInputChange} required />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleInputChange} />
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trophy">Trophy</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="medal">Medal</SelectItem>
                      <SelectItem value="crown">Crown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    value={formData.order.toString()}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                  />
                  <Label htmlFor="isFeatured">Featured Achievement</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label>Achievement Image</Label>
                <div className="mt-2 flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative h-32 w-32 rounded-md overflow-hidden">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Achievement preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={clearImageSelection}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-gray-400" />
                        <div className="mt-1 text-xs text-gray-500">No image</div>
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                    <p className="text-xs text-gray-500">
                      Upload an image of the award or certificate. Maximum size: 2MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{currentAchievement ? "Update Achievement" : "Add Achievement"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Achievement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentAchievement?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
