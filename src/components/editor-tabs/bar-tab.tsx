"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ColorInput } from "../color-input"
import { useConfig } from "@/lib/config-context"
import { BarSettings } from "../sketchybar-editor"

export function BarTab() {
  const { config, setConfig } = useConfig()

  const handleBarChange = <K extends keyof BarSettings>(
    key: K,
    value: BarSettings[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        [key]: value,
      },
    }));
  };


  return (
    <div className="space-y-6">
      <ColorInput
        id="background-color"
        label="Background Color"
        value={config.bar.color}
        onChange={(val) => handleBarChange("color", val)}
      />

      <div className="space-y-2">
        <Label>Position</Label>
        <RadioGroup
          value={config.bar.position}
          onValueChange={(val) => handleBarChange("position", val as "top" | "bottom")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top" id="position-top" />
            <Label htmlFor="position-top">Top</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bottom" id="position-bottom" />
            <Label htmlFor="position-bottom">Bottom</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="bar-height">Height: {config.bar.height}px</Label>
        </div>
        <Slider id="bar-height" min={16} max={64} step={1}
          value={[config.bar.height]}
          onValueChange={(val) => handleBarChange("height", val[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="bar-padding">Padding: {config.bar.padding}px</Label>
        </div>
        <Slider
          id="bar-padding"
          min={0}
          max={32}
          step={1}
          value={[config.bar.padding]}
          onValueChange={(val) => handleBarChange("padding", val[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="corner-radius">Corner Radius: {config.bar.cornerRadius}px</Label>
        </div>
        <Slider
          id="corner-radius"
          min={0}
          max={20}
          step={1}
          value={[config.bar.cornerRadius]}
          onValueChange={(val) => handleBarChange("cornerRadius", val[0])}
        />
      </div>
    </div>
  )
}

