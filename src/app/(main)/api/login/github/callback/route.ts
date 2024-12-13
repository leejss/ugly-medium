import { handleGithubCallback } from "@/features/auth/github/action"
import { isError } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    await handleGithubCallback(request)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    })
  } catch (error) {
    if (!isError(error)) {
      throw error
    }

    return new Response(error.message, {
      status: 400,
    })
  }
}
