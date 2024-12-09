"use client"

import { cn } from "@/lib/utils"
import { ComponentProps, useState } from "react"

interface BaseButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export default function BaseButton({ className, onClick, children, ...props }: BaseButtonProps) {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    try {
      setLoading(true)
      onClick?.()
    } catch (error) {
      console.error("Error", error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      onClick={handleClick}
      className={cn("rounded-full bg-green-700 px-4 py-2 text-white", className)}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}
