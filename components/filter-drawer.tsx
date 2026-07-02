"use client"

import { useState } from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { FilterIcon, PlusIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem } from "./ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export type FilterDrawerOption = {
  value: string
  label: string
  swatch?: string
}

export type FilterDrawerField = {
  key: string
  label: string
  description?: string
  icon?: React.ReactNode
  type?: "multiselect" | "boolean"
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

const allValue = "__all__"

export function FilterDrawer({ fields, filters, onChange }: FilterDrawerProps) {
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
          operator: field.type === "boolean" ? "is" : "is_any_of",
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
            <Accordion
              type="multiple"
              defaultValue={fields[0] ? [fields[0].key] : []}
            >
              {fields.map((field) => {
                const values =
                  draftFilters.find((filter) => filter.field === field.key)
                    ?.values ?? []
                const trueOption = field.options.find(
                  (option) => option.value === "true"
                )
                const falseOption = field.options.find(
                  (option) => option.value === "false"
                )

                return (
                  <AccordionItem key={field.key} value={field.key}>
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        data-slot="accordion-trigger"
                        className="flex flex-1 items-center justify-between gap-4 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-full border *:size-4"
                            aria-hidden="true"
                          >
                            {field.icon}
                          </span>
                          <span className="flex flex-col space-y-0.5">
                            <span>{field.label}</span>
                            <span className="font-normal text-muted-foreground">
                              {field.description}
                            </span>
                          </span>
                        </span>
                        <PlusIcon className="pointer-events-none block size-4 shrink-0 text-muted-foreground transition-transform duration-500" />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="h-fit">
                      {field.type === "boolean" ? (
                        <Tabs
                          value={values[0] ?? allValue}
                          onValueChange={(value) =>
                            updateField(
                              field,
                              value === allValue ? [] : [value]
                            )
                          }
                        >
                          <TabsList className="w-full">
                            <TabsTrigger value={allValue}>All</TabsTrigger>
                            <TabsTrigger value="true">
                              {trueOption?.label ?? "True"}
                            </TabsTrigger>
                            <TabsTrigger value="false">
                              {falseOption?.label ?? "False"}
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      ) : (
                        <ToggleGroup
                          type="multiple"
                          variant="outline"
                          value={values}
                          onValueChange={(nextValues) =>
                            updateField(field, nextValues)
                          }
                          className="w-full flex-wrap"
                        >
                          {field.options.map((option) => (
                            <ToggleGroupItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.swatch && (
                                <span
                                  aria-hidden="true"
                                  className="size-2 rounded-full border"
                                  style={{ background: option.swatch }}
                                />
                              )}
                              {option.label}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
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
