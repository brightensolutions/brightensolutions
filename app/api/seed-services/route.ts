import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/services"

// This endpoint will seed the database with initial services
export async function GET() {
  try {
    await connectDb()

    // Check if services already exist
    const existingServices = await Service.countDocuments()

    if (existingServices > 0) {
      return NextResponse.json({
        message: "Services already exist in the database",
        count: existingServices,
      })
    }

    // Initial services data
    const initialServices = [
      {
        title: "Website Development",
        slug: "website-development",
        description: "Custom websites built with cutting-edge technology for optimal performance and user experience.",
        icon: "Code",
        image: "/images/best-website-development-comay.jpg",
        featuredProject: "BRIGHTEN SOLUTIONS PORTAL",
        content:
          "<h2>Website Development Services</h2><p>Our website development services help businesses establish a strong online presence with custom-built websites that are optimized for performance and user experience.</p><h3>What We Offer</h3><ul><li>Custom website design and development</li><li>E-commerce solutions</li><li>Content management systems</li><li>Website maintenance and support</li></ul>",
        isActive: true,
      },
      {
        title: "App Development",
        slug: "app-development",
        description:
          "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
        icon: "Smartphone",
        image: "/images/best-app-development-comapny.jpg",
        featuredProject: "CUSTOMER LOYALTY APP",
        content:
          "<h2>App Development Services</h2><p>We build mobile applications that engage users and drive business growth, with solutions for both iOS and Android platforms.</p><h3>Our Approach</h3><p>We focus on creating intuitive, user-friendly applications that solve real problems for your customers.</p>",
        isActive: true,
      },
      {
        title: "Digital Marketing",
        slug: "digital-marketing",
        description: "Boosting visibility and conversions through expert strategy and data-driven campaigns.",
        icon: "LineChart",
        image: "/images/best-digital-marketing-services.jpg",
        featuredProject: "STARTLOCK IMMOBILISERS",
        content:
          "<h2>Digital Marketing Services</h2><p>Our digital marketing services help businesses reach their target audience and achieve their marketing goals through data-driven strategies.</p><h3>Services Include</h3><ul><li>Search engine optimization (SEO)</li><li>Pay-per-click advertising (PPC)</li><li>Social media marketing</li><li>Email marketing</li><li>Content marketing</li></ul>",
        isActive: true,
      },
      {
        title: "Web Hosting",
        slug: "web-hosting",
        description: "Reliable, secure, and high-performance hosting solutions for businesses of all sizes.",
        icon: "Globe",
        image: "/images/best-web-hosting-services.jpg",
        featuredProject: "CLOUD INFRASTRUCTURE",
        content:
          "<h2>Web Hosting Services</h2><p>We provide reliable, secure, and high-performance hosting solutions for businesses of all sizes, ensuring your website is always available to your customers.</p><h3>Hosting Options</h3><ul><li>Shared hosting</li><li>VPS hosting</li><li>Dedicated servers</li><li>Cloud hosting</li></ul>",
        isActive: true,
      },
      {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Creating intuitive, engaging interfaces that delight users and drive business results.",
        icon: "Palette",
        image: "/images/best-UI-UX-Design.jpg",
        featuredProject: "E-COMMERCE REDESIGN",
        content:
          "<h2>UI/UX Design Services</h2><p>Our design team creates intuitive, engaging interfaces that delight users and drive business results through a user-centered design approach.</p><h3>Design Process</h3><ol><li>User research and analysis</li><li>Wireframing and prototyping</li><li>Visual design</li><li>Usability testing</li><li>Implementation support</li></ol>",
        isActive: true,
      },
      {
        title: "SEO Optimization",
        slug: "seo-optimization",
        description: "Improving search rankings and organic traffic through technical and content optimization.",
        icon: "Search",
        image: "/images/best-seo-marketing-services.jpg",
        featuredProject: "LOCAL BUSINESS CAMPAIGN",
        content:
          "<h2>SEO Optimization Services</h2><p>We help businesses improve their search engine rankings and increase organic traffic through technical and content optimization strategies.</p><h3>Our SEO Approach</h3><ul><li>Comprehensive site audit</li><li>Keyword research and analysis</li><li>On-page optimization</li><li>Technical SEO improvements</li><li>Content strategy and creation</li><li>Link building</li></ul>",
        isActive: true,
      },
    ]

    // Insert the services
    await Service.insertMany(initialServices)

    return NextResponse.json({
      message: "Database seeded successfully",
      count: initialServices.length,
    })
  } catch (error: any) {
    console.error("Seed error:", error)
    return NextResponse.json(
      {
        message: "Error seeding database",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
