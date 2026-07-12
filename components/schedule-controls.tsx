"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { addDays, format, isMatch, isValid, parse } from "date-fns"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

const urlDateFormat = "dd-MM-yyyy"
const locationChangeEvent = "schedule-date-change"

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener(locationChangeEvent, callback)

  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(locationChangeEvent, callback)
  }
}

function getLocationSearch() {
  return window.location.search
}

function getServerSearch() {
  return null
}

function parseUrlDate(value: string | null) {
  if (!value || !isMatch(value, urlDateFormat)) return null

  const date = parse(value, urlDateFormat, new Date())

  if (!isValid(date) || format(date, urlDateFormat) !== value) return null

  return date
}

function updateLocation(
  searchParams: URLSearchParams,
  mode: "push" | "replace"
) {
  const url = `?${searchParams.toString()}`

  if (mode === "replace") {
    window.history.replaceState(null, "", url)
  } else {
    window.history.pushState(null, "", url)
  }

  window.dispatchEvent(new Event(locationChangeEvent))
}

export function ScheduleControls() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const search = useSyncExternalStore(
    subscribeToLocation,
    getLocationSearch,
    getServerSearch
  )
  const searchParams = new URLSearchParams(search ?? "")
  const dateParam = searchParams.get("date")
  const selectedDate = parseUrlDate(dateParam) ?? new Date()
  const selectedDateValue = format(selectedDate, urlDateFormat)

  useEffect(() => {
    if (search === null || dateParam === selectedDateValue) return

    const nextSearchParams = new URLSearchParams(search)
    nextSearchParams.set("date", selectedDateValue)
    updateLocation(nextSearchParams, "replace")
  }, [dateParam, search, selectedDateValue])

  if (search === null) {
    return <Skeleton className="h-8 w-64" />
  }

  const currentSearch = search

  function navigateToDate(date: Date) {
    const nextSearchParams = new URLSearchParams(currentSearch)
    nextSearchParams.set("date", format(date, urlDateFormat))
    updateLocation(nextSearchParams, "push")
  }

  function selectCalendarDate(date: Date | undefined) {
    if (!date) return

    setIsCalendarOpen(false)
    navigateToDate(date)
  }

  return (
    <div className="flex gap-2 self-start">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Previous day"
        onClick={() => navigateToDate(addDays(selectedDate, -1))}
      >
        <ChevronLeftIcon />
      </Button>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="secondary" className="min-w-40">
            <CalendarIcon />
            {format(selectedDate, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate}
            onSelect={selectCalendarDate}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Next day"
        onClick={() => navigateToDate(addDays(selectedDate, 1))}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
