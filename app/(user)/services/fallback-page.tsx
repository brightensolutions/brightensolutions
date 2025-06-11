import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ServiceFallbackPage() {
  return (
    <div className="bg-gradient-to-b from-brightencolor-darkcream to-brightencolor-offwhite min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 mb-8 text-brightencolor-brightenone hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Service Information</h1>
          <p className="text-xl mb-8">We're currently updating information for this service.</p>
          <p>Please check back later or contact us for more details.</p>
        </div>
      </div>
    </div>
  )
}
