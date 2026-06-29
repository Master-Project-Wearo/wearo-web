"use client"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import Image from "next/image"

const outfits = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
]

export default function OutfitsPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Outfits"
          description="Find here your saved outfits"
          searchPlaceholder="Search for an outfit"
          resultsCount={outfits.length}
          sortOptions={["Latest", "Oldest"]}
          action={{
            label: "Add an outfit",
            icon: Plus,
            onClick: () => null,
          }}
        />
        <div className="flex flex-col gap-2">
          <p>Outfit list</p>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {outfits.map((src, index) => (
              <Image
                key={index}
                alt={`Outfit ${index + 1}`}
                className="aspect-3/4 h-full w-full object-cover"
                width={400}
                height={533}
                src={src}
              />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
