// context provider

import { ReactNode, useCallback, useRef } from "react"
import { useAtom } from "jotai"
import { createPopoverAtoms } from "./popover.store"
import { useId } from "react"
import { PopoverContext } from "./popover.ctx"

interface PopoverRootProps {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}

export default function PopoverRoot({ children, onOpenChange }: PopoverRootProps) {
  const id = useId() // Generate unique ID for this instance
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Create scoped atoms for this instance
  const atoms = createPopoverAtoms(id)
  const [, setOpen] = useAtom(atoms.openAtom)
  const [, setTriggerRef] = useAtom(atoms.triggerRefAtom)
  const [, setContentRef] = useAtom(atoms.contentRefAtom)

  // Set refs when component mounts
  setTriggerRef(triggerRef)
  setContentRef(contentRef)

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange, setOpen],
  )

  return <PopoverContext.Provider value={{ atoms }}>{children}</PopoverContext.Provider>
}
