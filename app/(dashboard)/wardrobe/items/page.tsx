"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Palette, Plus, Shirt, Tags } from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import {
  ListingHeader,
  type ListingFilter,
  type ListingFilterField,
} from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"

function createFilterOptions(values: string[]) {
  return values.map((value) => ({ value, label: value }))
}

const itemFilterFields: ListingFilterField[] = [
  {
    key: "brand",
    label: "Brand",
    type: "multiselect",
    icon: <Tags />,
    options: createFilterOptions([
      "Adidas",
      "H&M",
      "Levi's",
      "Nike",
      "Uniqlo",
      "Zara",
    ]),
  },
  {
    key: "colors",
    label: "Color",
    type: "multiselect",
    icon: <Palette />,
    options: createFilterOptions([
      "Beige",
      "Black",
      "Blue",
      "Brown",
      "Green",
      "Grey",
      "Red",
      "White",
    ]),
  },
  {
    key: "is_favorite",
    label: "Favorite",
    type: "select",
    icon: <Heart />,
    options: [
      { value: "true", label: "Favorites" },
      { value: "false", label: "Not favorites" },
    ],
  },
  {
    key: "type_id",
    label: "Type",
    type: "multiselect",
    icon: <Shirt />,
    options: createFilterOptions([
      "Accessories",
      "Dresses",
      "Jackets",
      "Pants",
      "Shirts",
      "Shoes",
    ]),
  },
]
const items = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
]

export default function ItemsPage() {
  const [filters, setFilters] = useState<ListingFilter[]>([])

  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Items"
          description="Find here your saved items"
          searchPlaceholder="Search for an article"
          resultsCount={12}
          sortOptions={["Latest", "Oldest"]}
          filterFields={itemFilterFields}
          filters={filters}
          onFiltersChange={setFilters}
          action={{
            label: "Add an item",
            icon: Plus,
            onClick: () => null,
          }}
        />
        <div className="flex flex-col gap-2">
          <p>Item list</p>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {items.map((src, index) => (
              <Image
                key={index}
                alt={`Item ${index + 1}`}
                className="aspect-square h-full w-full object-cover"
                width={400}
                height={400}
                src={src}
              />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
