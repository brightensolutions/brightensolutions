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
    const tag = searchParams.get("tag") || ""
    const featured = searchParams.get("featured") === "true"
    const search = searchParams.get("search") || ""

    const skip = (page - 1) * limit

    // Build query
    const query: any = { isPublished: true }

    if (category) {
      query.category = category
    }

    if (tag) {
      query.tags = tag
    }

    if (featured) {
      query.featured = true
    }

    if (search) {
      query.$text = { $search: search }
    }

    // Execute query
    const totalPosts = await BlogPost.countDocuments(query)
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
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

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.slug || !data.excerpt || !data.content || !data.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug: data.slug })
    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    // Set publishedAt date if post is published
    if (data.isPublished) {
      data.publishedAt = new Date()
    }

    // Create new blog post
    const newPost = await BlogPost.create(data)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error: any) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
