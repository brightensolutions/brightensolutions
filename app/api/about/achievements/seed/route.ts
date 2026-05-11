import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Achievement from "@/lib/Models/achievement"

// POST to seed initial achievements
export async function POST() {
  try {
    await connectDb()

    // Check if achievements already exist
    const existingAchievements = await Achievement.countDocuments()

    if (existingAchievements > 0) {
      return NextResponse.json({ message: "Achievements already seeded" }, { status: 200 })
    }

    // Initial achievements data
    const initialAchievements = [
      {
        title: "Digital Agency of the Year 2023",
        organization: "Digital Excellence Foundation",
        year: "2023",
        image: "/gleaming-victory-cup.png",
        icon: "trophy",
        isFeatured: true,
        description:
          "We're honored to be recognized as the Digital Agency of the Year at the prestigious Digital Excellence Awards. This award celebrates our team's dedication to creating innovative digital solutions that drive real results for our clients across industries.",
        category: "Agency Excellence",
        order: 0,
        isActive: true,
      },
      {
        title: "Best Digital Agency 2023",
        organization: "Digital Excellence Awards",
        year: "2023",
        image: "/gleaming-digital-award.png",
        icon: "trophy",
        isFeatured: false,
        description: "Recognized for our outstanding digital services and client results.",
        category: "Agency Excellence",
        order: 1,
        isActive: true,
      },
      {
        title: "Innovation in Web Design",
        organization: "Web Design Global Awards",
        year: "2022",
        image: "/abstract-web-award.png",
        icon: "award",
        isFeatured: false,
        description: "Awarded for our innovative approach to web design and user experience.",
        category: "Design",
        order: 2,
        isActive: true,
      },
      {
        title: "Top Mobile App Developer",
        organization: "Mobile Excellence Recognition",
        year: "2022",
        image: "/digital-excellence-award.png",
        icon: "star",
        isFeatured: false,
        description: "Recognized for our exceptional mobile app development capabilities.",
        category: "Development",
        order: 3,
        isActive: true,
      },
      {
        title: "SEO & Digital Marketing Award",
        organization: "Marketing Innovation Summit",
        year: "2021",
        image: "/golden-achievement.png",
        icon: "certificate",
        isFeatured: false,
        description: "Awarded for our effective SEO and digital marketing strategies.",
        category: "Marketing",
        order: 4,
        isActive: true,
      },
      {
        title: "Best E-commerce Solution",
        organization: "E-commerce Excellence Awards",
        year: "2021",
        image: "/placeholder.svg?height=192&width=384&query=ecommerce award",
        icon: "medal",
        isFeatured: false,
        description: "Recognized for our innovative e-commerce solutions and implementations.",
        category: "E-commerce",
        order: 5,
        isActive: true,
      },
      {
        title: "Emerging Technology Leader",
        organization: "Tech Innovators Association",
        year: "2020",
        image: "/placeholder.svg?height=192&width=384&query=technology award",
        icon: "crown",
        isFeatured: false,
        description: "Awarded for our leadership in adopting and implementing emerging technologies.",
        category: "Technology",
        order: 6,
        isActive: true,
      },
    ]

    // Insert achievements
    await Achievement.insertMany(initialAchievements)

    return NextResponse.json(
      { message: "Achievements seeded successfully", count: initialAchievements.length },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ message: error.message || "Failed to seed achievements" }, { status: 500 })
  }
}
