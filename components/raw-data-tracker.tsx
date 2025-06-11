"use client"

import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { collectAllRawData } from "@/lib/tracking/raw-data-collector"

// Constants for localStorage keys
const VISITOR_ID_KEY = "brighten_visitor_id"
const VISIT_COUNT_KEY = "brighten_visit_count"
const FIRST_VISIT_KEY = "brighten_first_visit"
const LAST_VISIT_KEY = "brighten_last_visit"

export default function RawDataTracker() {
  useEffect(() => {
    // Initialize tracking data
    initTracker()

    // Send data immediately on page load
    sendDataToServer()

    // Set up interval to send data periodically
    const interval = setInterval(sendDataToServer, 30000) // Every 30 seconds

    // Clean up on unmount
    return () => clearInterval(interval)
  }, [])

  // Initialize basic tracking data
  const initTracker = () => {
    if (typeof window === "undefined") return

    try {
      // Get or create visitor ID
      let visitorId = localStorage.getItem(VISITOR_ID_KEY)
      if (!visitorId) {
        visitorId = uuidv4()
        localStorage.setItem(VISITOR_ID_KEY, visitorId)
      }

      // Get or set first visit date
      let firstVisit = localStorage.getItem(FIRST_VISIT_KEY)
      if (!firstVisit) {
        firstVisit = new Date().toISOString()
        localStorage.setItem(FIRST_VISIT_KEY, firstVisit)
      }

      // Update last visit date
      const now = new Date().toISOString()
      localStorage.setItem(LAST_VISIT_KEY, now)

      // Update visit count
      let visitCount = Number.parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10)
      visitCount += 1
      localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString())
    } catch (e) {
      console.error("Error initializing tracker:", e)
    }
  }

  // Send all data to server
  const sendDataToServer = async () => {
    if (typeof window === "undefined") return

    try {
      // Get visitor ID
      const visitorId = localStorage.getItem(VISITOR_ID_KEY)
      if (!visitorId) return

      // Get basic tracking data
      const firstVisit = localStorage.getItem(FIRST_VISIT_KEY) || new Date().toISOString()
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY) || new Date().toISOString()
      const visitCount = Number.parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "1", 10)

      // Collect ALL raw data from browser storage
      const rawStorageData = collectAllRawData()

      // Prepare visitor data
      const visitorData = {
        visitorId,
        firstVisit,
        lastVisit,
        visitCount,
        pagesVisited: [
          {
            path: window.location.pathname,
            title: document.title,
            visitedAt: new Date().toISOString(),
          },
        ],
        referrer: document.referrer || "",
        // Include ALL raw storage data
        rawStorageData,
      }

      // Send data to server
      await fetch("/api/tracking/raw-visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorData),
        keepalive: true,
      })
    } catch (e) {
      console.error("Error sending data to server:", e)
    }
  }

  // This component doesn't render anything
  return null
}
