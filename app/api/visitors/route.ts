import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"

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
 console.log(req.body)
    // Build query
    const query: any = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [{ visitorId: { $regex: search, $options: "i" } }]
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
    return NextResponse.json({ message: error.message || "Failed to fetch visitors" }, { status: 500 })
  }
}
