"use client"

import { useQuery } from "@tanstack/react-query"

import { getAiConversations } from "./service"

const aiConversationsQueryKey = ["ai-conversations"] as const

export function useAiConversations() {
  return useQuery({
    queryKey: aiConversationsQueryKey,
    queryFn: getAiConversations,
  })
}
