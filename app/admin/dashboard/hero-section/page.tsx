"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2, Plus, Save, ImageIcon, X, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

// Define types for the hero section data
interface SocialLink {
  platform: string
  url: string
  order: number
  _id?: string
}

interface Service {
  text: string
  order: number
  _id?: string
}

interface ClientLogo {
  name: string
  logoUrl: string
  order: number
  _id?: string
}

interface ClientSection {
  title: string
  enabled: boolean
}

interface HeroSectionData {
  _id?: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  heroImage: string
  services: Service[]
  socialLinks: SocialLink[]
  clientSection: ClientSection
  clientLogos: ClientLogo[]
  isActive: boolean
}

export default function HeroSectionAdmin() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroData, setHeroData] = useState<HeroSectionData>({
    title: "",
    description: "",
    buttonText: "Start exploring",
    buttonLink: "/services",
    heroImage: "",
    services: [],
    socialLinks: [],
    clientSection: {
      title: "WHO WE WORK WITH",
      enabled: true,
    },
    clientLogos: [],
    isActive: true,
  })
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)
  const [newService, setNewService] = useState("")
  const [newSocialPlatform, setNewSocialPlatform] = useState("instagram")
  const [newSocialUrl, setNewSocialUrl] = useState("")
  const [newClientName, setNewClientName] = useState("")
  const [newClientLogo, setNewClientLogo] = useState<File | null>(null)
  const [previewClientLogo, setPreviewClientLogo] = useState("")

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const token = localStorage.getItem("brightensolutionadmin")
        if (!token) {
          router.push("/admin/login")
          return
        }

        const response = await fetch("/api/admin/hero-section", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const result = await response.json()

        if (result.success) {
          setHeroData(result.data)
        } else {
          toast.error(result.error || "Failed to fetch hero section data")
        }
      } catch (err) {
        toast.error("An error occurred while fetching hero section data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [router])

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem("brightensolutionadmin")

      if (!token) {
        router.push("/admin/login")
        return
      }

      const method = heroData._id ? "PUT" : "POST"
      const url = "/api/admin/hero-section"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(heroData._id ? { id: heroData._id, ...heroData } : heroData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Hero section saved successfully")
        setHeroData(result.data)
      } else {
        toast.error(result.error || "Failed to save hero section")
      }
    } catch (err) {
      toast.error("An error occurred while saving hero section")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  // Handle image upload
  const handleImageUpload = async (file: File, type: string, index?: number) => {
    try {
      setUploadingImage(type)
      const token = localStorage.getItem("brightensolutionadmin")

      if (!token) {
        router.push("/admin/login")
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "brightensolution")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        if (type === "heroImage") {
          setHeroData({ ...heroData, heroImage: result.data.url })
        } else if (type === "clientLogo" && typeof index === "number") {
          const updatedLogos = [...heroData.clientLogos]
          updatedLogos[index].logoUrl = result.data.url
          setHeroData({ ...heroData, clientLogos: updatedLogos })
        }
        toast.success("Image uploaded successfully")
      } else {
        toast.error(result.error || "Failed to upload image")
      }
    } catch (err) {
      toast.error("An error occurred while uploading image")
      console.error(err)
    } finally {
      setUploadingImage(null)
    }
  }

  // Add new service
  const addService = () => {
    if (!newService.trim()) return

    const updatedServices = [...heroData.services]
    updatedServices.push({
      text: newService,
      order: updatedServices.length,
    })

    setHeroData({ ...heroData, services: updatedServices })
    setNewService("")
  }

  // Remove service
  const removeService = (index: number) => {
    const updatedServices = [...heroData.services]
    updatedServices.splice(index, 1)

    // Update order
    updatedServices.forEach((service, i) => {
      service.order = i
    })

    setHeroData({ ...heroData, services: updatedServices })
  }

  // Add new social link
  const addSocialLink = () => {
    if (!newSocialUrl.trim()) return

    const updatedSocialLinks = [...heroData.socialLinks]
    updatedSocialLinks.push({
      platform: newSocialPlatform,
      url: newSocialUrl,
      order: updatedSocialLinks.length,
    })

    setHeroData({ ...heroData, socialLinks: updatedSocialLinks })
    setNewSocialUrl("")
  }

  // Remove social link
  const removeSocialLink = (index: number) => {
    const updatedSocialLinks = [...heroData.socialLinks]
    updatedSocialLinks.splice(index, 1)

    // Update order
    updatedSocialLinks.forEach((link, i) => {
      link.order = i
    })

    setHeroData({ ...heroData, socialLinks: updatedSocialLinks })
  }

  // Add new client logo
  const addClientLogo = async () => {
    if (!newClientName.trim() || !newClientLogo) return

    try {
      setUploadingImage("newClientLogo")
      const token = localStorage.getItem("brightensolutionadmin")

      if (!token) {
        router.push("/admin/login")
        return
      }

      const formData = new FormData()
      formData.append("file", newClientLogo)
      formData.append("folder", "brightensolution/client-logos")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        const updatedClientLogos = [...heroData.clientLogos]
        updatedClientLogos.push({
          name: newClientName,
          logoUrl: result.data.url,
          order: updatedClientLogos.length,
        })

        setHeroData({ ...heroData, clientLogos: updatedClientLogos })
        setNewClientName("")
        setNewClientLogo(null)
        setPreviewClientLogo("")
        toast.success("Client logo added successfully")
      } else {
        toast.error(result.error || "Failed to upload client logo")
      }
    } catch (err) {
      toast.error("An error occurred while adding client logo")
      console.error(err)
    } finally {
      setUploadingImage(null)
    }
  }

  // Remove client logo
  const removeClientLogo = (index: number) => {
    const updatedClientLogos = [...heroData.clientLogos]
    updatedClientLogos.splice(index, 1)

    // Update order
    updatedClientLogos.forEach((logo, i) => {
      logo.order = i
    })

    setHeroData({ ...heroData, clientLogos: updatedClientLogos })
  }

  // Handle client logo file selection
  const handleClientLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewClientLogo(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewClientLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Move item up or down in order
  const moveItem = (type: "services" | "socialLinks" | "clientLogos", index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === heroData[type].length - 1)) {
      return
    }

    const items = [...heroData[type]]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap items
    const temp = items[index]
    items[index] = items[newIndex]
    items[newIndex] = temp

    // Update order
    items.forEach((item, i) => {
      item.order = i
    })

    setHeroData({ ...heroData, [type]: items })
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid gap-6">
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hero Section Management</h1>
        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-brightencolor-brightenone hover:bg-brightencolor-brightentwo"
        >
          {saving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="clients">Client Logos</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the main content of your hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  placeholder="Enter title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={heroData.description}
                  onChange={(e:any) => setHeroData({ ...heroData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={heroData.buttonText}
                    onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                    placeholder="Enter button text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={heroData.buttonLink}
                    onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
                    placeholder="Enter button link"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image</Label>
                <div className="flex items-center gap-4">
                  <div className="border rounded-md p-2 w-32 h-32 flex items-center justify-center overflow-hidden">
                    {heroData.heroImage ? (
                      <img
                        src={heroData.heroImage || "/placeholder.svg"}
                        alt="Hero"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="text-gray-400" />
                    )}
                  </div>

                  <div>
                    <Input
                      id="heroImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], "heroImage")
                        }
                      }}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 800x800px</p>
                  </div>

                  {uploadingImage === "heroImage" && <Skeleton className="h-8 w-8 rounded-full animate-spin" />}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={heroData.isActive}
                  onCheckedChange={(checked:any) => setHeroData({ ...heroData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage the rotating services text in the hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {heroData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={service.text}
                      onChange={(e) => {
                        const updatedServices = [...heroData.services]
                        updatedServices[index].text = e.target.value
                        setHeroData({ ...heroData, services: updatedServices })
                      }}
                    />
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveItem("services", index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpDown className="h-4 w-4 rotate-90" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveItem("services", index, "down")}
                        disabled={index === heroData.services.length - 1}
                      >
                        <ArrowUpDown className="h-4 w-4 -rotate-90" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => removeService(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Add new service"
                />
                <Button onClick={addService}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Manage social media links in the hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {heroData.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={social.platform}
                      onChange={(e) => {
                        const updatedSocialLinks = [...heroData.socialLinks]
                        updatedSocialLinks[index].platform = e.target.value
                        setHeroData({ ...heroData, socialLinks: updatedSocialLinks })
                      }}
                      className="border rounded-md px-3 py-2 w-1/4"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="twitter">Twitter</option>
                      <option value="youtube">YouTube</option>
                    </select>
                    <Input
                      value={social.url}
                      onChange={(e) => {
                        const updatedSocialLinks = [...heroData.socialLinks]
                        updatedSocialLinks[index].url = e.target.value
                        setHeroData({ ...heroData, socialLinks: updatedSocialLinks })
                      }}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveItem("socialLinks", index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpDown className="h-4 w-4 rotate-90" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveItem("socialLinks", index, "down")}
                        disabled={index === heroData.socialLinks.length - 1}
                      >
                        <ArrowUpDown className="h-4 w-4 -rotate-90" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => removeSocialLink(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <select
                  value={newSocialPlatform}
                  onChange={(e) => setNewSocialPlatform(e.target.value)}
                  className="border rounded-md px-3 py-2 w-1/4"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="twitter">Twitter</option>
                  <option value="youtube">YouTube</option>
                </select>
                <Input
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  placeholder="Enter URL"
                  className="flex-1"
                />
                <Button onClick={addSocialLink}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client Logos Tab */}
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Client Logos</CardTitle>
              <CardDescription>Manage client logos in the hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="clientSectionEnabled"
                  checked={heroData.clientSection.enabled}
                  onCheckedChange={(checked:any) =>
                    setHeroData({
                      ...heroData,
                      clientSection: {
                        ...heroData.clientSection,
                        enabled: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="clientSectionEnabled">Show Client Section</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientSectionTitle">Section Title</Label>
                <Input
                  id="clientSectionTitle"
                  value={heroData.clientSection.title}
                  onChange={(e) =>
                    setHeroData({
                      ...heroData,
                      clientSection: {
                        ...heroData.clientSection,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter section title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {heroData.clientLogos.map((client, index) => (
                  <div key={index} className="border rounded-md p-4 relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeClientLogo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-20 flex items-center justify-center">
                        <img
                          src={client.logoUrl || "/placeholder.svg"}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <Input
                        value={client.name}
                        onChange={(e) => {
                          const updatedClientLogos = [...heroData.clientLogos]
                          updatedClientLogos[index].name = e.target.value
                          setHeroData({ ...heroData, clientLogos: updatedClientLogos })
                        }}
                        placeholder="Client name"
                        className="mt-2"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveItem("clientLogos", index, "up")}
                          disabled={index === 0}
                        >
                          Move Up
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveItem("clientLogos", index, "down")}
                          disabled={index === heroData.clientLogos.length - 1}
                        >
                          Move Down
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newClientName">Client Name</Label>
                      <Input
                        id="newClientName"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        placeholder="Enter client name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newClientLogo">Client Logo</Label>
                      <Input id="newClientLogo" type="file" accept="image/*" onChange={handleClientLogoChange} />

                      {previewClientLogo && (
                        <div className="mt-2 border rounded-md p-2 w-32 h-32 flex items-center justify-center">
                          <img
                            src={previewClientLogo || "/placeholder.svg"}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={addClientLogo}
                    disabled={!newClientName || !newClientLogo || uploadingImage === "newClientLogo"}
                    className="bg-brightencolor-brightenone hover:bg-brightencolor-brightentwo"
                  >
                    {uploadingImage === "newClientLogo" ? "Uploading..." : "Add Client"}
                    <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
