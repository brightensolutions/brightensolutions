import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const includeStorage = searchParams.get("includeStorage") === "true"

    // Build query
    const query: any = {}

    if (status && status !== "all") {
      query.status = status
    }

    // Get all visitors matching the query
    const visitors = await Visitor.find(query).sort({ lastVisit: -1 })

    // Convert to CSV
    let csvHeader = [
      "Visitor ID",
      "Name",
      "Email",
      "Phone",
      "First Visit",
      "Last Visit",
      "Visit Count",
      "Pages Visited",
      "Device",
      "Browser",
      "OS",
      "Referrer",
      "Location",
      "Status",
      "Has Consent",
    ]

    if (includeStorage) {
      csvHeader = [...csvHeader, "Cookies", "LocalStorage", "SessionStorage"]
    }

    const csvHeaderStr = csvHeader.join(",")

    const csvRows = visitors.map((visitor) => {
      let row = [
        visitor.visitorId,
        visitor.contactInfo?.name || "",
        visitor.contactInfo?.email || "",
        visitor.contactInfo?.phone || "",
        new Date(visitor.firstVisit).toISOString(),
        new Date(visitor.lastVisit).toISOString(),
        visitor.visitCount,
        visitor.pagesVisited?.length || 0,
        visitor.device?.device || "",
        `${visitor.device?.browser || ""} ${visitor.device?.browserVersion || ""}`,
        `${visitor.device?.os || ""} ${visitor.device?.osVersion || ""}`,
        visitor.referrer || "",
        [visitor.location?.country, visitor.location?.city].filter(Boolean).join(", "),
        visitor.status,
        visitor.hasConsent ? "Yes" : "No",
      ]

      if (includeStorage && visitor.storageData) {
        row = [
          ...row,
          JSON.stringify(visitor.storageData.cookies || {}),
          JSON.stringify(visitor.storageData.localStorage || {}),
          JSON.stringify(visitor.storageData.sessionStorage || {}),
        ]
      }

      return row
        .map((value) => {
          // Escape quotes and wrap in quotes if the value contains a comma
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(",")
    })

    const csv = [csvHeaderStr, ...csvRows].join("\n")

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=visitors-export-${new Date().toISOString().split("T")[0]}.csv`,
      },
    })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to export visitors" }, { status: 500 })
  }
}
