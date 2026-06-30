import { getApiErrorMessage } from "@/lib/api/errors"
import { apiRequest } from "@/lib/api/request"

import type { UpdateUserInput, User } from "./types"

export async function getCurrentUser() {
  const response = await apiRequest("/users/me")

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as User
}

export async function updateCurrentUser(input: UpdateUserInput) {
  const response = await apiRequest("/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }
}
