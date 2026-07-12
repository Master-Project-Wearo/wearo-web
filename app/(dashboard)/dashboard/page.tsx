import {
  CalendarDaysIcon,
  MessagesSquareIcon,
  ShirtIcon,
  SparklesIcon,
} from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { StatCard } from "@/components/stat-card"
import { ScrollArea } from "@/components/ui/scroll-area"

const stats = [
  {
    title: "Clothing items",
    description: "All the pieces saved in your wardrobe.",
    value: 48,
    href: "/wardrobe/items",
    actionLabel: "View wardrobe",
    icon: ShirtIcon,
  },
  {
    title: "Outfits",
    description: "Looks created from your wardrobe.",
    value: 12,
    href: "/wardrobe/outfits",
    actionLabel: "View outfits",
    icon: SparklesIcon,
  },
  {
    title: "Upcoming outfits",
    description: "Outfits planned for the days ahead.",
    value: 4,
    href: "/wardrobe/schedules",
    actionLabel: "View schedule",
    icon: CalendarDaysIcon,
  },
  {
    title: "Conversations",
    description: "Your conversations with the style assistant.",
    value: 9,
    href: "/playground/conversations",
    actionLabel: "View conversations",
    icon: MessagesSquareIcon,
  },
]

export default function DashboardPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Dashboard"
          description="A quick overview of your wardrobe and activity."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
