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

const colorFilterOptions = [
  { value: "Black", label: "Black", swatch: "#171717" },
  { value: "White", label: "White", swatch: "#ffffff" },
  { value: "Grey", label: "Grey", swatch: "#8e8e93" },
  { value: "Charcoal", label: "Charcoal", swatch: "#36454f" },
  { value: "Cream", label: "Cream", swatch: "#fffdd0" },
  { value: "Beige", label: "Beige", swatch: "#d9c3a5" },
  { value: "Tan", label: "Tan", swatch: "#d2b48c" },
  { value: "Camel", label: "Camel", swatch: "#c19a6b" },
  { value: "Brown", label: "Brown", swatch: "#7a4b2a" },
  { value: "Navy", label: "Navy", swatch: "#1f2a44" },
  { value: "Blue", label: "Blue", swatch: "#2563eb" },
  { value: "Light blue", label: "Light blue", swatch: "#93c5fd" },
  { value: "Teal", label: "Teal", swatch: "#0f766e" },
  { value: "Green", label: "Green", swatch: "#228b22" },
  { value: "Olive", label: "Olive", swatch: "#6b6b2c" },
  { value: "Khaki", label: "Khaki", swatch: "#bdb76b" },
  { value: "Yellow", label: "Yellow", swatch: "#facc15" },
  { value: "Orange", label: "Orange", swatch: "#f97316" },
  { value: "Red", label: "Red", swatch: "#dc2626" },
  { value: "Burgundy", label: "Burgundy", swatch: "#800020" },
  { value: "Pink", label: "Pink", swatch: "#ec4899" },
  { value: "Purple", label: "Purple", swatch: "#7e22ce" },
  { value: "Lavender", label: "Lavender", swatch: "#c4b5fd" },
  { value: "Gold", label: "Gold", swatch: "#d4af37" },
  { value: "Silver", label: "Silver", swatch: "#c0c0c0" },
  {
    value: "Multicolor",
    label: "Multicolor",
    swatch:
      "conic-gradient(#ef4444, #facc15, #22c55e, #3b82f6, #a855f7, #ef4444)",
  },
]

const itemFilterFields: ListingFilterField[] = [
  {
    key: "brand",
    label: "Brand",
    description: "Choose one or more brands",
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
    description: "Choose one or more colors",
    type: "multiselect",
    icon: <Palette />,
    options: colorFilterOptions,
  },
  {
    key: "is_favorite",
    label: "Favorite",
    description: "Filter by favorite status",
    type: "boolean",
    icon: <Heart />,
    options: [
      { value: "true", label: "Favorites" },
      { value: "false", label: "Not favorites" },
    ],
  },
  {
    key: "type_id",
    label: "Type",
    description: "Choose one or more item types",
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
