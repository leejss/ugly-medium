import { github } from "@/lib/oauth"
import { generateState } from "arctic"
import { cookies } from "next/headers"

export async function GET() {
  // Prevent CSRF attacks
  // Ensuring the request originated from my application
  const state = generateState()

  // create the authorization URL with state and scopes
  // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
  const url = github.createAuthorizationURL(state, ["read:user"])
  const cookieStore = cookies()

  // store the state in the cookie - it prevents CSRF attacks
  // State value in cookie guarantees that the request originated from my application
  cookieStore.set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return new Response(null, {
    status: 302,
    headers: {
      // Redirect to the GitHub authorization URL
      Location: url.toString(),
    },
  })
}
