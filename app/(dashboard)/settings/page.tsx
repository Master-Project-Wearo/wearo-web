import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { SettingsCard } from "@/components/settings-card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "lucide-react"

export default function SettingsPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Settings"
          description="Edit your account information here"
        />
        <SettingsCard
          title="Profile picture"
          description="Click your profile picture to upload or replace it."
          footerDescription="Optional, but useful when your wardrobe and conversations become more personal."
        />
        <SettingsCard
          title="Display name"
          description="Use a name people can recognize. Avoid impersonation, brand names, or restricted references."
          footerDescription="You can use a nickname or your real name."
          action={{
            label: "Save changes",
          }}
        >
          <Input className="max-w-sm" placeholder="Your name" />
        </SettingsCard>
        <SettingsCard
          title="Description"
          description="Add a short note about your style, preferences, or wardrobe goals."
          footerDescription="Keep it short and simple to read."
          action={{
            label: "Save changes",
          }}
        >
          <Textarea
            className="max-w-sm resize-none"
            placeholder="A few words about your style."
          />
        </SettingsCard>
        <SettingsCard
          title="Delete account"
          description="Permanently remove your personal account and all of its contents from Wearo. This action is not reversible, so please continue with caution."
          action={{
            label: "Delete",
            variant: "destructive",
            icon: Trash,
          }}
        />
      </ContentWrapper>
    </ScrollArea>
  )
}
