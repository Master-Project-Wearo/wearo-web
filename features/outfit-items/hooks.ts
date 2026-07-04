"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { ListQuery } from "@/lib/api/list-query"

import {
  deleteOutfitItem,
  getOutfitItem,
  getOutfitItems,
  updateOutfitItem,
} from "./service"
import type { UpdateOutfitItemInput } from "./types"

type OutfitItemKey = {
  outfitId: string
  itemId: string
}

type UpdateOutfitItemVariables = OutfitItemKey & {
  data: UpdateOutfitItemInput
}

export const outfitItemQueryKeys = {
  all: ["outfit-items"] as const,
  lists: () => [...outfitItemQueryKeys.all, "list"] as const,
  list: (query: ListQuery = {}) =>
    [...outfitItemQueryKeys.lists(), query] as const,
  details: () => [...outfitItemQueryKeys.all, "detail"] as const,
  detail: ({ outfitId, itemId }: OutfitItemKey) =>
    [...outfitItemQueryKeys.details(), outfitId, itemId] as const,
}

export function useOutfitItems(query: ListQuery = {}) {
  return useQuery({
    queryKey: outfitItemQueryKeys.list(query),
    queryFn: () => getOutfitItems(query),
  })
}

export function useOutfitItem({ outfitId, itemId }: OutfitItemKey) {
  return useQuery({
    queryKey: outfitItemQueryKeys.detail({ outfitId, itemId }),
    queryFn: () => getOutfitItem(outfitId, itemId),
    enabled: outfitId.length > 0 && itemId.length > 0,
  })
}

export function useUpdateOutfitItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ outfitId, itemId, data }: UpdateOutfitItemVariables) =>
      updateOutfitItem(outfitId, itemId, data),
    onSuccess: (outfitItem, variables) => {
      queryClient.removeQueries({
        queryKey: outfitItemQueryKeys.detail({
          outfitId: variables.outfitId,
          itemId: variables.itemId,
        }),
      })
      queryClient.setQueryData(
        outfitItemQueryKeys.detail({
          outfitId: outfitItem.outfit_id,
          itemId: outfitItem.item_id,
        }),
        outfitItem
      )
      return queryClient.invalidateQueries({
        queryKey: outfitItemQueryKeys.lists(),
      })
    },
  })
}

export function useDeleteOutfitItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ outfitId, itemId }: OutfitItemKey) =>
      deleteOutfitItem(outfitId, itemId),
    onSuccess: (outfitItem) => {
      queryClient.removeQueries({
        queryKey: outfitItemQueryKeys.detail({
          outfitId: outfitItem.outfit_id,
          itemId: outfitItem.item_id,
        }),
      })
      return queryClient.invalidateQueries({
        queryKey: outfitItemQueryKeys.lists(),
      })
    },
  })
}
