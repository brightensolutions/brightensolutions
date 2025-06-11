import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ClientInfo from "@/lib/Models/client-info"

// GET - Fetch a single client by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    
    await connectDb()

    const client = await ClientInfo.findById(params.id)

    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch client" }, { status: 500 })
  }
}

// PUT/UPDATE a client
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
   

    await connectDb()

    const body = await req.json()

    

    // Update the client
    const updatedClient = await ClientInfo.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

    if (!updatedClient) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json(updatedClient)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update client" }, { status: 500 })
  }
}

// DELETE a client
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
   
    await connectDb()

    const deletedClient = await ClientInfo.findByIdAndDelete(params.id)

    if (!deletedClient) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Client deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete client" }, { status: 500 })
  }
}
