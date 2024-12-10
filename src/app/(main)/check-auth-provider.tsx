// Checking session status using cookie

import { sessionCookieName, validateSessionToken } from "@/lib/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

export default async function CheckAuthProvider({ children }: PropsWithChildren) {
  const cookie = cookies().get(sessionCookieName)
  const sessionToken = cookie?.value
  if (!sessionToken) {
    return redirect("/login")
  }

  const result = await validateSessionToken(sessionToken)

  if (!result) {
    return redirect("/login")
  }

  return <>{children}</>
}
