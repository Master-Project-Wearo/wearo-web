"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CheckIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

type Conversation = {
  id: string
  title: string
  updatedLabel: string
}

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

const rowActionClassName =
  "absolute inset-0 z-0 rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

export default function ConversationsPage() {
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const allSelected = conversations.every((conversation) =>
    selectedIds.has(conversation.id)
  )

  function startSelection(id: string) {
    setSelectionMode(true)
    setSelectedIds((current) => new Set(current).add(id))
  }

  function toggleConversation(id: string, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function selectAll() {
    setSelectedIds(
      new Set(conversations.map((conversation) => conversation.id))
    )
  }

  function cancelSelection() {
    setSelectionMode(false)
    setSelectedIds(new Set())
  }

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

        <div className="flex flex-col gap-2">
          {selectionMode && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {selectedIds.size}
                </span>{" "}
                selected
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={selectedIds.size === 0}
                >
                  <Trash2Icon />
                  Delete
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={allSelected}
                  onClick={selectAll}
                >
                  <CheckIcon />
                  Select all
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Cancel selection"
                  onClick={cancelSelection}
                >
                  <XIcon />
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableBody>
              {conversations.map((conversation) => {
                const selected = selectedIds.has(conversation.id)

                return (
                  <TableRow
                    key={conversation.id}
                    className="relative cursor-pointer has-[+tr:hover]:border-transparent has-[+tr_button[aria-expanded=true]]:border-transparent has-aria-expanded:border-transparent has-aria-expanded:bg-transparent has-aria-expanded:[&>td]:bg-muted/50 hover:border-transparent hover:bg-transparent hover:[&>td]:bg-muted/50 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg"
                  >
                    {selectionMode && (
                      <TableCell className="relative z-10 w-0">
                        <Checkbox
                          aria-label={`Select ${conversation.title}`}
                          checked={selected}
                          onCheckedChange={(checked) =>
                            toggleConversation(
                              conversation.id,
                              checked === true
                            )
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell className="w-full max-w-0 overflow-hidden">
                      {selectionMode ? (
                        <button
                          type="button"
                          className={rowActionClassName}
                          onClick={() =>
                            toggleConversation(conversation.id, !selected)
                          }
                        >
                          <span className="sr-only">
                            {selected ? "Deselect" : "Select"}
                            {conversation.title}
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={`/playground/conversations/${conversation.id}`}
                          className={rowActionClassName}
                        >
                          <span className="sr-only">
                            Open {conversation.title}
                          </span>
                        </Link>
                      )}
                      <span className="block truncate">
                        {conversation.title}
                      </span>
                    </TableCell>
                    <TableCell className="w-0 max-w-36 overflow-hidden text-right text-muted-foreground">
                      <span className="block truncate">
                        {conversation.updatedLabel}
                      </span>
                    </TableCell>
                    <TableCell className="relative z-10 w-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Actions for ${conversation.title}`}
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onSelect={() => startSelection(conversation.id)}
                          >
                            <CheckIcon />
                            Select
                          </DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
