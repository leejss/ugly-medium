import { createPortal } from "react-dom";
import { usePopover } from "./popover.ctx";
import { ReactNode, useEffect } from "react";
import usePosition from "@/hooks/usePosition";

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

export default function PopoverContent({
  children,
  className,
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, contentRef } = usePopover();
  const pos = usePosition({
    baseRef: triggerRef,
    targetRef: contentRef,
    open,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickTarget = event.target as Node;
      if (
        triggerRef.current &&
        contentRef.current &&
        !contentRef.current.contains(clickTarget) &&
        !triggerRef.current.contains(clickTarget)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, contentRef, triggerRef]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  const content = (
    <div
      ref={contentRef}
      className={className}
      style={{
        position: "fixed",
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }}
      role="tooltip"
    >
      {children}
    </div>
  );

  if (!open) return null;
  return createPortal(content, document.body);
}
