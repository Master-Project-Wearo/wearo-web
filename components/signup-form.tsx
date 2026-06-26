"use client"

import { useActionState, useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { signup } from "@/lib/auth/actions"

type SignupFormProps = Omit<React.ComponentProps<"form">, "action"> & {
  redirectTo?: string
}

export function SignupForm({
  className,
  redirectTo,
  ...props
}: SignupFormProps) {
  const [state, formAction, pending] = useActionState(signup, {})
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const nicknameErrors = state.errors?.nickname?.map((message) => ({ message }))
  const emailErrors = state.errors?.email?.map((message) => ({ message }))
  const passwordErrors = state.errors?.password?.map((message) => ({ message }))
  const confirmPasswordErrors = state.errors?.confirmPassword?.map(
    (message) => ({ message })
  )
  const isComplete =
    nickname.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0
  const loginHref = redirectTo
    ? `/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/login"

  return (
    <form
      {...props}
      noValidate
      action={formAction}
      className={cn("flex flex-col gap-6", className)}
    >
      <input type="hidden" name="redirect" value={redirectTo} />
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field data-invalid={Boolean(nicknameErrors)}>
          <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Adrien"
            required
            autoComplete="nickname"
            aria-invalid={Boolean(nicknameErrors)}
            aria-describedby={
              nicknameErrors
                ? "signup-nickname-description signup-nickname-error"
                : "signup-nickname-description"
            }
            className="bg-background"
          />
          <FieldDescription id="signup-nickname-description">
            This name will be displayed in your profile.
          </FieldDescription>
          <FieldError id="signup-nickname-error" errors={nicknameErrors} />
        </Field>
        <Field data-invalid={Boolean(emailErrors)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="m@example.com"
            required
            autoComplete="email"
            aria-invalid={Boolean(emailErrors)}
            aria-describedby={
              emailErrors
                ? "signup-email-description signup-email-error"
                : "signup-email-description"
            }
            className="bg-background"
          />
          <FieldDescription id="signup-email-description">
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
          <FieldError id="signup-email-error" errors={emailErrors} />
        </Field>
        <Field data-invalid={Boolean(passwordErrors)}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            aria-invalid={Boolean(passwordErrors)}
            aria-describedby={
              passwordErrors
                ? "signup-password-description signup-password-error"
                : "signup-password-description"
            }
            className="bg-background"
          />
          <FieldDescription id="signup-password-description">
            Must be at least 8 characters long.
          </FieldDescription>
          <FieldError id="signup-password-error" errors={passwordErrors} />
        </Field>
        <Field data-invalid={Boolean(confirmPasswordErrors)}>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            aria-invalid={Boolean(confirmPasswordErrors)}
            aria-describedby={
              confirmPasswordErrors
                ? "signup-confirm-password-description signup-confirm-password-error"
                : "signup-confirm-password-description"
            }
            className="bg-background"
          />
          <FieldDescription id="signup-confirm-password-description">
            Please confirm your password.
          </FieldDescription>
          <FieldError
            id="signup-confirm-password-error"
            errors={confirmPasswordErrors}
          />
        </Field>
        {state.formError ? (
          <Field data-invalid>
            <FieldError>{state.formError}</FieldError>
          </Field>
        ) : null}
        {state.success ? (
          <p role="status" className="text-sm text-foreground">
            {state.success}
          </p>
        ) : null}
        <Field>
          <Button type="submit" disabled={pending || !isComplete}>
            {pending ? (
              <>
                <Spinner data-icon="inline-start" />
                Creating account
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={loginHref}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}