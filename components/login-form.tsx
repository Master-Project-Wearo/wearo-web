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
import { login } from "@/lib/auth/actions"

type LoginFormProps = Omit<React.ComponentProps<"form">, "action"> & {
  redirectTo?: string
}

export function LoginForm({ className, redirectTo, ...props }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(login, {})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailErrors = state.errors?.email?.map((message) => ({ message }))
  const passwordErrors = state.errors?.password?.map((message) => ({ message }))
  const isComplete = email.trim().length > 0 && password.length > 0
  const signupHref = redirectTo
    ? `/signup?redirect=${encodeURIComponent(redirectTo)}`
    : "/signup"

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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field data-invalid={Boolean(emailErrors)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="m@example.com"
            disabled={pending}
            required
            autoComplete="email"
            aria-invalid={Boolean(emailErrors)}
            aria-describedby={emailErrors ? "login-email-error" : undefined}
            className="bg-background"
          />
          <FieldError id="login-email-error" errors={emailErrors} />
        </Field>
        <Field data-invalid={Boolean(passwordErrors)}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={pending}
            required
            autoComplete="current-password"
            aria-invalid={Boolean(passwordErrors)}
            aria-describedby={
              passwordErrors ? "login-password-error" : undefined
            }
            className="bg-background"
          />
          <FieldError id="login-password-error" errors={passwordErrors} />
        </Field>
        {state.formError ? (
          <Field data-invalid>
            <FieldError>{state.formError}</FieldError>
          </Field>
        ) : null}
        <Field>
          <Button type="submit" disabled={pending || !isComplete}>
            {pending ? (
              <>
                <Spinner data-icon="inline-start" />
                Logging in
              </>
            ) : (
              "Login"
            )}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href={signupHref} className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
