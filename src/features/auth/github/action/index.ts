import { AuthTable, UsersTable } from "@/db"
import { createSession, generateSessionToken, sessionCookie } from "@/lib/session"
import { createCookieStore } from "@/lib/utils"
import { generateState, GitHub, OAuth2Tokens } from "arctic"
import { cookies } from "next/headers"

const GITHUB_STATE_COOKIE_NAME = "github_oauth_state"
const GITHUB_USER_ENDPOINT = "https://api.github.com/user"

export const stateCookieStore = createCookieStore(GITHUB_STATE_COOKIE_NAME, {
  maxAge: 60 * 10,
})

export async function requestGithubUser(accessToken: string) {
  try {
    const response = await fetch(GITHUB_USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return response.json()
  } catch (error) {
    console.error("[requestGithubUser] Error:", error)
    return null
  }
}

/**
 * Prepares GitHub OAuth login by generating state and authorization URL
 *
 * @returns Promise<string> The GitHub authorization URL to redirect the user to
 */
export async function prepareGithubLogin(): Promise<string> {
  // Generate random state string for CSRF protection
  const state = generateState()

  // Get cookie store instance
  // const cookieStore = cookies()

  // Initialize GitHub OAuth client with credentials
  const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!, null)

  // Create authorization URL with state and empty scope array
  const url = github.createAuthorizationURL(state, [])

  // Store state in cookie for validation during callback
  stateCookieStore.set(state)

  return url.toString()
}

export async function handleGithubCallback(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  const storedToken = cookies().get(GITHUB_STATE_COOKIE_NAME)?.value

  if (!code || !state || !storedToken || state !== storedToken) {
    throw new Error("Invalid request")
  }

  const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!, null)

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  } catch (error) {
    console.error("[GitHub OAuth Callback] Error:", error)
    throw new Error("Invalid request")
  }

  const accessToken = tokens.accessToken()

  const githubUser = await requestGithubUser(accessToken)

  if (!githubUser) {
    throw new Error("Failed to fetch user data")
  }

  let user = await UsersTable.selectUserByEmail(githubUser.email)

  if (!user) {
    user = await UsersTable.insertUser({
      email: githubUser.email,
      hashedPassword: "",
    })
  }

  const existingAuth = await AuthTable.selectAuthByUserId(user.id)

  if (existingAuth) {
    await AuthTable.updateAuth(existingAuth.id, {
      accessToken,
    })
  } else {
    await AuthTable.insertAuth({
      userId: user.id,
      type: "oauth",
      provider: "github",
      providerId: githubUser.id.toString(),
      accessToken,
    })
  }

  const { sessionToken } = await createSession(generateSessionToken(), user.id)
  sessionCookie.set(sessionToken)
}
