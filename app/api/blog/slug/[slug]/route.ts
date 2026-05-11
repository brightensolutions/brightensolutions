import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import BlogPost from "@/lib/Models/blogPost"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDb()

    // Log the slug to help with debugging
    // console.log("Fetching blog post with slug:", params.slug)

    const post = await BlogPost.findOne({ slug: params.slug }).lean()

    if (!post) {
      console.log("Blog post not found for slug:", params.slug)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Update view count separately to avoid issues with lean()
    await BlogPost.findByIdAndUpdate(post._id, { $inc: { viewCount: 1 } })

    // console.log("Blog post found:", post.title)
    return NextResponse.json(post)
  } catch (error: any) {
    console.error("Error fetching blog post by slug:", error)
    return NextResponse.json({ error: "Failed to fetch blog post", details: error.message }, { status: 500 })
  }
}
