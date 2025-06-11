"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash, Plus, Edit } from "lucide-react"
import Image from "next/image"

interface PortfolioItem {
  _id: string
  title: string
  description: string
  category: string[]
  image: string
  technologies: string[]
  liveUrl?: string
  codeUrl?: string
  featured?: boolean
  color?: string
  logo?: string
  isActive: boolean
}

export default function AdminPortfolioPage() {
  const router = useRouter()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/portfolio")

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio items")
      }

      const data = await response.json()
      setPortfolioItems(data)
    } catch (error) {
      console.error("Error fetching portfolio items:", error)
      setError("Failed to load portfolio items")
      setPortfolioItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete portfolio item")
      }

      fetchPortfolioItems()
    } catch (error) {
      console.error("Error deleting portfolio item:", error)
      alert("Error deleting portfolio item. Please try again.")
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
        <h1 className="text-3xl font-bold">Manage Portfolio</h1>
        <Button onClick={() => router.push("/admin/dashboard/portfolio/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">No portfolio items found. Create your first project!</p>
          </div>
        ) : (
          portfolioItems.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <div className="absolute inset-0" style={{ backgroundColor: item.color || "#F66526" }}>
                  {item.image && (
                    <Image
                      src={item.image || "/placeholder.svg?height=400&width=600&query=project"}
                      alt={item.title}
                      fill
                      className="object-cover opacity-50"
                      unoptimized={true}
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="mb-2 line-clamp-2 text-gray-600">{item.description}</p>
                <div className="mb-4 flex flex-wrap gap-1">
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      +{item.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push(`/admin/dashboard/portfolio/edit/${item._id}`)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(item._id)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
