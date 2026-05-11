/**
 * Raw data collector utility to fetch ALL data from cookies and localStorage
 * without any filtering or processing
 */

/**
 * Gets all cookies as a raw object
 * @returns Complete object with all cookie name-value pairs
 */
export function getAllCookiesRaw(): Record<string, string> {
    const cookies: Record<string, string> = {}
  
    if (typeof document !== "undefined") {
      const cookieString = document.cookie
      if (cookieString) {
        const cookiePairs = cookieString.split(";")
  
        for (const cookiePair of cookiePairs) {
          const [name, value] = cookiePair.trim().split("=")
          if (name) {
            // Store the raw value without decoding to avoid any data loss
            cookies[name] = value || ""
          }
        }
      }
    }
  
    return cookies
  }
  
  /**
   * Gets ALL items from localStorage without any filtering
   * @returns Complete object with all localStorage key-value pairs
   */
  export function getAllLocalStorageRaw(): Record<string, string> {
    const storage: Record<string, string> = {}
  
    if (typeof window !== "undefined") {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key) {
            // Store the raw value
            storage[key] = localStorage.getItem(key) || ""
          }
        }
      } catch (e) {
        console.error("Error accessing localStorage:", e)
      }
    }
  
    return storage
  }
  
  /**
   * Gets ALL items from sessionStorage without any filtering
   * @returns Complete object with all sessionStorage key-value pairs
   */
  export function getAllSessionStorageRaw(): Record<string, string> {
    const storage: Record<string, string> = {}
  
    if (typeof window !== "undefined") {
      try {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (key) {
            // Store the raw value
            storage[key] = sessionStorage.getItem(key) || ""
          }
        }
      } catch (e) {
        console.error("Error accessing sessionStorage:", e)
      }
    }
  
    return storage
  }
  
  /**
   * Collects ALL browser storage data without any filtering
   */
  export function collectAllRawData() {
    return {
      cookies: getAllCookiesRaw(),
      localStorage: getAllLocalStorageRaw(),
      sessionStorage: getAllSessionStorageRaw(),
    }
  }
  