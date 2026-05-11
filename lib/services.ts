import fs from "fs"
import path from "path"
import type { Service } from "./types/service"

const servicesFilePath = path.join(process.cwd(), "data", "services.json")

// Ensure the data directory exists
export const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }

  if (!fs.existsSync(servicesFilePath)) {
    fs.writeFileSync(servicesFilePath, JSON.stringify([]))
  }
}

export const getServices = (): Service[] => {
  ensureDataDirectory()

  try {
    const data = fs.readFileSync(servicesFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading services file:", error)
    return []
  }
}

export const getServiceBySlug = (slug: string): Service | null => {
  const services = getServices()
  return services.find((service) => service.slug === slug) || null
}

export const saveService = (service: Service): void => {
  ensureDataDirectory()

  const services = getServices()
  const existingIndex = services.findIndex((s) => s.id === service.id)

  if (existingIndex >= 0) {
    services[existingIndex] = service
  } else {
    services.push(service)
  }

  fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, 2))
}

export const deleteService = (id: string): void => {
  ensureDataDirectory()

  const services = getServices()
  const updatedServices = services.filter((service) => service.id !== id)

  fs.writeFileSync(servicesFilePath, JSON.stringify(updatedServices, null, 2))
}
