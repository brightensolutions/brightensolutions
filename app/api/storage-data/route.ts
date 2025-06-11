import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    // Get data from request
    const data = await req.json()

    // Get visitor ID from cookie or create a new one
    let visitorId = req.cookies.get("visitor_id")?.value

    if (!visitorId) {
      visitorId = uuidv4()
      // Note: We can't set cookies in API routes in Next.js App Router
      // The cookie will be set by the client component
    }

    // Check if visitor exists
    let visitor = await Visitor.findOne({ visitorId })

    if (visitor) {
      // Update existing visitor
      visitor = await Visitor.findOneAndUpdate(
        { visitorId },
        {
          $set: {
            lastVisit: new Date(),
            rawStorageData: data.storageData,
            updatedAt: new Date(),
          },
          $inc: { visitCount: 1 },
        },
        { new: true },
      )
    } else {
      // Create new visitor
      visitor = await Visitor.create({
        visitorId,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1,
        rawStorageData: data.storageData,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, visitorId })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save storage data" },
      { status: 500 },
    )
  }
}
