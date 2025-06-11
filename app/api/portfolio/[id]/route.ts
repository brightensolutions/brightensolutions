import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Portfolio from "@/lib/Models/portfolio"

// GET a single portfolio item by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const portfolioItem = await Portfolio.findById(params.id)

    if (!portfolioItem) {
      return NextResponse.json({ message: "Portfolio item not found" }, { status: 404 })
    }

    return NextResponse.json(portfolioItem)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch portfolio item" }, { status: 500 })
  }
}

// PUT/UPDATE a portfolio item
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Updating portfolio item with data:", body)

    // Ensure both image and logo are included
    if (!body.image) {
      return NextResponse.json({ message: "Project image is required" }, { status: 400 })
    }

    // Update the portfolio item
    const updatedPortfolioItem = await Portfolio.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    if (!updatedPortfolioItem) {
      return NextResponse.json({ message: "Portfolio item not found" }, { status: 404 })
    }

    console.log("Portfolio item updated:", updatedPortfolioItem)
    return NextResponse.json(updatedPortfolioItem)
  } catch (error: any) {
    console.error("Error updating portfolio item:", error)
    return NextResponse.json({ message: error.message || "Failed to update portfolio item" }, { status: 500 })
  }
}

// DELETE a portfolio item
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedPortfolioItem = await Portfolio.findByIdAndDelete(params.id)

    if (!deletedPortfolioItem) {
      return NextResponse.json({ message: "Portfolio item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Portfolio item deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete portfolio item" }, { status: 500 })
  }
}
