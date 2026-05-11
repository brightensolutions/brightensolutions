"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getVisitorTracker } from "@/lib/tracking/visitor-tracker"

const CONSENT_SHOWN_KEY = "brighten_consent_shown"

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent banner has been shown before
    const hasShownBanner = localStorage.getItem(CONSENT_SHOWN_KEY) === "true"

    if (!hasShownBanner) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    const visitorTracker = getVisitorTracker()
    visitorTracker.setConsent(true)
    localStorage.setItem(CONSENT_SHOWN_KEY, "true")
    setIsVisible(false)
  }

  const handleDecline = () => {
    const visitorTracker = getVisitorTracker()
    visitorTracker.setConsent(false)
    localStorage.setItem(CONSENT_SHOWN_KEY, "true")
    setIsVisible(false)
  }

  const handleClose = () => {
    localStorage.setItem(CONSENT_SHOWN_KEY, "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6 animate-slide-up">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
            <p className="text-gray-600">
              We use cookies and similar technologies to enhance your browsing experience, personalize content, and
              analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleDecline} className="whitespace-nowrap">
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="whitespace-nowrap bg-brightencolor-brightenone hover:bg-brightencolor-brightenone/90"
            >
              Accept Cookies
            </Button>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
