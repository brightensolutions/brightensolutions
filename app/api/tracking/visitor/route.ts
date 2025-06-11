import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const visitorData = await req.json()

    // Validate required fields
    if (!visitorData.visitorId) {
      return NextResponse.json({ message: "Visitor ID is required" }, { status: 400 })
    }

    // Check if visitor already exists
    const existingVisitor = await Visitor.findOne({ visitorId: visitorData.visitorId })

    if (existingVisitor) {
      // Update existing visitor
      const updatedVisitor = await Visitor.findOneAndUpdate(
        { visitorId: visitorData.visitorId },
        {
          $set: {
            lastVisit: visitorData.lastVisit,
            visitCount: visitorData.visitCount,
            device: visitorData.device,
            location: visitorData.location,
            hasConsent: visitorData.hasConsent,
            consentDate: visitorData.consentDate,
            contactInfo: visitorData.contactInfo,
            // Store all cookies and localStorage data if consent is given
            ...(visitorData.hasConsent && { storageData: visitorData.storageData }),
            updatedAt: new Date(),
          },
          // Add new pages to the pagesVisited array
          $push: {
            pagesVisited: {
              $each: visitorData.pagesVisited,
              $slice: -50, // Keep only the last 50 pages
            },
          },
        },
        { new: true },
      )

      return NextResponse.json(updatedVisitor)
    } else {
      // Create new visitor
      const newVisitor = await Visitor.create({
        ...visitorData,
        // Store all cookies and localStorage data if consent is given
        ...(visitorData.hasConsent && { storageData: visitorData.storageData }),
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return NextResponse.json(newVisitor, { status: 201 })
    }
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to save visitor data" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "50", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const skip = (page - 1) * limit

    // Build query
    const query: any = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [
        { "contactInfo.name": { $regex: search, $options: "i" } },
        { "contactInfo.email": { $regex: search, $options: "i" } },
        { visitorId: { $regex: search, $options: "i" } },
      ]
    }

    // Get visitors with pagination
    const visitors = await Visitor.find(query).sort({ lastVisit: -1 }).skip(skip).limit(limit)

    // Get total count for pagination
    const total = await Visitor.countDocuments(query)

    return NextResponse.json({
      visitors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch visitors" }, { status: 500 })
  }
}
