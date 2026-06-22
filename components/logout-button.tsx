"use client"

import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { logout } from "@/lib/auth/actions"

function LogoutSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
          Logging out
        </>
      ) : (
        "Log out"
      )}
    </Button>
  )
}

export function LogoutButton() {
  return (
    <form action={logout}>
      <LogoutSubmitButton />
    </form>
  )
}
