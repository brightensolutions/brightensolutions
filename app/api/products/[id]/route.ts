import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"

// GET a single product by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const product = await Product.findById(params.id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch product" }, { status: 500 })
  }
}

// PUT/UPDATE a product
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const body = await req.json()
    console.log("Updating product with data:", body)

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    console.log("Product updated:", updatedProduct)
    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error("Error updating product:", error)
    return NextResponse.json({ message: error.message || "Failed to update product" }, { status: 500 })
  }
}

// DELETE a product
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb()

    const deletedProduct = await Product.findByIdAndDelete(params.id)

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to delete product" }, { status: 500 })
  }
}
