"use client"

import { use, useEffect } from "react"
import { format, isMatch, isValid, parse } from "date-fns"
import { BotMessageSquare, Plus, ThermometerSun, Trash } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScheduleControls } from "@/components/schedule-controls"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

import { SettingsSection } from "@/components/settings-section"
import {
  Item,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Select } from "@/components/ui/select"

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Image
            alt="Outfit 1"
            className="aspect-3/4 h-full w-full object-cover"
            width={400}
            height={533}
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
          />
          <SettingsSection title="Outfit stylé plage">
            <Field>
              <Badge className="w-fit!" variant="secondary">
                <ThermometerSun />
                20°C
              </Badge>
              <FieldDescription>
                The temperature is based on your location
              </FieldDescription>
            </Field>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <BotMessageSquare />
              </ItemMedia>
              <ItemTitle>AI review</ItemTitle>
              <ItemDescription>
                The outfit is made with sustainable materials and is designed to
                be both stylish and environmentally friendly.
              </ItemDescription>
            </Item>

            <div className="mt-auto ml-auto flex gap-2">
              <Button variant="outline">Replace</Button>
              <Button variant="destructive">
                Delete
                <Trash />
              </Button>
            </div>
          </SettingsSection>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
