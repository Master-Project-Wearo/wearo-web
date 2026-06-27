import { cn } from "@/lib/utils"

type ContentWrapperProps = React.ComponentProps<"div">

export function ContentWrapper({
  className,
  children,
  ...props
}: ContentWrapperProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className={cn("w-full max-w-3xl p-4", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
