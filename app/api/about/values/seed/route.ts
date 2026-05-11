import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Value from "@/lib/Models/our-values"

// POST to seed initial values
export async function POST() {
  try {
    await connectDb()

    // Check if values already exist
    const existingValues = await Value.countDocuments()

    if (existingValues > 0) {
      return NextResponse.json({ message: "Values already seeded" }, { status: 200 })
    }

    // Initial values data
    const initialValues = [
      {
        title: "Passion",
        description: "We are passionate about creating exceptional digital experiences that transform businesses.",
        icon: "heart",
        color: "#F66526",
        order: 0,
        isActive: true,
      },
      {
        title: "Innovation",
        description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
        icon: "lightbulb",
        color: "#F2502C",
        order: 1,
        isActive: true,
      },
      {
        title: "Collaboration",
        description: "We believe in the power of teamwork and partnership with our clients for mutual success.",
        icon: "users",
        color: "#F66526",
        order: 2,
        isActive: true,
      },
      {
        title: "Excellence",
        description: "We strive for excellence in everything we do, from code quality to client communication.",
        icon: "target",
        color: "#F2502C",
        order: 3,
        isActive: true,
      },
      {
        title: "Integrity",
        description: "We operate with honesty, transparency, and ethical practices in all our dealings.",
        icon: "shield",
        color: "#F66526",
        order: 4,
        isActive: true,
      },
      {
        title: "Agility",
        description: "We adapt quickly to changing needs and technologies to stay ahead of the curve.",
        icon: "zap",
        color: "#F2502C",
        order: 5,
        isActive: true,
      },
    ]

    // Insert values
    await Value.insertMany(initialValues)

    return NextResponse.json({ message: "Values seeded successfully", count: initialValues.length }, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to seed values" }, { status: 500 })
  }
}
