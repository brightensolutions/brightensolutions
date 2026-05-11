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
  Heart,
  Shield,
  Users,
  Star,
  Lightbulb,
  Target,
  ThumbsUp,
  Check,
  Zap,
  Upload,
  X,
} from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Value {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  image: string
  order: number
  isActive: boolean
}

export default function ValuesAdmin() {
//   const { toast } = useToast()
  const [values, setValues] = useState<Value[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<Value | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "heart",
    color: "#F66526",
    image: "",
    order: 0,
    isActive: true,
  })

  // Add imagePreview and imageFile states after the formData state
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Add this at the beginning of the component, before the useEffect
  const adminInterfaceImage = "/images/values-admin-interface.png"

  useEffect(() => {
    fetchValues()
  }, [])

  const fetchValues = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/about/values")

      if (!response.ok) {
        throw new Error("Failed to fetch values")
      }

      const data = await response.json()
      setValues(data)

      // If no values are returned, try to seed initial values
      if (data.length === 0) {
        await fetch("/api/about/values/seed", { method: "POST" })
        // Fetch values again after seeding
        const seedResponse = await fetch("/api/about/values")
        if (seedResponse.ok) {
          const seedData = await seedResponse.json()
          setValues(seedData)
        }
      }
    } catch (err: any) {
      console.error("Error fetching values:", err)
      setError(err.message || "Failed to load values")
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

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    })
  }

  // Add these functions after handleSwitchChange
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
    setCurrentValue(null)
    setFormData({
      title: "",
      description: "",
      icon: "heart",
      color: "#F66526",
      image: "",
      order: values.length,
      isActive: true,
    })
    setImagePreview(null)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (value: Value) => {
    setCurrentValue(value)
    setFormData({
      title: value.title,
      description: value.description,
      icon: value.icon,
      color: value.color || "#F66526",
      image: value.image || "",
      order: value.order,
      isActive: value.isActive,
    })
    setImagePreview(value.image || null)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (value: Value) => {
    setCurrentValue(value)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // First, handle image upload if there's a new image
      let imageUrl = formData.image
      if (imageFile) {
        // Create a FormData object to send the file
        const uploadFormData = new FormData()
        uploadFormData.append("file", imageFile)
        uploadFormData.append("folder", "company-values")

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
        ...formData,
        image: imageUrl,
      }

      // Determine if we're adding or updating
      if (currentValue) {
        // Update existing value
        const response = await fetch(`/api/about/values/${currentValue._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to update value")
        }

        // toast({
        //   title: "Success",
        //   description: "Value updated successfully",
        // })
      } else {
        // Add new value
        const response = await fetch("/api/about/values", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to add value")
        }

        // toast({
        //   title: "Success",
        //   description: "Value added successfully",
        // })
      }

      // Refresh the values list
      await fetchValues()

      // Close the dialog
      setIsDialogOpen(false)
    } catch (err: any) {
      console.error("Error saving value:", err)
      setError(err.message || "Failed to save value")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to save value",
    //     variant: "destructive",
    //   })
    }
  }

  const handleDelete = async () => {
    if (!currentValue) return

    try {
      const response = await fetch(`/api/about/values/${currentValue._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete value")
      }

      // Refresh the values list
      await fetchValues()

      // Close the dialog
      setIsDeleteDialogOpen(false)

    //   toast({
    //     title: "Success",
    //     description: "Value deleted successfully",
    //   })
    } catch (err: any) {
      console.error("Error deleting value:", err)
      setError(err.message || "Failed to delete value")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to delete value",
    //     variant: "destructive",
    //   })
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="h-4 w-4" />
      case "shield":
        return <Shield className="h-4 w-4" />
      case "users":
        return <Users className="h-4 w-4" />
      case "star":
        return <Star className="h-4 w-4" />
      case "lightbulb":
        return <Lightbulb className="h-4 w-4" />
      case "target":
        return <Target className="h-4 w-4" />
      case "thumbs-up":
        return <ThumbsUp className="h-4 w-4" />
      case "check":
        return <Check className="h-4 w-4" />
      case "zap":
        return <Zap className="h-4 w-4" />
      default:
        return <Heart className="h-4 w-4" />
    }
  }

  if (loading && values.length === 0) {
    return <div className="flex justify-center p-8">Loading values...</div>
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Company Values</h3>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Value
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[80px]">Color</TableHead>
              <TableHead className="w-[80px]">Order</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {values.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No values found. Add your first company value to get started.
                </TableCell>
              </TableRow>
            ) : (
              values.map((value) => (
                <TableRow key={value._id}>
                  <TableCell>
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: value.color || "#F66526" }}
                    >
                      <div className="text-white">{getIconComponent(value.icon)}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{value.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{value.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color || "#F66526" }}></div>
                      <span className="text-xs">{value.color || "#F66526"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{value.order}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${value.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {value.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(value)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(value)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentValue ? "Edit Value" : "Add Value"}</DialogTitle>
            <DialogDescription>
              {currentValue ? "Update the details of this company value." : "Add a new company value."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heart">Heart</SelectItem>
                    <SelectItem value="shield">Shield</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="star">Star</SelectItem>
                    <SelectItem value="lightbulb">Lightbulb</SelectItem>
                    <SelectItem value="target">Target</SelectItem>
                    <SelectItem value="thumbs-up">Thumbs Up</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="zap">Zap</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color">Color (Hex)</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="#F66526"
                  />
                  <div className="w-10 h-10 rounded-md" style={{ backgroundColor: formData.color }}></div>
                </div>
              </div>

              <div>
                <Label>Value Image</Label>
                <div className="mt-2 flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative h-32 w-48 rounded-md overflow-hidden">
                        <Image
                          src={imagePreview || "/placeholder.svg?height=128&width=192&query=value"}
                          alt="Value image preview"
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
                    <div className="flex h-32 w-48 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-gray-400" />
                        <div className="mt-1 text-xs text-gray-500">No image</div>
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                    <p className="text-xs text-gray-500">
                      Upload an image to represent this value. Recommended size: 800x600px.
                    </p>
                  </div>
                </div>
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

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{currentValue ? "Update Value" : "Add Value"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Value</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentValue?.title}"? This action cannot be undone.
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
