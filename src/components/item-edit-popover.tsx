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
}

export function ItemEditPopover({ item }: ItemEditPopoverProps) {
  const { config, setConfig } = useConfig()
  const { defaults } = config

  const isOverriden = (property: keyof Overrides) => {
    const itemInConfig = config.items.find(configItem => configItem.id === item.id);
    return Boolean(itemInConfig?.overrides?.[property as unknown as keyof Overrides]);
  }
  // Function to update item overrides directly in the config
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

  const handleToggleOverride = (property: keyof Overrides) => {
    const itemInConfig = config.items.find(configItem => configItem.id === item.id);
    const currentOverrides = itemInConfig?.overrides || {};
    const isCurrentlyOverridden = currentOverrides[property] !== undefined;

    const newOverrides = { ...currentOverrides };

    if (isCurrentlyOverridden) {
      delete newOverrides[property];
    } else {
      if (property in defaults) {
        newOverrides[property] = (defaults as any)[property];

      } else {
        console.warn(`Property "${property}" does not exist in defaults.`);
      }
    }

    updateItemOverrides(item.id, newOverrides);
  };

  const handleOverrideChange = <K extends keyof Overrides>(property: K, value: Overrides[K]) => {
    const itemInConfig = config.items.find(configItem => configItem.id === item.id);
    const currentOverrides = itemInConfig?.overrides || {};
  
    const newOverrides = {
      ...currentOverrides,
      [property]: value,
    };
  
    updateItemOverrides(item.id, newOverrides);
  };
  


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
      checked={isOverriden("backgroundColor")}
      onCheckedChange={() => handleToggleOverride("backgroundColor")}
    />
  </div>

  {isOverriden("backgroundColor") && (
    <ColorInput
  id="item-bg-color"
  label=""
  value={item.overrides?.backgroundColor || defaults.backgroundColor}
  onChange={(value) => handleOverrideChange("backgroundColor", value)}
/>

  )}
</div>

        </div>
      </PopoverContent>
    </Popover>
  )
}
