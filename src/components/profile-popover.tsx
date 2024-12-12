"use client"

import PopoverContent from "@/components/popover/popover.content"
import PopoverRoot from "@/components/popover/popover.root"
import PopoverTrigger from "@/components/popover/popover.trigger"
import Link from "next/link"
import { signOutAction } from "@/app/(main)/actions/email-auth-action"

// Root, Trigger, Content

export function ProfilePopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white transition-colors hover:bg-gray-600">
          <span className="text-sm">U</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={4}
        className="w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div className="flex flex-col">
          <Link
            href="/write"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
          >
            Write a story
          </Link>
          <button
            onClick={async () => {
              const sessionId = ""
              await signOutAction(sessionId)
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </PopoverContent>
    </PopoverRoot>
  )
}
