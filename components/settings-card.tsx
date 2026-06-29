import type { ComponentProps, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type SettingsCardAction = {
  label: string
  variant?: ComponentProps<typeof Button>["variant"]
  icon?: LucideIcon
}

type SettingsCardProps = {
  title: string
  description: ReactNode
  children?: ReactNode
  footerDescription?: ReactNode
  action?: SettingsCardAction
}

export function SettingsCard({
  title,
  description,
  children,
  footerDescription,
  action,
}: SettingsCardProps) {
  const ActionIcon = action?.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{description}</p>
        {children}
      </CardContent>
      {(footerDescription || action) && (
        <CardFooter className="gap-4">
          {footerDescription && (
            <CardDescription>{footerDescription}</CardDescription>
          )}
          {action && (
            <Button className="ml-auto" variant={action.variant} type="button">
              {ActionIcon && <ActionIcon />}
              {action.label}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
