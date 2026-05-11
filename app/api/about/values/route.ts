import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Value from "@/lib/Models/our-values"

// GET all values
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const isActive = searchParams.get("isActive") !== "false" // Default to true if not specified

    // Build query
    const query: any = {}

    if (isActive !== null) {
      query.isActive = isActive
    }

    // Get values
    const values = await Value.find(query).sort({ order: 1 })

    return NextResponse.json(values)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch values" }, { status: 500 })
  }
}

// POST a new value
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()
// console.log("body",body);
    // Create new value
    const newValue = await Value.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(newValue, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to create value" }, { status: 500 })
  }
}
