"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash, Plus, Edit, Star, Clock } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  _id: string
  title: string
  slug: string
  shortDescription: string
  image: string
  popular: boolean
  comingSoon: boolean
  isActive: boolean
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error deleting product. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-16 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={() => router.push("/admin/dashboard/products/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">No products found. Create your first product!</p>
          </div>
        ) : (
          products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600">
                  {product.image && (
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=600&query=product"}
                      alt={product.title}
                      fill
                      className="object-cover opacity-75"
                      unoptimized={true}
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  {product.popular && (
                    <Badge className="bg-amber-500">
                      <Star className="mr-1 h-3 w-3" /> Popular
                    </Badge>
                  )}
                  {product.comingSoon && (
                    <Badge variant="outline" className="bg-gray-800 text-white border-gray-700">
                      <Clock className="mr-1 h-3 w-3" /> Coming Soon
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <p className="mb-4 line-clamp-2 text-gray-600">{product.shortDescription}</p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push(`/admin/dashboard/products/edit/${product._id}`)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(product._id)}>
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
