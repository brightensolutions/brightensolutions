"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function BulkUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
    details?: {
      total: number
      successful: number
      failed: number
      errors?: Array<{ row: number; message: string }>
    }
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadResult(null)
    }
  }

  const downloadTemplate = async () => {
    try {
      const response = await fetch("/api/client-info/template")
      if (!response.ok) throw new Error("Failed to download template")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "client-info-template.xlsx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading template:", error)
      alert("Failed to download template. Please try again.")
    }
  }

  const uploadFile = async () => {
    if (!file) return

    try {
      setUploading(true)
      setUploadProgress(0)
      setUploadResult(null)

      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch("/api/client-info/bulk-upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Upload failed")
      }

      setUploadResult({
        success: true,
        message: "Upload completed successfully",
        details: result.details,
      })
    } catch (error: any) {
      console.error("Error uploading file:", error)
      setUploadResult({
        success: false,
        message: error.message || "Failed to upload file. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
        </Button>
        <h1 className="text-3xl font-bold mb-2">Bulk Upload Client Information</h1>
        <p className="text-gray-600">Upload multiple client records at once using an Excel spreadsheet.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Download Template</CardTitle>
            <CardDescription>Download the Excel template and fill it with your client information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <FileSpreadsheet className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-center mb-4">Download the Excel template with all required fields and formatting</p>
              <Button onClick={downloadTemplate} className="flex items-center">
                <Download className="h-4 w-4 mr-2" /> Download Template
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p className="font-medium mb-2">Template includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Basic client information</li>
                <li>Domain details</li>
                <li>Google Workspace accounts</li>
                <li>Website information</li>
                <li>Additional services</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Upload Completed File</CardTitle>
            <CardDescription>Upload your completed Excel file to add multiple clients at once</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed ${
                file ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50"
              } rounded-lg transition-colors duration-200`}
            >
              {file ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-center mb-1 font-medium">{file.name}</p>
                  <p className="text-center text-sm text-gray-500 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                  <Button onClick={() => setFile(null)} variant="outline" size="sm">
                    Change File
                  </Button>
                </>
              ) : (
                <>
                  <Upload className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-center mb-4">Drag and drop your Excel file here, or click to browse</p>
                  <label htmlFor="file-upload">
                    <div className="cursor-pointer">
                      <Button asChild>
                        <span>Select File</span>
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </div>
                  </label>
                </>
              )}
            </div>

            {file && (
              <div className="mt-4">
                <Button onClick={uploadFile} className="w-full" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload and Process File"}
                </Button>

                {uploading && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-center text-sm mt-2">Processing file... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            )}

            {uploadResult && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  uploadResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-start">
                  {uploadResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${uploadResult.success ? "text-green-800" : "text-red-800"}`}>
                      {uploadResult.message}
                    </p>

                    {uploadResult.details && (
                      <div className="mt-2 text-sm">
                        <p>Total records: {uploadResult.details.total}</p>
                        <p>Successfully imported: {uploadResult.details.successful}</p>
                        {uploadResult.details.failed > 0 && <p>Failed to import: {uploadResult.details.failed}</p>}

                        {uploadResult.details.errors && uploadResult.details.errors.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium">Errors:</p>
                            <ul className="list-disc pl-5 mt-1">
                              {uploadResult.details.errors.slice(0, 5).map((error, index) => (
                                <li key={index}>
                                  Row {error.row}: {error.message}
                                </li>
                              ))}
                              {uploadResult.details.errors.length > 5 && (
                                <li>...and {uploadResult.details.errors.length - 5} more errors</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {uploadResult.success && (
                      <div className="mt-4">
                        <Link href="/admin/dashboard/client-info">
                          <Button size="sm">View All Clients</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Tips for Successful Import</h3>
        <ul className="list-disc pl-5 text-blue-700 space-y-1">
          <li>Do not modify the column headers or sheet structure</li>
          <li>Required fields are marked with an asterisk (*) in the template</li>
          <li>Dates should be in YYYY-MM-DD format</li>
          <li>For multiple email accounts or services, use additional rows as shown in the template</li>
          <li>Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  )
}
