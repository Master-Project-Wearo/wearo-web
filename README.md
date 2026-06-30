# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Supabase authentication

Copy `.env.example` to `.env.local` and replace the placeholder with the
project's publishable key:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://ficlwdqcgazyxplpgxoc.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Authentication is handled by Server Actions in `lib/auth/actions.ts`. Supabase
session cookies are verified and refreshed by the Next.js 16 `proxy.ts` file.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
