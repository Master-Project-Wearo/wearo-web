"use client"

import { use, useState } from "react"
import { addDays, format, isMatch, isValid, parse, startOfWeek } from "date-fns"
import { notFound, useRouter } from "next/navigation"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Plus,
} from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

type ScheduleDatePageProps = {
  params: Promise<{ date: string }>
}

export default function ScheduleDatePage({ params }: ScheduleDatePageProps) {
  const { date: dateParam } = use(params)
  const router = useRouter()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const matchesEuropeanFormat = isMatch(dateParam, "dd-MM-yyyy")
  const selectedDate = parse(dateParam, "dd-MM-yyyy", new Date())
  const isCanonicalDate =
    matchesEuropeanFormat &&
    isValid(selectedDate) &&
    format(selectedDate, "dd-MM-yyyy") === dateParam

  if (!isCanonicalDate) {
    notFound()
  }

  const monday = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(monday, index)
  )

  function navigateToDate(date: Date) {
    router.push(`/wardrobe/schedules/${format(date, "dd-MM-yyyy")}`)
  }

  function selectCalendarDate(date: Date | undefined) {
    if (!date) return

    setIsCalendarOpen(false)
    navigateToDate(date)
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
            onClick: () => null,
          }}
        />

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
      </ContentWrapper>
    </ScrollArea>
  )
}
