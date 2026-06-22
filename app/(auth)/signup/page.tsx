import { SignupForm } from "@/components/signup-form"

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const redirect = (await searchParams).redirect

  return (
    <SignupForm
      redirectTo={typeof redirect === "string" ? redirect : undefined}
    />
  )
}
