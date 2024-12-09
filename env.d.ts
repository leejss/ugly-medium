declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      DATABASE_URL: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
    }
  }
}
