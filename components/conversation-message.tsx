import { Copy, Repeat2 } from "lucide-react"

import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type MessagePart = {
  text: string
  muted?: boolean
}

type ConversationMessageProps = {
  role: "user" | "assistant"
  content: string | readonly (string | MessagePart)[]
}

function normalizeContent(
  content: ConversationMessageProps["content"]
): MessagePart[] {
  const parts = typeof content === "string" ? [content] : content

  return parts.map((part) => (typeof part === "string" ? { text: part } : part))
}

export function ConversationMessage({
  role,
  content,
}: ConversationMessageProps) {
  const parts = normalizeContent(content)

  if (role === "user") {
    return (
      <BubbleGroup>
        {parts.map(({ text }, index) => (
          <Bubble key={index} align="end">
            <BubbleContent>{text}</BubbleContent>
          </Bubble>
        ))}
      </BubbleGroup>
    )
  }

  return (
    <BubbleGroup>
      {parts.map(({ text, muted }, index) => (
        <p
          key={index}
          className={cn(
            "text-sm leading-relaxed",
            muted && "text-muted-foreground"
          )}
        >
          {text}
        </p>
      ))}

      <div className="flex items-center" aria-label="Actions de la réponse">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Copier la réponse"
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Copier</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Relancer la réponse"
            >
              <Repeat2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Relancer</TooltipContent>
        </Tooltip>
      </div>
    </BubbleGroup>
  )
}

export type { ConversationMessageProps, MessagePart }
