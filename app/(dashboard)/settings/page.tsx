import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ProfilePictureField } from "@/components/profile-picture-field"
import { SettingsSection } from "@/components/settings-section"
import { updateProfileInformation } from "@/lib/auth/actions"
import { getCurrentAuthUser } from "@/lib/auth/session"
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
import { Key, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function SettingsPage() {
  const user = await getCurrentAuthUser()

  return (
    <ScrollArea>
      <ContentWrapper className="max-w-5xl">
        <ListingHeader
          title="Settings"
          description="Edit your account information here"
        />
        <SettingsSection title="Profile information">
          <form
            action={updateProfileInformation}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
              <FieldGroup className="order-2 lg:order-1">
                <Field>
                  <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                  <Input
                    id="nickname"
                    name="nickname"
                    className="max-w-sm"
                    defaultValue={user?.nickname ?? ""}
                    placeholder="Adrien Cambier"
                    required
                  />
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
            <Button type="submit" className="w-fit">
              Save updates
            </Button>
          </form>
        </SettingsSection>
        <SettingsSection title="Authentication">
          <Item>
            <ItemMedia variant="icon">
              <Mail />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Email adress</ItemTitle>
              <ItemDescription>Edit your email adress</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline">Modify</Button>
            </ItemActions>
          </Item>
          <Item>
            <ItemMedia variant="icon">
              <Key />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Google authentication</ItemTitle>
              <ItemDescription>
                Link your wearo account to google
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline">Connect</Button>
            </ItemActions>
          </Item>
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
