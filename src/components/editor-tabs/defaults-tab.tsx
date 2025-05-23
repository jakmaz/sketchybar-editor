"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import { ColorInput } from "@/components/color-input"
import { useConfig } from "@/lib/config-context"
import { Config } from "@/components/sketchybar-editor"

export function DefaultsTab() {
  const { config, setConfig } = useConfig()

  const handleDefaultChange = <K extends keyof Config["defaults"]>(
    key: K,
    value: Config["defaults"][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      defaults: {
        ...prev.defaults,
        [key]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col justify-around space-y-6">
      <div className="space-y-4">
        <ColorInput
          id="background-color"
          label="Background Color"
          value={config.defaults.backgroundColor}
          onChange={(val) => handleDefaultChange("backgroundColor", val)}
        />

        <ColorInput
          id="icon-color"
          label="Icon Color"
          value={config.defaults.iconColor}
          onChange={(val) => handleDefaultChange("iconColor", val)}
        />

        <ColorInput
          id="label-color"
          label="Label Color"
          value={config.defaults.labelColor}
          onChange={(val) => handleDefaultChange("labelColor", val)}
        />
      </div>
      <div className="space-y-6">

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="padding-left">Padding Left: {config.defaults.paddingLeft}px</Label>
          </div>
          <Slider
            id="padding-left"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.paddingLeft]}
            onValueChange={(val) => handleDefaultChange("paddingLeft", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="padding-right">Padding Right: {config.defaults.paddingRight}px</Label>
          </div>
          <Slider
            id="padding-right"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.paddingRight]}
            onValueChange={(val) => handleDefaultChange("paddingRight", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="icon-padding-left">Icon Padding Left: {config.defaults.iconPaddingLeft}px</Label>
          </div>
          <Slider
            id="icon-padding-left"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.iconPaddingLeft]}
            onValueChange={(val) => handleDefaultChange("iconPaddingLeft", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="icon-padding-right">Icon Padding Right: {config.defaults.iconPaddingRight}px</Label>
          </div>
          <Slider
            id="icon-padding-right"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.iconPaddingRight]}
            onValueChange={(val) => handleDefaultChange("iconPaddingRight", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="label-padding-left">Label Padding Left: {config.defaults.labelPaddingLeft}px</Label>
          </div>
          <Slider
            id="label-padding-left"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.labelPaddingLeft]}
            onValueChange={(val) => handleDefaultChange("labelPaddingLeft", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="label-padding-right">Label Padding Right: {config.defaults.labelPaddingRight}px</Label>
          </div>
          <Slider
            id="label-padding-right"
            min={0}
            max={32}
            step={1}
            value={[config.defaults.labelPaddingRight]}
            onValueChange={(val) => handleDefaultChange("labelPaddingRight", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="background-corner-radius">
              Background Corner Radius: {config.defaults.backgroundCornerRadius}px
            </Label>
          </div>
          <Slider
            id="background-corner-radius"
            min={0}
            max={20}
            step={1}
            value={[config.defaults.backgroundCornerRadius]}
            onValueChange={(val) => handleDefaultChange("backgroundCornerRadius", val[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="background-height">Background Height: {config.defaults.backgroundHeight}px</Label>
          </div>
          <Slider
            id="background-height"
            min={16}
            max={64}
            step={1}
            value={[config.defaults.backgroundHeight]}
            onValueChange={(val) => handleDefaultChange("backgroundHeight", val[0])}
          />
        </div>
      </div>
    </div>
  )
}
