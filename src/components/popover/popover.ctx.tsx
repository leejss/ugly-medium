import { createContext, useContext, type ContextType } from "react";

export const PopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
} | null>(null);

export type PopoverContextType = ContextType<typeof PopoverContext>;

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover component");
  }

  return context;
};
