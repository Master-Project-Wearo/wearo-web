"use client"

import { Key, Mail, User as UserIcon } from "lucide-react"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ProfileInformationForm } from "@/components/profile-information-form"
import { SettingsSection } from "@/components/settings-section"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SpinnerCustom } from "@/components/ui/spinner"
import { useCurrentUser } from "@/features/users/hooks"

export default function SettingsPage() {
  const { data: user, isPending, error } = useCurrentUser()

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p role="alert" className="text-sm text-destructive">
          Unable to load your profile. Please refresh the page.
        </p>
      </div>
    )
  }

  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Settings"
          description="Edit your account information here"
        />
        <SettingsSection title="Profile information">
          <ProfileInformationForm key={user.user_id} user={user} />
        </SettingsSection>
        <SettingsSection title="Authentication">
          <Item>
            <ItemMedia variant="icon">
              <Mail />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Email address</ItemTitle>
              <ItemDescription>{user.email}</ItemDescription>
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
              <UserIcon />
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
