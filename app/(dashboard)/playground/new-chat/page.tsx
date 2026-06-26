import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { ArrowRight, Plus } from "lucide-react"

export default function NewChatPage() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <InputGroup className="relative z-10 p-2">
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
          <InputGroupText className="ml-2">
            Appuyer sur
            <Kbd>Entrer</Kbd>
          </InputGroupText>
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
  )
}
