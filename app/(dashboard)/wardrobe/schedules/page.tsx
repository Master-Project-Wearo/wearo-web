"use client"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

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
      </ContentWrapper>
    </ScrollArea>
  )
}
