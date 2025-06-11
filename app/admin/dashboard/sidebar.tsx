"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  X,
  Home,
  Users,
  ShoppingBag,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  ImageIcon,
  Globe,
  Info,
  Heart,
  Star,
  UserCheck,
  Trophy,
  Database,
  Eye,
} from "lucide-react"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  user: any
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, user }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },

    // Home section
    {
      name: "Home",
      href: "/admin/home",
      icon: Home,
      children: [
        { name: "Hero Section", href: "/admin/dashboard/hero-section", icon: Globe },
        { name: "Services", href: "/admin/dashboard/services", icon: ShoppingBag },
        { name: "Features", href: "/admin/dashboard/experience", icon: Star },
        { name: "Products", href: "/admin/dashboard/products", icon: Star },
        { name: "Blog", href: "/admin/dashboard/blog", icon: Star },
      ],
    },

    // Products section
    { name: "Products", href: "/admin/dashboard/products", icon: ShoppingBag },

    { name: "About", href: "/admin/dashboard/about", icon: Info },

    { name: "Client Info", href: "/admin/dashboard/client-info", icon: Info },


    // Website section
    { name: "PORTFOLIO", href: "/admin/dashboard/portfolio", icon: Globe },

    // Visitors section
    { name: "Visitors", href: "/admin/dashboard/visitors", icon: Eye },

  ]

  // Function to check if a path is active or its child is active
  const isActiveOrHasActiveChild = (item: any) => {
    if (pathname === item.href) return true
    if (item.children) {
      return item.children.some((child: any) => pathname === child.href)
    }
    return false
  }

  return (
    <>
      <div className={`fixed inset-0 z-40  flex md:hidden ${sidebarOpen ? "visible" : "invisible"}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 transition duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="absolute right-0 top-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center px-4">
            <span className="text-xl font-bold text-brightenone">Brighten Solutions</span>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = isActiveOrHasActiveChild(item)

                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-brightenone bg-opacity-10 text-brightenone"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? "text-brightenone" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>

                    {/* Render children if any */}
                    {item.children && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child: any) => {
                          const isChildActive = pathname === child.href
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`group flex items-center rounded-md px-2 py-1.5 text-sm font-medium ${
                                isChildActive
                                  ? "bg-brightenone bg-opacity-10 text-brightenone"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <child.icon
                                className={`mr-3 h-4 w-4 flex-shrink-0 ${
                                  isChildActive ? "text-brightenone" : "text-gray-400 group-hover:text-gray-500"
                                }`}
                              />
                              {child.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* User info */}
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brightenone text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.email || "Admin User"}</p>
                <p className="text-xs font-medium text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 bg-brightencolor-cream">
        <div className="flex w-64 flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 bg-brightencolor-cream">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center px-4">
                <span className="text-xl font-bold text-brightencolor-brightenone">Brighten Solutions</span>
              </div>

              {/* Navigation */}
              <nav className="mt-5 flex-1 space-y-1 bg-brightencolor-brightenone/80 px-2 pt-4">
                {navigation.map((item) => {
                  const isActive = isActiveOrHasActiveChild(item)

                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center font-inter rounded-md px-2 py-2 text-sm font-medium ${
                          isActive
                            ? "bg-white bg-opacity-50 text-brightenone"
                            : "text-white hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 flex-shrink-0 ${
                            isActive ? "text-brightenone" : "text-white group-hover:text-gray-500"
                          }`}
                        />
                        {item.name}
                      </Link>

                      {/* Render children if any */}
                      {item.children && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.children.map((child: any) => {
                            const isChildActive = pathname === child.href
                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`group flex items-center rounded-md px-2 py-1.5 text-sm font-medium ${
                                  isChildActive
                                    ? "bg-white bg-opacity-50 text-brightenone"
                                    : "text-white hover:bg-gray-50 hover:text-gray-900"
                                }`}
                              >
                                <child.icon
                                  className={`mr-3 h-4 w-4 flex-shrink-0 ${
                                    isChildActive ? "text-brightenone" : "text-white group-hover:text-gray-500"
                                  }`}
                                />
                                {child.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>

            {/* User info */}
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brightenone text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.email || "Admin User"}</p>
                  <p className="text-xs font-medium text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
