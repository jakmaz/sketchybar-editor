
import { Item, Overrides } from "./sketchybar-editor"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Settings } from "lucide-react"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"
import { ColorInput } from "./color-input"
import { Slider } from "./ui/slider"
import { useConfig } from "@/lib/config-context"

interface ItemEditPopoverProps {
  item: Item
}

export function ItemEditPopover({ item }: ItemEditPopoverProps) {
  const { config, setConfig } = useConfig()
  const { defaults } = config

  const itemInConfig = config.items.find(configItem => configItem.id === item.id)
  const overrides = itemInConfig?.overrides || {}

  // Check if a property is overridden
  const isOverriden = (property: keyof Overrides) => {
    return overrides[property] !== undefined
  }

  // Toggle override: add or remove override for property
  const handleToggleOverride = <K extends keyof Overrides>(property: K) => {
    const currentOverrides = { ...overrides }
    if (isOverriden(property)) {
      delete currentOverrides[property]
    } else {
      if (property in defaults) {
        currentOverrides[property] = defaults[property] as Overrides[K]
      } else {
        console.warn(`Property "${property}" does not exist in defaults.`)
      }
    }
    updateItemOverrides(item.id, currentOverrides)
  }

  // Generic update of an override property value
  const handleOverrideChange = <K extends keyof Overrides>(property: K, value: Overrides[K]) => {
    updateItemOverrides(item.id, { ...overrides, [property]: value })
  }

  // Update the item's overrides in config
  const updateItemOverrides = (id: string, newOverrides: Overrides) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? { ...item, overrides: Object.keys(newOverrides).length > 0 ? newOverrides : undefined }
          : item
      ),
    }))
  }

  const overridesCount = Object.keys(overrides).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 h-auto w-auto min-h-0 min-w-0"
        >
          <Settings
            className="h-4 w-4"
            color={overridesCount > 0 ? undefined : "grey"}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Edit {item.type} Item</h3>
          <p className="text-sm text-muted-foreground">
            Override default settings for this item. Toggle switches to enable overrides.
          </p>

          <Separator />

          <div className="grid grid-cols-2 gap-4 relative">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Colors Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Colors</h4>

                {(["backgroundColor", "iconColor", "labelColor"] as (keyof Overrides)[]).map((property) => (
                  <div key={property}>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`override-${property}`} className="text-sm capitalize">
                        {property.replace(/([A-Z])/g, " $1")}
                      </Label>
                      <Switch
                        id={`override-${property}`}
                        checked={isOverriden(property)}
                        onCheckedChange={() => handleToggleOverride(property)}
                      />
                    </div>
                    {isOverriden(property) && (
                      <ColorInput
                        id={`item-${property}`}
                        label=""
                        value={String(overrides[property] || defaults[property])}
                        onChange={(value) => handleOverrideChange(property, value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              {/* Dimensions Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Dimensions</h4>

                {([
                  { property: "backgroundHeight", min: 16, max: 64 },
                  { property: "backgroundCornerRadius", min: 0, max: 20 },
                ] as const).map(({ property, min, max }) => (
                  <div key={property}>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`override-${property}`} className="text-sm capitalize">
                        {property.replace(/([A-Z])/g, " $1")}
                      </Label>
                      <Switch
                        id={`override-${property}`}
                        checked={isOverriden(property)}
                        onCheckedChange={() => handleToggleOverride(property)}
                      />
                    </div>

                    {isOverriden(property) && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`item-${property}`} className="text-xs">
                            {`${property.replace(/([A-Z])/g, " $1")}: ${overrides[property] ?? defaults[property]
                              }px`}
                          </Label>
                        </div>
                        <Slider
                          id={`item-${property}`}
                          min={min}
                          max={max}
                          step={1}
                          value={[overrides[property] ?? defaults[property]]}
                          onValueChange={(value) => handleOverrideChange(property, value[0])}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="absolute h-full w-px bg-border left-1/2 transform -translate-x-1/2"></div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Padding Sections */}
              {[
                {
                  title: "Padding",
                  props: ["paddingLeft", "paddingRight"] as (keyof Overrides)[],
                },
                {
                  title: "Icon Padding",
                  props: ["iconPaddingLeft", "iconPaddingRight"] as (keyof Overrides)[],
                },
                {
                  title: "Label Padding",
                  props: ["labelPaddingLeft", "labelPaddingRight"] as (keyof Overrides)[],
                },
              ].map(({ title, props }) => (
                <div key={title} className="space-y-4">
                  <h4 className="font-medium">{title}</h4>

                  {props.map((property) => (
                    <div key={property}>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`override-${property}`} className="text-sm capitalize">
                          {property.replace(/([A-Z])/g, " $1")}
                        </Label>
                        <Switch
                          id={`override-${property}`}
                          checked={isOverriden(property)}
                          onCheckedChange={() => handleToggleOverride(property)}
                        />
                      </div>

                      {isOverriden(property) && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`item-${property}`} className="text-xs">
                              {`${property.replace(/([A-Z])/g, " $1")}: ${overrides[property] ?? defaults[property]
                                }px`}
                            </Label>
                          </div>
                          <Slider
                            id={`item-${property}`}
                            min={0}
                            max={32}
                            step={1}
                            value={[Number(overrides[property] ?? defaults[property])]}
                            onValueChange={(value) => handleOverrideChange(property, value[0])}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
