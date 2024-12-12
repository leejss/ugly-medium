// context provider

import { ReactNode, useCallback, useRef, useState } from "react"
import { PopoverContext } from "./popover.ctx"

interface PopoverRootProps {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}

export default function PopoverRoot({ children, onOpenChange }: PopoverRootProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange],
  )

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
