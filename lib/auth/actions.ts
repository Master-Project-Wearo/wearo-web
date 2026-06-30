"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

import { getSafeRedirect } from "@/lib/auth/routes"
import { createClient } from "@/lib/supabase/server"

const emailSchema = z
  .string({ error: "Email is required." })
  .trim()
  .min(1, { error: "Email is required." })
  .pipe(z.email({ error: "Enter a valid email address." }))

const requiredPasswordSchema = z
  .string({ error: "Password is required." })
  .min(1, { error: "Password is required." })

const nicknameSchema = z
  .string({ error: "Nickname is required." })
  .trim()
  .min(1, { error: "Nickname is required." })

const loginSchema = z.object({
  email: emailSchema,
  password: requiredPasswordSchema,
})

const signupSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    password: requiredPasswordSchema.pipe(
      z.string().min(8, {
        error: "Password must be at least 8 characters long.",
      })
    ),
    confirmPassword: z
      .string({ error: "Please confirm your password." })
      .min(1, { error: "Please confirm your password." }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type AuthFieldName = "nickname" | "email" | "password" | "confirmPassword"

export type AuthActionState = {
  errors?: Partial<Record<AuthFieldName, string[]>>
  formError?: string
  success?: string
}

export async function login(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (error?.code === "invalid_credentials") {
    return { errors: { password: ["Invalid email or password."] } }
  }

  if (error) {
    return { formError: error.message }
  }

  redirect(getSafeRedirect(formData.get("redirect")))
}

export async function signup(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validatedFields = signupSchema.safeParse({
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { email, password, nickname } = validatedFields.data
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
        display_name: nickname,
      },
    },
  })

  if (error?.code === "weak_password") {
    return { errors: { password: [error.message] } }
  }

  if (
    error?.code === "email_exists" ||
    error?.code === "user_already_exists" ||
    error?.code === "email_address_invalid"
  ) {
    return { errors: { email: [error.message] } }
  }

  if (error) {
    if (error.message.toLowerCase().includes("nickname")) {
      return { errors: { nickname: [error.message] } }
    }

    return { formError: error.message }
  }

  if (!data.session) {
    return {
      success:
        "Account created. Check your inbox to confirm your email address.",
    }
  }

  redirect(getSafeRedirect(formData.get("redirect")))
}

export async function updateProfileInformation(
  formData: FormData
): Promise<void> {
  const validatedFields = z
    .object({
      nickname: nicknameSchema,
    })
    .safeParse({
      nickname: formData.get("nickname"),
    })

  if (!validatedFields.success) {
    throw new Error("Nickname is required.")
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session?.access_token) {
    redirect("/login")
  }

  const { nickname } = validatedFields.data
  const response = await fetch(`${process.env.SUPABASE_URL!}/auth/v1/user`, {
    method: "PUT",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      data: {
        nickname,
        display_name: nickname,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    const message =
      typeof error?.message === "string"
        ? error.message
        : "Unable to update profile information."

    throw new Error(message)
  }

  revalidatePath("/", "layout")
  redirect("/settings")
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`Unable to log out: ${error.message}`)
  }

  redirect("/login")
}
