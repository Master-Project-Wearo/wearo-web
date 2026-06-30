import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ProfilePictureField } from "@/components/profile-picture-field"
import { SettingsSection } from "@/components/settings-section"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <ScrollArea>
      <ContentWrapper className="max-w-5xl">
        <ListingHeader
          title="Settings"
          description="Edit your account information here"
        />
        <SettingsSection title="Profile information">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <FieldGroup className="order-2 lg:order-1">
              <Field>
                <FieldLabel>Nickname</FieldLabel>
                <Input className="max-w-sm" placeholder="Adrien Cambier" />
                <FieldDescription>
                  You can use a nickname or your real name
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea className="max-w-sm resize-none" />
                <FieldDescription>
                  Add a short note about your style, preferences, or wardrobe
                  goals
                </FieldDescription>
              </Field>
            </FieldGroup>

            <ProfilePictureField />
          </div>
          <Button className="w-fit">Save updates</Button>
        </SettingsSection>
        <SettingsSection title="Dangerous zone" variant="destructive">
          <Item variant="muted">
            <ItemMedia variant="icon">
              <User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Delete account</ItemTitle>
              <ItemDescription>
                Permanently remove your personal account and all of its contents
                from Wearo. This action is not reversible, so please continue
                with caution.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="destructive">Delete</Button>
            </ItemActions>
          </Item>
        </SettingsSection>
      </ContentWrapper>
    </ScrollArea>
  )
}
