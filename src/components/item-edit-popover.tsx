import { useState } from "react"
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
  updateItemOverrides: (id: string, overrides: Overrides) => void
}

export function ItemEditPopover({ item, updateItemOverrides }: ItemEditPopoverProps) {
  const { config } = useConfig()
  const { defaults } = config

  const [overrides, setOverrides] = useState<Overrides>(item.overrides || {})
  const [activeOverrides, setActiveOverrides] = useState<Record<string, boolean>>({
    backgroundColor: !!item.overrides?.backgroundColor,
    iconColor: !!item.overrides?.iconColor,
    labelColor: !!item.overrides?.labelColor,
    paddingLeft: item.overrides?.paddingLeft !== undefined,
    paddingRight: item.overrides?.paddingRight !== undefined,
    backgroundCornerRadius: item.overrides?.backgroundCornerRadius !== undefined,
    backgroundHeight: item.overrides?.backgroundHeight !== undefined,
    iconPaddingLeft: item.overrides?.iconPaddingLeft !== undefined,
    iconPaddingRight: item.overrides?.iconPaddingRight !== undefined,
    labelPaddingLeft: item.overrides?.labelPaddingLeft !== undefined,
    labelPaddingRight: item.overrides?.labelPaddingRight !== undefined,
  })

  const handleToggleOverride = (property: string) => {
    const newActiveOverrides = { ...activeOverrides, [property]: !activeOverrides[property] }
    setActiveOverrides(newActiveOverrides)

    // If turning off an override, remove it from the overrides object
    if (!newActiveOverrides[property]) {
      const newOverrides = { ...overrides }
      delete (newOverrides as { [key: string]: unknown })[property];
      setOverrides(newOverrides)
      updateItemOverrides(item.id, newOverrides)
    }
  }

  const handleColorChange = (property: string, value: string) => {
    const newOverrides = { ...overrides, [property]: value }
    setOverrides(newOverrides)
    updateItemOverrides(item.id, newOverrides)
  }

  const handleSliderChange = (property: string, value: number[]) => {
    const newOverrides = { ...overrides, [property]: value[0] }
    setOverrides(newOverrides)
    updateItemOverrides(item.id, newOverrides)
  }

  const overridesCount = item.overrides ? Object.keys(item.overrides).length : 0

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
      <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Edit {item.type} Item</h3>
          <p className="text-sm text-muted-foreground">
            Override default settings for this item. Toggle switches to enable overrides.
          </p>

          <Separator />

          {/* Colors Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Colors</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="override-bg-color" className="text-sm">
                Background Color
              </Label>
              <Switch
                id="override-bg-color"
                checked={activeOverrides.backgroundColor}
                onCheckedChange={() => handleToggleOverride("backgroundColor")}
              />
            </div>

            {activeOverrides.backgroundColor && (
              <ColorInput
                id="item-bg-color"
                label=""
                value={overrides.backgroundColor || defaults.backgroundColor}
                onChange={(value) => handleColorChange("backgroundColor", value)}
              />
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-icon-color" className="text-sm">
                Icon Color
              </Label>
              <Switch
                id="override-icon-color"
                checked={activeOverrides.iconColor}
                onCheckedChange={() => handleToggleOverride("iconColor")}
              />
            </div>

            {activeOverrides.iconColor && (
              <ColorInput
                id="item-icon-color"
                label=""
                value={overrides.iconColor || defaults.iconColor}
                onChange={(value) => handleColorChange("iconColor", value)}
              />
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-label-color" className="text-sm">
                Label Color
              </Label>
              <Switch
                id="override-label-color"
                checked={activeOverrides.labelColor}
                onCheckedChange={() => handleToggleOverride("labelColor")}
              />
            </div>

            {activeOverrides.labelColor && (
              <ColorInput
                id="item-label-color"
                label=""
                value={overrides.labelColor || defaults.labelColor}
                onChange={(value) => handleColorChange("labelColor", value)}
              />
            )}
          </div>

          <Separator />

          {/* Dimensions Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Dimensions</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="override-bg-height" className="text-sm">
                Background Height
              </Label>
              <Switch
                id="override-bg-height"
                checked={activeOverrides.backgroundHeight}
                onCheckedChange={() => handleToggleOverride("backgroundHeight")}
              />
            </div>

            {activeOverrides.backgroundHeight && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-bg-height" className="text-xs">
                    Height: {overrides.backgroundHeight || defaults.backgroundHeight}px
                  </Label>
                </div>
                <Slider
                  id="item-bg-height"
                  min={16}
                  max={64}
                  step={1}
                  value={[overrides.backgroundHeight || defaults.backgroundHeight]}
                  onValueChange={(value) => handleSliderChange("backgroundHeight", value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-bg-radius" className="text-sm">
                Corner Radius
              </Label>
              <Switch
                id="override-bg-radius"
                checked={activeOverrides.backgroundCornerRadius}
                onCheckedChange={() => handleToggleOverride("backgroundCornerRadius")}
              />
            </div>

            {activeOverrides.backgroundCornerRadius && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-bg-radius" className="text-xs">
                    Radius: {overrides.backgroundCornerRadius || defaults.backgroundCornerRadius}px
                  </Label>
                </div>
                <Slider
                  id="item-bg-radius"
                  min={0}
                  max={20}
                  step={1}
                  value={[overrides.backgroundCornerRadius || defaults.backgroundCornerRadius]}
                  onValueChange={(value) => handleSliderChange("backgroundCornerRadius", value)}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Padding Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Padding</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="override-padding-left" className="text-sm">
                Padding Left
              </Label>
              <Switch
                id="override-padding-left"
                checked={activeOverrides.paddingLeft}
                onCheckedChange={() => handleToggleOverride("paddingLeft")}
              />
            </div>

            {activeOverrides.paddingLeft && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-padding-left" className="text-xs">
                    Left: {overrides.paddingLeft || defaults.paddingLeft}px
                  </Label>
                </div>
                <Slider
                  id="item-padding-left"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.paddingLeft || defaults.paddingLeft]}
                  onValueChange={(value) => handleSliderChange("paddingLeft", value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-padding-right" className="text-sm">
                Padding Right
              </Label>
              <Switch
                id="override-padding-right"
                checked={activeOverrides.paddingRight}
                onCheckedChange={() => handleToggleOverride("paddingRight")}
              />
            </div>

            {activeOverrides.paddingRight && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-padding-right" className="text-xs">
                    Right: {overrides.paddingRight || defaults.paddingRight}px
                  </Label>
                </div>
                <Slider
                  id="item-padding-right"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.paddingRight || defaults.paddingRight]}
                  onValueChange={(value) => handleSliderChange("paddingRight", value)}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Icon Padding Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Icon Padding</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="override-icon-padding-left" className="text-sm">
                Icon Padding Left
              </Label>
              <Switch
                id="override-icon-padding-left"
                checked={activeOverrides.iconPaddingLeft}
                onCheckedChange={() => handleToggleOverride("iconPaddingLeft")}
              />
            </div>

            {activeOverrides.iconPaddingLeft && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-icon-padding-left" className="text-xs">
                    Left: {overrides.iconPaddingLeft || defaults.iconPaddingLeft}px
                  </Label>
                </div>
                <Slider
                  id="item-icon-padding-left"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.iconPaddingLeft || defaults.iconPaddingLeft]}
                  onValueChange={(value) => handleSliderChange("iconPaddingLeft", value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-icon-padding-right" className="text-sm">
                Icon Padding Right
              </Label>
              <Switch
                id="override-icon-padding-right"
                checked={activeOverrides.iconPaddingRight}
                onCheckedChange={() => handleToggleOverride("iconPaddingRight")}
              />
            </div>

            {activeOverrides.iconPaddingRight && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-icon-padding-right" className="text-xs">
                    Right: {overrides.iconPaddingRight || defaults.iconPaddingRight}px
                  </Label>
                </div>
                <Slider
                  id="item-icon-padding-right"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.iconPaddingRight || defaults.iconPaddingRight]}
                  onValueChange={(value) => handleSliderChange("iconPaddingRight", value)}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Label Padding Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Label Padding</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="override-label-padding-left" className="text-sm">
                Label Padding Left
              </Label>
              <Switch
                id="override-label-padding-left"
                checked={activeOverrides.labelPaddingLeft}
                onCheckedChange={() => handleToggleOverride("labelPaddingLeft")}
              />
            </div>

            {activeOverrides.labelPaddingLeft && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-label-padding-left" className="text-xs">
                    Left: {overrides.labelPaddingLeft || defaults.labelPaddingLeft}px
                  </Label>
                </div>
                <Slider
                  id="item-label-padding-left"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.labelPaddingLeft || defaults.labelPaddingLeft]}
                  onValueChange={(value) => handleSliderChange("labelPaddingLeft", value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="override-label-padding-right" className="text-sm">
                Label Padding Right
              </Label>
              <Switch
                id="override-label-padding-right"
                checked={activeOverrides.labelPaddingRight}
                onCheckedChange={() => handleToggleOverride("labelPaddingRight")}
              />
            </div>

            {activeOverrides.labelPaddingRight && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="item-label-padding-right" className="text-xs">
                    Right: {overrides.labelPaddingRight || defaults.labelPaddingRight}px
                  </Label>
                </div>
                <Slider
                  id="item-label-padding-right"
                  min={0}
                  max={32}
                  step={1}
                  value={[overrides.labelPaddingRight || defaults.labelPaddingRight]}
                  onValueChange={(value) => handleSliderChange("labelPaddingRight", value)}
                />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
