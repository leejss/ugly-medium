import clsx from "clsx"
import { ClassValue } from "clsx"
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import { twMerge } from "tailwind-merge"

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export function isError(error: unknown): error is Error {
  return error instanceof Error
}

export function createCookieStore(cookieName: string, cookieOptions: Partial<ResponseCookie> = {}) {
  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  } satisfies Partial<ResponseCookie>

  const set = (value: string) => {
    cookies().set(cookieName, value, {
      ...defaultOptions,
      ...cookieOptions,
    })
  }

  const get = () => {
    const cookie = cookies().get(cookieName)
    return cookie?.value ?? null
  }

  return {
    set,
    get,
  }
}
