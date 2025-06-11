"use client"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function BulkUploadButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push("/admin/dashboard/client-info/bulk-upload")}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Upload className="h-4 w-4" />
      Bulk Upload
    </Button>
  )
}
