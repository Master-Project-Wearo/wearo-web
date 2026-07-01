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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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

import { useAiConversations } from "@/features/ai-conversations/hooks"
import type { AiConversation } from "@/features/ai-conversations/types"

const staticData = {
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
  ],
}

function getConversationUrl(conversationId: string) {
  return `/playground/conversations/${conversationId}`
}

function mapConversationToNavItem(conversation: AiConversation) {
  return {
    title: conversation.title || "Untitled conversation",
    url: getConversationUrl(conversation.ai_conversation_id),
  }
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
              className="w-56"
            >
              <DropdownMenuLabel>Create</DropdownMenuLabel>

              {staticData.quickCreateItems.map((item) => (
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
  const { data: conversations = [] } = useAiConversations()

  const navGroups = React.useMemo(() => {
    const conversationItems = conversations.map(mapConversationToNavItem)

    return [
      ...staticData.navGroups,
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
              ...conversationItems,
            ],
          },
        ],
      },
    ]
  }, [conversations])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={staticData.teams} />
      </SidebarHeader>

      <SidebarContent>
        <PrimaryMenu />
        <NavMain groups={navGroups} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
