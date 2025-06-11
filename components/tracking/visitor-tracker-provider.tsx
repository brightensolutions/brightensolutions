"use client"

import type React from "react"

import { useEffect } from "react"
import { getVisitorTracker } from "@/lib/tracking/visitor-tracker"

export default function VisitorTrackerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize visitor tracking
    const initializeTracker = async () => {
      try {
        const visitorTracker = getVisitorTracker()
        await visitorTracker.initialize()
      } catch (error) {
        console.error("Error initializing visitor tracker:", error)
      }
    }

    initializeTracker()
  }, [])

  return <>{children}</>
}
