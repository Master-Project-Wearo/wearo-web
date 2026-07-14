import { BotMessageSquare, ThermometerSun } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type TemperatureRange = readonly [minimum: number, maximum: number]

type OutfitTemperatureFitProps = {
  currentTemperature: number
  suitableRange: TemperatureRange
}

const sliderMinimum = -20
const sliderMaximum = 45

function formatTemperature(value: number) {
  return `${value}\u00a0°C`
}

export function OutfitTemperatureFit({
  currentTemperature,
  suitableRange,
}: OutfitTemperatureFitProps) {
  const [minimumTemperature, maximumTemperature] = suitableRange
  const isTooCold = currentTemperature < minimumTemperature
  const isTooWarm = currentTemperature > maximumTemperature
  const isSuitable = !isTooCold && !isTooWarm

  const statusDescription = isTooCold
    ? `At ${formatTemperature(currentTemperature)}, it is too cold for this outfit. It is best suited to temperatures from ${formatTemperature(minimumTemperature)} to ${formatTemperature(maximumTemperature)}.`
    : isTooWarm
      ? `At ${formatTemperature(currentTemperature)}, it is too warm for this outfit. It is best suited to temperatures from ${formatTemperature(minimumTemperature)} to ${formatTemperature(maximumTemperature)}.`
      : `At ${formatTemperature(currentTemperature)}, this outfit is within its recommended range of ${formatTemperature(minimumTemperature)} to ${formatTemperature(maximumTemperature)}.`

  return (
    <>
      <Badge
        variant={isSuitable ? "secondary" : "destructive"}
        className={cn(
          isSuitable &&
            "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
        )}
      >
        <ThermometerSun />
        {formatTemperature(currentTemperature)}
      </Badge>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="truncate text-muted-foreground">
            AI-recommended range
          </span>
          <span className="tabular-nums-0 font-medium text-nowrap">
            {formatTemperature(minimumTemperature)} —{" "}
            {formatTemperature(maximumTemperature)}
          </span>
        </div>
        <Slider
          aria-label="AI-recommended temperature range"
          disabled
          min={sliderMinimum}
          max={sliderMaximum}
          step={1}
          value={[minimumTemperature, maximumTemperature]}
          className="data-disabled:opacity-100 [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-sm data-disabled:[&_[data-slot=slider-thumb]]:opacity-100 [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-linear-to-r [&_[data-slot=slider-track]]:from-blue-400 [&_[data-slot=slider-track]]:to-red-400"
        />
        <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>{formatTemperature(sliderMinimum)}</span>
          <span>{formatTemperature(sliderMaximum)}</span>
        </div>
      </div>

      <Item variant="muted">
        <ItemMedia variant="icon">
          <BotMessageSquare />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {isSuitable ? "Outfit suitable" : "Outfit not suitable"}
          </ItemTitle>
          <ItemDescription>{statusDescription}</ItemDescription>
        </ItemContent>
      </Item>
    </>
  )
}
