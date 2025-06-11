import PortfolioForm from "../portfolio-form"

export const metadata = {
  title: "Add New Portfolio Item | Admin Dashboard",
  description: "Add a new portfolio item to your website",
}

export default function NewPortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Portfolio Item</h1>
      <PortfolioForm />
    </div>
  )
}
