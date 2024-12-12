import { Navigation } from "@/components/navigation"
import { PropsWithChildren } from "react"
import CheckAuthProvider from "./check-auth-provider"

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <CheckAuthProvider>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navigation />
        <main className="mx-auto max-w-7xl">{children}</main>
      </div>
    </CheckAuthProvider>
  )
}
