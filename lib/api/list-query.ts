export type ListQuery = {
  page?: number
  limit?: number
  q?: string
}

export function getListPath(path: string, query: ListQuery = {}) {
  const searchParams = new URLSearchParams()

  if (query.page !== undefined) {
    searchParams.set("page", String(query.page))
  }

  if (query.limit !== undefined) {
    searchParams.set("limit", String(query.limit))
  }

  if (query.q !== undefined) {
    searchParams.set("q", query.q)
  }

  const search = searchParams.toString()
  return search ? `${path}?${search}` : path
}
