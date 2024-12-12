import { getSessionFromCookie, validateSessionToken } from "@/lib/session"
import Link from "next/link"
import ProfilePopover from "./components/profile-popover"
import SignIn from "./components/sign-in"

export default async function PageNav() {
  const token = getSessionFromCookie()
  const sessionData = token ? await validateSessionToken(token) : null
  return (
    // Add shadow and refined background styling
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white/90 px-6 shadow-sm backdrop-blur-md">
      {/* Logo with improved styling */}
      <Link
        href={"/"}
        className="text-xl font-bold tracking-tight transition-colors hover:text-gray-600"
      >
        Ugly
      </Link>

      <div className="flex items-center gap-4">
        <>
          {sessionData && token ? (
            <div className="flex items-center gap-4">
              {/* Write button with shadow effect */}
              <Link
                href={"/write"}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:shadow-md active:shadow-sm"
              >
                Write
              </Link>
              <ProfilePopover sessionData={sessionData} />
            </div>
          ) : (
            <div className="flex items-center">
              <SignIn />
            </div>
          )}
        </>
      </div>
    </nav>
  )
}
