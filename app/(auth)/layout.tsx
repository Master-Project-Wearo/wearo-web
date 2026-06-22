import Link from "next/link"
import { GalleryVerticalEndIcon } from "lucide-react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Wearo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden lg:block">
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="auth-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--chart-2)" />
            </linearGradient>
            <pattern
              id="auth-small-squares"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="5"
                y="5"
                width="2"
                height="2"
                fill="var(--primary-foreground)"
                fillOpacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-gradient)" />
          <rect width="100%" height="100%" fill="url(#auth-small-squares)" />
        </svg>
      </div>
    </div>
  )
}
