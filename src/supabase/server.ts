import { Env } from "@/lib"
import { createServerClient as _createClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServerClient() {
  const cookieStore = cookies()
  return _createClient(Env.NEXT_PUBLIC_SUPABASE_URL!, Env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
