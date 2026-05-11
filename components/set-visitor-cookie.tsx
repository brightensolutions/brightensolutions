"use client"

import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export default function SetVisitorCookie() {
  useEffect(() => {
    // Check if visitor ID cookie exists
    const visitorId = getCookie("visitor_id")

    // If not, set a new one
    if (!visitorId) {
      const newVisitorId = uuidv4()
      setCookie("visitor_id", newVisitorId, 365) // 1 year expiry
    }
  }, [])

  // Helper to get cookie
  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1)
      }
    }
    return null
  }

  // Helper to set cookie
  const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === "undefined") return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // This component doesn't render anything
  return null
}
