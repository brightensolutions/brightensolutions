import { ServicesSection3D } from "@/components/_user/our-services"

export const metadata = {
  title: "Our Services | Brighten Solutions",
  description: "Explore our range of digital services designed to help your business grow and succeed online.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesSection3D />
    </div>
  )
}
