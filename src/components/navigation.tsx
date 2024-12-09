import Link from "next/link"
import Button from "./base-button"

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
              <span className="rounded bg-emerald-900 px-2 py-1 text-xs text-emerald-400">
                Starter
              </span>
            </div>
          </div>

          {/* Center section */}
          <div className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-white hover:text-gray-300">
              Overview
            </Link>
            <Link href="/databases" className="px-3 py-2 text-white hover:text-gray-300">
              Databases
            </Link>
            <Link href="/analytics" className="px-3 py-2 text-white hover:text-gray-300">
              Analytics
            </Link>
            <Link href="/audit" className="px-3 py-2 text-white hover:text-gray-300">
              Audit Logs
            </Link>
            <Link href="/settings" className="px-3 py-2 text-white hover:text-gray-300">
              Settings
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button>SignIn</Button>
            {/* <button className="text-white hover:text-gray-300">Feedback</button> */}
            {/* <button className="text-white hover:text-gray-300">Support</button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
