import { Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function ProfilePictureField() {
  return (
    <FieldGroup className="order-1 lg:order-2 lg:items-end">
      <Field className="max-w-48">
        <FieldLabel>Profile picture</FieldLabel>

        <div className="relative w-fit">
          <Avatar className="size-40 sm:size-48">
            <AvatarImage src="/avatars/wearo.jpg" alt="Adrien Cambier" />
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
  )
}
