"use client"

import { use, useEffect } from "react"
import { format, isMatch, isValid, parse } from "date-fns"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScheduleControls } from "@/components/schedule-controls"
import { ScrollArea } from "@/components/ui/scroll-area"

const urlDateFormat = "dd-MM-yyyy"

type SchedulesPageProps = {
  searchParams: Promise<{ date?: string | string[] }>
}

function parseUrlDate(value: string | undefined) {
  if (!value || !isMatch(value, urlDateFormat)) return null

  const date = parse(value, urlDateFormat, new Date())

  if (!isValid(date) || format(date, urlDateFormat) !== value) return null

  return date
}

export default function SchedulesPage({ searchParams }: SchedulesPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dateParam = use(searchParams).date
  const selectedDate =
    parseUrlDate(Array.isArray(dateParam) ? dateParam[0] : dateParam) ??
    new Date()
  const selectedDateValue = format(selectedDate, urlDateFormat)

  useEffect(() => {
    if (dateParam === selectedDateValue) return

    const nextSearchParams = new URLSearchParams(window.location.search)
    nextSearchParams.set("date", selectedDateValue)
    router.replace(`${pathname}?${nextSearchParams.toString()}`, {
      scroll: false,
    })
  }, [dateParam, pathname, router, selectedDateValue])

  function changeDate(date: Date) {
    const nextSearchParams = new URLSearchParams(window.location.search)
    nextSearchParams.set("date", format(date, urlDateFormat))
    router.push(`${pathname}?${nextSearchParams.toString()}`, { scroll: false })
  }

  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Schedules"
          description="Find here your planned outfits"
          action={{
            label: "Add a schedule",
            icon: Plus,
            href: "/wardrobe/schedules/new",
          }}
        />
        <ScheduleControls
          selectedDate={selectedDate}
          onDateChange={changeDate}
        />
      </ContentWrapper>
    </ScrollArea>
  )
}
