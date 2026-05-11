import { Metadata } from "next";
import { BlogList } from "@/components/_user/blog/blog-list";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Blog | Brighten Solutions",
  description:
    "Read our latest articles and insights on web development, design, and digital marketing.",
};

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:mb-16">
        <SectionTitle
          badge="Our Blogs"
          title=""
          highlight=""
          subtitle="Insights, tips, and updates from our team of digital experts"
          titleClassName="text-gray-800"
          subtitleClassName="text-gray-600"
        />
      </div>

      <BlogList />
    </main>
  );
}
