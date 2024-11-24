// set ref
// handle click event

import { cloneElement, isValidElement } from "react";
import { usePopover } from "./popover.ctx";

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export default function PopoverTrigger({
  asChild,
  children,
}: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopover();

  const handleClick = () => {
    setOpen(!open);
  };
  const childProps = {
    ref: triggerRef,
    onClick: handleClick,
    "aria-expanded": open,
    "aria-haspopup": true,
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement, childProps);
  }

  return (
    <button type="button" {...childProps}>
      {children}
    </button>
  );
}
