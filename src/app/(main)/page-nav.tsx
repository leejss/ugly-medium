import { getSessionFromCookie, validateSessionToken } from "@/lib/session"
import Link from "next/link"
import ProfilePopover from "./components/profile-popover"
import SignIn from "./components/sign-in"

export default async function PageNav() {
  const token = getSessionFromCookie()
  const sessionData = token ? await validateSessionToken(token) : null
  return (
    <nav className="flex h-12 items-center justify-between border-b px-4">
      <Link href={"/"}>Logo</Link>
      <div className="flex items-center gap-2">
        <>
          {sessionData && token ? (
            <div className="flex items-center gap-3">
              <Link href={"/write"}>Write</Link>
              <ProfilePopover sessionData={sessionData} />
            </div>
          ) : (
            <div>
              <SignIn />
            </div>
          )}
        </>
      </div>
    </nav>
  )
}
