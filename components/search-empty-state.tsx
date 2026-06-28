"use client"

import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type SearchEmptyStateProps = {
  query: string
  resource: string
  onClearSearch: () => void
}

export function SearchEmptyState({
  query,
  resource,
  onClearSearch,
}: SearchEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No {resource} found</EmptyTitle>
        <EmptyDescription>
          No {resource} match &quot;{query}&quot;. Try a different search.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onClearSearch}>
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  )
}
