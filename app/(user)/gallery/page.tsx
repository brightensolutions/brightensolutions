import { Suspense } from "react";
import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/gallery-grid";
import GalleryLoading from "@/components/gallery/gallery-loading";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Gallery | Our Beautiful Collection",
  description:
    "Browse through our stunning collection of images showcasing our work and inspiration.",
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto md:py-24 py-32 px-4">
      <SectionTitle
        badge="Our Gallery"
        title=""
        highlight=""
        subtitle="Browse through our stunning collection of images showcasing our work and inspiration."
        titleClassName="text-gray-800"
        subtitleClassName="text-gray-600"
      />

      <Suspense fallback={<GalleryLoading />}>
        <GalleryGrid />
      </Suspense>
    </div>
  );
}
