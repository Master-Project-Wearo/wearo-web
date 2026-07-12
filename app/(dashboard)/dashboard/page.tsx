import { ContentWrapper } from "@/components/content-wrapper"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Vêtements</CardTitle>
              <CardDescription>
                Showing total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </ContentWrapper>
    </ScrollArea>
  )
}
