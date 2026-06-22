import { LoginForm } from "@/components/login-form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const redirect = (await searchParams).redirect

  return (
    <LoginForm
      redirectTo={typeof redirect === "string" ? redirect : undefined}
    />
  )
}
