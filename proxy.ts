import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { isAuthPath } from "@/lib/auth/routes"

const SESSION_HEADER_NAMES = ["cache-control", "expires", "pragma"] as const

function copySessionMetadata(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie))

  SESSION_HEADER_NAMES.forEach((name) => {
    const value = from.headers.get(name)

    if (value) {
      to.headers.set(name, value)
    }
  })

  return to
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headersToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
          Object.entries(headersToSet).forEach(([name, value]) => {
            response.headers.set(name, value)
          })
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()

  const { pathname, search } = request.nextUrl
  const isAuthRoute = isAuthPath(pathname)
  const isAuthenticated = Boolean(data?.claims.sub)

  if (isAuthenticated && isAuthRoute) {
    return copySessionMetadata(
      response,
      NextResponse.redirect(new URL("/", request.url))
    )
  }

  if (!isAuthenticated && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", `${pathname}${search}`)

    return copySessionMetadata(response, NextResponse.redirect(loginUrl))
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
