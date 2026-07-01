"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"

import { ProfilePictureField } from "@/components/profile-picture-field"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateCurrentUser } from "@/features/users/hooks"
import type { User } from "@/features/users/types"

type ProfileInformationFormProps = {
  user: User
}

export function ProfileInformationForm({ user }: ProfileInformationFormProps) {
  const [nickname, setNickname] = useState(user.nickname)
  const [description, setDescription] = useState(user.description ?? "")
  const updateUser = useUpdateCurrentUser()
  const isNicknameComplete = nickname.trim().length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    updateUser.mutate(
      {
        nickname: nickname.trim(),
        description: description.trim(),
        imageUrl: user.profile_picture_url ?? undefined,
      },
      {
        onSuccess: () => toast.success("Profile updated"),
        onError: (error) => toast.error(error.message),
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
        <FieldGroup className="order-2 lg:order-1">
          <Field>
            <FieldLabel htmlFor="nickname">Nickname *</FieldLabel>
            <Input
              id="nickname"
              name="nickname"
              className="max-w-sm"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Adrien Cambier"
              disabled={updateUser.isPending}
              required
            />
            <FieldDescription>
              You can use a nickname or your real name
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              className="max-w-sm resize-none"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={updateUser.isPending}
            />
            <FieldDescription>
              Add a short note about your style, preferences, or wardrobe goals
            </FieldDescription>
          </Field>
        </FieldGroup>
        <ProfilePictureField
          imageUrl={user.profile_picture_url ?? ""}
          nickname={nickname}
        />
      </div>
      <Button
        type="submit"
        className="w-fit"
        disabled={updateUser.isPending || !isNicknameComplete}
      >
        {updateUser.isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            Saving updates
          </>
        ) : (
          "Save updates"
        )}
      </Button>
    </form>
  )
}
