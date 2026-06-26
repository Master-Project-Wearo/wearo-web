import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { ArrowRight, Plus } from "lucide-react"

export default function ConversationPage() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="scroll-fade flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto">
        <Bubble>
          <BubbleContent>Hello</BubbleContent>
        </Bubble>

        <BubbleGroup>
          <Bubble variant="destructive">
            <BubbleContent>test</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>test</BubbleContent>
          </Bubble>
          <Bubble variant="outline">
            <BubbleContent>test</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>test</BubbleContent>
          </Bubble>
          <Bubble variant="tinted">
            <BubbleContent>test</BubbleContent>
          </Bubble>
        </BubbleGroup>

        <BubbleGroup>
          <Bubble align="end">
            <BubbleContent>Ceci est un test</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Ceci est test</BubbleContent>
          </Bubble>
        </BubbleGroup>

        <Bubble align="end">
          <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
        </Bubble>

        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>
              I can group messages, switch sides, and keep the whole thread easy
              to scan.
            </BubbleContent>
          </Bubble>
        </BubbleGroup>

        <Bubble align="end">
          <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
        </Bubble>

        <Bubble variant="muted">
          <BubbleContent>
            Yes. You are reading a demo that is demoing itself. Very meta. Very
            on-brand.
          </BubbleContent>
        </Bubble>
      </div>

      <div className="bg-background py-4">
        <InputGroup className="p-2">
          <InputGroupTextarea
            placeholder="Poser une question sur son dressing"
            className="resize-none"
          />

          <InputGroupAddon align="block-end">
            <InputGroupButton
              size="icon-sm"
              variant="secondary"
              aria-label="Ajouter"
            >
              <Plus />
            </InputGroupButton>

            <InputGroupButton
              variant="default"
              size="sm"
              className="ml-auto"
              aria-label="Envoyer"
            >
              <ArrowRight />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
