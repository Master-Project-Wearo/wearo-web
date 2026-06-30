import { Separator } from "@/components/ui/separator"

type SettingsSectionProps = {
  title: string
  variant?: "default" | "destructive"
  children: React.ReactNode
}

export function SettingsSection({
  title,
  variant = "default",
  children,
}: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className={variant === "destructive" ? "text-destructive" : ""}>
          {title}
        </h2>
        <Separator />
      </div>
      {children}
    </section>
  )
}
