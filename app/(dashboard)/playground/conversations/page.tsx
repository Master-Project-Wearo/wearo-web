"use client"

import { PlusIcon } from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import {
  type Conversation,
  ConversationsTable,
} from "@/components/conversations-table"
import { ListingHeader } from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"

const conversations: Conversation[] = [
  {
    id: "capsule-office",
    title: "Build a capsule wardrobe for the office",
    updatedLabel: "Today, 09:42",
  },
  {
    id: "rainy-weekend",
    title: "What to wear for a rainy weekend",
    updatedLabel: "Today, 08:15",
  },
  {
    id: "date-night",
    title: "Summer date night outfit",
    updatedLabel: "Yesterday, 20:34",
  },
  {
    id: "linen-shirt",
    title: "How to style my oversized linen shirt",
    updatedLabel: "Jun 26, 16:08",
  },
  {
    id: "wedding-guest",
    title: "Wedding guest look without buying more",
    updatedLabel: "Jun 24, 11:26",
  },
  {
    id: "sneaker-rotation",
    title: "Refresh my everyday sneaker rotation",
    updatedLabel: "Jun 22, 18:51",
  },
  {
    id: "carry-on",
    title: "One-week trip with only a carry-on",
    updatedLabel: "Jun 20, 07:40",
  },
  {
    id: "color-palette",
    title: "Find the right colors for my wardrobe",
    updatedLabel: "Jun 17, 14:12",
  },
  {
    id: "denim-fit",
    title: "Choosing the right denim fit",
    updatedLabel: "Jun 13, 10:03",
  },
  {
    id: "concert-outfit",
    title: "Comfortable outfit for an outdoor concert",
    updatedLabel: "Jun 9, 19:18",
  },
  {
    id: "closet-reset",
    title: "Plan a complete closet reset",
    updatedLabel: "Jun 4, 12:47",
  },
  {
    id: "summer-shoes",
    title: "Versatile shoes for summer",
    updatedLabel: "May 29, 15:22",
  },
]

export default function ConversationsPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Conversations"
          description="Find your previous conversations"
          searchPlaceholder="Search for a conversation"
          resultsCount={conversations.length}
          sortOptions={["Latest", "Oldest"]}
          sortPlaceholder="Sort by"
          action={{
            label: "New conversation",
            icon: PlusIcon,
          }}
        />

        <ConversationsTable conversations={conversations} />
      </ContentWrapper>
    </ScrollArea>
  )
}
