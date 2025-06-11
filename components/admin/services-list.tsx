"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Eye } from "lucide-react"

interface Service {
  _id: string
  title: string
  slug: string
  description: string
  image: string
  isActive: boolean
  createdAt: string
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/services")

        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }

        const data = await response.json()
        setServices(data || [])
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("Error loading services. Please try again later.")
        // Set empty array to avoid undefined errors
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete service")
      }

      // Remove the deleted service from the state
      setServices(services.filter((service) => service._id !== id))
    } catch (err) {
      alert("Error deleting service. Please try again.")
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brightencolor-brightenone"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No services found</p>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brightencolor-brightenone text-white rounded-md hover:bg-brightencolor-brightenone/90 transition-colors"
        >
          Add Your First Service
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="relative h-12 w-12 rounded overflow-hidden">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
              </td>
              <td className="py-3 px-4 font-medium">{service.title}</td>
              <td className="py-3 px-4 truncate max-w-xs">{service.description}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <Link href={`/services/${service.slug}`} className="text-gray-500 hover:text-gray-700" title="View">
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/services/edit/${service._id}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
