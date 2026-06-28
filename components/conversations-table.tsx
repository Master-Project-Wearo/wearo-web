"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, MoreHorizontalIcon, Trash2Icon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export type Conversation = {
  id: string
  title: string
  updatedLabel: string
}

type ConversationsTableProps = {
  conversations: Conversation[]
}

const rowActionClassName =
  "absolute inset-0 z-0 rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

export function ConversationsTable({ conversations }: ConversationsTableProps) {
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
                className="relative cursor-pointer hover:border-transparent hover:bg-transparent has-aria-expanded:border-transparent has-aria-expanded:bg-transparent has-[+tr_button[aria-expanded=true]]:border-transparent has-[+tr:hover]:border-transparent hover:[&>td]:bg-muted/50 has-aria-expanded:[&>td]:bg-muted/50 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg"
              >
                {selectionMode && (
                  <TableCell className="relative z-10 w-0">
                    <Checkbox
                      aria-label={`Select ${conversation.title}`}
                      checked={selected}
                      onCheckedChange={(checked) =>
                        toggleConversation(conversation.id, checked === true)
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
                        {selected ? "Deselect" : "Select"} {conversation.title}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={`/playground/conversations/${conversation.id}`}
                      className={rowActionClassName}
                    >
                      <span className="sr-only">Open {conversation.title}</span>
                    </Link>
                  )}
                  <span className="block truncate">{conversation.title}</span>
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
  )
}
