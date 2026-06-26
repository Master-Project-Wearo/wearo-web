"use client"

import Link from "next/link"
import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
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
import { MoonIcon, SearchIcon, SunIcon, PlusIcon } from "lucide-react"

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
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex min-w-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
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
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <Fragment key={item.href}>
                      <BreadcrumbItem
                        className={index === 0 ? "hidden md:block" : undefined}
                      >
                        {isLast ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbSeparator className="hidden md:block" />
                      ) : null}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <Button
              type="button"
              variant="secondary"
              className="w-44 justify-start border-none text-muted-foreground sm:w-56"
            >
              <SearchIcon />
              <span className="truncate">Search...</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
