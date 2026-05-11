"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function ErrorIllustration() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePosition({ x, y })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  
  // Calculate movement based on mouse position
  const calcMovement = (factor: number = 1) => {
    return {
      x: (mousePosition.x - 0.5) * factor * 20,
      y: (mousePosition.y - 0.5) * factor * 20
    }
  }
  
  // Generate random question marks
  const questionMarks = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    opacity: Math.random() * 0.5 + 0.3,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }))
  
  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto h-[400px]">
      {/* Background circle */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#F66526]/20 to-[#F2502C]/20 blur-xl"
        style={{ 
          left: "50%", 
          top: "50%",
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Main character */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-10"
        animate={{
          x: calcMovement(0.5).x,
          y: calcMovement(0.5).y,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 30 }}
      >
        <Image 
          src="/images/error/404-character.svg" 
          alt="404 Error Character" 
          width={200} 
          height={200}
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Floating question marks */}
      {questionMarks.map((qm) => (
        <motion.div
          key={qm.id}
          className="absolute text-[#F66526] font-bold z-0"
          style={{
            left: `${qm.x}%`,
            top: `${qm.y}%`,
            fontSize: `${qm.size}px`,
            opacity: qm.opacity
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [qm.opacity, qm.opacity + 0.2, qm.opacity]
          }}
          transition={{
            duration: qm.duration,
            repeat: Infinity,
            delay: qm.delay
          }}
        >
          ?
        </motion.div>
      ))}
      
      {/* Broken page elements */}
      <motion.div
        className="absolute w-20 h-8 bg-gray-200 rounded left-[20%] top-[30%]"
        animate={{
          x: calcMovement(1.2).x,
          y: calcMovement(1.2).y,
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 20,
          rotate: {
            duration: 10,
            repeat: Infinity
          }
        }}
      />
      
      <motion.div
        className="absolute w-16 h-16 border-4 border-gray-300 rounded-full left-[70%] top-[20%]"
        animate={{
          x: calcMovement(1.5).x,
          y: calcMovement(1.5).y,
          rotate: 360
        }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 15,
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      
      <motion.div
        className="absolute w-24 h-3 bg-gray-300 rounded left-[65%] top-[70%]"
        animate={{
          x: calcMovement(0.8).x,
          y: calcMovement(0.8).y,
          width: [96, 64, 96]
        }}
        transition={{ 
          type: "spring", 
          stiffness: 70, 
          damping: 25,
          width: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
      
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-r from-[#F66526]/30 to-[#F2502C]/30 rounded-lg left-[15%] top-[65%]"
        animate={{
          x: calcMovement(1.1).x,
          y: calcMovement(1.1).y,
          rotate: [0, 45, 0, -45, 0]
        }}
        transition={{ 
          type: "spring", 
          stiffness: 55, 
          damping: 22,
          rotate: {
            duration: 12,
            repeat: Infinity
          }
        }}
      />
      
      {/* 404 text shadow */}
      <motion.div
        className="absolute text-8xl font-bold text-gray-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none"
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        404
      </motion.div>
    </div>
  )
}