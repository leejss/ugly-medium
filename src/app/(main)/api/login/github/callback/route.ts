import { AuthTable, UsersTable } from "@/db";
import { github } from "@/lib/oauth";
import { createSession, generateSessionToken, sessionCookieName } from "@/lib/session";
import { OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    // Verify state from cookie matches state in URL
    const cookieStore = cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value;
    // cookieStore.delete("github_oauth_state");

    if (!code || !state || !storedState || state !== storedState) {
      return new Response(null, {
        status: 400,
        statusText: "Invalid request",
      });
    }

    // Exchange code for access token
    let tokens: OAuth2Tokens;
    try {
      tokens = await github.validateAuthorizationCode(code);
    } catch (error) {
      console.error("GitHub OAuth Token Error:", error);
      return new Response(null, {
        status: 400,
        statusText: "Invalid request",
      });
    }

    const tokenData = {
      accessToken: tokens.accessToken(),
      // refreshToken: tokens.refreshToken(),
      // tokenType: tokens.tokenType(),
      // scope: tokens.scopes().join(" "),
    };

    // Get GitHub user info using access token
    const githubUser = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("GitHub User Info Error:", error);
        throw error;
      });

    if (!githubUser) {
      return new Response(null, {
        status: 400,
        statusText: "Invalid request",
      });
    }

    let user = await UsersTable.selectUserByEmail(githubUser.email);

    // If user does not exist, create new user
    if (!user) {
      user = await UsersTable.insertUser({
        email: githubUser.email,
        hashedPassword: "", // OAuth users don't need password
      });
    }

    // Check if auth record exists
    const existingAuth = await AuthTable.selectAuthByUserId(user.id);

    if (existingAuth) {
      await AuthTable.updateAuth(existingAuth.id, tokenData);
    } else {
      await AuthTable.insertAuth({
        userId: user.id,
        type: "oauth",
        provider: "github",
        providerId: githubUser.id.toString(),
        ...tokenData,
      });
    }

    // Create session
    const sessionToken = generateSessionToken();
    await createSession(sessionToken, user.id);

    // Set session cookie
    cookieStore.set(sessionCookieName, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // Redirect to home page
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
