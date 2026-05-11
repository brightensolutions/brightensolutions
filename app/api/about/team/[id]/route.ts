import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamMember from "@/lib/Models/team-member"

// GET a single team member by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const teamMember = await TeamMember.findById(params.id)

    if (!teamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(teamMember)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch team member" }, { status: 500 })
  }
}

// PUT/UPDATE a team member
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()

    // Update the team member
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      params.id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    )

    if (!updatedTeamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTeamMember)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update team member" }, { status: 500 })
  }
}

// DELETE a team member
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedTeamMember = await TeamMember.findByIdAndDelete(params.id)

    if (!deletedTeamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete team member" }, { status: 500 })
  }
}
