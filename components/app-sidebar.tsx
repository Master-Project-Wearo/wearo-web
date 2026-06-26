"use client"

import Link from "next/link"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  BotMessageSquareIcon,
  CalendarDaysIcon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  MessageCirclePlusIcon,
  PlusIcon,
  ShirtIcon,
  SwatchBookIcon,
} from "lucide-react"

const data = {
  teams: [
    {
      name: "Wearo",
      logo: <GalleryVerticalEndIcon />,
      plan: "Wardrobe",
    },
  ],
  quickCreateItems: [
    {
      title: "Item",
      url: "/wardrobe/items/new",
      icon: <ShirtIcon />,
    },
    {
      title: "Outfit",
      url: "/wardrobe/outfits/new",
      icon: <SwatchBookIcon />,
    },
    {
      title: "Schedule",
      url: "/wardrobe/schedules/new",
      icon: <CalendarDaysIcon />,
    },
  ],
  navGroups: [
    {
      label: "Wardrobe",
      items: [
        {
          title: "Items",
          url: "/wardrobe/items",
          icon: <ShirtIcon />,
        },
        {
          title: "Outfits",
          url: "/wardrobe/outfits",
          icon: <SwatchBookIcon />,
        },
        {
          title: "Schedules",
          url: "/wardrobe/schedules",
          icon: <CalendarDaysIcon />,
        },
      ],
    },
    {
      label: "Playground",
      items: [
        {
          title: "New chat",
          url: "/playground/new-chat",
          icon: <MessageCirclePlusIcon />,
        },
        {
          title: "Conversations",
          icon: <BotMessageSquareIcon />,
          children: [
            {
              title: "All conversations",
              url: "/playground/conversations",
            },
            {
              title: "Capsule office",
              url: "/playground/conversations/capsule-office",
            },
            {
              title: "Weekend rain",
              url: "/playground/conversations/rainy-weekend",
            },
            {
              title: "Dinner casual chic",
              url: "/playground/conversations/date-night",
            },
          ],
        },
      ],
    },
  ],
}

function PrimaryMenu() {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip="Create">
                <PlusIcon />
                <span>Create</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              align="start"
            >
              <DropdownMenuLabel>Create</DropdownMenuLabel>
              {data.quickCreateItems.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Dashboard">
            <Link href="/dashboard">
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <PrimaryMenu />
        <NavMain groups={data.navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
