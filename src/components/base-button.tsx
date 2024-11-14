"use client";

import { ComponentProps, useState } from "react";

interface BaseButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function BaseButton({
  className,
  onClick,
  children,
  ...props
}: BaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    try {
      setLoading(true);
      onClick?.();
    } catch (error) {
      console.error("Error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={handleClick} className={className} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}
