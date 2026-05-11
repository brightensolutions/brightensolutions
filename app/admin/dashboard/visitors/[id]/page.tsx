"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

interface Visitor {
  _id: string
  visitorId: string
  firstVisit: string
  lastVisit: string
  visitCount: number
  rawStorageData?: {
    cookies: Record<string, string>
    localStorage: Record<string, string>
    sessionStorage: Record<string, string>
  }
  status: "new" | "contacted" | "converted" | "rejected"
}

export default function VisitorDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [visitor, setVisitor] = useState<Visitor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("raw-data")

  useEffect(() => {
    fetchVisitor()
  }, [params.id])

  const fetchVisitor = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/visitors/${params.id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch visitor")
      }

      const data = await response.json()
      setVisitor(data)
    } catch (err: any) {
      console.error("Error fetching visitor:", err)
      setError(err.message || "Failed to load visitor")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>
      </div>
    )
  }

  if (error || !visitor) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Visitor Details</h1>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || "Failed to load visitor data. Please try again."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Visitor Details{" "}
              <span className="text-gray-400 text-lg font-normal">({visitor.visitorId.substring(0, 8)}...)</span>
            </h1>
            <p className="text-gray-600">
              First seen {formatDate(visitor.firstVisit)} • Last seen {formatDate(visitor.lastVisit)} •{" "}
              {visitor.visitCount} visits
            </p>
          </div>

          <div>
            <Badge
              variant="outline"
              className={
                visitor.status === "new"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : visitor.status === "contacted"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : visitor.status === "converted"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
              }
            >
              {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Overview</CardTitle>
              <CardDescription>Basic information about this visitor</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Visitor ID</dt>
                  <dd>{visitor.visitorId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">First Visit</dt>
                  <dd>{formatDate(visitor.firstVisit)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
                  <dd>{formatDate(visitor.lastVisit)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Visit Count</dt>
                  <dd>{visitor.visitCount}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd>{visitor.status}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw-data">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cookies (Raw Data)</CardTitle>
                <CardDescription>All raw cookie data from the visitor's browser</CardDescription>
              </CardHeader>
              <CardContent>
                {visitor.rawStorageData?.cookies && Object.keys(visitor.rawStorageData.cookies).length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="whitespace-pre-wrap break-all">
                      {JSON.stringify(visitor.rawStorageData.cookies, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500">No cookie data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Storage (Raw Data)</CardTitle>
                <CardDescription>All raw localStorage data from the visitor's browser</CardDescription>
              </CardHeader>
              <CardContent>
                {visitor.rawStorageData?.localStorage && Object.keys(visitor.rawStorageData.localStorage).length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="whitespace-pre-wrap break-all">
                      {JSON.stringify(visitor.rawStorageData.localStorage, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500">No localStorage data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Storage (Raw Data)</CardTitle>
                <CardDescription>All raw sessionStorage data from the visitor's browser</CardDescription>
              </CardHeader>
              <CardContent>
                {visitor.rawStorageData?.sessionStorage &&
                Object.keys(visitor.rawStorageData.sessionStorage).length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="whitespace-pre-wrap break-all">
                      {JSON.stringify(visitor.rawStorageData.sessionStorage, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500">No sessionStorage data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
