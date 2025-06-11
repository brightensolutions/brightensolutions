import type React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectDb from "@/lib/db/db";
import Service from "@/lib/Models/services";
import { log } from "console";
import { SectionTitle } from "@/components/ui/section-title";

// Define the icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Code: "Code",
  Smartphone: "Smartphone",
  LineChart: "LineChart",
  Globe: "Globe",
  Palette: "Palette",
  Search: "Search",
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  await connectDb();
  console.log("slug", params.slug);
  const service = await Service.findOne({ slug: params.slug });
  console.log("service", service);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  return {
    title: `${service.title} | Our Services`,
    description: service.description,
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  await connectDb();
  const services = await Service.find({}, { slug: 1 });

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    await connectDb();
    const service = await Service.findOne({ slug: params.slug });
    const fullTitle = service.title || "";
    const [firstWord, ...restWords] = fullTitle.split(" ");
    const title = firstWord;
    const highlight = restWords.join(" ");

    if (!service) {
      notFound();
    }

    return (
      <div className="bg-gradient-to-b from-brightencolor-darkcream to-brightencolor-offwhite min-h-screen relative">
        <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#F66526]/10 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F2502C]/10 blur-[150px]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
      </div>

        <div className="container mx-auto px-4 py-20">
          <div>
            <SectionTitle
              badge="Services"
              title={title + " " + highlight}
              highlight={highlight}
              subtitle={service.description}
              titleClassName="text-gray-800"
              subtitleClassName="text-gray-600"
            />
          </div>

          <Link
            href="/services"
            className="inline-flex relative items-center gap-2 mb-8 text-brightencolor-brightenone hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-1 items-center justify-center mb-16">
            <div className="relative h-[400px] w-[800px] m-auto  rounded-2xl overflow-hidden">
              <Image
                src={
                  service.image ||
                  "/placeholder.svg?height=400&width=600&query=service"
                }
                alt={service.title}
                fill
                className="object-cover m-auto"
              />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: service.content || "<p>Content coming soon...</p>",
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Return a fallback UI
    return (
      <div className="bg-gradient-to-b from-brightencolor-darkcream to-brightencolor-offwhite min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mb-8 text-brightencolor-brightenone hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Service Information</h1>
            <p className="text-xl mb-8">
              We're currently updating information for this service.
            </p>
            <p>Please check back later or contact us for more details.</p>
          </div>
        </div>
      </div>
    );
  }
}
