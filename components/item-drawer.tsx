"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import type { Item, UpdateItemInput } from "@/features/items/types"

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

function getFormState(item?: Item): ItemFormState {
  if (!item) return emptyFormState

  return {
    name: item.name,
    brand: item.brand ?? "",
    price: item.price ?? "",
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
        key={`${item?.item_id ?? "create"}:${open}`}
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
  const [form, setForm] = useState<ItemFormState>(() => getFormState(item))
  const [colorInput, setColorInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = Boolean(item)

  function updateForm<Key extends keyof ItemFormState>(
    key: Key,
    value: ItemFormState[Key]
  ) {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
  }

  function addColor() {
    const color = colorInput.trim().replace(/,$/, "")
    const isDuplicate = form.colors.some(
      (currentColor) => currentColor.toLowerCase() === color.toLowerCase()
    )

    if (color.length === 0 || isDuplicate) {
      setColorInput("")
      return
    }

    updateForm("colors", [...form.colors, color])
    setColorInput("")
  }

  function handleColorKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      addColor()
    }
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
    <DrawerContent className="sm:max-w-lg">
      <DrawerHeader>
        <DrawerTitle>{isEditing ? "Modify item" : "Create item"}</DrawerTitle>
        <DrawerDescription>
          {isEditing
            ? "Update the information saved for this wardrobe item."
            : "Add a new item to your wardrobe."}
        </DrawerDescription>
      </DrawerHeader>

      <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
        <ScrollArea className="px-4">
          <FieldGroup className="pb-4">
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
                required
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
                <FieldLabel htmlFor="item-price">Price</FieldLabel>
                <Input
                  id="item-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => updateForm("price", event.target.value)}
                  placeholder="89.99"
                  disabled={isSubmitting}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="item-type">Type</FieldLabel>
              <Select
                value={form.typeId || noTypeValue}
                onValueChange={(value) =>
                  updateForm("typeId", value === noTypeValue ? "" : value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="item-type" className="w-full">
                  <SelectValue placeholder="Choose an item type" />
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

            <Field>
              <FieldLabel htmlFor="item-color">Colors</FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="item-color"
                  value={colorInput}
                  onChange={(event) => setColorInput(event.target.value)}
                  onKeyDown={handleColorKeyDown}
                  placeholder="Blue"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addColor}
                  disabled={isSubmitting || colorInput.trim().length === 0}
                  aria-label="Add color"
                >
                  <Plus />
                </Button>
              </div>
              {form.colors.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.colors.map((color) => (
                    <Badge key={color} variant="secondary" className="pr-0.5">
                      {color}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="size-4 rounded-full"
                        onClick={() =>
                          updateForm(
                            "colors",
                            form.colors.filter(
                              (currentColor) => currentColor !== color
                            )
                          )
                        }
                        disabled={isSubmitting}
                        aria-label={"Remove " + color}
                      >
                        <X />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              <FieldDescription>
                Press Enter or comma to add a color.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="item-image-url">Image URL</FieldLabel>
              <Input
                id="item-image-url"
                name="image_url"
                type="url"
                value={form.imageUrl}
                onChange={(event) => updateForm("imageUrl", event.target.value)}
                placeholder="https://example.com/item.jpg"
                disabled={isSubmitting}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="item-web-url">Product URL</FieldLabel>
              <Input
                id="item-web-url"
                name="web_url"
                type="url"
                value={form.webUrl}
                onChange={(event) => updateForm("webUrl", event.target.value)}
                placeholder="https://example.com/product"
                disabled={isSubmitting}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="item-description">Description</FieldLabel>
              <Textarea
                id="item-description"
                name="ai_description"
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                placeholder="Fit, material, condition, styling notes..."
                className="min-h-24 resize-none"
                disabled={isSubmitting}
              />
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
        </ScrollArea>

        <DrawerFooter>
          <Button type="submit" disabled={isSubmitting}>
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
      </form>
    </DrawerContent>
  )
}
