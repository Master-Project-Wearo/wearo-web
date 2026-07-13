import { type LucideIcon } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatCardProps = {
  title: string
  description: string
  value: number
  icon: LucideIcon
}

export function StatCard({
  title,
  description,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="h-full min-h-44 bg-linear-to-t from-muted/50 to-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted *:size-4">
          <Icon aria-hidden="true" />
        </CardAction>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-4xl leading-none font-semibold tracking-tight tabular-nums">
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
