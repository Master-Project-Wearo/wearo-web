import type { User } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/server"

export type AuthUser = {
  id: string
  email: string
  nickname: string
}

function getAuthUser(user: User | null): AuthUser | null {
  if (!user?.id || !user.email) {
    return null
  }

  const metadata = user.user_metadata
  const nickname =
    typeof metadata.nickname === "string"
      ? metadata.nickname
      : typeof metadata.display_name === "string"
        ? metadata.display_name
        : user.email

  return {
    id: user.id,
    email: user.email,
    nickname,
  }
}

export async function getCurrentAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return getAuthUser(user)
}