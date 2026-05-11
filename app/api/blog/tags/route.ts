import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import BlogPost from "@/lib/Models/blogPost"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const tags = await BlogPost.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, name: "$_id", count: 1 } },
    ])

    return NextResponse.json(tags)
  } catch (error: any) {
    console.error("Error fetching blog tags:", error)
    return NextResponse.json({ error: "Failed to fetch blog tags" }, { status: 500 })
  }
}
