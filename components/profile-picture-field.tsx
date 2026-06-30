"use client"

import { Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

type ProfilePictureFieldProps = {
  imageUrl: string
  nickname: string
  isLoading?: boolean
}

function getInitials(nickname: string) {
  return nickname.trim().slice(0, 2).toUpperCase() || "UN"
}

export function ProfilePictureField({
  imageUrl,
  nickname,
  isLoading = false,
}: ProfilePictureFieldProps) {
  return (
    <FieldGroup className="order-1 lg:order-2 lg:items-end">
      <Field className="max-w-48">
        <FieldLabel>Profile picture</FieldLabel>

        <div className="relative w-fit">
          <Avatar className="size-40 sm:size-48">
            {!isLoading && imageUrl && (
              <AvatarImage src={imageUrl} alt={nickname || "Profile picture"} />
            )}
            <AvatarFallback className="text-3xl font-medium">
              {isLoading ? "..." : getInitials(nickname)}
            </AvatarFallback>
          </Avatar>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-4 bottom-4 shadow-sm"
            aria-label="Profile picture upload coming soon"
          >
            <Pencil />
          </Button>
        </div>
      </Field>
    </FieldGroup>
  )
}
