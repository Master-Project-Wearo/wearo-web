import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getCurrentAuthUser } from "@/lib/auth/session"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/providers/auth-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

function getAuthProviderKey(
  authUser: Awaited<ReturnType<typeof getCurrentAuthUser>>
) {
  if (!authUser) {
    return "anonymous"
  }

  return `${authUser.id}:${authUser.email}:${authUser.nickname}`
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authUser = await getCurrentAuthUser()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <AuthProvider
              key={getAuthProviderKey(authUser)}
              initialUser={authUser}
            >
              {children}
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}