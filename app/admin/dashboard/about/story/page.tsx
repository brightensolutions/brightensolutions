"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StoryAdmin from "../story-admin"

export default function AboutHeroAdminPage() {
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Hero Management</h1>
        <p className="text-gray-600">
          Manage the hero section of your about page including title, description, image, statistics, and buttons.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section Content</CardTitle>
          <CardDescription>Edit the content that appears in the hero section of your about page.</CardDescription>
        </CardHeader>
        <CardContent>
          <StoryAdmin />
        </CardContent>
      </Card>
    </div>
  )
}
