import { notFound } from "next/navigation"
import ServiceForm from "@/components/admin/service-form"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/services"

export const metadata = {
  title: "Edit Service | Admin Dashboard",
  description: "Edit an existing service",
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  await connectDb()
  const service = await Service.findById(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Service: {service.title}</h1>
      <ServiceForm serviceData={JSON.parse(JSON.stringify(service))} />
    </div>
  )
}
