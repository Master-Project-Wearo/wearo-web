"use client"

import { ContentWrapper } from "@/components/content-wrapper"
import { ListingHeader } from "@/components/listing-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

export default function ConversationsPage() {
  return (
    <ScrollArea>
      <ContentWrapper>
        <ListingHeader
          title="Conversations"
          description="Find here your started conversations"
          searchPlaceholder="Search for a conversation"
          resultsCount={12}
          sortOptions={["Latest", "Oldest"]}
          action={{
            label: "Add an item",
            icon: Plus,
            onClick: () => null,
          }}
        />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell className="text-muted-foreground">
                18/06/2026
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentWrapper>
    </ScrollArea>
  )
}
