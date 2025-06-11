import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import BlogPost from "@/lib/Models/blogPost"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const categories = await BlogPost.distinct("category")
    return NextResponse.json(categories)
  } catch (error: any) {
    console.error("Error fetching blog categories:", error)
    return NextResponse.json({ error: "Failed to fetch blog categories" }, { status: 500 })
  }
}
