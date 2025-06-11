import { notFound } from "next/navigation"
import ProductForm from "../../product-form"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"

export const metadata = {
  title: "Edit Product | Admin Dashboard",
  description: "Edit an existing product",
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  await connectDb()
  const product = await Product.findById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Product: {product.title}</h1>
      <ProductForm productData={JSON.parse(JSON.stringify(product))} />
    </div>
  )
}
