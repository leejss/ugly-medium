import { PropsWithChildren } from "react"

export default function BlankLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
      {children}
    </main>
  )
}
