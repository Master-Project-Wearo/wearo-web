"use client"

import { useState } from "react"
import { format, isToday, isYesterday } from "date-fns"
import { PlusIcon } from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import {
  type Conversation,
  ConversationsTable,
} from "@/components/conversations-table"
import { ListingHeader } from "@/components/listing-header"
import { SearchEmptyState } from "@/components/search-empty-state"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SpinnerCustom } from "@/components/ui/spinner"
import { useAiConversations } from "@/features/ai-conversations/hooks"

const sortOptions = ["Latest", "Oldest"]

function formatConversationDate(value: string) {
  const date = new Date(value)

  if (isToday(date)) return `Today, ${format(date, "HH:mm")}`
  if (isYesterday(date)) return `Yesterday, ${format(date, "HH:mm")}`

  return format(date, "MMM d, HH:mm")
}

export default function ConversationsPage() {
  const { data: aiConversations, isPending, error } = useAiConversations()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("Latest")

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  }

  if (error || !aiConversations) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p role="alert" className="text-sm text-destructive">
          Unable to load your conversations. Please refresh the page.
        </p>
      </div>
    )
  }

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredConversations = aiConversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(normalizedSearch)
  )
  const sortedConversations = [...filteredConversations].sort(
    (first, second) =>
      new Date(first.created_at).getTime() -
      new Date(second.created_at).getTime()
  )
  const orderedConversations =
    sortOrder === "Oldest" ? sortedConversations : sortedConversations.reverse()
  const visibleConversations: Conversation[] = orderedConversations.map(
    (conversation) => ({
      id: conversation.ai_conversation_id,
      title: conversation.title,
      updatedLabel: formatConversationDate(conversation.created_at),
    })
  )

  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Conversations"
          description="Find your previous conversations"
          searchPlaceholder="Search for a conversation"
          searchValue={searchQuery}
          resultsCount={visibleConversations.length}
          sortOptions={sortOptions}
          sortPlaceholder="Sort by"
          sortValue={sortOrder}
          onSearchChange={setSearchQuery}
          onSortChange={setSortOrder}
          action={{
            label: "New conversation",
            icon: PlusIcon,
            href: "/playground/new-chat",
          }}
        />

        {visibleConversations.length > 0 ? (
          <ConversationsTable conversations={visibleConversations} />
        ) : (
          <SearchEmptyState
            query={searchQuery}
            resource="conversations"
            onClearSearch={() => setSearchQuery("")}
          />
        )}
      </ContentWrapper>
    </ScrollArea>
  )
}
