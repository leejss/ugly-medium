import Link from "next/link";
import SignIn from "./components/sign-in";
import { getSessionFromCookie, validateSessionToken } from "@/lib/session";
import Signout from "./components/sign-out";

export default async function PageNav() {
  const token = getSessionFromCookie();
  const sessionData = token ? await validateSessionToken(token) : null;
  return (
    <nav className="h-12 flex justify-between items-center px-4 border-b">
      <Link href={"/"}>Logo</Link>
      <div className="flex items-center gap-2">
        <>
          {sessionData && token ? (
            <div className="flex items-center gap-3">
              <Link href={"/write"}>Write</Link>
              {/* <Link href={"/profile"}>Profile</Link> */}
              <Signout sessionId={sessionData.session.id} />
            </div>
          ) : (
            <div>
              <SignIn />
            </div>
          )}
        </>
      </div>
    </nav>
  );
}
