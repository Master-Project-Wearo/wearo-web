import { getApiErrorMessage } from "@/lib/api/errors"
import { apiRequest } from "@/lib/api/request"
import { getListPath, type ListQuery } from "@/lib/api/list-query"

import type { OutfitItem, UpdateOutfitItemInput } from "./types"

function getOutfitItemPath(outfitId: string, itemId: string) {
  return `/outfit-items/${encodeURIComponent(outfitId)}/${encodeURIComponent(itemId)}`
}

export async function getOutfitItems(query: ListQuery = {}) {
  const response = await apiRequest(getListPath("/outfit-items", query))

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as OutfitItem[]
}

export async function getOutfitItem(outfitId: string, itemId: string) {
  const response = await apiRequest(getOutfitItemPath(outfitId, itemId))

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as OutfitItem
}

export async function updateOutfitItem(
  outfitId: string,
  itemId: string,
  data: UpdateOutfitItemInput
) {
  const response = await apiRequest(getOutfitItemPath(outfitId, itemId), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as OutfitItem
}

export async function deleteOutfitItem(outfitId: string, itemId: string) {
  const response = await apiRequest(getOutfitItemPath(outfitId, itemId), {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as OutfitItem
}
