import { ExperienceSection } from "@/components/_user/experience-section";
import { FAQSection } from "@/components/_user/faq-section";
import { HeroSection } from "@/components/_user/hero-section";
import { OurProductsSection } from "@/components/_user/our-products-section";
import { ServicesSection3D } from "@/components/_user/our-services";
import { PlatformReviews } from "@/components/_user/platform-reviews";
import { PremiumApiServices } from "@/components/_user/premium-api-services";
import { ProcessSection } from "@/components/_user/process-section";
import { TechnologiesSection } from "@/components/_user/technologies-section";
import TestimonialsSection from "@/components/_user/testimonials-section";
import { ProductsSection } from "@/components/admin/products-section";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <ServicesSection3D />
      <ProductsSection />
      <div className="bg-white">
        <div className="pt-6 text-center">
          <h2 className="mb-4 inline-block font-roboto-slab text-brightencolor-brightenone md:text-5xl text-5xl font-bold">
            What Our Clients Say About Us
          </h2>
          <div className="h-1 w-24 bg-brightencolor-brightentwo mx-auto mb-4"></div>
        </div>
        <div
          className="elfsight-app-85d8b80b-4743-4e00-a52f-e9fda4205fad"
          data-elfsight-app-lazy
        ></div>
      </div>
      <PremiumApiServices/>
      <PlatformReviews />
      <ExperienceSection />
      <TechnologiesSection />
      <ProcessSection />
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <div>
        <div
          className="elfsight-app-917e447e-05de-4153-acf6-26c14ba7a1ec"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
}
