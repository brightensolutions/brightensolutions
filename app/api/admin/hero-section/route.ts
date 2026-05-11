import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import HeroSection from "@/lib/Models/heroSection"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET - Fetch hero section data
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get the active hero section or the most recent one
    const heroSection = await HeroSection.findOne({ isActive: true }).sort({ updatedAt: -1 })

    if (!heroSection) {
      // If no hero section exists, create a default one
      const defaultHeroSection = new HeroSection({
        title: "Brighten Solutions",
        description:
          "We are leading award-winning digital marketing agency and inbound marketing experts since 2016. We deliver solutions that are at the intersection of business goals & user goals but are always led by great design.",
        buttonText: "Start exploring",
        buttonLink: "/services",
        heroImage: "/brightensolution/hero-image.png",
        services: [
          { text: "Custom Software Company in Surat", order: 0 },
          { text: "Website Development", order: 1 },
          { text: "Digital Marketing", order: 2 },
          { text: "Application Development", order: 3 },
          { text: "SEO Optimization", order: 4 },
        ],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com", order: 0 },
          { platform: "facebook", url: "https://facebook.com", order: 1 },
          { platform: "linkedin", url: "https://linkedin.com", order: 2 },
          { platform: "whatsapp", url: "https://whatsapp.com", order: 3 },
        ],
        clientSection: {
          title: "WHO WE WORK WITH",
          enabled: true,
        },
        clientLogos: [
          { name: "Daga Group", logoUrl: "/brightensolution/client-logos/daga-group.webp", order: 0 },
          { name: "Hanuman Textiles", logoUrl: "/brightensolution/client-logos/hanuman-textiles.png", order: 1 },
          { name: "Hare Krishna", logoUrl: "/brightensolution/client-logos/hare-krishna.png", order: 2 },
          { name: "Larsen & Turbo", logoUrl: "/brightensolution/client-logos/lt-logo.webp", order: 3 },
          { name: "M4M", logoUrl: "/brightensolution/client-logos/m4m.png", order: 4 },
          { name: "Maruti", logoUrl: "/brightensolution/client-logos/maruti.png", order: 5 },
        ],
      })

      await defaultHeroSection.save()
      return NextResponse.json({ success: true, data: defaultHeroSection })
    }

    return NextResponse.json({ success: true, data: heroSection })
  } catch (error: any) {
    console.error("Error fetching hero section:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch hero section" },
      { status: 500 },
    )
  }
}

// POST - Update hero section data
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    // Verify admin authentication
    const token = req.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const data = await req.json()

    // Create a new hero section
    const newHeroSection = new HeroSection(data)
    await newHeroSection.save()

    // Set all other hero sections to inactive if this one is active
    if (data.isActive) {
      await HeroSection.updateMany({ _id: { $ne: newHeroSection._id } }, { isActive: false })
    }

    return NextResponse.json({ success: true, data: newHeroSection })
  } catch (error: any) {
    console.error("Error updating hero section:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero section" },
      { status: 500 },
    )
  }
}

// PUT - Update existing hero section
export async function PUT(req: NextRequest) {
  try {
    await connectDb()

    // Verify admin authentication
    const token = req.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const data = await req.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json({ success: false, error: "Hero section ID is required" }, { status: 400 })
    }

    const updatedHeroSection = await HeroSection.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedHeroSection) {
      return NextResponse.json({ success: false, error: "Hero section not found" }, { status: 404 })
    }

    // Set all other hero sections to inactive if this one is active
    if (updateData.isActive) {
      await HeroSection.updateMany({ _id: { $ne: id } }, { isActive: false })
    }

    return NextResponse.json({ success: true, data: updatedHeroSection })
  } catch (error: any) {
    console.error("Error updating hero section:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero section" },
      { status: 500 },
    )
  }
}

// DELETE - Delete hero section
export async function DELETE(req: NextRequest) {
  try {
    await connectDb()

    // Verify admin authentication
    const token = req.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Hero section ID is required" }, { status: 400 })
    }

    const deletedHeroSection = await HeroSection.findByIdAndDelete(id)

    if (!deletedHeroSection) {
      return NextResponse.json({ success: false, error: "Hero section not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deletedHeroSection })
  } catch (error: any) {
    console.error("Error deleting hero section:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete hero section" },
      { status: 500 },
    )
  }
}
