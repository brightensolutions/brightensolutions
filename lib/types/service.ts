export interface Service {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  image: string
  featuredProject?: string
  content: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}
