import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Value from "@/lib/Models/our-values"

// GET a single value by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const value = await Value.findById(params.id)

    if (!value) {
      return NextResponse.json({ message: "Value not found" }, { status: 404 })
    }

    return NextResponse.json(value)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch value" }, { status: 500 })
  }
}

// PUT/UPDATE a value
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()

    // Update the value
    const updatedValue = await Value.findByIdAndUpdate(
      params.id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    )

    if (!updatedValue) {
      return NextResponse.json({ message: "Value not found" }, { status: 404 })
    }

    return NextResponse.json(updatedValue)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update value" }, { status: 500 })
  }
}

// DELETE a value
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedValue = await Value.findByIdAndDelete(params.id)

    if (!deletedValue) {
      return NextResponse.json({ message: "Value not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Value deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete value" }, { status: 500 })
  }
}
