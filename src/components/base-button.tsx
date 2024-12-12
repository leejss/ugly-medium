"use client"

import { cn } from "@/lib/utils"
import { ComponentProps, useState } from "react"

interface BaseButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export default function Button({ className, onClick, children, ...props }: BaseButtonProps) {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    try {
      setLoading(true)
      onClick?.()
    } catch (error) {
      console.error("[Button Click Error]", error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded bg-emerald-600 px-3 py-1.5 text-white transition-colors hover:bg-emerald-500",
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}
