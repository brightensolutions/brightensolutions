import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import AboutHero from "@/lib/Models/about-hero"

// GET the about hero content
export async function GET() {
  try {
    await connectDb()

    // Get the hero content (there should only be one)
    let hero = await AboutHero.findOne()

    // If no hero content exists, create a default one
    if (!hero) {
      hero = await AboutHero.create({
        title: "We Are",
        titleHighlight: "Brighten Solutions",
        subtitle: "ABOUT US",
        description1:
          "Founded in 2016, Brighten Solutions has grown from a small startup to a leading digital agency. We combine technical expertise with creative thinking to deliver exceptional digital experiences that drive real business results.",
        description2:
          "Our team of experts is passionate about helping businesses thrive in the digital landscape through innovative solutions, strategic thinking, and a commitment to excellence.",
        image: "/images/about-hero.png",
        stats: [
          { value: "8+", label: "Years" },
          { value: "200+", label: "Projects" },
          { value: "50+", label: "Team Members" },
          { value: "15+", label: "Awards" },
        ],
        buttons: [
          { text: "Our Services", link: "/services", isPrimary: true },
          { text: "Contact Us", link: "/contact", isPrimary: false },
        ],
        updatedAt: new Date(),
      })
    }

    return NextResponse.json(hero)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch about hero content" }, { status: 500 })
  }
}

// PUT/UPDATE the about hero content
export async function PUT(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()

    // Find the hero content (there should only be one)
    let hero = await AboutHero.findOne()

    if (hero) {
      // Update existing hero content
      hero = await AboutHero.findByIdAndUpdate(
        hero._id,
        {
          ...body,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true },
      )
    } else {
      // Create new hero content if none exists
      hero = await AboutHero.create({
        ...body,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json(hero)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to update about hero content" }, { status: 500 })
  }
}
