import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ClientInfo from "@/lib/Models/client-info"

// GET - Fetch all client information with optional filtering
export async function GET(req: NextRequest) {
  try {
    // Check authentication
   

    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "clientName"
    const sortOrder = searchParams.get("sortOrder") === "desc" ? -1 : 1
    const limit = Number.parseInt(searchParams.get("limit") || "50", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const skip = (page - 1) * limit

    // Build query
    const query: any = {}

    // Add search functionality
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { "domain.name": { $regex: search, $options: "i" } },
        { clientCode: { $regex: search, $options: "i" } },
        { contactPerson: { $regex: search, $options: "i" } },
        { contactEmail: { $regex: search, $options: "i" } },
        { "website.technology": { $regex: search, $options: "i" } },
        { "website.hostingProvider": { $regex: search, $options: "i" } },
      ]
    }

    // Check for expiring domains filter
    const expiringIn = searchParams.get("expiringIn")
    if (expiringIn) {
      const days = Number.parseInt(expiringIn)
      if (!isNaN(days)) {
        const futureDate = new Date()
        futureDate.setDate(futureDate.getDate() + days)
        query["domain.expiryDate"] = { $lte: futureDate, $gte: new Date() }
      }
    }

    // Get clients with pagination
    const clients = await ClientInfo.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .select(
        "-domain.password -website.password -googleWorkspace.adminPassword -googleWorkspace.emailAccounts.password -additionalServices.password -website.databasePassword -website.sshPassword",
      )

    // Get total count for pagination
    const total = await ClientInfo.countDocuments(query)

    return NextResponse.json({
      clients,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch client information" }, { status: 500 })
  }
}

// POST - Create new client information
export async function POST(req: NextRequest) {
  try {
    
    await connectDb()

    const clientData = await req.json()

   
    // Create new client
    const newClient = await ClientInfo.create(clientData)

    return NextResponse.json(newClient, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to create client information" }, { status: 500 })
  }
}
