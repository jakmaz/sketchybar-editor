// components/editor-tabs/defaults-tab.tsx
"use client"

import type { Dispatch, SetStateAction } from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

import type { Config } from "@/components/sketchybar-editor"

interface DefaultsTabProps {
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}

export function DefaultsTab({ config, setConfig }: DefaultsTabProps) {
  const handleBackgroundColorChange = (backgroundColor: string) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, backgroundColor },
    }))
  }

  const handleIconColorChange = (iconColor: string) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, iconColor },
    }))
  }

  const handleLabelColorChange = (labelColor: string) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, labelColor },
    }))
  }

  const handlePaddingLeftChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, paddingLeft: value[0] },
    }))
  }

  const handlePaddingRightChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, paddingRight: value[0] },
    }))
  }

  const handleIconPaddingLeftChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, iconPaddingLeft: value[0] },
    }))
  }

  const handleIconPaddingRightChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, iconPaddingRight: value[0] },
    }))
  }

  const handleLabelPaddingLeftChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, labelPaddingLeft: value[0] },
    }))
  }

  const handleLabelPaddingRightChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, labelPaddingRight: value[0] },
    }))
  }

  const handleBackgroundCornerRadiusChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, backgroundCornerRadius: value[0] },
    }))
  }

  const handleBackgroundHeightChange = (value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      defaults: { ...prev.defaults, backgroundHeight: value[0] },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="background-color">Background Color</Label>
        <div className="flex gap-2 items-center">
          <div
            className="w-8 h-8 rounded border"
            style={{
              backgroundColor: `#${config.defaults.backgroundColor.slice(2)}`,
            }}
          />
          <Input
            id="background-color"
            type="text"
            value={config.defaults.backgroundColor}
            onChange={(e) => handleBackgroundColorChange(e.target.value)}
            placeholder="0xff262626"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon-color">Icon Color</Label>
        <div className="flex gap-2 items-center">
          <div
            className="w-8 h-8 rounded border"
            style={{
              backgroundColor: `#${config.defaults.iconColor.slice(2)}`,
            }}
          />
          <Input
            id="icon-color"
            type="text"
            value={config.defaults.iconColor}
            onChange={(e) => handleIconColorChange(e.target.value)}
            placeholder="0xffffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label-color">Label Color</Label>
        <div className="flex gap-2 items-center">
          <div
            className="w-8 h-8 rounded border"
            style={{
              backgroundColor: `#${config.defaults.labelColor.slice(2)}`,
            }}
          />
          <Input
            id="label-color"
            type="text"
            value={config.defaults.labelColor}
            onChange={(e) => handleLabelColorChange(e.target.value)}
            placeholder="0xffffffff"
            className="flex-1"
          />
        </div>
      </div>

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
          onValueChange={handlePaddingLeftChange}
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
          onValueChange={handlePaddingRightChange}
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
          onValueChange={handleIconPaddingLeftChange}
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
          onValueChange={handleIconPaddingRightChange}
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
          onValueChange={handleLabelPaddingLeftChange}
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
          onValueChange={handleLabelPaddingRightChange}
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
          onValueChange={handleBackgroundCornerRadiusChange}
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
          onValueChange={handleBackgroundHeightChange}
        />
      </div>
    </div>
  )
}
