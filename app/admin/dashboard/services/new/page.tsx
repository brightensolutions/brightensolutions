import ServiceForm from "../../../../../components/admin/service-form";


export const metadata = {
  title: "Add New Service | Admin Dashboard",
  description: "Add a new service to your website",
}

export default function NewServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Service</h1>
      <ServiceForm />
    </div>
  )
}
