"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { ListQuery } from "@/lib/api/list-query"

import { deleteOutfit, getOutfit, getOutfits, updateOutfit } from "./service"
import type { UpdateOutfitInput } from "./types"

type UpdateOutfitVariables = {
  outfitId: string
  data: UpdateOutfitInput
}

export const outfitQueryKeys = {
  all: ["outfits"] as const,
  lists: () => [...outfitQueryKeys.all, "list"] as const,
  list: (query: ListQuery = {}) => [...outfitQueryKeys.lists(), query] as const,
  details: () => [...outfitQueryKeys.all, "detail"] as const,
  detail: (outfitId: string) =>
    [...outfitQueryKeys.details(), outfitId] as const,
}

export function useOutfits(query: ListQuery = {}) {
  return useQuery({
    queryKey: outfitQueryKeys.list(query),
    queryFn: () => getOutfits(query),
  })
}

export function useOutfit(outfitId: string) {
  return useQuery({
    queryKey: outfitQueryKeys.detail(outfitId),
    queryFn: () => getOutfit(outfitId),
    enabled: outfitId.length > 0,
  })
}

export function useUpdateOutfit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ outfitId, data }: UpdateOutfitVariables) =>
      updateOutfit(outfitId, data),
    onSuccess: (outfit) => {
      queryClient.setQueryData(outfitQueryKeys.detail(outfit.outfit_id), outfit)
      return queryClient.invalidateQueries({
        queryKey: outfitQueryKeys.lists(),
      })
    },
  })
}

export function useDeleteOutfit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteOutfit,
    onSuccess: (outfit) => {
      queryClient.removeQueries({
        queryKey: outfitQueryKeys.detail(outfit.outfit_id),
      })
      void queryClient.invalidateQueries({ queryKey: ["outfit-items"] })
      return queryClient.invalidateQueries({
        queryKey: outfitQueryKeys.lists(),
      })
    },
  })
}
