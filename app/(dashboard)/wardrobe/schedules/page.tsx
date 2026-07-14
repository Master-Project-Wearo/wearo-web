"use client"

import { use, useEffect } from "react"
import { addDays, format, isMatch, isValid, parse } from "date-fns"
import { ArrowLeft, ArrowRight, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { ContentWrapper } from "@/components/content-wrapper"
import { ContentSection } from "@/components/content-section"
import { ListingHeader } from "@/components/listing-header"
import { OutfitTemperatureFit } from "@/components/outfit-temperature-fit"
import { ScheduleControls } from "@/components/schedule-controls"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

const urlDateFormat = "dd-MM-yyyy"

const scheduledOutfit = {
  name: "Outfit stylé plage",
  currentTemperature: 20,
  suitableTemperatureRange: [18, 26] as const,
}

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Image
            alt="Outfit 1"
            className="aspect-3/4 h-full w-full object-cover"
            width={400}
            height={533}
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
          />
          <ContentSection title={scheduledOutfit.name}>
            <OutfitTemperatureFit
              currentTemperature={scheduledOutfit.currentTemperature}
              suitableRange={scheduledOutfit.suitableTemperatureRange}
            />

            <div className="mt-auto flex gap-2">
              <Button variant="outline">Replace</Button>
              <Button variant="destructive">
                Delete
                <Trash />
              </Button>
            </div>
          </ContentSection>
        </div>
        <ContentSection title="Need help?">
          <p className="text-sm">
            Ask a specific question about your scheduled outfit{" "}
            <Link href="#" className="underline underline-offset-4">
              here
            </Link>
            .
          </p>
        </ContentSection>
        <div className="mt-auto flex justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => changeDate(addDays(selectedDate, -1))}
          >
            <ArrowLeft />
            Previous
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => changeDate(addDays(selectedDate, 1))}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
