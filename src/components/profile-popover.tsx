"use client"

import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Link from "next/link"

export function ProfilePopover() {
  return (
    <Popover className="relative">
      <Popover.Button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600">
        <span className="text-sm">U</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <Link href="/write" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Write a story
          </Link>
          <button
            onClick={() => {
              /* TODO: implement signout */
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
