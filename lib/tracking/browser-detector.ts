/**
 * Browser and device detection utility
 */

interface BrowserInfo {
    browser: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
    screenResolution: string
  }
  
  /**
   * Get browser and device information
   * @returns Object with browser and device details
   */
  export function getBrowserInfo(): BrowserInfo {
    if (typeof window === "undefined") {
      return {
        browser: "",
        browserVersion: "",
        os: "",
        osVersion: "",
        device: "",
        screenResolution: "",
      }
    }
  
    const ua = navigator.userAgent
    let browser = ""
    let browserVersion = ""
    let os = ""
    let osVersion = ""
    let device = "desktop"
  
    // Detect browser and version
    if (ua.indexOf("Firefox") > -1) {
      browser = "Firefox"
      browserVersion = ua.match(/Firefox\/([\d.]+)/)![1]
    } else if (ua.indexOf("SamsungBrowser") > -1) {
      browser = "Samsung Browser"
      browserVersion = ua.match(/SamsungBrowser\/([\d.]+)/)![1]
    } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
      browser = "Opera"
      browserVersion = ua.indexOf("Opera") > -1 ? ua.match(/Opera\/([\d.]+)/)![1] : ua.match(/OPR\/([\d.]+)/)![1]
    } else if (ua.indexOf("Trident") > -1) {
      browser = "Internet Explorer"
      browserVersion = ua.match(/rv:([\d.]+)/)![1]
    } else if (ua.indexOf("Edge") > -1) {
      browser = "Edge"
      browserVersion = ua.match(/Edge\/([\d.]+)/)![1]
    } else if (ua.indexOf("Edg") > -1) {
      browser = "Edge Chromium"
      browserVersion = ua.match(/Edg\/([\d.]+)/)![1]
    } else if (ua.indexOf("Chrome") > -1) {
      browser = "Chrome"
      browserVersion = ua.match(/Chrome\/([\d.]+)/)![1]
    } else if (ua.indexOf("Safari") > -1) {
      browser = "Safari"
      browserVersion = ua.match(/Version\/([\d.]+)/)![1]
    } else {
      browser = "Unknown"
      browserVersion = "0"
    }
  
    // Detect OS and version
    if (ua.indexOf("Windows") > -1) {
      os = "Windows"
      if (ua.indexOf("Windows NT 10.0") > -1) osVersion = "10"
      else if (ua.indexOf("Windows NT 6.3") > -1) osVersion = "8.1"
      else if (ua.indexOf("Windows NT 6.2") > -1) osVersion = "8"
      else if (ua.indexOf("Windows NT 6.1") > -1) osVersion = "7"
      else if (ua.indexOf("Windows NT 6.0") > -1) osVersion = "Vista"
      else if (ua.indexOf("Windows NT 5.1") > -1) osVersion = "XP"
      else osVersion = "Unknown"
    } else if (ua.indexOf("Mac") > -1) {
      os = "macOS"
      osVersion = ua.match(/Mac OS X ([0-9_]+)/) ? ua.match(/Mac OS X ([0-9_]+)/)![1].replace(/_/g, ".") : "Unknown"
    } else if (ua.indexOf("Android") > -1) {
      os = "Android"
      osVersion = ua.match(/Android ([0-9.]+)/)![1]
      device = ua.indexOf("Mobile") > -1 ? "mobile" : "tablet"
    } else if (ua.indexOf("iOS") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) {
      os = "iOS"
      osVersion = ua.match(/OS ([0-9_]+)/) ? ua.match(/OS ([0-9_]+)/)![1].replace(/_/g, ".") : "Unknown"
      device = ua.indexOf("iPad") > -1 ? "tablet" : "mobile"
    } else if (ua.indexOf("Linux") > -1) {
      os = "Linux"
      osVersion = "Unknown"
    } else {
      os = "Unknown"
      osVersion = "Unknown"
    }
  
    // Detect mobile/tablet if not already detected
    if (device === "desktop") {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
        (window.innerWidth <= 800 && window.innerHeight <= 600)
      ) {
        device = /iPad|tablet|Tablet/i.test(ua) ? "tablet" : "mobile"
      }
    }
  
    // Get screen resolution
    const screenResolution = `${window.screen.width}x${window.screen.height}`
  
    return {
      browser,
      browserVersion,
      os,
      osVersion,
      device,
      screenResolution,
    }
  }
  