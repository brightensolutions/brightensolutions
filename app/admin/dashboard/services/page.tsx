"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash, Plus, Save, Edit, GripVertical, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"
import ImageUpload from "@/components/image-upload"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

// Define the Service type to match MongoDB structure
interface Service {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  image: string
  featuredProject?: string
  content: string
  isActive: boolean
  sequence?: number
}

// Import the simple editor instead of rich text editor
import SimpleEditor from "@/components/simple-editor"

export default function AdminServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editorKey, setEditorKey] = useState(0) // Add a key to force re-render of editor
  const [isDragging, setIsDragging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services")

      if (!response.ok) {
        throw new Error("Failed to fetch services")
      }

      const data = await response.json()

      // Sort services by sequence if available, otherwise keep original order
      const sortedServices = data.sort((a: Service, b: Service) => {
        if (a.sequence !== undefined && b.sequence !== undefined) {
          return a.sequence - b.sequence
        }
        return 0
      })

      setServices(sortedServices)
    } catch (error) {
      console.error("Error fetching services:", error)
      // Set empty array to avoid undefined errors
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setCurrentService({
      title: "",
      slug: "",
      description: "",
      icon: "Code",
      image: "",
      featuredProject: "",
      content: "",
      isActive: true,
      sequence: services.length > 0 ? Math.max(...services.map((s) => s.sequence || 0)) + 1 : 0,
    })
    setIsEditing(true)
    setEditorKey((prev) => prev + 1) // Force re-render of editor
  }

  const handleEdit = (service: Service) => {
    setCurrentService(service)
    setIsEditing(true)
    setEditorKey((prev) => prev + 1) // Force re-render of editor
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete service")
      }

      fetchServices()
      // toast({
      //   title: "Service deleted",
      //   description: "The service has been deleted successfully.",
      // })
    } catch (error) {
      console.error("Error deleting service:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to delete service. Please try again.",
      //   variant: "destructive",
      // })
    }
  }

  const handleSave = async () => {
    if (!currentService?.title || !currentService?.description) {
      // toast({
      //   title: "Validation Error",
      //   description: "Title and description are required",
      //   variant: "destructive",
      // })
      return
    }

    try {
      setIsSaving(true)

      // Generate slug if not provided
      if (!currentService.slug && currentService.title) {
        currentService.slug = currentService.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      }

      const method = currentService._id ? "PUT" : "POST"
      const url = currentService._id ? `/api/services/${currentService._id}` : "/api/services"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentService),
      })

      if (response.ok) {
        fetchServices()
        setIsEditing(false)
        setCurrentService(null)
        router.refresh()
        // toast({
        //   title: "Success",
        //   description: `Service ${currentService._id ? "updated" : "created"} successfully.`,
        // })
      } else {
        const error = await response.json()
        throw new Error(error.message || "Failed to save service")
      }
    } catch (error: any) {
      console.error("Error saving service:", error)
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to save service",
      //   variant: "destructive",
      // })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentService(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentService((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleContentChange = (content: string) => {
    setCurrentService((prev) => (prev ? { ...prev, content } : null))
  }

  const handleImageChange = (url: string) => {
    setCurrentService((prev) => (prev ? { ...prev, image: url } : null))
  }

  // Handle drag end event
  const handleDragEnd = async (result: any) => {
    setIsDragging(false)

    // If dropped outside the list or no destination
    if (!result.destination) return

    // If position didn't change
    if (result.destination.index === result.source.index) return

    // Reorder the services array
    const reorderedServices = Array.from(services)
    const [removed] = reorderedServices.splice(result.source.index, 1)
    reorderedServices.splice(result.destination.index, 0, removed)

    // Update sequence numbers
    const updatedServices = reorderedServices.map((service, index) => ({
      ...service,
      sequence: index,
    }))

    // Update UI immediately
    setServices(updatedServices)

    // Save the new order to the database
    try {
      // Update each service with its new sequence
      const updatePromises = updatedServices.map((service) =>
        fetch(`/api/services/${service._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sequence: service.sequence }),
        }),
      )

      await Promise.all(updatePromises)

      // toast({
      //   title: "Order updated",
      //   description: "The service order has been updated successfully.",
      // })
    } catch (error) {
      console.error("Error updating service order:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to update service order. Please try again.",
      //   variant: "destructive",
      // })
      // Revert to original order if save fails
      fetchServices()
    }
  }

  // Move service up in the list
  const moveServiceUp = async (index: number) => {
    if (index === 0) return // Already at the top

    const updatedServices = Array.from(services)
    const temp = updatedServices[index]
    updatedServices[index] = updatedServices[index - 1]
    updatedServices[index - 1] = temp

    // Update sequence numbers
    updatedServices.forEach((service, idx) => {
      service.sequence = idx
    })

    setServices(updatedServices)

    // Save the new order
    try {
      const service1 = updatedServices[index - 1]
      const service2 = updatedServices[index]

      await Promise.all([
        fetch(`/api/services/${service1._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sequence: service1.sequence }),
        }),
        fetch(`/api/services/${service2._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sequence: service2.sequence }),
        }),
      ])

      // toast({
      //   title: "Order updated",
      //   description: "Service moved up successfully.",
      // })
    } catch (error) {
      console.error("Error updating service order:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to update service order.",
      //   variant: "destructive",
      // })
      fetchServices()
    }
  }

  // Move service down in the list
  const moveServiceDown = async (index: number) => {
    if (index === services.length - 1) return // Already at the bottom

    const updatedServices = Array.from(services)
    const temp = updatedServices[index]
    updatedServices[index] = updatedServices[index + 1]
    updatedServices[index + 1] = temp

    // Update sequence numbers
    updatedServices.forEach((service, idx) => {
      service.sequence = idx
    })

    setServices(updatedServices)

    // Save the new order
    try {
      const service1 = updatedServices[index]
      const service2 = updatedServices[index + 1]

      await Promise.all([
        fetch(`/api/services/${service1._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sequence: service1.sequence }),
        }),
        fetch(`/api/services/${service2._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sequence: service2.sequence }),
        }),
      ])

      // toast({
      //   title: "Order updated",
      //   description: "Service moved down successfully.",
      // })
    } catch (error) {
      console.error("Error updating service order:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to update service order.",
      //   variant: "destructive",
      // })
      fetchServices()
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brightencolor-brightenone"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        {!isEditing && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{currentService?._id ? "Edit Service" : "Create New Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Title</label>
                  <Input
                    name="title"
                    value={currentService?.title || ""}
                    onChange={handleChange}
                    placeholder="Service Title"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Slug</label>
                  <Input
                    name="slug"
                    value={currentService?.slug || ""}
                    onChange={handleChange}
                    placeholder="service-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Icon</label>
                  <select
                    name="icon"
                    value={currentService?.icon || "Code"}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Code">Code</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="LineChart">Line Chart</option>
                    <option value="Globe">Globe</option>
                    <option value="Palette">Palette</option>
                    <option value="Search">Search</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Status</label>
                  <select
                    name="isActive"
                    value={currentService?.isActive ? "true" : "false"}
                    onChange={(e) =>
                      setCurrentService((prev) => (prev ? { ...prev, isActive: e.target.value === "true" } : null))
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={currentService?.description || ""}
                  onChange={handleChange}
                  placeholder="Service Description"
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Service Image</label>
                <ImageUpload
                  value={currentService?.image || ""}
                  onChange={handleImageChange}
                  folder="brightensolution/services"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Featured Project</label>
                <Input
                  name="featuredProject"
                  value={currentService?.featuredProject || ""}
                  onChange={handleChange}
                  placeholder="Featured Project Name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Content</label>
                <div key={editorKey}>
                  <SimpleEditor value={currentService?.content || ""} onChange={handleContentChange} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Service
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}>
          <Droppable droppableId="services">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {services.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-gray-500">No services found. Create your first service!</p>
                  </div>
                ) : (
                  services.map((service, index) => (
                    <Draggable key={service._id} draggableId={service._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`transition-all duration-200 ${
                            snapshot.isDragging ? "scale-105 shadow-2xl z-50" : ""
                          }`}
                        >
                          <Card className="overflow-hidden">
                            <div className="relative h-40 w-full">
                              <div className="absolute inset-0 bg-brightencolor-brightenone">
                                {service.image && (
                                  <Image
                                    src={service.image || "/placeholder.svg?height=400&width=600&query=service"}
                                    alt={service.title}
                                    fill
                                    className="object-cover opacity-50"
                                  />
                                )}
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                              </div>
                              <div
                                {...provided.dragHandleProps}
                                className="absolute top-2 left-2 p-2 bg-white/20 backdrop-blur-sm rounded-full cursor-grab active:cursor-grabbing"
                                title="Drag to reorder"
                              >
                                <GripVertical className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="mb-4 line-clamp-2 text-gray-600">{service.description}</p>
                              <div className="flex flex-wrap gap-2 justify-between">
                                <div className="flex gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => moveServiceUp(index)}
                                    disabled={index === 0}
                                    className="px-2"
                                    title="Move up"
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => moveServiceDown(index)}
                                    disabled={index === services.length - 1}
                                    className="px-2"
                                    title="Move down"
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" onClick={() => handleEdit(service)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleDelete(service._id)}>
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

     
    </div>
  )
}
