"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, Filter, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { BulkUploadButton } from "./bulk-upload-button"

interface ClientInfo {
  _id: string
  clientName: string
  clientCode: string
  contactPerson: string
  contactEmail: string
  domain: {
    name: string
    expiryDate: string
  }
  website: {
    technology: string
    hostingProvider: string
  }
  createdAt: string
  updatedAt: string
}

export default function ClientInfoPage() {
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("clientName")
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalClients, setTotalClients] = useState(0)
  const [expiringFilter, setExpiringFilter] = useState("")

  useEffect(() => {
    fetchClients()
  }, [searchQuery, sortBy, sortOrder, page, limit, expiringFilter])

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)

      let url = `/api/client-info?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`

      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`
      }

      if (expiringFilter) {
        url += `&expiringIn=${expiringFilter}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch clients")
      }

      const data = await response.json()
      setClients(data.clients)
      setTotalPages(data.pagination.pages)
      setTotalClients(data.pagination.total)
    } catch (err: any) {
      console.error("Error fetching clients:", err)
      setError(err.message || "An error occurred while fetching clients")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
    setPage(1) // Reset to first page on sort change
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getDaysUntilExpiry = (expiryDateString: string) => {
    if (!expiryDateString) return null

    const expiryDate = new Date(expiryDateString)
    const today = new Date()

    // Reset time part for accurate day calculation
    expiryDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client Information</h1>
          <p className="text-gray-600">Manage all your client details, credentials, and services</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <BulkUploadButton />
          <Link href="/admin/dashboard/client-info/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Client
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by client name, domain, or code..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={expiringFilter} onValueChange={setExpiringFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Domain Expiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    <SelectItem value="30">Expiring in 30 days</SelectItem>
                    <SelectItem value="60">Expiring in 60 days</SelectItem>
                    <SelectItem value="90">Expiring in 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number.parseInt(value))
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="10 per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("clientName")}>
                    Client Name {sortBy === "clientName" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Technology</TableHead>
                  <TableHead>Hosting</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No clients found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => {
                    const daysUntilExpiry = getDaysUntilExpiry(client.domain.expiryDate)
                    let expiryClass = ""

                    if (daysUntilExpiry !== null) {
                      if (daysUntilExpiry < 0) {
                        expiryClass = "text-red-600 font-medium"
                      } else if (daysUntilExpiry <= 30) {
                        expiryClass = "text-orange-600 font-medium"
                      } else if (daysUntilExpiry <= 60) {
                        expiryClass = "text-yellow-600"
                      }
                    }

                    return (
                      <TableRow key={client._id}>
                        <TableCell className="font-medium">
                          {client.clientName}
                          {client.clientCode && (
                            <span className="text-xs text-gray-500 block">Code: {client.clientCode}</span>
                          )}
                        </TableCell>
                        <TableCell>{client.domain.name}</TableCell>
                        <TableCell className={expiryClass}>
                          {formatDate(client.domain.expiryDate)}
                          {daysUntilExpiry !== null && (
                            <span className="text-xs block">
                              {daysUntilExpiry < 0
                                ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                                : `${daysUntilExpiry} days left`}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{client.website.technology}</TableCell>
                        <TableCell>{client.website.hostingProvider}</TableCell>
                        <TableCell>
                          {client.contactPerson}
                          {client.contactEmail && (
                            <span className="text-xs text-gray-500 block">{client.contactEmail}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/dashboard/client-info/${client._id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <Link href={`/admin/dashboard/client-info/${client._id}`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="py-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first page, last page, current page, and pages around current page
                      return p === 1 || p === totalPages || Math.abs(p - page) <= 1
                    })
                    .map((p, i, arr) => {
                      // Add ellipsis where needed
                      if (i > 0 && arr[i - 1] !== p - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${p}`}>
                            <PaginationItem>
                              <span className="px-4 py-2">...</span>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                                {p}
                              </PaginationLink>
                            </PaginationItem>
                          </React.Fragment>
                        )
                      }
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                      className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="text-center text-sm text-gray-500 mt-2">
                Showing {clients.length} of {totalClients} clients
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
