import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import BlogPost from "@/lib/Models/blogPost"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const post = await BlogPost.findById(params.id)

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const data = await req.json()

    // Check if post is being published now
    const post = await BlogPost.findById(params.id)
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Set publishedAt date if post is being published for the first time
    if (data.isPublished && !post.isPublished) {
      data.publishedAt = new Date()
    }

    // Update blog post
    const updatedPost = await BlogPost.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    return NextResponse.json(updatedPost)
  } catch (error: any) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedPost = await BlogPost.findByIdAndDelete(params.id)

    if (!deletedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
