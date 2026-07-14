"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ScheduleControlsProps = {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function ScheduleControls({
  selectedDate,
  onDateChange,
}: ScheduleControlsProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  function selectCalendarDate(date: Date | undefined) {
    if (!date) return

    setIsCalendarOpen(false)
    onDateChange(date)
  }

  return (
    <div className="flex gap-2 self-start">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous day"
        onClick={() => onDateChange(addDays(selectedDate, -1))}
      >
        <ChevronLeftIcon />
      </Button>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="min-w-40">
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
        variant="outline"
        size="icon"
        aria-label="Next day"
        onClick={() => onDateChange(addDays(selectedDate, 1))}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
