import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import connectDb from "@/lib/db/db"
import adminModel from "@/lib/Models/admin"
import { verifyPassword,generateJwtToken, hashPassword } from "@/lib/Services/queryFn"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Connect to database
    await connectDb()

    // Check if any admin exists, if not create default admin
    const adminCount = await adminModel.countDocuments({})

    if (adminCount === 0) {
      console.log("Creating default admin account...")
      const hashedPassword = hashPassword("admin@123")
      await adminModel.create({
        email: "brightensolution@gmail.com",
        password: hashedPassword,
      })
      console.log("Default admin created successfully")
    }

    // Find admin by email
    const admin = await adminModel.findOne({ email })

    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = verifyPassword(admin.password, password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateJwtToken(admin._id.toString())

    // Update admin with new token
    admin.token = token
    await admin.save()

    // Set cookie with token
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        email: admin.email,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set({
      name: "brightensolutionadmin",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return response
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ message: error.message || "An error occurred during login" }, { status: 500 })
  }
}
