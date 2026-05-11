import { AboutHero } from "@/components/_user/_about/about-hero";
import { OurStory } from "@/components/_user/_about/our-story";
import { OurTeam } from "@/components/_user/_about/our-team";
import { OurValues } from "@/components/_user/_about/our-values";
import { OurAchievements } from "@/components/_user/_about/our-achievements";
import { SectionTitle } from "@/components/ui/section-title";
import { ServicesSection3D } from "@/components/_user/our-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Company in Dubai | Brighten Solutions",
  description:
    "Brighten Solutions provides professional web development, app development, SEO, and digital marketing services in Dubai.",
};

export default function DubaiPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24">
        <div className="container mx-auto px-4 mb-16">
          <SectionTitle
            badge="Dubai"
            title="Web Development Company in Dubai"
            highlight="Dubai"
            subtitle="Brighten Solutions delivers high-quality website development, app development, SEO, and digital marketing services for businesses in Dubai."
            titleClassName="text-gray-800"
            subtitleClassName="text-gray-600"
          />
        </div>

        <AboutHero />
        {/* <OurStory /> */}
        <OurValues />
        {/* <OurTeam /> */}
        <ServicesSection3D />

        <div className="bg-white">
          <div
            className="elfsight-app-85d8b80b-4743-4e00-a52f-e9fda4205fad"
            data-elfsight-app-lazy
          ></div>
        </div>

        <OurAchievements />

        <div>
          <div
            className="elfsight-app-917e447e-05de-4153-acf6-26c14ba7a1ec"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </main>
  );
}