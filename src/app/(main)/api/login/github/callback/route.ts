import { github } from "@/lib/oauth";
import { createSession, generateSessionToken } from "@/lib/session";
import { OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";
import { UserTable } from "@/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  // state from url
  const state = url.searchParams.get("state");

  // get state from the cookie
  const cookieState = cookies().get("github_oauth_state")?.value ?? null;

  if (code === null || state === null || cookieState === null) {
    return new Response(null, {
      status: 400,
    });
  }

  // compare the state from the url and the cookie
  if (state !== cookieState) {
    return new Response(null, {
      status: 400,
    });
  }

  // get the tokens from the code
  let tokens: OAuth2Tokens;
  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 400,
    });
  }
  // get the user from the github api
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  const githubUser = await githubUserResponse.json();
  // id and user name
  const githubId = githubUser.id;
  const githubUserName = githubUser.login;

  const exsitingUser = await UserTable.selectUserByGithubId(githubId);

  if (exsitingUser) {
    // if the user exists, create a session and redirect to the home page
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, exsitingUser.id);
    await setSeesionCookie(sessionToken);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } else {
    // else, create a new user and create a session and redirect to the home page
    const user = await createUser(githubId, githubUserName);
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, exsitingUser.id);
    await setSeesionCookie(sessionToken);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }
}
