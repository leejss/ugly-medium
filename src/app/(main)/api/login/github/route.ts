import { prepareGithubLogin } from "@/features/auth/github/action"

export async function GET() {
  const url = await prepareGithubLogin()
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  })
}
