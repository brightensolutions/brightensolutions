"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LoginForm from "@/components/admin/login-form"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const token = localStorage.getItem("brightensolutionadmin")
      if (token) {
        window.location.href = "/admin/dashboard"
      } else {
        setLoading(false)
      }
    }

    // Small timeout to ensure localStorage is accessible
    setTimeout(checkAuth, 100)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-cream">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-brightenone border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cream to-offwhite">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-brightenone p-12 lg:flex">
        <div>
          <h1 className="font-roboto-slab text-4xl font-bold text-brightencolor-brightenone">
            Brighten Solutions
          </h1>
          <p className="mt-2 text-lg text-black/90">Admin Dashboard</p>
        </div>
        
        <div className="relative  w-full">
          <Image
            src="/images/brighten-solutions-login.png"
            alt="Admin Dashboard"
            width={600}
            height={800}
            className="object-contain m-auto"
            priority
          />
        </div>
        
        <div className="space-y-4 text-black/90">
          <p className="text-xl font-medium">Manage your business with ease</p>
          <p>Access all your tools, analytics, and content in one place.</p>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8 bg-brightencolor-brightenone">
        <div className="w-full max-w-md space-y-8 bg-white/50 p-6 rounded-lg backdrop-blur-3xl border ">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-brightenone p-2">
              <div className=" ">
                <Image 
                  src="/logos/Brighten Solution Monogram.svg"
                  alt="Brighten Solutions Logo"
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <h2 className="mt-6 font-roboto-slab     text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your admin account
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
