// types.ts
import { ReactNode } from "react"

export interface Position {
  top: number
  left: number
}

export interface PopoverProps {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface PopoverTriggerProps {
  children: ReactNode
  asChild?: boolean
}

export interface PopoverContentProps {
  children: ReactNode
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

// context.ts
import { createContext, useContext } from "react"

interface PopoverContextType {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  contentRef: React.RefObject<HTMLElement>
}

export const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a Popover component")
  }
  return context
}

// hooks/usePosition.ts
import { RefObject, useEffect, useState } from "react"
import { Position } from "../types"

interface UsePositionProps {
  triggerRef: RefObject<HTMLElement>
  contentRef: RefObject<HTMLElement>
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  open: boolean
}

export const usePosition = ({
  triggerRef,
  contentRef,
  side = "bottom",
  align = "center",
  sideOffset = 5,
  open,
}: UsePositionProps) => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 })

  useEffect(() => {
    const updatePosition = () => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      // Calculate position based on side
      switch (side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset
          break
        case "bottom":
          top = triggerRect.bottom + sideOffset
          break
        case "left":
          left = triggerRect.left - contentRect.width - sideOffset
          top = triggerRect.top
          break
        case "right":
          left = triggerRect.right + sideOffset
          top = triggerRect.top
          break
      }

      // Calculate alignment
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            left = triggerRect.left
            break
          case "center":
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
            break
          case "end":
            left = triggerRect.right - contentRect.width
            break
        }
      } else {
        switch (align) {
          case "start":
            top = triggerRect.top
            break
          case "center":
            top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
            break
          case "end":
            top = triggerRect.bottom - contentRect.height
            break
        }
      }

      setPosition({ top, left })
    }

    updatePosition()

    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [triggerRef, contentRef, side, align, sideOffset, open])

  return position
}

// components/Popover.tsx
import React, { useRef, useState } from "react"
import { PopoverProps } from "../types"
import { PopoverContext } from "../context"

export const Popover: React.FC<PopoverProps> = ({
  children,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen: handleOpenChange,
        triggerRef,
        contentRef,
      }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

// components/PopoverTrigger.tsx
import React, { cloneElement, isValidElement } from "react"
import { PopoverTriggerProps } from "../types"
import { usePopover } from "../context"

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, asChild }) => {
  const { open, setOpen, triggerRef } = usePopover()

  const handleClick = () => {
    setOpen(!open)
  }

  const childProps = {
    ref: triggerRef,
    onClick: handleClick,
    "aria-expanded": open,
    "aria-haspopup": true,
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children, childProps)
  }

  return (
    <button type="button" {...childProps}>
      {children}
    </button>
  )
}

// components/PopoverContent.tsx
import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PopoverContentProps } from "../types"
import { usePopover } from "../context"
import { usePosition } from "../hooks/usePosition"

export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 5,
}) => {
  const { open, setOpen, triggerRef, contentRef } = usePopover()
  const position = usePosition({
    triggerRef,
    contentRef,
    side,
    align,
    sideOffset,
    open,
  })

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, setOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, setOpen])

  if (!open) return null

  const content = (
    <div
      ref={contentRef}
      role="tooltip"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      className={className}
    >
      {children}
    </div>
  )

  return createPortal(content, document.body)
}
