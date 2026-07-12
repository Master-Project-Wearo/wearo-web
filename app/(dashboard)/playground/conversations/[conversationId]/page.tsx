import { ContentWrapper } from "@/components/content-wrapper"
import { ConversationMessage } from "@/components/conversation-message"
import { MessageComposer } from "@/components/message-composer"
import { ScrollArea } from "@/components/ui/scroll-area"

const messages = [
  {
    role: "user",
    content: "Je veux une tenue propre pour sortir en ville ce week-end.",
  },
  {
    role: "assistant",
    content: [
      "Pour une sortie en ville, je partirais sur une tenue simple mais bien structurée : un pantalon droit, un haut sobre et une pièce qui donne un peu de caractère.",
      {
        text: "Vu ton style, je viserais plutôt une vibe clean, légèrement japonaise / coréenne, sans trop charger.",
        muted: true,
      },
    ],
  },
  {
    role: "user",
    content: [
      "J’ai un polo vert, un pantalon noir large et des mocassins noirs.",
      "Ça peut marcher ensemble ?",
    ],
  },
  {
    role: "assistant",
    content: [
      "Oui, ça peut très bien marcher. Le polo vert devient la pièce principale, le pantalon noir calme l’ensemble, et les mocassins rendent la tenue plus mature.",
      "Je te conseille de rentrer légèrement le polo dans le pantalon, ou au moins de faire un demi-rentré devant si le polo est un peu long. Ça évite l’effet trop bloc.",
    ],
  },
  {
    role: "user",
    content:
      "Et pour la veste ? J’ai une veste noire légère ou une surchemise beige.",
  },
  {
    role: "assistant",
    content: [
      "Je choisirais la surchemise beige. Elle va casser le contraste noir + vert et rendre la tenue plus douce.",
      {
        text: "La veste noire marche aussi, mais elle donnera un rendu plus sombre, plus strict. La surchemise beige est plus casual chic.",
        muted: true,
      },
    ],
  },
  {
    role: "user",
    content: "Je veux éviter que ça fasse trop daron ou trop habillé.",
  },
  {
    role: "assistant",
    content: [
      "Dans ce cas, garde le pantalon légèrement ample et évite de fermer entièrement la surchemise. Portée ouverte, elle donne un rendu plus naturel.",
      "Tu peux aussi retrousser très légèrement les manches si la matière le permet. Ça rend la tenue moins formelle.",
    ],
  },
  {
    role: "user",
    content: [
      "Niveau accessoires, je mets quoi ?",
      "J’ai une sacoche noire rectangulaire.",
    ],
  },
  {
    role: "assistant",
    content: [
      "La sacoche noire est parfaite ici. Elle rappelle les mocassins et le pantalon, donc elle garde une cohérence dans la tenue.",
      "Je resterais minimal : sacoche noire, montre fine ou bracelet discret, pas besoin d’ajouter plus.",
    ],
  },
  {
    role: "user",
    content: "Et si je veux une version plus k-fashion ?",
  },
  {
    role: "assistant",
    content: [
      "Pour une version plus k-fashion, je remplacerais les mocassins par des sneakers sobres ou des chaussures plus arrondies, et je laisserais la silhouette respirer davantage.",
      "Tu peux aussi ajouter un t-shirt blanc fin sous le polo si le col fonctionne bien. Ça donne un effet layering propre sans trop en faire.",
    ],
  },
  {
    role: "user",
    content:
      "Donc tenue finale : polo vert, pantalon noir large, surchemise beige, mocassins noirs, sacoche noire ?",
  },
  {
    role: "assistant",
    content: [
      "Oui, c’est la meilleure combinaison avec ce que tu as décrit.",
      "Le résultat devrait faire propre, moderne, un peu casual chic, sans tomber dans le trop habillé.",
    ],
  },
  {
    role: "user",
    content: "Et s’il pleut ou qu’il fait un peu froid ?",
  },
  {
    role: "assistant",
    content: [
      "S’il pleut, remplace la surchemise beige par ta veste noire légère. Ce sera plus pratique et plus cohérent avec la météo.",
      "Dans ce cas, garde le reste très simple : polo vert, pantalon noir, veste noire, mocassins. La tenue sera plus sombre, mais toujours propre.",
      {
        text: "Petit détail : si le pantalon est très large, évite une veste trop longue. Une veste courte ou mi-longue gardera de meilleures proportions.",
        muted: true,
      },
    ],
  },
] as const

export default function ConversationPage() {
  return (
    <>
      <ScrollArea>
        <div className="absolute bottom-0 h-4 w-full bg-linear-to-b from-background/0 to-background" />
        <ContentWrapper>
          {messages.map((message, index) => (
            <ConversationMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </ContentWrapper>
      </ScrollArea>
      <ContentWrapper className="pt-0!">
        <MessageComposer />
      </ContentWrapper>
    </>
  )
}
