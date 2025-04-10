"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ColorInput } from "../color-input"
import { useConfig } from "@/lib/config-context"

export function BarTab() {
  const { config, setConfig } = useConfig()

  const handleColorChange = (color: string) => {
    setConfig((prev) => ({ ...prev, bar: { ...prev.bar, color } }));
  };

  const handlePositionChange = (position: "top" | "bottom") => {
    setConfig((prev) => ({ ...prev, bar: { ...prev.bar, position } }));
  };

  const handleHeightChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, bar: { ...prev.bar, height: value[0] } }));
  };

  const handlePaddingChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, bar: { ...prev.bar, padding: value[0] } }));
  };

  const handleCornerRadiusChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      bar: { ...prev.bar, cornerRadius: value[0] },
    }));
  };

  return (
    <div className="space-y-6">
      <ColorInput
        id="background-color"
        label="Background Color"
        value={config.bar.color}
        onChange={handleColorChange}
        placeholder="0xff262626"
      />

      <div className="space-y-2">
        <Label>Position</Label>
        <RadioGroup
          value={config.bar.position}
          onValueChange={(value) => handlePositionChange(value as "top" | "bottom")}
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
        <Slider id="bar-height" min={16} max={64} step={1} value={[config.bar.height]} onValueChange={handleHeightChange} />
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
          onValueChange={handlePaddingChange}
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
          onValueChange={handleCornerRadiusChange}
        />
      </div>
    </div>
  )
}

