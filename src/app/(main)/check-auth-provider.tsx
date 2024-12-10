// Import required dependencies and types
import { sessionCookieName, validateSessionToken } from "@/lib/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

// Define auth error types for better error handling
type AuthError = {
  message: string
  code: "NO_TOKEN" | "INVALID_TOKEN"
}

// Define auth result type
type AuthResult = {
  isValid: boolean
  error?: AuthError
}

// Function to validate session cookie
const validateAuthCookie = async (token: string | undefined): Promise<AuthResult> => {
  // Check if token exists
  if (!token) {
    return {
      isValid: false,
      error: { message: "No session token found", code: "NO_TOKEN" },
    }
  }

  // Validate token
  const isValidToken = await validateSessionToken(token)

  // Return validation result
  return {
    isValid: !!isValidToken,
    error: isValidToken
      ? undefined
      : {
          message: "Invalid session token",
          code: "INVALID_TOKEN",
        },
  }
}

// Main auth provider component
export default async function CheckAuthProvider({ children }: PropsWithChildren) {
  // Get session cookie
  const cookie = cookies().get(sessionCookieName)

  // Validate auth status
  const authResult = await validateAuthCookie(cookie?.value)

  // Redirect to login if authentication fails
  if (!authResult.isValid) {
    console.error(`Auth failed: ${authResult.error?.message}`)
    return redirect("/login")
  }

  // Render children if authenticated
  return <>{children}</>
}
