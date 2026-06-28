import { ContentWrapper } from "@/components/content-wrapper"
import { MessageComposer } from "@/components/message-composer"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ConversationPage() {
  return (
    <>
      <ScrollArea>
        <div className="absolute bottom-0 z-10 h-4 w-full bg-linear-to-b from-background/0 to-background" />
        <ContentWrapper>
          <Bubble align="end">
            <BubbleContent>
              Je veux une tenue propre pour sortir en ville ce week-end.
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              Pour une sortie en ville, je partirais sur une tenue simple mais
              bien structurée : un pantalon droit, un haut sobre et une pièce
              qui donne un peu de caractère.
            </p>
            <p className="text-sm text-muted-foreground">
              Vu ton style, je viserais plutôt une vibe clean, légèrement
              japonaise / coréenne, sans trop charger.
            </p>
          </BubbleGroup>

          <BubbleGroup>
            <Bubble align="end">
              <BubbleContent>
                J’ai un polo vert, un pantalon noir large et des mocassins
                noirs.
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Ça peut marcher ensemble ?</BubbleContent>
            </Bubble>
          </BubbleGroup>

          <BubbleGroup>
            <p className="text-sm">
              Oui, ça peut très bien marcher. Le polo vert devient la pièce
              principale, le pantalon noir calme l’ensemble, et les mocassins
              rendent la tenue plus mature.
            </p>
            <p className="text-sm">
              Je te conseille de rentrer légèrement le polo dans le pantalon, ou
              au moins de faire un demi-rentré devant si le polo est un peu
              long. Ça évite l’effet trop bloc.
            </p>
          </BubbleGroup>

          <Bubble align="end">
            <BubbleContent>
              Et pour la veste ? J’ai une veste noire légère ou une surchemise
              beige.
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              Je choisirais la surchemise beige. Elle va casser le contraste
              noir + vert et rendre la tenue plus douce.
            </p>
            <p className="text-sm text-muted-foreground">
              La veste noire marche aussi, mais elle donnera un rendu plus
              sombre, plus strict. La surchemise beige est plus casual chic.
            </p>
          </BubbleGroup>

          <Bubble align="end">
            <BubbleContent>
              Je veux éviter que ça fasse trop daron ou trop habillé.
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              Dans ce cas, garde le pantalon légèrement ample et évite de fermer
              entièrement la surchemise. Portée ouverte, elle donne un rendu
              plus naturel.
            </p>
            <p className="text-sm">
              Tu peux aussi retrousser très légèrement les manches si la matière
              le permet. Ça rend la tenue moins formelle.
            </p>
          </BubbleGroup>

          <BubbleGroup>
            <Bubble align="end">
              <BubbleContent>Niveau accessoires, je mets quoi ?</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>
                J’ai une sacoche noire rectangulaire.
              </BubbleContent>
            </Bubble>
          </BubbleGroup>

          <BubbleGroup>
            <p className="text-sm">
              La sacoche noire est parfaite ici. Elle rappelle les mocassins et
              le pantalon, donc elle garde une cohérence dans la tenue.
            </p>
            <p className="text-sm">
              Je resterais minimal : sacoche noire, montre fine ou bracelet
              discret, pas besoin d’ajouter plus.
            </p>
          </BubbleGroup>

          <Bubble align="end">
            <BubbleContent>
              Et si je veux une version plus k-fashion ?
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              Pour une version plus k-fashion, je remplacerais les mocassins par
              des sneakers sobres ou des chaussures plus arrondies, et je
              laisserais la silhouette respirer davantage.
            </p>
            <p className="text-sm">
              Tu peux aussi ajouter un t-shirt blanc fin sous le polo si le col
              fonctionne bien. Ça donne un effet layering propre sans trop en
              faire.
            </p>
          </BubbleGroup>

          <Bubble align="end">
            <BubbleContent>
              Donc tenue finale : polo vert, pantalon noir large, surchemise
              beige, mocassins noirs, sacoche noire ?
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              Oui, c’est la meilleure combinaison avec ce que tu as décrit.
            </p>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Tenue recommandée</ItemTitle>
                <ItemDescription>
                  Polo vert, pantalon noir large, surchemise beige portée
                  ouverte, mocassins noirs et sacoche noire rectangulaire.
                </ItemDescription>
              </ItemContent>
            </Item>
            <p className="text-sm">
              Le résultat devrait faire propre, moderne, un peu casual chic,
              sans tomber dans le trop habillé.
            </p>
          </BubbleGroup>

          <Bubble align="end">
            <BubbleContent>
              Et s’il pleut ou qu’il fait un peu froid ?
            </BubbleContent>
          </Bubble>

          <BubbleGroup>
            <p className="text-sm">
              S’il pleut, remplace la surchemise beige par ta veste noire
              légère. Ce sera plus pratique et plus cohérent avec la météo.
            </p>
            <p className="text-sm">
              Dans ce cas, garde le reste très simple : polo vert, pantalon
              noir, veste noire, mocassins. La tenue sera plus sombre, mais
              toujours propre.
            </p>
            <p className="text-sm text-muted-foreground">
              Petit détail : si le pantalon est très large, évite une veste trop
              longue. Une veste courte ou mi-longue gardera de meilleures
              proportions.
            </p>
          </BubbleGroup>
        </ContentWrapper>
      </ScrollArea>
      <ContentWrapper>
        <MessageComposer />
      </ContentWrapper>
    </>
  )
}
