"use client"

import { useId, useState, type FormEvent } from "react"
import { ChevronDown, Euro, Minus, Plus, X } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { Item, UpdateItemInput } from "@/features/items/types"
import Image from "next/image"

export type ItemTypeOption = {
  value: string
  label: string
}

type ItemDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: Item
  typeOptions?: ItemTypeOption[]
  onSubmit?: (values: UpdateItemInput) => Promise<void> | void
}

type ItemFormState = {
  name: string
  brand: string
  price: string
  typeId: string
  colors: string[]
  imageUrl: string
  webUrl: string
  description: string
  isFavorite: boolean
}

const noTypeValue = "__no_type__"

const testColorOptions = [
  { value: "Black", swatch: "#171717" },
  { value: "White", swatch: "#ffffff" },
  { value: "Grey", swatch: "#8e8e93" },
  { value: "Beige", swatch: "#d9c3a5" },
  { value: "Brown", swatch: "#7a4b2a" },
  { value: "Blue", swatch: "#2563eb" },
  { value: "Green", swatch: "#228b22" },
  { value: "Yellow", swatch: "#facc15" },
  { value: "Orange", swatch: "#f97316" },
  { value: "Red", swatch: "#dc2626" },
  { value: "Pink", swatch: "#ec4899" },
  { value: "Purple", swatch: "#7e22ce" },
] as const

const emptyFormState: ItemFormState = {
  name: "",
  brand: "",
  price: "",
  typeId: "",
  colors: [],
  imageUrl: "",
  webUrl: "",
  description: "",
  isFavorite: false,
}

function formatPrice(value: string | null) {
  if (!value) return ""

  const price = Number(value.replace(",", "."))
  return Number.isFinite(price) ? Math.max(0, price).toFixed(2) : ""
}

function sanitizePrice(value: string) {
  const normalizedValue = value.replace(",", ".").replace(/[^\d.]/g, "")
  const [integerPart = "", ...decimalParts] = normalizedValue.split(".")
  const hasDecimalSeparator = normalizedValue.includes(".")
  const decimalPart = decimalParts.join("").slice(0, 2)

  return integerPart + (hasDecimalSeparator ? "." + decimalPart : "")
}

function getFormState(item?: Item): ItemFormState {
  if (!item) return emptyFormState

  return {
    name: item.name,
    brand: item.brand ?? "",
    price: formatPrice(item.price),
    typeId: item.type_id ?? "",
    colors: item.colors,
    imageUrl: item.image_url ?? "",
    webUrl: item.web_url ?? "",
    description: item.ai_description ?? "",
    isFavorite: item.is_favorite ?? false,
  }
}

function optionalValue(value: string) {
  const trimmedValue = value.trim()
  return trimmedValue.length > 0 ? trimmedValue : undefined
}

export function ItemDrawer({
  open,
  onOpenChange,
  item,
  typeOptions = [],
  onSubmit,
}: ItemDrawerProps) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <ItemDrawerContent
        key={(item?.item_id ?? "create") + ":" + open}
        onOpenChange={onOpenChange}
        item={item}
        typeOptions={typeOptions}
        onSubmit={onSubmit}
      />
    </Drawer>
  )
}

function ItemDrawerContent({
  onOpenChange,
  item,
  typeOptions = [],
  onSubmit,
}: Omit<ItemDrawerProps, "open">) {
  const formId = useId()
  const [form, setForm] = useState<ItemFormState>(() => getFormState(item))
  const [colorsOpen, setColorsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = Boolean(item)

  function updateForm<Key extends keyof ItemFormState>(
    key: Key,
    value: ItemFormState[Key]
  ) {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
  }

  function changePrice(amount: number) {
    const currentPrice = Number(form.price) || 0
    updateForm("price", Math.max(0, currentPrice + amount).toFixed(2))
  }

  function toggleColor(color: string) {
    updateForm(
      "colors",
      form.colors.includes(color)
        ? form.colors.filter((currentColor) => currentColor !== color)
        : [...form.colors, color]
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const price = form.price.trim()
    const values: UpdateItemInput = {
      name: form.name.trim(),
      brand: optionalValue(form.brand),
      price: price.length > 0 ? Number(price) : undefined,
      type_id: optionalValue(form.typeId),
      colors: form.colors,
      image_url: optionalValue(form.imageUrl),
      web_url: optionalValue(form.webUrl),
      ai_description: optionalValue(form.description),
      is_favorite: form.isFavorite,
    }

    setIsSubmitting(true)
    try {
      await onSubmit?.(values)
      toast.success(isEditing ? "Item updated" : "Item created")
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "The item could not be saved"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{isEditing ? "Modify item" : "Create item"}</DrawerTitle>
        <DrawerDescription>
          {isEditing
            ? "Update the information saved for this wardrobe item."
            : "Add a new item to your wardrobe."}
        </DrawerDescription>
      </DrawerHeader>

      <ScrollArea>
        <form id={formId} className="px-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <Image
              alt="Item image"
              className="aspect-square h-full w-full object-cover"
              width={400}
              height={400}
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop"
            />
            <Field>
              <FieldLabel htmlFor="item-name">Name *</FieldLabel>
              <Input
                id="item-name"
                name="name"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Vintage denim jacket"
                disabled={isSubmitting}
                autoFocus
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="item-brand">Brand</FieldLabel>
                <Input
                  id="item-brand"
                  name="brand"
                  value={form.brand}
                  onChange={(event) => updateForm("brand", event.target.value)}
                  placeholder="Levi's"
                  disabled={isSubmitting}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="item-type">Type</FieldLabel>
                <Select
                  value={form.typeId || noTypeValue}
                  onValueChange={(value) =>
                    updateForm("typeId", value === noTypeValue ? "" : value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="item-type">
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={noTypeValue}>No type</SelectItem>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="item-price">Price</FieldLabel>
              <ButtonGroup>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => changePrice(-1)}
                  disabled={isSubmitting || Number(form.price) <= 0}
                >
                  <Minus />
                </Button>
                <InputGroup className="min-w-0 flex-1">
                  <InputGroupInput
                    id="item-price"
                    name="price"
                    inputMode="decimal"
                    value={form.price}
                    onChange={(event) =>
                      updateForm("price", sanitizePrice(event.target.value))
                    }
                    onBlur={() => updateForm("price", formatPrice(form.price))}
                    placeholder="000.00"
                    className="text-right font-mono tabular-nums"
                    disabled={isSubmitting}
                  />
                  <InputGroupAddon align="inline-end">
                    <Euro />
                  </InputGroupAddon>
                </InputGroup>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => changePrice(1)}
                  disabled={isSubmitting}
                >
                  <Plus />
                </Button>
              </ButtonGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="item-colors">Colors</FieldLabel>
              <Popover open={colorsOpen} onOpenChange={setColorsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="item-colors"
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={colorsOpen}
                    className="w-full justify-between font-normal"
                    disabled={isSubmitting}
                  >
                    <span className="truncate">
                      {form.colors.length > 0
                        ? form.colors.length + " selected"
                        : "Search and select colors"}
                    </span>
                    <ChevronDown className="text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-(--radix-popover-trigger-width) p-0"
                >
                  <Command>
                    <CommandInput placeholder="Search a color..." />
                    <CommandList>
                      <CommandEmpty>No color found.</CommandEmpty>
                      <CommandGroup>
                        {testColorOptions.map((color) => (
                          <CommandItem
                            key={color.value}
                            value={color.value}
                            data-checked={form.colors.includes(color.value)}
                            onSelect={() => toggleColor(color.value)}
                          >
                            <span
                              aria-hidden="true"
                              className="size-3 rounded-full border"
                              style={{ backgroundColor: color.swatch }}
                            />
                            {color.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {form.colors.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.colors.map((color) => {
                    const colorOption = testColorOptions.find(
                      (option) => option.value === color
                    )

                    return (
                      <Badge key={color} variant="secondary" className="pr-0.5">
                        {colorOption && (
                          <span
                            aria-hidden="true"
                            className="size-2 rounded-full border"
                            style={{ backgroundColor: colorOption.swatch }}
                          />
                        )}
                        {color}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className="size-4 rounded-full"
                          onClick={() => toggleColor(color)}
                          disabled={isSubmitting}
                          aria-label={"Remove " + color}
                        >
                          <X />
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}
              <FieldDescription>
                Search and select one or more colors.
              </FieldDescription>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="item-favorite"
                checked={form.isFavorite}
                onCheckedChange={(checked) =>
                  updateForm("isFavorite", checked === true)
                }
                disabled={isSubmitting}
              />
              <FieldLabel htmlFor="item-favorite">Add to favorites</FieldLabel>
            </Field>
          </FieldGroup>
        </form>
      </ScrollArea>

      <DrawerFooter>
        <Button type="submit" form={formId} disabled={isSubmitting}>
          {isSubmitting && <Spinner data-icon="inline-start" />}
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Modify item"
              : "Create item"}
        </Button>
        <DrawerClose asChild>
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}
