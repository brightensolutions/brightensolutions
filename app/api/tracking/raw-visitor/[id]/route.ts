import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"

// GET a single visitor by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const visitor = await Visitor.findById(params.id)

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch visitor" }, { status: 500 })
  }
}

// PUT/UPDATE a visitor
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()

    // Update the visitor
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      params.id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    )

    if (!updatedVisitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(updatedVisitor)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update visitor" }, { status: 500 })
  }
}

// DELETE a visitor
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedVisitor = await Visitor.findByIdAndDelete(params.id)

    if (!deletedVisitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Visitor deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete visitor" }, { status: 500 })
  }
}
