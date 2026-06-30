import { createClient } from "@/lib/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_WEARO_API_URL

export async function apiRequest(path: string, init?: RequestInit) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_WEARO_API_URL is not configured.")
  }

  const supabase = createClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session?.access_token) {
    throw new Error("Authentication is required.")
  }

  const headers = new Headers(init?.headers)
  headers.set("Authorization", `Bearer ${session.access_token}`)

  return fetch(`${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`, {
    ...init,
    headers,
  })
}
