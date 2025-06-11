"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageSquare, ChevronRight, ExternalLink, Send, ArrowLeft, Mail, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Types for our chat flow
type Message = {
  id: string
  text: string
  type: "greeting" | "question" | "options" | "response" | "link" | "system"
  options?: Option[]
  link?: string
  timestamp: Date
}

type Option = {
  id: string
  text: string
  nextStep?: string
  link?: string
  subOptions?: SubOption[]
  isBack?: boolean
  icon?: React.ReactNode
}

type SubOption = {
  id: string
  text: string
  link: string
}

// Chat history stack to enable back navigation
type ChatState = {
  step: string
  messages: Message[]
}

// Portfolio links data
const portfolioLinks = {
  business: [
    { id: "b1", text: "Corporate Rebrand", link: "/portfolio/corporate-brand" },
    { id: "b2", text: "Financial Services Portal", link: "/portfolio/financial-services" },
    { id: "b3", text: "Professional Services Site", link: "/portfolio/professional-services" },
  ],
  ecommerce: [
    { id: "e1", text: "Fashion Store", link: "/portfolio/ecommerce-project" },
    { id: "e2", text: "Electronics Marketplace", link: "/portfolio/electronics-marketplace" },
    { id: "e3", text: "Handcrafted Goods Shop", link: "/portfolio/handcrafted-goods" },
  ],
  realEstate: [
    { id: "r1", text: "Property Listing Platform", link: "/portfolio/real-estate" },
    { id: "r2", text: "Luxury Homes Showcase", link: "/portfolio/luxury-homes" },
    { id: "r3", text: "Real Estate Agency Site", link: "/portfolio/real-estate-agency" },
  ],
  restaurant: [
    { id: "f1", text: "Fine Dining Experience", link: "/portfolio/restaurant-app" },
    { id: "f2", text: "Food Delivery Service", link: "/portfolio/food-delivery" },
    { id: "f3", text: "Cafe & Bakery Website", link: "/portfolio/cafe-bakery" },
  ],
  healthcare: [
    { id: "h1", text: "Medical Practice Site", link: "/portfolio/healthcare-dashboard" },
    { id: "h2", text: "Patient Portal", link: "/portfolio/patient-portal" },
    { id: "h3", text: "Wellness Center Website", link: "/portfolio/wellness-center" },
  ],
  mobileApps: [
    { id: "m1", text: "Fitness Tracking App", link: "/portfolio/fitness-app" },
    { id: "m2", text: "Food Delivery App", link: "/portfolio/food-delivery-app" },
    { id: "m3", text: "Travel Companion App", link: "/portfolio/travel-app" },
  ],
  webApps: [
    { id: "w1", text: "Project Management Tool", link: "/portfolio/project-management" },
    { id: "w2", text: "E-Learning Platform", link: "/portfolio/e-learning" },
    { id: "w3", text: "CRM System", link: "/portfolio/crm-system" },
  ],
}

export default function BottomChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState("initial")
  const [chatHistory, setChatHistory] = useState<ChatState[]>([])

  // Auto-open chat after 3 seconds
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setIsMinimized(false)
        setHasAutoOpened(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasAutoOpened])

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  // Format time for message timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Save current state to history before navigating
  const saveToHistory = (nextStep: string) => {
    setChatHistory((prev) => [...prev, { step: currentStep, messages: [...messages] }])
    setCurrentStep(nextStep)
  }

  // Go back to previous state
  const goBack = () => {
    if (chatHistory.length > 0) {
      const prevState = chatHistory[chatHistory.length - 1]
      setMessages(prevState.messages)
      setCurrentStep(prevState.step)
      setChatHistory((prev) => prev.slice(0, -1))

      // Add system message indicating we went back
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          text: "Going back to previous options...",
          type: "system",
          timestamp: new Date(),
        },
      ])
    }
  }

  // Handle input submission
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-input-${Date.now()}`,
        text: inputValue,
        type: "response",
        timestamp: new Date(),
      },
    ])

    // Clear input
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-response-${Date.now()}`,
            text: "Thank you for your message. A team member will get back to you shortly. In the meantime, please feel free to explore our services.",
            type: "question",
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      }, 1000)
    }, 500)
  }

  // Initialize chat with greeting when opened
  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      const greeting = getGreeting()

      // Add greeting with a slight delay
      setIsTyping(true)
      setTimeout(() => {
        setMessages([
          {
            id: "greeting",
            text: `${greeting}! 👋 Welcome to Brighten Solutions.`,
            type: "greeting",
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)

        // Add "How can I help you?" message after greeting
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: "help",
                text: "How can I assist you today?",
                type: "question",
                timestamp: new Date(),
              },
            ])
            setIsTyping(false)

            // Add initial options
            setTimeout(() => {
              setIsTyping(true)
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: "initial-options",
                    text: "Please select an option:",
                    type: "options",
                    timestamp: new Date(),
                    options: [
                      {
                        id: "website",
                        text: "Website Development",
                        nextStep: "website-type",
                        icon: (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ),
                      },
                      {
                        id: "application",
                        text: "Application Development",
                        nextStep: "app-type",
                        icon: (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                          </svg>
                        ),
                      },
                      {
                        id: "other",
                        text: "Other Services",
                        nextStep: "other-services",
                        icon: (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                          </svg>
                        ),
                      },
                      {
                        id: "contact",
                        text: "Contact Us",
                        nextStep: "contact-options",
                        icon: <Mail className="w-4 h-4" />,
                      },
                    ],
                  },
                ])
                setIsTyping(false)
              }, 800)
            }, 600)
          }, 800)
        }, 800)
      }, 400)
    }
  }, [isOpen, isMinimized, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  // Handle option selection
  const handleOptionSelect = (option: Option) => {
    // If it's a back option
    if (option.isBack) {
      goBack()
      return
    }

    // Add user's selection as a response
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text: option.text,
        type: "response",
        timestamp: new Date(),
      },
    ])

    // Set selected option for highlighting
    setSelectedOption(option.id)

    // If there's a link, add a message with the link
    if (option.link) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `link-${Date.now()}`,
              text: `Here's the link to ${option.text}:`,
              type: "link",
              link: option.link,
              timestamp: new Date(),
            },
          ])
          setIsTyping(false)
        }, 800)
      }, 600)
      return
    }

    // Process next step based on selection
    if (option.nextStep) {
      // Save current state to history before navigating
      saveToHistory(option.nextStep)

      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          switch (option.nextStep) {
            case "website-type":
              setMessages((prev) => [
                ...prev,
                {
                  id: "website-options",
                  text: "What type of website are you looking for?",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    {
                      id: "business",
                      text: "Business Website",
                      nextStep: "business",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "ecommerce",
                      text: "E-commerce Website",
                      nextStep: "ecommerce",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                        </svg>
                      ),
                    },
                    {
                      id: "real-estate",
                      text: "Real Estate Website",
                      nextStep: "real-estate",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                      ),
                    },
                    {
                      id: "restaurant",
                      text: "Restaurant Website",
                      nextStep: "restaurant",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "healthcare",
                      text: "Healthcare Website",
                      nextStep: "healthcare",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "back-to-main",
                      text: "Back to Main Menu",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "business":
              setMessages((prev) => [
                ...prev,
                {
                  id: "business-examples",
                  text: "Here are some of our business website examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.business.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-website-types",
                      text: "Back to Website Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "ecommerce":
              setMessages((prev) => [
                ...prev,
                {
                  id: "ecommerce-examples",
                  text: "Here are some of our e-commerce website examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.ecommerce.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-website-types",
                      text: "Back to Website Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "real-estate":
              setMessages((prev) => [
                ...prev,
                {
                  id: "real-estate-examples",
                  text: "Here are some of our real estate website examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.realEstate.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-website-types",
                      text: "Back to Website Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "restaurant":
              setMessages((prev) => [
                ...prev,
                {
                  id: "restaurant-examples",
                  text: "Here are some of our restaurant website examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.restaurant.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-website-types",
                      text: "Back to Website Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "healthcare":
              setMessages((prev) => [
                ...prev,
                {
                  id: "healthcare-examples",
                  text: "Here are some of our healthcare website examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.healthcare.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-website-types",
                      text: "Back to Website Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "app-type":
              setMessages((prev) => [
                ...prev,
                {
                  id: "app-options",
                  text: "What type of application are you interested in?",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    {
                      id: "mobile",
                      text: "Mobile Applications",
                      nextStep: "mobile-apps",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "web",
                      text: "Web Applications",
                      nextStep: "web-apps",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "back-to-main",
                      text: "Back to Main Menu",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "mobile-apps":
              setMessages((prev) => [
                ...prev,
                {
                  id: "mobile-examples",
                  text: "Here are some of our mobile application examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.mobileApps.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-app-types",
                      text: "Back to Application Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "web-apps":
              setMessages((prev) => [
                ...prev,
                {
                  id: "web-examples",
                  text: "Here are some of our web application examples:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    ...portfolioLinks.webApps.map((item) => ({
                      id: item.id,
                      text: item.text,
                      link: item.link,
                      icon: <ExternalLink className="w-4 h-4" />,
                    })),
                    {
                      id: "back-to-app-types",
                      text: "Back to Application Types",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "other-services":
              setMessages((prev) => [
                ...prev,
                {
                  id: "other-services",
                  text: "We offer these additional services:",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    {
                      id: "digital-marketing",
                      text: "Digital Marketing",
                      link: "/services#digital-marketing",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                      ),
                    },
                    {
                      id: "seo",
                      text: "SEO Optimization",
                      link: "/services#seo",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "hosting",
                      text: "Web Hosting Solutions",
                      link: "/services#hosting",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "maintenance",
                      text: "Maintenance & Support",
                      link: "/services#maintenance",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "back-to-main",
                      text: "Back to Main Menu",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "contact-options":
              setMessages((prev) => [
                ...prev,
                {
                  id: "contact-info",
                  text: "How would you like to contact us?",
                  type: "options",
                  timestamp: new Date(),
                  options: [
                    {
                      id: "email",
                      text: "Email Us",
                      link: "mailto:contact@brightensolutions.com",
                      icon: <Mail className="w-4 h-4" />,
                    },
                    {
                      id: "phone",
                      text: "Call Us",
                      link: "tel:+1234567890",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                        </svg>
                      ),
                    },
                    {
                      id: "form",
                      text: "Contact Form",
                      link: "/contact",
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ),
                    },
                    {
                      id: "chat-now",
                      text: "Chat with Us Now",
                      nextStep: "chat-now",
                      icon: <MessageSquare className="w-4 h-4" />,
                    },
                    {
                      id: "back-to-main",
                      text: "Back to Main Menu",
                      isBack: true,
                      icon: <ArrowLeft className="w-4 h-4" />,
                    },
                  ],
                },
              ])
              break
            case "chat-now":
              setMessages((prev) => [
                ...prev,
                {
                  id: "chat-now-message",
                  text: "Please type your message below and our team will respond shortly.",
                  type: "question",
                  timestamp: new Date(),
                },
              ])
              break
            default:
              break
          }
          setIsTyping(false)
        }, 800)
      }, 600)
    }
  }

  // Toggle chat open/closed
  const toggleChat = () => {
    if (isMinimized) {
      setIsOpen(true)
      setIsMinimized(false)
    } else {
      setIsMinimized(true)
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end">
      {/* Chat toggle button - always visible */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 mb-2 mr-4 rounded-full shadow-lg transition-all duration-300 ${
          !isMinimized ? "bg-[#F2502C] rotate-0" : "bg-[#F66526] hover:bg-[#F2502C]"
        }`}
      >
        {!isMinimized ? <X className="w-7 h-7 text-white" /> : <MessageSquare className="w-7 h-7 text-white" />}
      </button>

      {/* Chat window - bottom aligned */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMinimized ? 0 : "auto",
              opacity: isMinimized ? 0 : 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-[400px] max-h-[500px] bg-white border border-gray-200 shadow-lg overflow-hidden rounded-t-2xl mr-4"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F66526] to-[#F2502C] text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/images/brighten-chat-avatar.jpg"
                    alt="Brighten Support"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold">Brighten Solutions</h3>
                  <p className="text-xs text-white/80">Online | Ready to help</p>
                </div>
              </div>
              <button onClick={() => setIsMinimized(true)} className="text-white hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div
              className="h-[350px] overflow-y-auto p-4 space-y-3 bg-gray-50"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23E4EFE7' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
                backgroundSize: "300px",
              }}
            >
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  {/* Bot messages */}
                  {message.type !== "response" && message.type !== "system" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col max-w-[85%]"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F66526] flex-shrink-0">
                          <Image
                            src="/images/brighten-chat-avatar.jpg"
                            alt="Brighten Support"
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                          <p className="text-gray-800">{message.text}</p>

                          {/* Link in message */}
                          {message.type === "link" && message.link && (
                            <Link
                              href={message.link}
                              className="block mt-2 text-[#F66526] hover:text-[#F2502C] underline flex items-center"
                            >
                              <span>View {message.link.split("/").pop()}</span>
                              <ExternalLink className="ml-1 w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-gray-500 ml-10 mt-1">{formatTime(message.timestamp)}</div>

                      {/* Options */}
                      {message.options && message.options.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="pl-10 mt-2 space-y-2"
                        >
                          {message.options.map((option) => (
                            <div key={option.id}>
                              {option.link ? (
                                <Link href={option.link}>
                                  <button
                                    className={`flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors shadow-sm
                                      ${
                                        selectedOption === option.id
                                          ? "bg-[#E4EFE7] border-[#F66526] border"
                                          : "bg-white hover:bg-gray-50 border border-gray-200"
                                      }`}
                                  >
                                    <span className="flex items-center">
                                      {option.icon && <span className="mr-2 text-[#F66526]">{option.icon}</span>}
                                      <span className={option.isBack ? "text-gray-600" : "text-[#F66526]"}>
                                        {option.text}
                                      </span>
                                    </span>
                                    {!option.isBack && <ExternalLink className="w-4 h-4 text-[#F66526]" />}
                                  </button>
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleOptionSelect(option)}
                                  className={`flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors shadow-sm
                                    ${
                                      selectedOption === option.id
                                        ? "bg-[#E4EFE7] border-[#F66526] border"
                                        : "bg-white hover:bg-gray-50 border border-gray-200"
                                    }`}
                                >
                                  <span className="flex items-center">
                                    {option.icon && <span className="mr-2 text-gray-600">{option.icon}</span>}
                                    <span className={option.isBack ? "text-gray-600" : ""}>{option.text}</span>
                                  </span>
                                  {!option.isBack && <ChevronRight className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* System messages */}
                  {message.type === "system" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">{message.text}</div>
                    </motion.div>
                  )}

                  {/* User responses */}
                  {message.type === "response" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-end"
                    >
                      <div className="bg-[#F66526] p-3 rounded-lg rounded-tr-none max-w-[85%] shadow-sm">
                        <p className="text-white">{message.text}</p>
                      </div>

                      {/* Timestamp with read status */}
                      <div className="flex items-center text-xs text-gray-500 mr-1 mt-1">
                        {formatTime(message.timestamp)}
                        <Check className="ml-1 w-3 h-3" />
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F66526] flex-shrink-0">
                    <Image
                      src="/images/brighten-chat-avatar.jpg"
                      alt="Brighten Support"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input area */}
            <form onSubmit={handleInputSubmit} className="p-3 bg-white border-t border-gray-200 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F66526]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#F66526] text-white p-2 rounded-r-md hover:bg-[#F2502C] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
