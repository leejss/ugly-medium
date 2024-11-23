import { useEffect, useState, type RefObject } from "react";

type Position = { top: number; left: number };
type PositionSide = "top" | "right" | "bottom" | "left";
type PositionAlign = "start" | "center" | "end";

interface UsePositionProps {
  baseRef: RefObject<HTMLElement>;
  targetRef: RefObject<HTMLElement>;
  side?: PositionSide;
  align?: PositionAlign;
  sideOffset?: number;
}

export default function usePosition({
  baseRef,
  targetRef,
  side = "bottom",
  align = "center",
  sideOffset = 5,
}: UsePositionProps) {
  const [pos, setPos] = useState<Position>({ top: 0, left: 0 });
  useEffect(() => {
    const updatePos = () => {
      if (!baseRef.current || !targetRef.current) return;

      const baseRect = baseRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = baseRect.top - targetRect.height - sideOffset;
          break;
        case "bottom":
          top = baseRect.bottom + sideOffset;
          break;
        case "left":
          left = baseRect.left - targetRect.width - sideOffset;
          break;
        case "right":
          left = baseRect.right + sideOffset;
          break;
      }

      // Calculate alignment
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            left = baseRect.left;
            break;
          case "center":
            left = baseRect.left + (baseRect.width - targetRect.width) / 2;
            break;
          case "end":
            left = baseRect.right - targetRect.width;
            break;
        }
      } else {
        switch (align) {
          case "start":
            top = baseRect.top;
            break;
          case "center":
            top = baseRect.top + (baseRect.height - targetRect.height) / 2;
            break;
          case "end":
            top = baseRect.bottom - targetRect.height;
            break;
        }
      }

      setPos({ top, left });
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);

    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [baseRef, targetRef, side, align, sideOffset, setPos]);

  return pos;
}
