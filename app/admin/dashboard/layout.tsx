"use client"

import type React from "react"

import { useEffect, useState } from "react"
import AdminSidebar from "./sidebar"
import AdminHeader from "./header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("brightensolutionadmin")

        if (!token) {
          // No token found, redirect to login
          window.location.href = "/admin/login"
          return
        }

        // Verify token with backend
        const response = await fetch("/api/admin/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          // Invalid token, clear and redirect
          localStorage.removeItem("brightensolutionadmin")
          window.location.href = "/admin/login"
          return
        }

        const data = await response.json()
        setUser(data.user)
        setLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        // On error, redirect to login
        localStorage.removeItem("brightensolutionadmin")
        window.location.href = "/admin/login"
      }
    }

    checkAuth()
  }, [])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-cream">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-brightenone border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
