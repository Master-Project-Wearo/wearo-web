"use client"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

export default function OutfitsPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Outfits"
          description="Find here your saved outfits"
          searchPlaceholder="Search for an outfit"
          resultsCount={12}
          sortOptions={["By latest", "By cheapest"]}
          action={{
            label: "Add an outfit",
            icon: Plus,
            onClick: () => null,
          }}
        />
      </ContentWrapper>
    </ScrollArea>
  )
}
