import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import OurStory from "@/lib/Models/our-story"

// GET the our story content
export async function GET() {
  try {
    await connectDb()

    // Get the story content (there should only be one)
    let story = await OurStory.findOne()

    // If no story content exists, create a default one
    if (!story) {
      story = await OurStory.create({
        title: "The Story Behind Our Success",
        subtitle: "OUR JOURNEY",
        description:
          "From humble beginnings to industry leadership, our journey has been defined by innovation, perseverance, and a commitment to excellence.",
        milestones: [
          {
            year: "2016",
            title: "The Beginning",
            description:
              "Brighten Solutions was founded with a vision to transform digital experiences for businesses.",
            achievements: ["First office in Mumbai", "Initial team of 5 specialists", "Focus on web development"],
            icon: "🚀",
          },
          {
            year: "2018",
            title: "Growth & Expansion",
            description: "We expanded our team and service offerings to meet growing client demands.",
            achievements: [
              "Team grew to 15 members",
              "Added mobile app development services",
              "First major corporate client",
            ],
            icon: "📈",
          },
          {
            year: "2020",
            title: "Recognition & Innovation",
            description:
              "Our work began receiving industry recognition as we pushed the boundaries of digital innovation.",
            achievements: [
              "Digital Marketing Excellence Award",
              "Expanded to 25+ team members",
              "Launched SEO department",
            ],
            icon: "🏆",
          },
          {
            year: "2022",
            title: "Global Reach",
            description: "We expanded our client base internationally and established partnerships across borders.",
            achievements: ["First international clients", "Opened second office", "Launched AI solutions department"],
            icon: "🌎",
          },
          {
            year: "2024",
            title: "Today & Beyond",
            description: "Now an established industry leader, we continue to innovate and grow our capabilities.",
            achievements: ["50+ team members", "International client portfolio", "Industry-leading digital solutions"],
            icon: "✨",
          },
        ],
        updatedAt: new Date(),
      })
    }

    return NextResponse.json(story)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Failed to fetch our story content" }, { status: 500 })
  }
}

// PUT/UPDATE the our story content
export async function PUT(req: NextRequest) {
  try {
    await connectDb()

    const body = await req.json()

    // Find the story content (there should only be one)
    let story = await OurStory.findOne()

    if (story) {
      // Update existing story content
      story = await OurStory.findByIdAndUpdate(
        story._id,
        {
          ...body,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true },
      )
    } else {
      // Create new story content if none exists
      story = await OurStory.create({
        ...body,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json(story)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to update our story content" }, { status: 500 })
  }
}
