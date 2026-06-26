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
  SparklesIcon,
} from "lucide-react"
const data = {
  user: {
    name: "Wearo",
    email: "dashboard@wearo.app",
    avatar: "/avatars/wearo.jpg",
  },
  teams: [
    {
      name: "Wearo",
      logo: <GalleryVerticalEndIcon />,
      plan: "Wardrobe",
    },
  ],
  quickCreateItems: [
    {
      title: "New item",
      url: "/wardrobe/items/new",
    },
    {
      title: "New outfit",
      url: "/wardrobe/outfits/new",
    },
    {
      title: "New schedule",
      url: "/wardrobe/schedules/new",
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
          icon: <SparklesIcon />,
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
              sideOffset={4}
              className="w-52"
            >
              <DropdownMenuLabel>Create</DropdownMenuLabel>
              {data.quickCreateItems.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.url}>
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
