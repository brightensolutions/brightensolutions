import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamMember from "@/lib/Models/team-member"

// GET all team members
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const department = searchParams.get("department")
    const isActive = searchParams.get("isActive") !== "false" // Default to true if not specified

    // Build query
    const query: any = {}

    if (department && department !== "all") {
      query.department = department
    }

    if (isActive !== null) {
      query.isActive = isActive
    }

    // Get team members
    const teamMembers = await TeamMember.find(query).sort({ order: 1, name: 1 })

    return NextResponse.json(teamMembers)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch team members" }, { status: 500 })
  }
}

// POST a new team member
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()

    // Create new team member
    const newTeamMember = await TeamMember.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(newTeamMember, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to create team member" }, { status: 500 })
  }
}
