import React, { useMemo, useState } from "react"
import { RgbaColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorInputProps {
  id: string
  label: string
  value: string // 0xAARRGGBB format
  onChange: (value: string) => void
}

function argbToRgba(argb: string) {
  argb = argb.replace(/^0x/, '')
  if (argb.length === 8) {
    return {
      r: parseInt(argb.slice(2, 4), 16),
      g: parseInt(argb.slice(4, 6), 16),
      b: parseInt(argb.slice(6, 8), 16),
      a: parseInt(argb.slice(0, 2), 16) / 255
    }
  }
  return { r: 0, g: 0, b: 0, a: 1 }
}

function rgbaToArgb(rgba: { r: number, g: number, b: number, a: number }) {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `0x${toHex(rgba.a * 255)}${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`
}

export function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  const rgba = useMemo(() => argbToRgba(value), [value])
  const [tempColor, setTempColor] = useState(rgba)

  // Sync tempColor if external value changes (e.g. manual input)
  React.useEffect(() => {
    setTempColor(rgba)
  }, [rgba])

  const handleRelease = () => {
    const hex = rgbaToArgb(tempColor)
    if (hex !== value) {
      onChange(hex)
    }
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="w-8 h-8 rounded border cursor-pointer hover:ring-2 hover:ring-ring "
              style={{ backgroundColor: `rgba(${tempColor.r}, ${tempColor.g}, ${tempColor.b}, ${tempColor.a})` }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start" onPointerDown={(e) => e.stopPropagation()}>
            <div
              onPointerUp={handleRelease}
              onPointerCancel={handleRelease}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            >
              <RgbaColorPicker
                color={tempColor}
                onChange={setTempColor}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono"
        />
      </div>
    </div>
  )
}
