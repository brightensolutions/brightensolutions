"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Calendar, Monitor, Smartphone, Tablet, Search, RefreshCw, Download } from "lucide-react"

interface Visitor {
  _id: string
  visitorId: string
  firstVisit: string
  lastVisit: string
  visitCount: number
  pagesVisited: Array<{
    path: string
    title: string
    visitedAt: string
    timeSpent?: number
  }>
  referrer?: string
  device?: {
    browser: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
    screenResolution: string
  }
  location?: {
    country?: string
    region?: string
    city?: string
    timezone?: string
  }
  contactInfo?: {
    email?: string
    name?: string
    phone?: string
  }
  hasConsent: boolean
  status: "new" | "contacted" | "converted" | "rejected"
}

interface PaginationData {
  total: number
  page: number
  limit: number
  pages: number
}

export default function AdminVisitorsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Get current page from URL or default to 1
  const currentPage = Number.parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    fetchVisitors()
  }, [currentPage, statusFilter])

  const fetchVisitors = async () => {
    try {
      setLoading(true)

      // Build query parameters
      const queryParams = new URLSearchParams()

      if (statusFilter !== "all") {
        queryParams.set("status", statusFilter)
      }

      queryParams.set("page", currentPage.toString())
      queryParams.set("limit", pagination.limit.toString())

      if (searchQuery) {
        queryParams.set("search", searchQuery)
      }

      const response = await fetch(`/api/tracking/visitor?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch visitors")
      }

      const data = await response.json()
      setVisitors(data.visitors)
      setPagination(data.pagination)
    } catch (err: any) {
      console.error("Error fetching visitors:", err)
      setError(err.message || "Failed to load visitors")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    // Reset to first page when filter changes
    router.push("/admin/visitors?page=1")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchVisitors()
  }

  const handlePageChange = (page: number) => {
    router.push(`/admin/dashboard/visitors?page=${page}${statusFilter !== "all" ? `&status=${statusFilter}` : ""}`)
  }

  const handleExportCsv = async () => {
    try {
      const response = await fetch(`/api/tracking/export?status=${statusFilter}`)

      if (!response.ok) {
        throw new Error("Failed to export data")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `visitors-export-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting data:", error)
      alert("Failed to export data. Please try again.")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            New
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Contacted
          </Badge>
        )
      case "converted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Converted
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading && visitors.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>

        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Website Visitors</h1>
        <p className="text-gray-600">
          Track and manage visitors to your website. Contact potential leads and update their status.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Visitors</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search visitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={fetchVisitors}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Visitor List</CardTitle>
          <CardDescription>
            Showing {visitors.length} of {pagination.total} visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No visitors found
                    </TableCell>
                  </TableRow>
                ) : (
                  visitors.map((visitor) => (
                    <TableRow key={visitor._id}>
                      <TableCell>
                        <div className="font-medium">{visitor.contactInfo?.name || "Anonymous Visitor"}</div>
                        <div className="text-sm text-gray-500">
                          {visitor.contactInfo?.email || "No email available"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{formatDate(visitor.lastVisit)}</span>
                        </div>
                        <div className="text-xs text-gray-500">First visit: {formatDate(visitor.firstVisit)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getDeviceIcon(visitor.device?.device || "")}
                          <span className="ml-2">{visitor.device?.device || "Unknown"}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {visitor.device?.browser} {visitor.device?.browserVersion} / {visitor.device?.os}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{visitor.visitCount}</div>
                        <div className="text-xs text-gray-500">{visitor.pagesVisited?.length || 0} pages viewed</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(visitor.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/dashboard/visitors/${visitor._id}`)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {pagination.pages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page and pages around current page
                      return (
                        page === 1 || page === pagination.pages || (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                    })
                    .map((page, i, array) => {
                      // If there's a gap in the sequence, show ellipsis
                      const showEllipsisBefore = i > 0 && array[i - 1] !== page - 1
                      const showEllipsisAfter = i < array.length - 1 && array[i + 1] !== page + 1

                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}

                          <PaginationItem>
                            <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page)}>
                              {page}
                            </PaginationLink>
                          </PaginationItem>

                          {showEllipsisAfter && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                        </React.Fragment>
                      )
                    })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(pagination.pages, currentPage + 1))}
                      className={currentPage === pagination.pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
