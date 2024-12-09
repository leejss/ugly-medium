import { Env } from "@/lib"
import { createBrowserClient as _createClient } from "@supabase/ssr"

export function createBrowserClient() {
  return _createClient(Env.NEXT_PUBLIC_SUPABASE_URL!, Env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
