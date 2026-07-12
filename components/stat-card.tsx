import Link from "next/link"
import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatCardProps = {
  title: string
  description: string
  value: number
  href: string
  actionLabel: string
  icon: LucideIcon
}

export function StatCard({
  title,
  description,
  value,
  href,
  actionLabel,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="h-full">
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
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            {actionLabel}
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
