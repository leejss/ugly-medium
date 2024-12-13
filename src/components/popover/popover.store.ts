import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type RefObject } from "react"

interface PopoverStore {
  id: string
  open: boolean
  triggerRef: RefObject<HTMLButtonElement> | null
  contentRef: RefObject<HTMLDivElement> | null
}

// Base atom that holds all popover instances
export const popoversAtom = atom<PopoverStore[]>([])

// Atom to manage popover instances
export const popoverAtomsAtom = splitAtom(popoversAtom)

// Factory function to create scoped atoms for a specific popover instance
export function createPopoverAtoms(id: string) {
  // Create instance atom
  const instanceAtom = atom(
    (get) => get(popoversAtom).find((p) => p.id === id),
    (get, set, newValue: Partial<PopoverStore>) => {
      const popovers = get(popoversAtom)
      const index = popovers.findIndex((p) => p.id === id)

      if (index === -1) {
        set(popoversAtom, [
          ...popovers,
          { id, open: false, triggerRef: null, contentRef: null, ...newValue },
        ])
      } else {
        set(popoversAtom, [
          ...popovers.slice(0, index),
          { ...popovers[index], ...newValue },
          ...popovers.slice(index + 1),
        ])
      }
    },
  )

  // Derived atoms for individual values
  const openAtom = atom(
    (get) => get(instanceAtom)?.open ?? false,
    (get, set, newOpen: boolean) => {
      set(instanceAtom, { open: newOpen })
    },
  )

  const triggerRefAtom = atom(
    (get) => get(instanceAtom)?.triggerRef ?? null,
    (get, set, newRef: RefObject<HTMLButtonElement>) => {
      set(instanceAtom, { triggerRef: newRef })
    },
  )

  const contentRefAtom = atom(
    (get) => get(instanceAtom)?.contentRef ?? null,
    (get, set, newRef: RefObject<HTMLDivElement>) => {
      set(instanceAtom, { contentRef: newRef })
    },
  )

  return {
    instanceAtom,
    openAtom,
    triggerRefAtom,
    contentRefAtom,
  }
}
