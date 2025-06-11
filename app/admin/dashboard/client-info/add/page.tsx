"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Plus, Trash2, ArrowLeft } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function AddClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Client basic info
  const [clientName, setClientName] = useState("")
  const [clientCode, setClientCode] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [notes, setNotes] = useState("")

  // Domain info
  const [domainName, setDomainName] = useState("")
  const [domainPurchasePlatform, setDomainPurchasePlatform] = useState("")
  const [domainLoginUrl, setDomainLoginUrl] = useState("")
  const [domainUsername, setDomainUsername] = useState("")
  const [domainPassword, setDomainPassword] = useState("")
  const [domainExpiryDate, setDomainExpiryDate] = useState<Date | undefined>(undefined)
  const [domainAutoRenewal, setDomainAutoRenewal] = useState(false)
  const [domainRegistrar, setDomainRegistrar] = useState("")
  const [domainNotes, setDomainNotes] = useState("")

  // Google Workspace info
  const [googleAccountName, setGoogleAccountName] = useState("")
  const [googleAdminEmail, setGoogleAdminEmail] = useState("")
  const [googleAdminPassword, setGoogleAdminPassword] = useState("")
  const [googleLoginUrl, setGoogleLoginUrl] = useState("https://admin.google.com")
  const [googleSubscriptionType, setGoogleSubscriptionType] = useState("")
  const [googleMonthlyFee, setGoogleMonthlyFee] = useState("")
  const [googleRenewalDate, setGoogleRenewalDate] = useState<Date | undefined>(undefined)
  const [googleNotes, setGoogleNotes] = useState("")
  const [emailAccounts, setEmailAccounts] = useState<
    Array<{
      emailAddress: string
      password: string
      loginUrl: string
      notes: string
    }>
  >([{ emailAddress: "", password: "", loginUrl: "https://mail.google.com", notes: "" }])

  // Website info
  const [websiteTechnology, setWebsiteTechnology] = useState("")
  const [websiteFramework, setWebsiteFramework] = useState("")
  const [websiteHostingProvider, setWebsiteHostingProvider] = useState("")
  const [websiteServerType, setWebsiteServerType] = useState("")
  const [websiteServerUrl, setWebsiteServerUrl] = useState("")
  const [websiteCpanelUrl, setWebsiteCpanelUrl] = useState("")
  const [websiteUsername, setWebsiteUsername] = useState("")
  const [websitePassword, setWebsitePassword] = useState("")
  const [websiteDatabaseName, setWebsiteDatabaseName] = useState("")
  const [websiteDatabaseUsername, setWebsiteDatabaseUsername] = useState("")
  const [websiteDatabasePassword, setWebsiteDatabasePassword] = useState("")
  const [websiteSshAccess, setWebsiteSshAccess] = useState(false)
  const [websiteSshUsername, setWebsiteSshUsername] = useState("")
  const [websiteSshPassword, setWebsiteSshPassword] = useState("")
  const [websiteNotes, setWebsiteNotes] = useState("")

  // Additional services
  const [additionalServices, setAdditionalServices] = useState<
    Array<{
      serviceName: string
      serviceType: string
      loginUrl: string
      username: string
      password: string
      expiryDate?: Date
      notes: string
    }>
  >([])

  const addEmailAccount = () => {
    setEmailAccounts([
      ...emailAccounts,
      { emailAddress: "", password: "", loginUrl: "https://mail.google.com", notes: "" },
    ])
  }

  const removeEmailAccount = (index: number) => {
    const newEmailAccounts = [...emailAccounts]
    newEmailAccounts.splice(index, 1)
    setEmailAccounts(newEmailAccounts)
  }

  const updateEmailAccount = (index: number, field: string, value: string) => {
    const newEmailAccounts = [...emailAccounts]
    newEmailAccounts[index] = { ...newEmailAccounts[index], [field]: value }
    setEmailAccounts(newEmailAccounts)
  }

  const addAdditionalService = () => {
    setAdditionalServices([
      ...additionalServices,
      { serviceName: "", serviceType: "", loginUrl: "", username: "", password: "", notes: "" },
    ])
  }

  const removeAdditionalService = (index: number) => {
    const newServices = [...additionalServices]
    newServices.splice(index, 1)
    setAdditionalServices(newServices)
  }

  const updateAdditionalService = (index: number, field: string, value: any) => {
    const newServices = [...additionalServices]
    newServices[index] = { ...newServices[index], [field]: value }
    setAdditionalServices(newServices)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !clientName ||
      !domainName ||
      !domainPurchasePlatform ||
      !domainLoginUrl ||
      !domainUsername ||
      !domainPassword ||
      !domainExpiryDate ||
      !websiteTechnology ||
      !websiteHostingProvider ||
      !websiteServerUrl ||
      !websiteUsername ||
      !websitePassword
    ) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const clientData = {
        clientName,
        clientCode,
        contactPerson,
        contactEmail,
        contactPhone,
        notes,
        domain: {
          name: domainName,
          purchasePlatform: domainPurchasePlatform,
          loginUrl: domainLoginUrl,
          username: domainUsername,
          password: domainPassword,
          expiryDate: domainExpiryDate,
          autoRenewal: domainAutoRenewal,
          registrar: domainRegistrar,
          notes: domainNotes,
        },
        googleWorkspace: {
          accountName: googleAccountName,
          adminEmail: googleAdminEmail,
          adminPassword: googleAdminPassword,
          loginUrl: googleLoginUrl,
          subscriptionType: googleSubscriptionType,
          monthlyFee: googleMonthlyFee ? Number.parseFloat(googleMonthlyFee) : undefined,
          renewalDate: googleRenewalDate,
          emailAccounts: emailAccounts.filter((account) => account.emailAddress.trim() !== ""),
          notes: googleNotes,
        },
        website: {
          technology: websiteTechnology,
          framework: websiteFramework,
          hostingProvider: websiteHostingProvider,
          serverType: websiteServerType,
          serverUrl: websiteServerUrl,
          cpanelUrl: websiteCpanelUrl,
          username: websiteUsername,
          password: websitePassword,
          databaseName: websiteDatabaseName,
          databaseUsername: websiteDatabaseUsername,
          databasePassword: websiteDatabasePassword,
          sshAccess: websiteSshAccess,
          sshUsername: websiteSshUsername,
          sshPassword: websiteSshPassword,
          notes: websiteNotes,
        },
        additionalServices: additionalServices.filter((service) => service.serviceName.trim() !== ""),
      }

      const response = await fetch("/api/client-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create client")
      }

      // Redirect to client list page
      router.push("/admin/client-info")
    } catch (err: any) {
      console.error("Error creating client:", err)
      setError(err.message || "An error occurred while creating the client")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
        </Button>
        <h1 className="text-3xl font-bold mb-2">Add New Client</h1>
        <p className="text-gray-600">Enter all the client information, credentials, and services.</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="google">Google Workspace</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="additional">Additional Services</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Enter the basic client information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">
                      Client Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientCode">Client Code</Label>
                    <Input
                      id="clientCode"
                      value={clientCode}
                      onChange={(e) => setClientCode(e.target.value)}
                      placeholder="Enter client code (optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Enter contact phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any additional notes about this client"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Tab */}
          <TabsContent value="domain">
            <Card>
              <CardHeader>
                <CardTitle>Domain Information</CardTitle>
                <CardDescription>Enter the domain registration details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domainName">
                      Domain Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="domainName"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder="example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domainPurchasePlatform">
                      Purchase Platform <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="domainPurchasePlatform"
                      value={domainPurchasePlatform}
                      onChange={(e) => setDomainPurchasePlatform(e.target.value)}
                      placeholder="GoDaddy, Namecheap, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domainLoginUrl">
                      Login URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="domainLoginUrl"
                      value={domainLoginUrl}
                      onChange={(e) => setDomainLoginUrl(e.target.value)}
                      placeholder="https://example.com/login"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domainRegistrar">Registrar</Label>
                    <Input
                      id="domainRegistrar"
                      value={domainRegistrar}
                      onChange={(e) => setDomainRegistrar(e.target.value)}
                      placeholder="Domain registrar name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domainUsername">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="domainUsername"
                      value={domainUsername}
                      onChange={(e) => setDomainUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domainPassword">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="domainPassword"
                      type="password"
                      value={domainPassword}
                      onChange={(e) => setDomainPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domainExpiryDate">
                      Expiry Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !domainExpiryDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {domainExpiryDate ? format(domainExpiryDate, "PPP") : "Select expiry date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={domainExpiryDate}
                          onSelect={setDomainExpiryDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domainAutoRenewal" className="block mb-2">
                      Auto Renewal
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="domainAutoRenewal"
                        checked={domainAutoRenewal}
                        onCheckedChange={setDomainAutoRenewal}
                      />
                      <Label htmlFor="domainAutoRenewal">{domainAutoRenewal ? "Enabled" : "Disabled"}</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domainNotes">Notes</Label>
                  <Textarea
                    id="domainNotes"
                    value={domainNotes}
                    onChange={(e) => setDomainNotes(e.target.value)}
                    placeholder="Enter any additional notes about this domain"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Google Workspace Tab */}
          <TabsContent value="google">
            <Card>
              <CardHeader>
                <CardTitle>Google Workspace</CardTitle>
                <CardDescription>Enter Google Workspace account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleAccountName">Account Name</Label>
                    <Input
                      id="googleAccountName"
                      value={googleAccountName}
                      onChange={(e) => setGoogleAccountName(e.target.value)}
                      placeholder="Enter account name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleSubscriptionType">Subscription Type</Label>
                    <Input
                      id="googleSubscriptionType"
                      value={googleSubscriptionType}
                      onChange={(e) => setGoogleSubscriptionType(e.target.value)}
                      placeholder="Business Starter, Business Standard, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleAdminEmail">Admin Email</Label>
                    <Input
                      id="googleAdminEmail"
                      type="email"
                      value={googleAdminEmail}
                      onChange={(e) => setGoogleAdminEmail(e.target.value)}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleAdminPassword">Admin Password</Label>
                    <Input
                      id="googleAdminPassword"
                      type="password"
                      value={googleAdminPassword}
                      onChange={(e) => setGoogleAdminPassword(e.target.value)}
                      placeholder="Enter admin password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleLoginUrl">Login URL</Label>
                    <Input
                      id="googleLoginUrl"
                      value={googleLoginUrl}
                      onChange={(e) => setGoogleLoginUrl(e.target.value)}
                      placeholder="https://admin.google.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleMonthlyFee">Monthly Fee</Label>
                    <Input
                      id="googleMonthlyFee"
                      type="number"
                      value={googleMonthlyFee}
                      onChange={(e) => setGoogleMonthlyFee(e.target.value)}
                      placeholder="Enter monthly fee"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleRenewalDate">Renewal Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !googleRenewalDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {googleRenewalDate ? format(googleRenewalDate, "PPP") : "Select renewal date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={googleRenewalDate}
                          onSelect={setGoogleRenewalDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleNotes">Notes</Label>
                  <Textarea
                    id="googleNotes"
                    value={googleNotes}
                    onChange={(e) => setGoogleNotes(e.target.value)}
                    placeholder="Enter any additional notes about Google Workspace"
                    rows={4}
                  />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Email Accounts</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addEmailAccount}>
                      <Plus className="h-4 w-4 mr-2" /> Add Email Account
                    </Button>
                  </div>

                  {emailAccounts.map((account, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`emailAddress-${index}`}>Email Address</Label>
                            <Input
                              id={`emailAddress-${index}`}
                              value={account.emailAddress}
                              onChange={(e) => updateEmailAccount(index, "emailAddress", e.target.value)}
                              placeholder="user@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`emailPassword-${index}`}>Password</Label>
                            <Input
                              id={`emailPassword-${index}`}
                              type="password"
                              value={account.password}
                              onChange={(e) => updateEmailAccount(index, "password", e.target.value)}
                              placeholder="Enter password"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor={`emailLoginUrl-${index}`}>Login URL</Label>
                            <Input
                              id={`emailLoginUrl-${index}`}
                              value={account.loginUrl}
                              onChange={(e) => updateEmailAccount(index, "loginUrl", e.target.value)}
                              placeholder="https://mail.google.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`emailNotes-${index}`}>Notes</Label>
                            <Input
                              id={`emailNotes-${index}`}
                              value={account.notes}
                              onChange={(e) => updateEmailAccount(index, "notes", e.target.value)}
                              placeholder="Additional notes"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmailAccount(index)}
                            disabled={emailAccounts.length === 1}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Tab */}
          <TabsContent value="website">
            <Card>
              <CardHeader>
                <CardTitle>Website Information</CardTitle>
                <CardDescription>Enter website hosting and technology details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteTechnology">
                      Technology <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websiteTechnology"
                      value={websiteTechnology}
                      onChange={(e) => setWebsiteTechnology(e.target.value)}
                      placeholder="WordPress, React, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteFramework">Framework</Label>
                    <Input
                      id="websiteFramework"
                      value={websiteFramework}
                      onChange={(e) => setWebsiteFramework(e.target.value)}
                      placeholder="Next.js, Laravel, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteHostingProvider">
                      Hosting Provider <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websiteHostingProvider"
                      value={websiteHostingProvider}
                      onChange={(e) => setWebsiteHostingProvider(e.target.value)}
                      placeholder="AWS, DigitalOcean, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteServerType">Server Type</Label>
                    <Input
                      id="websiteServerType"
                      value={websiteServerType}
                      onChange={(e) => setWebsiteServerType(e.target.value)}
                      placeholder="Shared, VPS, Dedicated, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteServerUrl">
                      Server URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websiteServerUrl"
                      value={websiteServerUrl}
                      onChange={(e) => setWebsiteServerUrl(e.target.value)}
                      placeholder="https://server.example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteCpanelUrl">cPanel URL</Label>
                    <Input
                      id="websiteCpanelUrl"
                      value={websiteCpanelUrl}
                      onChange={(e) => setWebsiteCpanelUrl(e.target.value)}
                      placeholder="https://cpanel.example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteUsername">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websiteUsername"
                      value={websiteUsername}
                      onChange={(e) => setWebsiteUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websitePassword">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websitePassword"
                      type="password"
                      value={websitePassword}
                      onChange={(e) => setWebsitePassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteDatabaseName">Database Name</Label>
                    <Input
                      id="websiteDatabaseName"
                      value={websiteDatabaseName}
                      onChange={(e) => setWebsiteDatabaseName(e.target.value)}
                      placeholder="Enter database name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteDatabaseUsername">Database Username</Label>
                    <Input
                      id="websiteDatabaseUsername"
                      value={websiteDatabaseUsername}
                      onChange={(e) => setWebsiteDatabaseUsername(e.target.value)}
                      placeholder="Enter database username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteDatabasePassword">Database Password</Label>
                    <Input
                      id="websiteDatabasePassword"
                      type="password"
                      value={websiteDatabasePassword}
                      onChange={(e) => setWebsiteDatabasePassword(e.target.value)}
                      placeholder="Enter database password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteSshAccess" className="block mb-2">
                    SSH Access
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="websiteSshAccess" checked={websiteSshAccess} onCheckedChange={setWebsiteSshAccess} />
                    <Label htmlFor="websiteSshAccess">{websiteSshAccess ? "Enabled" : "Disabled"}</Label>
                  </div>
                </div>

                {websiteSshAccess && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="websiteSshUsername">SSH Username</Label>
                      <Input
                        id="websiteSshUsername"
                        value={websiteSshUsername}
                        onChange={(e) => setWebsiteSshUsername(e.target.value)}
                        placeholder="Enter SSH username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="websiteSshPassword">SSH Password</Label>
                      <Input
                        id="websiteSshPassword"
                        type="password"
                        value={websiteSshPassword}
                        onChange={(e) => setWebsiteSshPassword(e.target.value)}
                        placeholder="Enter SSH password"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="websiteNotes">Notes</Label>
                  <Textarea
                    id="websiteNotes"
                    value={websiteNotes}
                    onChange={(e) => setWebsiteNotes(e.target.value)}
                    placeholder="Enter any additional notes about the website"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Services Tab */}
          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
                <CardDescription>Enter any additional services or subscriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Add any additional services like analytics, CDN, email marketing, etc.
                  </p>
                  <Button type="button" variant="outline" size="sm" onClick={addAdditionalService}>
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                  </Button>
                </div>

                {additionalServices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No additional services added yet</div>
                ) : (
                  <div className="space-y-4">
                    {additionalServices.map((service, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`serviceName-${index}`}>Service Name</Label>
                              <Input
                                id={`serviceName-${index}`}
                                value={service.serviceName}
                                onChange={(e) => updateAdditionalService(index, "serviceName", e.target.value)}
                                placeholder="Google Analytics, Cloudflare, etc."
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`serviceType-${index}`}>Service Type</Label>
                              <Input
                                id={`serviceType-${index}`}
                                value={service.serviceType}
                                onChange={(e) => updateAdditionalService(index, "serviceType", e.target.value)}
                                placeholder="Analytics, CDN, Email Marketing, etc."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor={`loginUrl-${index}`}>Login URL</Label>
                              <Input
                                id={`loginUrl-${index}`}
                                value={service.loginUrl}
                                onChange={(e) => updateAdditionalService(index, "loginUrl", e.target.value)}
                                placeholder="https://example.com/login"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`expiryDate-${index}`}>Expiry Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !service.expiryDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {service.expiryDate ? format(service.expiryDate, "PPP") : "Select expiry date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={service.expiryDate}
                                    onSelect={(date) => updateAdditionalService(index, "expiryDate", date)}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor={`username-${index}`}>Username</Label>
                              <Input
                                id={`username-${index}`}
                                value={service.username}
                                onChange={(e) => updateAdditionalService(index, "username", e.target.value)}
                                placeholder="Enter username"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`password-${index}`}>Password</Label>
                              <Input
                                id={`password-${index}`}
                                type="password"
                                value={service.password}
                                onChange={(e) => updateAdditionalService(index, "password", e.target.value)}
                                placeholder="Enter password"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mt-4">
                            <Label htmlFor={`notes-${index}`}>Notes</Label>
                            <Textarea
                              id={`notes-${index}`}
                              value={service.notes}
                              onChange={(e) => updateAdditionalService(index, "notes", e.target.value)}
                              placeholder="Enter any additional notes about this service"
                              rows={2}
                            />
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAdditionalService(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push("/admin/dashboard/client-info")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Client Information"}
          </Button>
        </div>
      </form>
    </div>
  )
}
