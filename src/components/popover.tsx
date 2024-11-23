"use client";

import usePosition from "@/hooks/usePosition";
import { useRef, useState } from "react";

export default function Popover() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { left, top } = usePosition({
    baseRef: triggerRef,
    targetRef: contentRef,
  });

  return (
    <div>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        ref={triggerRef}
      >
        Trigger
      </button>
      <div
        style={{
          // display: open ? "block" : "none",
          opacity: open ? 1 : 0,
          top: `${top}px`,
          left: `${left}px`,
          position: "absolute",
        }}
        ref={contentRef}
        className="w-[100px] bg-red-500 h-[50px] flex flex-col justify-center items-center"
      >
        Content
      </div>
    </div>
  );
}
