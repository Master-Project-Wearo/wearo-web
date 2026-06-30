type ApiErrorBody = {
  message?: unknown
  detail?: unknown
}

export async function getApiErrorMessage(response: Response) {
  const body = (await response.json().catch(() => null)) as ApiErrorBody | null

  if (typeof body?.message === "string") {
    return body.message
  }

  if (
    Array.isArray(body?.message) &&
    body.message.every((message) => typeof message === "string")
  ) {
    return body.message.join(", ")
  }

  if (typeof body?.detail === "string") {
    return body.detail
  }

  return `Request failed with status ${response.status}.`
}
