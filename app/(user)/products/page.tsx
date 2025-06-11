import { ProductsSection } from "@/components/admin/products-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Products | IT Solutions",
  description: "Explore our comprehensive range of IT products designed to help your business grow and succeed.",
}

export default function ProductsPage() {
  return <ProductsSection />
}
