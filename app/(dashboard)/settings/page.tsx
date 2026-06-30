import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Pencil, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <ScrollArea>
      <ContentWrapper className="max-w-5xl">
        <ListingHeader
          title="Settings"
          description="Edit your account information here"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2>Profil informations</h2>
            <Separator />
          </div>
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

            <FieldGroup className="order-1 lg:order-2 lg:items-end">
              <Field className="max-w-48">
                <FieldLabel>Profile picture</FieldLabel>

                <div className="relative w-fit">
                  <Avatar className="size-40 sm:size-48">
                    <AvatarImage
                      src="/avatars/wearo.jpg"
                      alt="Adrien Cambier"
                    />
                    <AvatarFallback className="text-3xl font-medium">
                      AC
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 bottom-4 shadow-sm"
                  >
                    <Pencil />
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </div>
          <Button className="w-fit">Save updates</Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-destructive">Dangerous zone</h2>
            <Separator />
          </div>
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
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
