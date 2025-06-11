import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { CalendarIcon, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: string
    excerpt?: string
    content?: string
    featuredImage?: string
    category?: {
      _id: string
      name: string
      slug: string
    }
    tags?: string[]
    createdAt: string
    isFeatured?: boolean
    // Add these fields to match the BlogList component's expected structure
    coverImage?: string
    author?: {
      name: string
      avatar?: string
    }
    publishedAt?: string
    readingTime?: string
  }
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  // Use content only if excerpt is not available
  const excerpt = post.excerpt || (post.content ? post.content.substring(0, 150).replace(/<[^>]*>/g, "") + "..." : "")

  // Use the appropriate image field (featuredImage or coverImage)
  const imageUrl = post.featuredImage || post.coverImage || "/placeholder.svg"

  // Use the appropriate date field (createdAt or publishedAt)
  const dateString = post.createdAt || post.publishedAt || new Date().toISOString()

  // Log the post data for debugging
  // console.log("Rendering BlogCard for:", post.title, "with slug:", post.slug)

  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-muted/30 rounded-xl overflow-hidden">
        <div className="lg:col-span-3 h-[300px] lg:h-auto relative">
          {imageUrl ? (
            <Image src={imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No featured image</p>
            </div>
          )}
          <Badge className="absolute top-4 left-4 bg-primary text-white">Featured</Badge>
        </div>
        <div className="lg:col-span-2 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(dateString), { addSuffix: true })}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4" />
            <span>{post.readingTime || "5 min read"}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
          <p className="text-muted-foreground mb-6">{excerpt}</p>
          <div className="mt-auto">
            <Link href={`/blog/${post.slug}`}>
              <Button>Read Article</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 relative">
        {imageUrl ? (
          <Image src={imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDistanceToNow(new Date(dateString), { addSuffix: true })}</span>
        </div>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {post.tags &&
            post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
