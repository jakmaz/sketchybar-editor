import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import React from "react"

interface ConfigSliderProps<T extends string | number> {
  id: string
  label: string
  value: T
  onChange: (value: T) => void
  min: number
  max: number
  step?: number
  unit?: string
}

export function ConfigSlider<T extends string | number>({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "px",
}: ConfigSliderProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>
          {label}: {value}{unit}
        </Label>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[Number(value)]}
        onValueChange={(val) => onChange(val[0] as T)}
      />
    </div>
  )
}
