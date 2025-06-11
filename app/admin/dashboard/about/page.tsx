"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import TeamMembersAdmin from "@/components/admin/about/team-members-admin"
// import AchievementsAdmin from "@/components/admin/about/achievements-admin"
// import TestimonialsAdmin from "@/components/admin/about/testimonials-admin"
import HeroAdmin from "./hero-admin"
import StoryAdmin from "./story-admin"
import ValuesAdmin from "./values-admin"
import TeamMembersAdmin from "./team-members-admin"
import AchievementsAdmin from "./achievements-admin"

export default function AboutAdminPage() {
  const [activeTab, setActiveTab] = useState("hero")

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Page Management</h1>
        <p className="text-gray-600">
          Manage your company's about page content including hero section, story, values, team members, achievements,
          and client testimonials.
        </p>
      </div>

      <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Management</CardTitle>
                <CardDescription>Manage the hero section of your about page.</CardDescription>
              </CardHeader>
              <CardContent>
                <HeroAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="story">
            <Card>
              <CardHeader>
                <CardTitle>Our Story Management</CardTitle>
                <CardDescription>Manage your company's story and timeline.</CardDescription>
              </CardHeader>
              <CardContent>
                <StoryAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="values">
            <Card>
              <CardHeader>
                <CardTitle>Company Values Management</CardTitle>
                <CardDescription>Manage your company's core values.</CardDescription>
              </CardHeader>
              <CardContent>
                <ValuesAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members Management</CardTitle>
                <CardDescription>Add, edit, or remove team members that appear on your about page.</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamMembersAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements Management</CardTitle>
                <CardDescription>Manage your company's awards and achievements.</CardDescription>
              </CardHeader>
              <CardContent>
                <AchievementsAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
                <CardDescription>Manage client testimonials that appear on your about page.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <TestimonialsAdmin /> */}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
