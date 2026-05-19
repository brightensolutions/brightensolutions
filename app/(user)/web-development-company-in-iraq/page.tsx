// app/web-development-company-in-usa/page.tsx

import { AboutHero } from "@/components/_user/_about/about-hero";
import { OurValues } from "@/components/_user/_about/our-values";
import { OurAchievements } from "@/components/_user/_about/our-achievements";
import { SectionTitle } from "@/components/ui/section-title";
import { ServicesSection3D } from "@/components/_user/our-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Company in USA | Brighten Solutions",
  description:
    "Brighten Solutions provides professional web development, app development, SEO, and digital marketing services in USA.",
};

export default function USAPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24">
        <div className="container mx-auto px-4 mb-16">
          <SectionTitle
            badge="USA"
            title="Web Development Company in USA"
            highlight="USA"
            subtitle="Brighten Solutions delivers high-quality website development, app development, SEO, and digital marketing services for businesses in USA."
            titleClassName="text-gray-800"
            subtitleClassName="text-gray-600"
          />
        </div>

        <AboutHero />
        <OurValues />
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