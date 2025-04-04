"use client"

import type { Dispatch, SetStateAction } from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SketchybarConfig } from "@/components/sketchybar-editor"

interface AppearanceTabProps {
  config: SketchybarConfig
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>
}

const FONT_FAMILIES = [
  { value: "SF Pro", label: "SF Pro" },
  { value: "SF Mono", label: "SF Mono" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Menlo", label: "Menlo" },
]

export function AppearanceTab({ config, setConfig }: AppearanceTabProps) {
  const handleColorChange = (color: string) => {
    setConfig((prev) => ({ ...prev, color }))
  }

  const handleCornerRadiusChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, cornerRadius: value[0] }))
  }

  const handleFontSizeChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, fontSize: value[0] }))
  }

  const handleFontFamilyChange = (value: string) => {
    setConfig((prev) => ({ ...prev, fontFamily: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bar-color">Bar Color</Label>
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded border" style={{ backgroundColor: config.color }} />
          <Input
            id="bar-color"
            type="text"
            value={config.color}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="corner-radius">Corner Radius: {config.cornerRadius}px</Label>
        </div>
        <Slider
          id="corner-radius"
          min={0}
          max={20}
          step={1}
          value={[config.cornerRadius]}
          onValueChange={handleCornerRadiusChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-family">Font Family</Label>
        <Select value={config.fontFamily} onValueChange={handleFontFamilyChange}>
          <SelectTrigger id="font-family">
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="font-size">Font Size: {config.fontSize}px</Label>
        </div>
        <Slider
          id="font-size"
          min={8}
          max={24}
          step={1}
          value={[config.fontSize]}
          onValueChange={handleFontSizeChange}
        />
      </div>
    </div>
  )
}

