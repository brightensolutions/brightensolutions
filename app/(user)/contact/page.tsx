import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { OfficeLocations } from "@/components/contact/office-locations"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFaq } from "@/components/contact/contact-faq"

export const metadata: Metadata = {
  title: "Contact Us | Brighten Solutions - Web Development & Digital Services in Surat",
  description:
    "Get in touch with Brighten Solutions for web development, app development, digital marketing, and graphic design services. Visit our office in Surat or contact us online.",
  keywords:
    "contact Brighten Solutions, web development Surat, app development company, digital marketing services, graphic design Surat, e-visiting cards, SEO services Gujarat, UI/UX design, contact form, Brighten Solutions address",
  openGraph: {
    title: "Contact Brighten Solutions - Web Development & Digital Services in Surat",
    description:
      "Reach out to Brighten Solutions for all your digital needs. We're here to help transform your business with cutting-edge technology solutions.",
    images: [{ url: "/images/contact/brighten-solutions-office.jpg" }],
  },
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24">
        <ContactHero />
        <ContactInfo />
        <OfficeLocations />
        <ContactForm />
        <ContactFaq />
      </div>
    </main>
  )
}
