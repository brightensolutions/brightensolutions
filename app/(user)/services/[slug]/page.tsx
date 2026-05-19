import type React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectDb from "@/lib/db/db";
import Service from "@/lib/Models/services";
import { SectionTitle } from "@/components/ui/section-title";

// 1. Define the TypeScript interface matching your MongoDB Document
interface IServiceDocument {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  featuredProject?: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sequence?: number;
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Helper to safely serialize MongoDB BSON objects (like _id) to clean JSON strings
function serializeDoc<T>(doc: T): T | null {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    await connectDb();
    
    const decodedSlug = decodeURIComponent(resolvedParams.slug);
    // Cast to unknown first then to document type to resolve the Mongoose union type bug
    const rawService = (await Service.findOne({ slug: decodedSlug }).lean()) as unknown as IServiceDocument | null;

    if (!rawService) {
      return {
        title: "Service Not Found",
        description: "The requested service could not be found",
      };
    }

    return {
      title: `${rawService.title} | Our Services`,
      description: rawService.description || "",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Our Services" };
  }
}

// Generate static params for build-time generation
export async function generateStaticParams() {
  try {
    await connectDb();
    const services = await Service.find({ isActive: true }, { slug: 1 }).lean();

    return services.map((service: any) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;

  try {
    await connectDb();
    
    const decodedSlug = decodeURIComponent(resolvedParams.slug);
    // Explicitly cast the query output to override the rigid Mongoose structural type error
    const rawService = (await Service.findOne({ 
      slug: decodedSlug,
      isActive: true 
    }).lean()) as unknown as IServiceDocument | null;

    // Guard clause directly after data fetch
    if (!rawService) {
      notFound();
    }

    // Safely serialize database records for Server Component injection
    const service = serializeDoc(rawService) as IServiceDocument;

    // Destructure text variations smoothly
    const fullTitle = service.title || "";
    const [firstWord, ...restWords] = fullTitle.split(" ");
    const title = firstWord;
    const highlight = restWords.join(" ");

    return (
      <div className="bg-gradient-to-b from-brightencolor-darkcream to-brightencolor-offwhite min-h-screen relative">
        {/* Background Visual Enhancements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#F66526]/10 blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F2502C]/10 blur-[150px]"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div>
            <SectionTitle
              badge="Services"
              title={fullTitle}
              highlight={highlight}
              subtitle={service.description}
              titleClassName="text-gray-800"
              subtitleClassName="text-gray-600"
            />
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 mb-8 text-brightencolor-brightenone hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          {/* Core Service Layout Cover Image */}
          <div className="flex items-center justify-center mb-16">
            <div className="relative h-[400px] w-full max-w-[800px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src={service.image || "/placeholder.svg?height=400&width=800&query=service"}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Optional Featured Project Spotlight banner */}
          {service.featuredProject && (
            <div className="max-w-3xl mx-auto mb-10 p-5 bg-orange-50 border border-orange-200 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">Featured Project</span>
              <p className="text-gray-800 font-semibold text-lg">{service.featuredProject}</p>
            </div>
          )}

          {/* HTML Rich-Text Render Process */}
          <div className="prose prose-lg max-w-3xl mx-auto dark:prose-invert">
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
    console.error("Database or Page Rendering Error:", error);
    
    // Fallback UI to gracefully capture execution context issues
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
            <p className="text-xl mb-8 text-gray-600">
              We're currently updating information for this service.
            </p>
            <p className="text-gray-400">Please check back later or contact us for more details.</p>
          </div>
        </div>
      </div>
    );
  }
}