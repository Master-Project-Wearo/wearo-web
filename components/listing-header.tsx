"use client"

import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

type ListingHeaderAction = {
  label: string
  icon?: LucideIcon
  onClick?: () => void
}

type ListingHeaderProps = {
  title: string
  description?: string
  searchPlaceholder?: string
  resultsCount?: number
  sortOptions?: string[]
  sortPlaceholder?: string
  action?: ListingHeaderAction
  onSearchChange?: (value: string) => void
  onSortChange?: (value: string) => void
}

export function ListingHeader({
  title,
  description,
  searchPlaceholder = "Search...",
  resultsCount,
  sortOptions = [],
  sortPlaceholder = "Sort",
  action,
  onSearchChange,
  onSortChange,
}: ListingHeaderProps) {
  const ActionIcon = action?.icon
  const hasSort = sortOptions.length > 0

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1>{title}</h1>
          {action && (
            <Button onClick={action.onClick}>
              <span>{action.label}</span>
              {ActionIcon && <ActionIcon />}
            </Button>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder={searchPlaceholder}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
          {resultsCount && (
            <InputGroupAddon className="hidden md:flex" align="inline-end">
              {resultsCount} results
            </InputGroupAddon>
          )}
        </InputGroup>
        {hasSort && (
          <Select onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{sortPlaceholder}</SelectLabel>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  )
}
