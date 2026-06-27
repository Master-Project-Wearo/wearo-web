import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { ArrowRight, Mic, Plus } from "lucide-react"

export function MessageComposer() {
  return (
    <InputGroup className="p-1.5">
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
          Commandes
          <Kbd>/outfit</Kbd>
          <Kbd>/schedule</Kbd>
        </InputGroupText>

        <InputGroupButton
          size="icon-sm"
          variant="ghost"
          className="ml-auto"
          aria-label="Utiliser le vocal"
        >
          <Mic />
        </InputGroupButton>

        <InputGroupButton variant="default" size="sm" aria-label="Envoyer">
          <ArrowRight />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
