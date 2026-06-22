const AUTH_PATHS = new Set(["/login", "/signup"])

export function isAuthPath(pathname: string) {
  return AUTH_PATHS.has(pathname)
}

export function getSafeRedirect(value: FormDataEntryValue | string | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/"
  }

  try {
    const url = new URL(value, "http://localhost")

    return isAuthPath(url.pathname)
      ? "/"
      : `${url.pathname}${url.search}${url.hash}`
  } catch {
    return "/"
  }
}
