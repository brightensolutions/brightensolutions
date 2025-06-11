/**
 * Visitor tracking functionality
 */
import { v4 as uuidv4 } from "uuid"
import { collectAllStorageData } from "./data-collector"
import { getBrowserInfo } from "./browser-detector"

const VISITOR_ID_KEY = "brighten_visitor_id"
const CONSENT_KEY = "brighten_consent"
const VISIT_COUNT_KEY = "brighten_visit_count"
const FIRST_VISIT_KEY = "brighten_first_visit"
const LAST_VISIT_KEY = "brighten_last_visit"

interface VisitorData {
  visitorId: string
  firstVisit: Date
  lastVisit: Date
  visitCount: number
  pagesVisited: Array<{
    path: string
    title: string
    visitedAt: Date
    timeSpent?: number
  }>
  referrer?: string
  device?: {
    browser: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
    screenResolution: string
  }
  location?: {
    country?: string
    region?: string
    city?: string
    timezone?: string
  }
  contactInfo?: {
    email?: string
    name?: string
    phone?: string
  }
  hasConsent: boolean
  consentDate?: Date
  storageData: {
    cookies: Record<string, string>
    localStorage: Record<string, string>
    sessionStorage: Record<string, string>
  }
}

class VisitorTracker {
  private visitorId: string
  private firstVisit: Date
  private lastVisit: Date
  private visitCount: number
  private pagesVisited: Array<{
    path: string
    title: string
    visitedAt: Date
    timeSpent?: number
  }>
  private referrer: string
  private device: any
  private consentGiven: boolean
  private consentDate?: Date
  private pageEntryTime: number
  private currentPath: string
  private currentTitle: string
  private syncInterval: NodeJS.Timeout | null = null

  constructor() {
    // Initialize with default values
    this.visitorId = ""
    this.firstVisit = new Date()
    this.lastVisit = new Date()
    this.visitCount = 1
    this.pagesVisited = []
    this.referrer = ""
    this.device = {}
    this.consentGiven = false
    this.pageEntryTime = Date.now()
    this.currentPath = ""
    this.currentTitle = ""

    // Initialize visitor data
    this.initVisitor()
  }

  /**
   * Initialize visitor data
   */
  private initVisitor(): void {
    if (typeof window === "undefined") return

    try {
      // Get or create visitor ID
      let visitorId = localStorage.getItem(VISITOR_ID_KEY)
      if (!visitorId) {
        visitorId = uuidv4()
        localStorage.setItem(VISITOR_ID_KEY, visitorId)
      }
      this.visitorId = visitorId

      // Get or set first visit date
      let firstVisit = localStorage.getItem(FIRST_VISIT_KEY)
      if (!firstVisit) {
        firstVisit = new Date().toISOString()
        localStorage.setItem(FIRST_VISIT_KEY, firstVisit)
      }
      this.firstVisit = new Date(firstVisit)

      // Update last visit date
      const now = new Date()
      localStorage.setItem(LAST_VISIT_KEY, now.toISOString())
      this.lastVisit = now

      // Update visit count
      let visitCount = Number.parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10)
      visitCount += 1
      localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString())
      this.visitCount = visitCount

      // Get referrer
      this.referrer = document.referrer || ""

      // Get device info
      this.device = getBrowserInfo()

      // Get consent status
      const consent = localStorage.getItem(CONSENT_KEY)
      this.consentGiven = consent === "true"
      if (this.consentGiven) {
        const consentDateStr = localStorage.getItem(CONSENT_KEY + "_date")
        if (consentDateStr) {
          this.consentDate = new Date(consentDateStr)
        }
      }

      // Track current page
      this.currentPath = window.location.pathname
      this.currentTitle = document.title
      this.trackPageView(this.currentPath, this.currentTitle)

      // Set up event listeners
      this.setupEventListeners()

      // Start periodic sync
      this.startPeriodicSync()
    } catch (e) {
      console.error("Error initializing visitor tracker:", e)
    }
  }

  /**
   * Set up event listeners for page visibility and beforeunload
   */
  private setupEventListeners(): void {
    if (typeof window === "undefined") return

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.recordTimeOnPage()
      } else {
        this.pageEntryTime = Date.now()
      }
    })

    // Track page unload
    window.addEventListener("beforeunload", () => {
      this.recordTimeOnPage()
      this.syncVisitorData()
    })

    // Track history changes (for SPA)
    window.addEventListener("popstate", () => {
      this.recordTimeOnPage()
      setTimeout(() => {
        const newPath = window.location.pathname
        const newTitle = document.title
        if (newPath !== this.currentPath) {
          this.currentPath = newPath
          this.currentTitle = newTitle
          this.trackPageView(newPath, newTitle)
        }
      }, 100)
    })
  }

  /**
   * Start periodic sync of visitor data to server
   */
  private startPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    // Sync every 30 seconds
    this.syncInterval = setInterval(() => {
      this.syncVisitorData()
    }, 30000)
  }

  /**
   * Record time spent on current page
   */
  private recordTimeOnPage(): void {
    if (!this.currentPath) return

    const timeSpent = Math.floor((Date.now() - this.pageEntryTime) / 1000)
    if (timeSpent < 1) return

    // Update time spent on the current page
    const currentPageIndex = this.pagesVisited.findIndex((p) => p.path === this.currentPath && !p.timeSpent)

    if (currentPageIndex !== -1) {
      this.pagesVisited[currentPageIndex].timeSpent = timeSpent
    }

    // Reset page entry time
    this.pageEntryTime = Date.now()
  }

  /**
   * Track a page view
   */
  public trackPageView(path: string, title: string): void {
    this.pagesVisited.push({
      path,
      title,
      visitedAt: new Date(),
    })

    // Limit the number of stored page visits to prevent excessive memory usage
    if (this.pagesVisited.length > 100) {
      this.pagesVisited = this.pagesVisited.slice(-100)
    }

    // Reset page entry time
    this.pageEntryTime = Date.now()
    this.currentPath = path
    this.currentTitle = title

    // Sync data to server
    this.syncVisitorData()
  }

  /**
   * Set user consent preference
   * @param consent Boolean indicating if user gave consent
   */
  public setConsent(consent: boolean): void {
    this.consentGiven = consent
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CONSENT_KEY, String(consent))
        if (consent) {
          const now = new Date()
          this.consentDate = now
          localStorage.setItem(CONSENT_KEY + "_date", now.toISOString())
        }
        // Sync data to server immediately after consent change
        this.syncVisitorData()
      } catch (e) {
        console.error("Error saving consent status:", e)
      }
    }
  }

  /**
   * Check if user has given consent
   * @returns Boolean indicating consent status
   */
  public hasConsent(): boolean {
    return this.consentGiven
  }

  /**
   * Set contact information for the visitor
   */
  public setContactInfo(name?: string, email?: string, phone?: string): void {
    if (typeof window !== "undefined") {
      try {
        const contactInfo = { name, email, phone }
        localStorage.setItem("brighten_contact_info", JSON.stringify(contactInfo))
        // Sync data to server immediately after contact info change
        this.syncVisitorData()
      } catch (e) {
        console.error("Error saving contact info:", e)
      }
    }
  }

  /**
   * Get visitor data
   */
  public getVisitorData(): VisitorData {
    // Record time on current page before getting data
    this.recordTimeOnPage()

    // Get contact info from localStorage
    let contactInfo = {}
    try {
      const contactInfoStr = localStorage.getItem("brighten_contact_info")
      if (contactInfoStr) {
        contactInfo = JSON.parse(contactInfoStr)
      }
    } catch (e) {
      console.error("Error parsing contact info:", e)
    }

    // Get all storage data if consent is given
    const storageData = this.consentGiven
      ? collectAllStorageData()
      : {
          cookies: {},
          localStorage: {},
          sessionStorage: {},
        }

    return {
      visitorId: this.visitorId,
      firstVisit: this.firstVisit,
      lastVisit: this.lastVisit,
      visitCount: this.visitCount,
      pagesVisited: this.pagesVisited,
      referrer: this.referrer,
      device: this.device,
      hasConsent: this.consentGiven,
      consentDate: this.consentDate,
      contactInfo: contactInfo as any,
      storageData,
    }
  }

  /**
   * Sync visitor data to server
   */
  public syncVisitorData(): void {
    if (typeof window === "undefined") return

    try {
      const visitorData = this.getVisitorData()

      // Send data to server
      fetch("/api/tracking/visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorData),
        // Use keepalive to ensure the request completes even if the page is unloading
        keepalive: true,
      }).catch((error) => {
        console.error("Error syncing visitor data:", error)
      })
    } catch (e) {
      console.error("Error preparing visitor data for sync:", e)
    }
  }
}

// Singleton instance
let visitorTracker: VisitorTracker

/**
 * Get the visitor tracker instance
 * @returns VisitorTracker instance
 */
export function getVisitorTracker(): VisitorTracker {
  if (typeof window !== "undefined" && !visitorTracker) {
    visitorTracker = new VisitorTracker()
  }
  return visitorTracker as VisitorTracker
}
