"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { ListQuery } from "@/lib/api/list-query"

import { deleteItem, getItem, getItems, updateItem } from "./service"
import type { UpdateItemInput } from "./types"

type UpdateItemVariables = {
  itemId: string
  data: UpdateItemInput
}

export const itemQueryKeys = {
  all: ["items"] as const,
  lists: () => [...itemQueryKeys.all, "list"] as const,
  list: (query: ListQuery = {}) => [...itemQueryKeys.lists(), query] as const,
  details: () => [...itemQueryKeys.all, "detail"] as const,
  detail: (itemId: string) => [...itemQueryKeys.details(), itemId] as const,
}

export function useItems(query: ListQuery = {}) {
  return useQuery({
    queryKey: itemQueryKeys.list(query),
    queryFn: () => getItems(query),
  })
}

export function useItem(itemId: string) {
  return useQuery({
    queryKey: itemQueryKeys.detail(itemId),
    queryFn: () => getItem(itemId),
    enabled: itemId.length > 0,
  })
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, data }: UpdateItemVariables) =>
      updateItem(itemId, data),
    onSuccess: (item) => {
      queryClient.setQueryData(itemQueryKeys.detail(item.item_id), item)
      return queryClient.invalidateQueries({ queryKey: itemQueryKeys.lists() })
    },
  })
}

export function useDeleteItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: (item) => {
      queryClient.removeQueries({
        queryKey: itemQueryKeys.detail(item.item_id),
      })
      void queryClient.invalidateQueries({ queryKey: ["outfit-items"] })
      return queryClient.invalidateQueries({ queryKey: itemQueryKeys.lists() })
    },
  })
}
