import { createContext, useContext } from "react"
import { useAtom } from "jotai"
import { createPopoverAtoms } from "./popover.store"

export const PopoverContext = createContext<{
  atoms: ReturnType<typeof createPopoverAtoms>
} | null>(null)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a Popover component")
  }

  const [open, setOpen] = useAtom(context.atoms.openAtom)
  const [triggerRef] = useAtom(context.atoms.triggerRefAtom)
  const [contentRef] = useAtom(context.atoms.contentRefAtom)

  if (!triggerRef || !contentRef) {
    throw new Error("Popover refs not initialized")
  }

  return {
    open,
    setOpen,
    triggerRef,
    contentRef,
  }
}
