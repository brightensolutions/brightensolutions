"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Globe,
  Calendar,
  Server,
  Mail,
  User,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Info,
  FileText,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"

export default function ClientInfoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchClient()
  }, [])

  const fetchClient = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/client-info/${params.id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch client information")
      }

      const data = await response.json()
      setClient(data)
    } catch (err: any) {
      console.error("Error fetching client:", err)
      setError(err.message || "An error occurred while fetching the client information")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/client-info/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete client")
      }

      router.push("/admin/dashboard/client-info")
    } catch (error) {
      console.error("Error deleting client:", error)
      alert("Failed to delete client. Please try again.")
    }
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const getDomainExpiryStatus = (expiryDate: string) => {
    const daysRemaining = differenceInDays(new Date(expiryDate), new Date())

    if (daysRemaining < 0) {
      return {
        status: "expired",
        badge: "bg-red-50 text-red-700 border-red-200",
        icon: <XCircle className="h-5 w-5 text-red-500 mr-2" />,
        message: `Expired ${Math.abs(daysRemaining)} days ago`,
      }
    } else if (daysRemaining < 30) {
      return {
        status: "expiring-soon",
        badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />,
        message: `Expires in ${daysRemaining} days`,
      }
    } else {
      return {
        status: "active",
        badge: "bg-green-50 text-green-700 border-green-200",
        icon: <CheckCircle className="h-5 w-5 text-green-500 mr-2" />,
        message: `Active for ${daysRemaining} more days`,
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
          </Button>
          <h1 className="text-3xl font-bold mb-2">Error</h1>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || "Failed to load client information"}</p>
        </div>
      </div>
    )
  }

  const domainExpiryStatus = getDomainExpiryStatus(client.domain.expiryDate)

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">{client.clientName}</h1>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">{client.domain.name}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/admin/client-info/${params.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="google">Google Workspace</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="additional">Additional Services</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.clientName}</dd>
                  </div>

                  {client.clientCode && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Client Code</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.clientCode}</dd>
                    </div>
                  )}

                  {client.contactPerson && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.contactPerson}</dd>
                    </div>
                  )}

                  {client.contactEmail && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`mailto:${client.contactEmail}`} className="text-blue-600 hover:underline">
                          {client.contactEmail}
                        </a>
                      </dd>
                    </div>
                  )}

                  {client.contactPhone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`tel:${client.contactPhone}`} className="text-blue-600 hover:underline">
                          {client.contactPhone}
                        </a>
                      </dd>
                    </div>
                  )}

                  {client.notes && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Notes</dt>
                      <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{client.notes}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Domain Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  {domainExpiryStatus.icon}
                  <span className="text-lg font-medium">{domainExpiryStatus.message}</span>
                </div>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Domain Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.domain.name}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {format(new Date(client.domain.expiryDate), "MMMM d, yyyy")}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Auto Renewal</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {client.domain.autoRenewal ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          Disabled
                        </Badge>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Purchase Platform</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.domain.purchasePlatform}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Login URL</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a
                        href={client.domain.loginUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {client.domain.loginUrl}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Website Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Technology</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.website.technology}</dd>
                  </div>

                  {client.website.framework && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Framework</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.website.framework}</dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Hosting Provider</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.website.hostingProvider}</dd>
                  </div>

                  {client.website.serverType && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Server Type</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.website.serverType}</dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Server URL</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a
                        href={client.website.serverUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {client.website.serverUrl}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {client.googleWorkspace?.emailAccounts?.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      {client.googleWorkspace.emailAccounts.length} email accounts configured
                    </p>

                    <ul className="space-y-2">
                      {client.googleWorkspace.emailAccounts.map((account: any, index: number) => (
                        <li key={index} className="text-sm">
                          <a href={`mailto:${account.emailAddress}`} className="text-blue-600 hover:underline">
                            {account.emailAddress}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {client.googleWorkspace.adminEmail && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mt-4">Admin Email</p>
                        <p className="text-sm text-gray-900">{client.googleWorkspace.adminEmail}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No email accounts configured</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Domain Tab */}
        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Domain Information
              </CardTitle>
              <CardDescription>Complete domain registration details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Domain Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Domain Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.domain.name}</dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Purchase Platform</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.domain.purchasePlatform}</dd>
                    </div>

                    {client.domain.registrar && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Registrar</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.domain.registrar}</dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {format(new Date(client.domain.expiryDate), "MMMM d, yyyy")}
                        <Badge variant="outline" className={`ml-2 ${domainExpiryStatus.badge}`}>
                          {domainExpiryStatus.status === "expired"
                            ? "Expired"
                            : domainExpiryStatus.status === "expiring-soon"
                              ? "Expiring Soon"
                              : "Active"}
                        </Badge>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Auto Renewal</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {client.domain.autoRenewal ? "Enabled" : "Disabled"}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Login URL</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a
                          href={client.domain.loginUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {client.domain.loginUrl}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Login Credentials</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Username</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.domain.username}</dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Password</dt>
                      <dd className="mt-1 text-sm flex items-center">
                        <span className="text-sm text-gray-900">
                          {showPassword.domainPassword ? client.domain.password : "••••••••••••"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePasswordVisibility("domainPassword")}
                          className="ml-2 h-6 px-2"
                        >
                          {showPassword.domainPassword ? (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" /> Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" /> Show
                            </>
                          )}
                        </Button>
                      </dd>
                    </div>

                    {client.domain.notes && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Notes</dt>
                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{client.domain.notes}</dd>
                      </div>
                    )}

                    {client.domain.nameservers && client.domain.nameservers.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Nameservers</dt>
                        <dd className="mt-1">
                          <ul className="list-disc pl-5 space-y-1">
                            {client.domain.nameservers.map((ns: string, index: number) => (
                              <li key={index} className="text-sm text-gray-900">
                                {ns}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {client.domain.dnsRecords && client.domain.dnsRecords.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">DNS Records</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Value
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TTL
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {client.domain.dnsRecords.map((record: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {record.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 break-all">{record.value}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.ttl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Google Workspace Tab */}
        <TabsContent value="google">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Google Workspace
              </CardTitle>
              <CardDescription>Email accounts and Google Workspace details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Workspace Details</h3>
                  <dl className="space-y-4">
                    {client.googleWorkspace?.subscriptionType && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Subscription Type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.googleWorkspace.subscriptionType}</dd>
                      </div>
                    )}

                    {client.googleWorkspace?.adminEmail && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Admin Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={`mailto:${client.googleWorkspace.adminEmail}`}
                            className="text-blue-600 hover:underline"
                          >
                            {client.googleWorkspace.adminEmail}
                          </a>
                        </dd>
                      </div>
                    )}

                    {client.googleWorkspace?.adminPassword && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Admin Password</dt>
                        <dd className="mt-1 text-sm flex items-center">
                          <span className="text-sm text-gray-900">
                            {showPassword.adminPassword ? client.googleWorkspace.adminPassword : "••••••••••••"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePasswordVisibility("adminPassword")}
                            className="ml-2 h-6 px-2"
                          >
                            {showPassword.adminPassword ? (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" /> Hide
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 mr-1" /> Show
                              </>
                            )}
                          </Button>
                        </dd>
                      </div>
                    )}

                    {client.googleWorkspace?.adminConsoleUrl && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Admin Console URL</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={client.googleWorkspace.adminConsoleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            {client.googleWorkspace.adminConsoleUrl}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </dd>
                      </div>
                    )}

                    {client.googleWorkspace?.billingEmail && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Billing Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={`mailto:${client.googleWorkspace.billingEmail}`}
                            className="text-blue-600 hover:underline"
                          >
                            {client.googleWorkspace.billingEmail}
                          </a>
                        </dd>
                      </div>
                    )}

                    {client.googleWorkspace?.renewalDate && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Renewal Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {format(new Date(client.googleWorkspace.renewalDate), "MMMM d, yyyy")}
                        </dd>
                      </div>
                    )}

                    {client.googleWorkspace?.notes && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Notes</dt>
                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                          {client.googleWorkspace.notes}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Email Accounts</h3>
                  {client.googleWorkspace?.emailAccounts?.length > 0 ? (
                    <div className="space-y-6">
                      {client.googleWorkspace.emailAccounts.map((account: any, index: number) => (
                        <div key={index} className="border rounded-md p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">{account.emailAddress}</h4>
                            {account.isAdmin && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Admin
                              </Badge>
                            )}
                          </div>

                          <dl className="space-y-2">
                            {account.displayName && (
                              <div className="grid grid-cols-3">
                                <dt className="text-xs font-medium text-gray-500">Display Name</dt>
                                <dd className="text-xs text-gray-900 col-span-2">{account.displayName}</dd>
                              </div>
                            )}

                            <div className="grid grid-cols-3">
                              <dt className="text-xs font-medium text-gray-500">Password</dt>
                              <dd className="text-xs text-gray-900 col-span-2 flex items-center">
                                <span>
                                  {showPassword[`email_${index}`] ? account.password : "••••••••••••"}? account.password
                                  : "••••••••••••"}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(`email_${index}`)}
                                  className="ml-2 h-5 px-1"
                                >
                                  {showPassword[`email_${index}`] ? (
                                    <>
                                      <EyeOff className="h-3 w-3 mr-1" /> Hide
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3 w-3 mr-1" /> Show
                                    </>
                                  )}
                                </Button>
                              </dd>
                            </div>

                            {account.recoveryEmail && (
                              <div className="grid grid-cols-3">
                                <dt className="text-xs font-medium text-gray-500">Recovery Email</dt>
                                <dd className="text-xs text-gray-900 col-span-2">{account.recoveryEmail}</dd>
                              </div>
                            )}

                            {account.department && (
                              <div className="grid grid-cols-3">
                                <dt className="text-xs font-medium text-gray-500">Department</dt>
                                <dd className="text-xs text-gray-900 col-span-2">{account.department}</dd>
                              </div>
                            )}

                            {account.notes && (
                              <div className="grid grid-cols-3">
                                <dt className="text-xs font-medium text-gray-500">Notes</dt>
                                <dd className="text-xs text-gray-900 col-span-2 whitespace-pre-wrap">
                                  {account.notes}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No email accounts configured</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Tab */}
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Website Information
              </CardTitle>
              <CardDescription>Website technology and hosting details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Technology Stack</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Technology</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.website.technology}</dd>
                    </div>

                    {client.website.framework && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Framework</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.framework}</dd>
                      </div>
                    )}

                    {client.website.cms && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">CMS</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.cms}</dd>
                      </div>
                    )}

                    {client.website.database && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Database</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.database}</dd>
                      </div>
                    )}

                    {client.website.plugins && client.website.plugins.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Plugins/Extensions</dt>
                        <dd className="mt-1">
                          <ul className="list-disc pl-5 space-y-1">
                            {client.website.plugins.map((plugin: string, index: number) => (
                              <li key={index} className="text-sm text-gray-900">
                                {plugin}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}

                    {client.website.repositoryUrl && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Repository URL</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={client.website.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            {client.website.repositoryUrl}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Hosting Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Hosting Provider</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.website.hostingProvider}</dd>
                    </div>

                    {client.website.serverType && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Server Type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.serverType}</dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Server URL</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a
                          href={client.website.serverUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {client.website.serverUrl}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Username</dt>
                      <dd className="mt-1 text-sm text-gray-900">{client.website.username}</dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500">Password</dt>
                      <dd className="mt-1 text-sm flex items-center">
                        <span className="text-sm text-gray-900">
                          {showPassword.serverPassword ? client.website.password : "••••••••••••"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePasswordVisibility("serverPassword")}
                          className="ml-2 h-6 px-2"
                        >
                          {showPassword.serverPassword ? (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" /> Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" /> Show
                            </>
                          )}
                        </Button>
                      </dd>
                    </div>

                    {client.website.ftpHost && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">FTP Host</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.ftpHost}</dd>
                      </div>
                    )}

                    {client.website.ftpUsername && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">FTP Username</dt>
                        <dd className="mt-1 text-sm text-gray-900">{client.website.ftpUsername}</dd>
                      </div>
                    )}

                    {client.website.ftpPassword && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">FTP Password</dt>
                        <dd className="mt-1 text-sm flex items-center">
                          <span className="text-sm text-gray-900">
                            {showPassword.ftpPassword ? client.website.ftpPassword : "••••••••••••"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePasswordVisibility("ftpPassword")}
                            className="ml-2 h-6 px-2"
                          >
                            {showPassword.ftpPassword ? (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" /> Hide
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 mr-1" /> Show
                              </>
                            )}
                          </Button>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {client.website.notes && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{client.website.notes}</p>
                  </div>
                </div>
              )}

              {client.website.maintenanceInfo && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Maintenance Information</h3>
                  <dl className="space-y-4">
                    {client.website.maintenanceInfo.lastUpdate && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Last Update</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {format(new Date(client.website.maintenanceInfo.lastUpdate), "MMMM d, yyyy")}
                        </dd>
                      </div>
                    )}

                    {client.website.maintenanceInfo.nextScheduled && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Next Scheduled Maintenance</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {format(new Date(client.website.maintenanceInfo.nextScheduled), "MMMM d, yyyy")}
                        </dd>
                      </div>
                    )}

                    {client.website.maintenanceInfo.notes && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Maintenance Notes</dt>
                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                          {client.website.maintenanceInfo.notes}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Services Tab */}
        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Additional Services
              </CardTitle>
              <CardDescription>Other services and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              {client.additionalServices && client.additionalServices.length > 0 ? (
                <div className="space-y-8">
                  {client.additionalServices.map((service: any, index: number) => (
                    <div key={index} className="border rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">{service.name}</h3>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {service.type}
                        </Badge>
                      </div>

                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.description && (
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900">{service.description}</dd>
                          </div>
                        )}

                        {service.url && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">URL</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <a
                                href={service.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center"
                              >
                                {service.url}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </dd>
                          </div>
                        )}

                        {service.username && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Username</dt>
                            <dd className="mt-1 text-sm text-gray-900">{service.username}</dd>
                          </div>
                        )}

                        {service.password && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                            <dd className="mt-1 text-sm flex items-center">
                              <span className="text-sm text-gray-900">
                                {showPassword[`service_${index}`] ? service.password : "••••••••••••"}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePasswordVisibility(`service_${index}`)}
                                className="ml-2 h-6 px-2"
                              >
                                {showPassword[`service_${index}`] ? (
                                  <>
                                    <EyeOff className="h-3 w-3 mr-1" /> Hide
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-3 w-3 mr-1" /> Show
                                  </>
                                )}
                              </Button>
                            </dd>
                          </div>
                        )}

                        {service.apiKey && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">API Key</dt>
                            <dd className="mt-1 text-sm flex items-center">
                              <span className="text-sm text-gray-900">
                                {showPassword[`api_${index}`] ? service.apiKey : "••••••••••••"}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePasswordVisibility(`api_${index}`)}
                                className="ml-2 h-6 px-2"
                              >
                                {showPassword[`api_${index}`] ? (
                                  <>
                                    <EyeOff className="h-3 w-3 mr-1" /> Hide
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-3 w-3 mr-1" /> Show
                                  </>
                                )}
                              </Button>
                            </dd>
                          </div>
                        )}

                        {service.renewalDate && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Renewal Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {format(new Date(service.renewalDate), "MMMM d, yyyy")}
                            </dd>
                          </div>
                        )}

                        {service.cost && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Cost</dt>
                            <dd className="mt-1 text-sm text-gray-900">{service.cost}</dd>
                          </div>
                        )}

                        {service.billingCycle && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Billing Cycle</dt>
                            <dd className="mt-1 text-sm text-gray-900">{service.billingCycle}</dd>
                          </div>
                        )}
                      </dl>

                      {service.notes && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                          <p className="text-sm text-gray-900 whitespace-pre-wrap">{service.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No additional services</h3>
                  <p className="text-sm text-gray-500">No additional services have been added for this client.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
