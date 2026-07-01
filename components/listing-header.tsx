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
import { Filter, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

type ListingHeaderAction = {
  label: string
  icon?: LucideIcon
  onClick?: () => void
}

type ListingHeaderProps = {
  title: string
  description?: string
  searchPlaceholder?: string
  searchValue?: string
  resultsCount?: number
  sortOptions?: string[]
  sortPlaceholder?: string
  sortValue?: string
  action?: ListingHeaderAction
  onSearchChange?: (value: string) => void
  onSortChange?: (value: string) => void
}

export function ListingHeader({
  title,
  description,
  searchPlaceholder,
  searchValue,
  resultsCount,
  sortOptions = [],
  sortPlaceholder = "Sort",
  sortValue,
  action,
  onSearchChange,
  onSortChange,
}: ListingHeaderProps) {
  const ActionIcon = action?.icon
  const hasSearch =
    searchPlaceholder !== undefined ||
    searchValue !== undefined ||
    onSearchChange !== undefined
  const hasSort = sortOptions.length > 0
  const hasControls = hasSearch || hasSort

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <h1>{title}</h1>
          {action && (
            <Button
              className="w-fit max-w-full min-w-0 justify-self-end"
              onClick={action.onClick}
            >
              <span className="block truncate">{action.label}</span>
              {ActionIcon && <ActionIcon />}
            </Button>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        {hasControls && (
          <div className="flex w-full gap-2">
            {hasSearch && (
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput
                  type="search"
                  className="truncate"
                  placeholder={searchPlaceholder ?? "Search..."}
                  value={searchValue}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                />
                {resultsCount !== undefined && (
                  <InputGroupAddon
                    className="hidden md:flex"
                    align="inline-end"
                  >
                    {resultsCount} {resultsCount === 1 ? "result" : "results"}
                  </InputGroupAddon>
                )}
              </InputGroup>
            )}
            {hasSort && (
              <Select value={sortValue} onValueChange={onSortChange}>
                <SelectTrigger className="w-28">
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
        )}
        {/*<div className="flex w-full gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <Filter />
                Add filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Sub Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Sub Option 2</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>*/}
      </div>
    </>
  )
}
