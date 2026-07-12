"use client"

import { Plus } from "lucide-react"
import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScheduleControls } from "@/components/schedule-controls"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SchedulesPage() {
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
        <ScheduleControls />
      </ContentWrapper>
    </ScrollArea>
  )
}
