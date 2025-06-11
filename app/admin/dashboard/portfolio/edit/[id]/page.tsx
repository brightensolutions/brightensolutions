import { notFound } from "next/navigation"
import PortfolioForm from "../../portfolio-form"
import connectDb from "@/lib/db/db"
import Portfolio from "@/lib/Models/portfolio"

export const metadata = {
  title: "Edit Portfolio Item | Admin Dashboard",
  description: "Edit an existing portfolio item",
}

async function EditPortfolioPage({ params }: { params: { id: string } }) {
  await connectDb()
  const portfolioItem = await Portfolio.findById(params.id)

  if (!portfolioItem) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Portfolio Item: {portfolioItem.title}</h1>
      <PortfolioForm portfolioData={JSON.parse(JSON.stringify(portfolioItem))} />
    </div>
  )
}

export default EditPortfolioPage;