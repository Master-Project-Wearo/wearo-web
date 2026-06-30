import { cn } from "@/lib/utils"
import { Loader2Icon, LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="size-4 animate-spin"
      />
    </div>
  )
}

export { Spinner, SpinnerCustom }
