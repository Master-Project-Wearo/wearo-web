"use client"

import { useId, useState } from "react"
import { FilterIcon, PackagePlus, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export type FilterDrawerOption = {
  value: string
  label: string
}

export type FilterDrawerField = {
  key: string
  label: string
  icon?: React.ReactNode
  type?: "select" | "multiselect"
  options: FilterDrawerOption[]
}

export type FilterValue = {
  id: string
  field: string
  operator: string
  values: string[]
}

type FilterDrawerProps = {
  fields: FilterDrawerField[]
  filters: FilterValue[]
  onChange: (filters: FilterValue[]) => void
}

const ALL_VALUES = "__all__"

export function FilterDrawer({ fields, filters, onChange }: FilterDrawerProps) {
  const baseId = useId()
  const [open, setOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(filters)
  const activeFilters = filters.filter((filter) => filter.values.length > 0)

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setDraftFilters(filters)
    }
    setOpen(isOpen)
  }
  const applyFilters = () => {
    onChange(draftFilters)
    setOpen(false)
  }

  const updateField = (field: FilterDrawerField, values: string[]) => {
    setDraftFilters((currentFilters) => {
      const currentFilter = currentFilters.find(
        (filter) => filter.field === field.key
      )

      if (values.length === 0) {
        return currentFilters.filter((filter) => filter.field !== field.key)
      }

      if (currentFilter) {
        return currentFilters.map((filter) =>
          filter.id === currentFilter.id ? { ...filter, values } : filter
        )
      }

      return [
        ...currentFilters,
        {
          id: field.key,
          field: field.key,
          operator: field.type === "multiselect" ? "is_any_of" : "is",
          values,
        },
      ]
    })
  }

  return (
    <ButtonGroup>
      <Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <FilterIcon />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Refine the items displayed in your wardrobe.
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4">
            <Accordion type="multiple">
              <AccordionItem value="color">
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent className="h-fit">
                  <Tabs>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="favorites">Favorites</TabsTrigger>
                      <TabsTrigger value="non-favorites">
                        Non favorites
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="test">
                <AccordionTrigger>Test</AccordionTrigger>
                <AccordionContent className="h-fit">
                  <ToggleGroup
                    variant="outline"
                    type="multiple"
                    className="flex-wrap"
                  >
                    <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                    <ToggleGroupItem value="option2">
                      Option 2
                    </ToggleGroupItem>{" "}
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                  </ToggleGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="test2">
                <AccordionTrigger>Test2</AccordionTrigger>
                <AccordionContent>Test options will go here.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>

          <DrawerFooter>
            <Button onClick={applyFilters}>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {activeFilters.length > 0 && (
        <Button variant="outline" size="icon" onClick={() => onChange([])}>
          <XIcon />
        </Button>
      )}
    </ButtonGroup>
  )
}
