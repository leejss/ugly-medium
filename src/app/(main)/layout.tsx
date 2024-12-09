import { Navigation } from "@/components/navigation"
import { UsageStats } from "@/components/usage-stats"
import { PropsWithChildren } from "react"

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Navigation />
      <main className="mx-auto max-w-7xl">
        <UsageStats />
        {children}
      </main>
    </div>
  )
}
