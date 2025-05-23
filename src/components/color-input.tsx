"use client"
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

export function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  // Convert 0xAARRGGBB hex to RGBA object
  const hexToRgba = (hex: string) => {
    // Remove 0x if present
    hex = hex.replace(/^0x/, '')
    
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(2, 4), 16),
        g: parseInt(hex.slice(4, 6), 16),
        b: parseInt(hex.slice(6, 8), 16),
        a: parseInt(hex.slice(0, 2), 16) / 255
      }
    }
    
    return { r: 0, g: 0, b: 0, a: 1 }
  }
  
  // Convert RGBA object to 0xAARRGGBB hex
  const rgbaToHex = (rgba: { r: number, g: number, b: number, a: number }) => {
    const toHex = (value: number) => {
      const hex = Math.round(value).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    
    return `0x${toHex(rgba.a * 255)}${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="w-8 h-8 rounded border cursor-pointer hover:ring-2 hover:ring-ring transition-all"
              style={{ backgroundColor: `rgba(${hexToRgba(value).r}, ${hexToRgba(value).g}, ${hexToRgba(value).b}, ${hexToRgba(value).a})` }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <RgbaColorPicker 
              color={hexToRgba(value)} 
              onChange={(color) => onChange(rgbaToHex(color))} 
            />
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
