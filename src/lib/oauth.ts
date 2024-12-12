import { GitHub } from "arctic"

const githubUserEndpoint = "https://api.github.com/user"

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  null,
)

export async function requestGithubUser(accessToken: string) {
  try {
    const response = await fetch(githubUserEndpoint, {
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
