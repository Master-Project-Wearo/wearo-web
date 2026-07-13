import {
  ArrowRight,
  BotMessageSquare,
  CalendarDaysIcon,
  MessagesSquareIcon,
  ShirtIcon,
  SparklesIcon,
} from "lucide-react"
import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { StatCard } from "@/components/stat-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const mockDashboardStats = [
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
          {mockDashboardStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BotMessageSquare />
            </EmptyMedia>
            <EmptyTitle>Wearo AI</EmptyTitle>
            <EmptyDescription>
              Start a new conversation with your Wearo AI assistant
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/playground/new-chat">
                New Conversation
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </ContentWrapper>
    </ScrollArea>
  )
}
