import { getApiErrorMessage } from "@/lib/api/errors"

import type { UpdateUserInput, User } from "./types"

const API_URL = process.env.NEXT_PUBLIC_WEARO_API_URL

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/users/me`)

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as User
}

export async function updateCurrentUser(input: UpdateUserInput) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }
}
