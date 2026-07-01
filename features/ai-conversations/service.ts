import { getApiErrorMessage } from "@/lib/api/errors"
import { apiRequest } from "@/lib/api/request"

import type { AiConversation } from "./types"

export async function getAiConversations() {
  const response = await apiRequest("/ai-conversations")

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as AiConversation[]
}
