"use client"

import Link from "next/link"
import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react"

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  account: "Account",
  settings: "Settings",
  wardrobe: "Wardrobe",
  items: "Items",
  outfits: "Outfits",
  new: "New",
  schedules: "Schedules",
  playground: "Playground",
  "new-chat": "New chat",
  conversations: "Conversations",
  "capsule-office": "Capsule office",
  "rainy-weekend": "Weekend rain",
  "date-night": "Dinner casual chic",
}

function formatBreadcrumbLabel(segment: string, previousSegment?: string) {
  if (segment === "new") {
    if (previousSegment === "items") return "New item"
    if (previousSegment === "outfits") return "New outfit"
    if (previousSegment === "schedules") return "New schedule"
  }

  return (
    breadcrumbLabels[segment] ??
    segment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}`,
    label: formatBreadcrumbLabel(segment, segments[index - 1]),
  }))

  const currentPage = breadcrumbs[breadcrumbs.length - 1]

  const { resolvedTheme, setTheme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden px-4">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="data-vertical:h-4 data-vertical:self-auto"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <SunIcon className="hidden dark:block" />
              <MoonIcon className="dark:hidden" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <Separator
              orientation="vertical"
              className="md:mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              {/* Mobile: ... > Current page */}
              <BreadcrumbList className="lg:hidden">
                <BreadcrumbItem>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
              {/* Desktop: Home > Parent page > Current page */}
              <BreadcrumbList className="hidden lg:flex">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <Fragment key={item.href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="mr-4 justify-start text-muted-foreground sm:w-56"
          >
            <SearchIcon />
            <span className="hidden truncate sm:block">Make a search</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="mx-auto w-full max-w-4xl px-4">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
