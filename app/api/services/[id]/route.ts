import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/services"

// GET a single service by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const service = await Service.findById(params.id)

    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch service" }, { status: 500 })
  }
}

// PUT/UPDATE a service
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()

    // Update the service
    const updatedService = await Service.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(updatedService)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update service" }, { status: 500 })
  }
}

// DELETE a service
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedService = await Service.findByIdAndDelete(params.id)

    if (!deletedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete service" }, { status: 500 })
  }
}
