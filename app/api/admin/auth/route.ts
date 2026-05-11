import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import connectDb from "@/lib/db/db"
import adminModel from "@/lib/Models/admin"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function GET(request: NextRequest) {
  try {
    // Get token from authorization header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ authenticated: false, message: "No token provided" }, { status: 401 })
    }

    // Decode token
    const decoded = decodeJwtToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ authenticated: false, message: "Invalid token" }, { status: 401 })
    }

    // Connect to database
    await connectDb()

    // Find admin by ID
    const admin = await adminModel.findById(decoded.id)

    if (!admin) {
      return NextResponse.json({ authenticated: false, message: "User not found" }, { status: 401 })
    }

    // Check if token matches
    if (admin.token !== token) {
      return NextResponse.json({ authenticated: false, message: "Token mismatch" }, { status: 401 })
    }

    // Return success with user data
    return NextResponse.json({
      authenticated: true,
      user: {
        id: admin._id,
        email: admin.email,
      },
    })
  } catch (error: any) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      { authenticated: false, message: error.message || "Authentication failed" },
      { status: 500 },
    )
  }
}
