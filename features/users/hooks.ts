"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getCurrentUser, updateCurrentUser } from "./service"

const currentUserQueryKey = ["users", "me"] as const

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
  })
}

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey }),
  })
}
