import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import blogPost from "@/lib/Models/blogPost"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const post = await blogPost.findById(params.id).lean()

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const data = await request.json()

    // If slug is being changed, check if the new slug already exists
    if (data.slug) {
      const existingPost = await blogPost.findOne({
        slug: data.slug,
        _id: { $ne: params.id },
      })

      if (existingPost) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    const updatedPost = await blogPost.findByIdAndUpdate(params.id, { $set: data }, { new: true, runValidators: true })

    if (!updatedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch (error: any) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post", details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedPost = await blogPost.findByIdAndDelete(params.id)

    if (!deletedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
