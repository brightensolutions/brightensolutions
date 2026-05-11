/**
 * Simple data grabber - captures ALL browser storage data without any filtering
 */

/**
 * Gets ALL cookies exactly as they are
 */
export function grabAllCookies(): Record<string, string> {
    const cookies: Record<string, string> = {}
  
    try {
      if (typeof document !== "undefined") {
        const cookieString = document.cookie
        if (cookieString) {
          const cookiePairs = cookieString.split(";")
  
          for (const cookiePair of cookiePairs) {
            const [name, value] = cookiePair.trim().split("=")
            if (name) {
              // Store raw value exactly as it is
              cookies[name] = value || ""
            }
          }
        }
      }
    } catch (e) {
      console.error("Error grabbing cookies:", e)
    }
  
    return cookies
  }
  
  /**
   * Gets ALL localStorage items exactly as they are
   */
  export function grabAllLocalStorage(): Record<string, string> {
    const storage: Record<string, string> = {}
  
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key) {
            // Store raw value exactly as it is
            storage[key] = localStorage.getItem(key) || ""
          }
        }
      }
    } catch (e) {
      console.error("Error grabbing localStorage:", e)
    }
  
    return storage
  }
  
  /**
   * Gets ALL sessionStorage items exactly as they are
   */
  export function grabAllSessionStorage(): Record<string, string> {
    const storage: Record<string, string> = {}
  
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (key) {
            // Store raw value exactly as it is
            storage[key] = sessionStorage.getItem(key) || ""
          }
        }
      }
    } catch (e) {
      console.error("Error grabbing sessionStorage:", e)
    }
  
    return storage
  }
  
  /**
   * Grabs ALL browser storage data at once
   */
  export function grabAllStorageData() {
    return {
      cookies: grabAllCookies(),
      localStorage: grabAllLocalStorage(),
      sessionStorage: grabAllSessionStorage(),
    }
  }
  