"use client"

import type { Dispatch, SetStateAction } from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { SketchybarConfig } from "@/components/sketchybar-editor"

interface PositionTabProps {
  config: SketchybarConfig
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>
}

export function PositionTab({ config, setConfig }: PositionTabProps) {
  const handleHeightChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, height: value[0] }))
  }

  const handlePaddingChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, padding: value[0] }))
  }

  const handlePositionChange = (value: "top" | "bottom") => {
    setConfig((prev) => ({ ...prev, position: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="bar-height">Bar Height: {config.height}px</Label>
        </div>
        <Slider id="bar-height" min={16} max={64} step={1} value={[config.height]} onValueChange={handleHeightChange} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="bar-padding">Padding: {config.padding}px</Label>
        </div>
        <Slider
          id="bar-padding"
          min={0}
          max={32}
          step={1}
          value={[config.padding]}
          onValueChange={handlePaddingChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Bar Position</Label>
        <RadioGroup
          value={config.position}
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
    </div>
  )
}

