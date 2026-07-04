import { getApiErrorMessage } from "@/lib/api/errors"
import { apiRequest } from "@/lib/api/request"
import { getListPath, type ListQuery } from "@/lib/api/list-query"

import type { Outfit, UpdateOutfitInput } from "./types"

export async function getOutfits(query: ListQuery = {}) {
  const response = await apiRequest(getListPath("/outfits", query))

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Outfit[]
}

export async function getOutfit(outfitId: string) {
  const response = await apiRequest(`/outfits/${encodeURIComponent(outfitId)}`)

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Outfit
}

export async function updateOutfit(outfitId: string, data: UpdateOutfitInput) {
  const response = await apiRequest(
    `/outfits/${encodeURIComponent(outfitId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Outfit
}

export async function deleteOutfit(outfitId: string) {
  const response = await apiRequest(
    `/outfits/${encodeURIComponent(outfitId)}`,
    { method: "DELETE" }
  )

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Outfit
}
