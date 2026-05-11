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
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"
// import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  _id: string
  name: string
  position: string
  education: string
  email: string
  idCard?: string
  department: string
  image: string
  bio: string
  social: {
    linkedin: string
    twitter: string
  }
  order: number
  isActive: boolean
}

export default function TeamMembersAdmin() {
//   const { toast } = useToast()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    education: "",
    email: "",
    idCard: "",
    department: "leadership",
    image: "",
    bio: "",
    social: {
      linkedin: "",
      twitter: "",
    },
    order: 0,
    isActive: true,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/about/team")

      if (!response.ok) {
        throw new Error("Failed to fetch team members")
      }

      const data = await response.json()
      setTeamMembers(data)
    } catch (err: any) {
      console.error("Error fetching team members:", err)
      setError(err.message || "Failed to load team members")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("social.")) {
      const socialField = name.split(".")[1]
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
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
    setCurrentMember(null)
    setFormData({
      name: "",
      position: "",
      education: "",
      email: "",
      idCard: `BS-${String(teamMembers.length + 1).padStart(3, "0")}`,
      department: "leadership",
      image: "",
      bio: "",
      social: {
        linkedin: "",
        twitter: "",
      },
      order: teamMembers.length,
      isActive: true,
    })
    setImagePreview(null)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (member: TeamMember) => {
    setCurrentMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      education: member.education || "",
      email: member.email || "",
      idCard: member.idCard || "",
      department: member.department,
      image: member.image,
      bio: member.bio,
      social: {
        linkedin: member.social?.linkedin || "",
        twitter: member.social?.twitter || "",
      },
      order: member.order,
      isActive: member.isActive,
    })
    setImagePreview(member.image)
    setImageFile(null)
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (member: TeamMember) => {
    setCurrentMember(member)
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
        uploadFormData.append("folder", "team-members")

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
      }

      // Prepare the data to send
      const dataToSend = {
        ...formData,
        image: imageUrl,
      }

      // Determine if we're adding or updating
      if (currentMember) {
        // Update existing team member
        const response = await fetch(`/api/about/team/${currentMember._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to update team member")
        }

        // toast({
        //   title: "Success",
        //   description: "Team member updated successfully",
        // })
      } else {
        // Add new team member
        const response = await fetch("/api/about/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to add team member")
        }

        // toast({
        //   title: "Success",
        //   description: "Team member added successfully",
        // })
      }

      // Refresh the team members list
      await fetchTeamMembers()

      // Close the dialog
      setIsDialogOpen(false)
    } catch (err: any) {
      console.error("Error saving team member:", err)
      setError(err.message || "Failed to save team member")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to save team member",
    //     variant: "destructive",
    //   })
    }
  }

  const handleDelete = async () => {
    if (!currentMember) return

    try {
      const response = await fetch(`/api/about/team/${currentMember._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete team member")
      }

      // Refresh the team members list
      await fetchTeamMembers()

      // Close the dialog
      setIsDeleteDialogOpen(false)

    //   toast({
    //     title: "Success",
    //     description: "Team member deleted successfully",
    //   })
    } catch (err: any) {
      console.error("Error deleting team member:", err)
      setError(err.message || "Failed to delete team member")
    //   toast({
    //     title: "Error",
    //     description: err.message || "Failed to delete team member",
    //     variant: "destructive",
    //   })
    }
  }

  if (loading && teamMembers.length === 0) {
    return <div className="flex justify-center p-8">Loading team members...</div>
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Team Member
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No team members found. Add your first team member to get started.
                </TableCell>
              </TableRow>
            ) : (
              teamMembers.map((member) => (
                <TableRow key={member._id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg?height=40&width=40&query=person"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.education || "N/A"}</TableCell>
                  <TableCell>{member.email || "N/A"}</TableCell>
                  <TableCell>
                    <span className="capitalize">{member.department}</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(member)}>
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
            <DialogTitle>{currentMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>
              {currentMember ? "Update the details of this team member." : "Add a new team member to your about page."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. MBA, Harvard Business School"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="idCard">ID Card Number</Label>
                  <Input
                    id="idCard"
                    name="idCard"
                    value={formData.idCard}
                    onChange={handleInputChange}
                    placeholder="e.g. BS-001"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} required />
                </div>

                <div>
                  <Label htmlFor="social.linkedin">LinkedIn URL</Label>
                  <Input
                    id="social.linkedin"
                    name="social.linkedin"
                    value={formData.social.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <Label htmlFor="social.twitter">Twitter URL</Label>
                  <Input
                    id="social.twitter"
                    name="social.twitter"
                    value={formData.social.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                  />
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

              <div className="col-span-1 md:col-span-2">
                <Label>Profile Image</Label>
                <div className="mt-2 flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative h-32 w-32 rounded-full overflow-hidden">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Profile preview"
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
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50">
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-gray-400" />
                        <div className="mt-1 text-xs text-gray-500">No image</div>
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                    <p className="text-xs text-gray-500">
                      Upload a square image (1:1 ratio) for best results. Maximum size: 2MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{currentMember ? "Update Team Member" : "Add Team Member"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentMember?.name}? This action cannot be undone.
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
