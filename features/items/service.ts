import { getApiErrorMessage } from "@/lib/api/errors"
import { apiRequest } from "@/lib/api/request"
import { getListPath, type ListQuery } from "@/lib/api/list-query"

import type { Item, UpdateItemInput } from "./types"

export async function getItems(query: ListQuery = {}) {
  const response = await apiRequest(getListPath("/items", query))

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Item[]
}

export async function getItem(itemId: string) {
  const response = await apiRequest(`/items/${encodeURIComponent(itemId)}`)

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Item
}

export async function updateItem(itemId: string, data: UpdateItemInput) {
  const response = await apiRequest(`/items/${encodeURIComponent(itemId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Item
}

export async function deleteItem(itemId: string) {
  const response = await apiRequest(`/items/${encodeURIComponent(itemId)}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return (await response.json()) as Item
}
