import ProductForm from "../product-form"

export const metadata = {
  title: "Add New Product | Admin Dashboard",
  description: "Add a new product to your website",
}

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm />
    </div>
  )
}
