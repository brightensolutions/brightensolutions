"use client"

import { useEffect } from "react"
import { getVisitorTracker } from "@/lib/tracking/visitor-tracker"

export default function TrackingInitializer() {
  useEffect(() => {
    // Initialize visitor tracking
    const visitorTracker = getVisitorTracker()

    // Handle route changes for SPA navigation
    const handleRouteChange = () => {
      visitorTracker.trackPageView(window.location.pathname, document.title)
    }

    // Add event listener for Next.js route changes
    document.addEventListener("nextjs:route-change-complete", handleRouteChange)

    return () => {
      document.removeEventListener("nextjs:route-change-complete", handleRouteChange)
    }
  }, [])

  // This component doesn't render anything
  return null
}
