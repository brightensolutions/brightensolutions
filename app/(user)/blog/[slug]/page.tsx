import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string) {
  try {
    // Log the URL being fetched for debugging
    // Construct a proper absolute URL
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");
    const url = new URL(`/api/blog/slug/${slug}`, baseUrl).toString();
    console.log("Fetching blog post from:", url);

    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Failed to fetch blog post:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    // Await params before using them
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: post.metaTitle || post.title,
      description:
        post.metaDescription ||
        post.excerpt ||
        post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
      openGraph: {
        title: post.metaTitle || post.title,
        description:
          post.metaDescription ||
          post.excerpt ||
          post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
        images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Brighten Solutions Blog",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params before using them
  const { slug } = await params;
  console.log("Rendering blog post page for slug:", slug);
  const post = await getBlogPost(slug);

  if (!post) {
    console.log("Blog post not found, returning 404");
    notFound();
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article>
          <div className="mb-16">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </time>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>

              {post.category && (
                <Badge variant="secondary">{post.category.name}</Badge>
              )}
            </div>
          </div>

          {post.featuredImage && (
            <div className="mb-8 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="border-t pt-6 mt-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-semibold mb-3">Share this article</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
