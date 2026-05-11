import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import BlogPost from "@/lib/Models/blogPost"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category") || ""
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"

    const skip = (page - 1) * limit

    // Build query
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$text = { $search: search }
    }

    if (status === "published") {
      query.isPublished = true
    } else if (status === "draft") {
      query.isPublished = false
    }

    // Execute query
    const totalPosts = await BlogPost.countDocuments(query)
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return NextResponse.json({
      posts,
      pagination: {
        total: totalPosts,
        page,
        limit,
        pages: Math.ceil(totalPosts / limit),
      },
    })
  } catch (error: any) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
