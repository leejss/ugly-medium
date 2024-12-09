"use server"

import { createServerClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithGithub() {
  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect("/login?error=Could not authenticate user")
  }

  return redirect(data.url)
}

export async function signInWithGoogle() {
  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect("/login?error=Could not authenticate user")
  }

  return redirect(data.url)
}
