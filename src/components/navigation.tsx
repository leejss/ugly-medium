import { ProfilePopover } from "./profile-popover"

export function Navigation() {
  return (
    <nav className="border-b border-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500">
                <span className="font-bold text-white">U</span>
              </div>
              <span className="text-white">ugly-medium</span>
            </div>
          </div>

          {/* Center section */}
          <div className="flex space-x-4">
            {/* <Link href="/write" className="px-3 py-2 text-white hover:text-gray-300">
              Write
            </Link> */}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <ProfilePopover />
          </div>
        </div>
      </div>
    </nav>
  )
}
