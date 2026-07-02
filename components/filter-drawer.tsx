"use client"

import { useId, useState } from "react"
import { FilterIcon, XIcon } from "lucide-react"

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

          <ScrollArea>
            <FieldGroup className="px-4 pb-4">
              {fields.map((field, fieldIndex) => {
                const filter = draftFilters.find(
                  (currentFilter) => currentFilter.field === field.key
                )
                const values = filter?.values ?? []

                return (
                  <FieldSet key={field.key}>
                    <FieldLegend variant="label">
                      <span className="flex items-center gap-2">
                        {field.icon}
                        {field.label}
                      </span>
                    </FieldLegend>

                    {field.type === "multiselect" ? (
                      <FieldGroup data-slot="checkbox-group">
                        {field.options.map((option, optionIndex) => {
                          const optionId = `${baseId}-${fieldIndex}-${optionIndex}`
                          const isChecked = values.includes(option.value)

                          return (
                            <Field key={option.value} orientation="horizontal">
                              <Checkbox
                                id={optionId}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  updateField(
                                    field,
                                    checked === true
                                      ? [...values, option.value]
                                      : values.filter(
                                          (value) => value !== option.value
                                        )
                                  )
                                }
                              />
                              <FieldLabel htmlFor={optionId}>
                                {option.label}
                              </FieldLabel>
                            </Field>
                          )
                        })}
                      </FieldGroup>
                    ) : (
                      <Select
                        value={values[0] ?? ALL_VALUES}
                        onValueChange={(value) =>
                          updateField(
                            field,
                            value === ALL_VALUES ? [] : [value]
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={ALL_VALUES}>Any</SelectItem>
                            {field.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </FieldSet>
                )
              })}
            </FieldGroup>
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
