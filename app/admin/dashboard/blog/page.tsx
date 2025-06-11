"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, Star, StarOff, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  author: {
    name: string
  }
  createdAt: string
  featured: boolean
  isPublished: boolean
  views?: number
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [status, setStatus] = useState("all")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [page, filterCategory, status, sortField, sortDirection])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        status,
        ...(filterCategory && { category: filterCategory }),
        ...(sortField && { sortField }),
        ...(sortDirection && { sortDirection }),
      })

      const response = await fetch(`/api/admin/blog?${queryParams}`)

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts")
      }

      const data = await response.json()
      setPosts(data.posts)
      setTotalPages(data.pagination.pages)
    } catch (err: any) {
      console.error("Error fetching blog posts:", err)
      setError(err.message || "Failed to fetch blog posts")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update post status")
      }

      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? { ...post, isPublished: !currentStatus } : post)),
      )

      // toast({
      //   title: "Success",
      //   description: `Post ${!currentStatus ? "published" : "unpublished"} successfully`,
      // })
    } catch (err: any) {
      console.error("Error updating post status:", err)
      // toast({
      //   title: "Error",
      //   description: err.message || "Failed to update post status",
      //   variant: "destructive",
      // })
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ featured: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update featured status")
      }

      // Update the post in the local state
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? { ...post, featured: !currentStatus } : post)))

      // toast({
      //   title: "Success",
      //   description: `Post ${!currentStatus ? "featured" : "unfeatured"} successfully`,
      // })
    } catch (err: any) {
      console.error("Error updating featured status:", err)
      // toast({
      //   title: "Error",
      //   description: err.message || "Failed to update featured status",
      //   variant: "destructive",
      // })
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      // Remove the post from the local state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))

      // toast({
      //   title: "Success",
      //   description: "Post deleted successfully",
      // })
    } catch (err: any) {
      console.error("Error deleting post:", err)
      // toast({
      //   title: "Error",
      //   description: err.message || "Failed to delete post",
      //   variant: "destructive",
      // })
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (searchTerm === "") return true
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link href="/admin/dashboard/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#F66526] focus:border-[#F66526] appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#F66526] focus:border-[#F66526]"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button onClick={() => handleSort("title")} className="flex items-center gap-1 hover:text-gray-700">
                    Title
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("category")}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Category
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("author.name")}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Author
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Date
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <span>Loading blog posts...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No blog posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <Image
                            src={post.coverImage || "/placeholder.svg?height=40&width=40"}
                            alt={post.title}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePublished(post._id, post.isPublished)}
                          className={`p-1 rounded-full ${
                            post.isPublished ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                          }`}
                          title={post.isPublished ? "Published" : "Draft"}
                        >
                          {post.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(post._id, post.featured)}
                          className={`p-1 rounded-full ${
                            post.featured ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"
                          }`}
                          title={post.featured ? "Featured" : "Not Featured"}
                        >
                          {post.featured ? <Star size={16} /> : <StarOff size={16} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/dashboard/blog/edit/${post._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
