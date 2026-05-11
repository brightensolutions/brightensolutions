import { AboutHero } from "@/components/_user/_about/about-hero"
import { OurStory } from "@/components/_user/_about/our-story"
import { OurTeam } from "@/components/_user/_about/our-team"
import { OurValues } from "@/components/_user/_about/our-values"
import { OurAchievements } from "@/components/_user/_about/our-achievements"
import { ClientTestimonials } from "@/components/_user/_about/client-testimonials"
import type { Metadata } from "next"
import { SectionTitle } from "@/components/ui/section-title"

export const metadata: Metadata = {
  title: "About Us | Your Company Name",
  description: "Learn about our company's story, values, team, and achievements.",
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24">
        <div className="container mx-auto px-4 mb-16">
          <SectionTitle
            badge="About Us"
            title="The Story Behind Our Success"
            highlight="Our Success"
            subtitle="Learn about our journey, our passionate team, and the values that drive us to deliver exceptional digital solutions for our clients."
            titleClassName="text-gray-800"
            subtitleClassName="text-gray-600"
          />
        </div>
        <AboutHero />
        <OurStory />
        <OurValues />
        <OurTeam />
        <div className="bg-white">
        <div
          className="elfsight-app-85d8b80b-4743-4e00-a52f-e9fda4205fad"
          data-elfsight-app-lazy
        ></div>
      </div>
        <OurAchievements />
        {/* <ClientTestimonials /> */}
        <div>
        <div
          className="elfsight-app-917e447e-05de-4153-acf6-26c14ba7a1ec"
          data-elfsight-app-lazy
        ></div>
      </div>
      </div>
    </main>
  )
}
