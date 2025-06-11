/**
 * Data collector utility to fetch all data from cookies and localStorage
 */

interface StorageData {
  cookies: Record<string, string>
  localStorage: Record<string, string>
  sessionStorage: Record<string, string>
}

/**
 * Parses all cookies from document.cookie string
 * @returns Object with cookie name-value pairs
 */
export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {}

  if (typeof document !== "undefined") {
    const cookieString = document.cookie
    if (cookieString) {
      const cookiePairs = cookieString.split(";")

      for (const cookiePair of cookiePairs) {
        const [name, value] = cookiePair.trim().split("=")
        if (name && value) {
          try {
            cookies[name] = decodeURIComponent(value)
          } catch (e) {
            cookies[name] = value
          }
        }
      }
    }
  }

  return cookies
}

/**
 * Gets all items from localStorage
 * @returns Object with localStorage key-value pairs
 */
export function getAllLocalStorage(): Record<string, string> {
  const storage: Record<string, string> = {}

  if (typeof window !== "undefined") {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
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
 * Gets all items from sessionStorage
 * @returns Object with sessionStorage key-value pairs
 */
export function getAllSessionStorage(): Record<string, string> {
  const storage: Record<string, string> = {}

  if (typeof window !== "undefined") {
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key) {
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
 * Collects all data from cookies, localStorage and sessionStorage
 * @returns Combined object with all storage data
 */
export function collectAllStorageData(): StorageData {
  return {
    cookies: getAllCookies(),
    localStorage: getAllLocalStorage(),
    sessionStorage: getAllSessionStorage(),
  }
}

/**
 * Exports all storage data as JSON string
 * @returns JSON string of all storage data
 */
export function exportStorageDataAsJson(): string {
  const data = collectAllStorageData()
  return JSON.stringify(data, null, 2)
}

/**
 * Clears all data from cookies and localStorage
 */
export function clearAllStorageData(): void {
  if (typeof document !== "undefined") {
    // Clear cookies
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
    }
  }

  if (typeof window !== "undefined") {
    // Clear localStorage
    localStorage.clear()
  }
}
