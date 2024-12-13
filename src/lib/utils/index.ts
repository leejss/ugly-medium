import clsx from "clsx"
import { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export function isError(error: unknown): error is Error {
  return error instanceof Error
}
