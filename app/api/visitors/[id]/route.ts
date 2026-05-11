import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Visitor from "@/lib/Models/visitor"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const visitor = await Visitor.findById(params.id)

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch visitor" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const data = await req.json()

    const visitor = await Visitor.findByIdAndUpdate(
      params.id,
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { new: true },
    )

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to update visitor" }, { status: 500 })
  }
}
