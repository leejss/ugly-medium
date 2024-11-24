import { github } from "@/lib/oauth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
  const state = generateState();
  const url = github.createAuthorizationURL(state, []);
  const cookieStore = cookies();

  // store the state in the cookie
  // why ? to verify the state when the user is redirected back to the app
  cookieStore.set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
