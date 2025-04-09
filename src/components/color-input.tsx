"use client"
import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorInputProps {
  id: string
  label: string
  value: string // #RRGGBB format
  onChange: (value: string) => void
  placeholder?: string
}

export function ColorInput({ id, label, value, onChange, placeholder = "#000000" }: ColorInputProps) {
  const [hexColor, setHexColor] = useState(value)

  // Update local state when prop changes
  useEffect(() => {
    setHexColor(value)
  }, [value])

  // Handle color change from the color picker
  const handleColorPickerChange = (color: string) => {
    setHexColor(color)
    onChange(color)
  }

  // Handle color change from the input field
  const handleInputChange = (inputValue: string) => {
    setHexColor(inputValue)

    // Only update the parent if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  // Handle blur event to ensure proper formatting
  const handleBlur = () => {
    let formattedColor = hexColor

    // If the input doesn't start with #, add it
    if (!formattedColor.startsWith("#")) {
      formattedColor = `#${formattedColor}`
    }

    // Ensure it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(formattedColor)) {
      setHexColor(formattedColor)
      onChange(formattedColor)
    } else {
      // Reset to the original value if invalid
      setHexColor(value)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="w-8 h-8 rounded border cursor-pointer hover:ring-2 hover:ring-ring transition-all"
              style={{ backgroundColor: hexColor }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <HexColorPicker color={hexColor} onChange={handleColorPickerChange} />
          </PopoverContent>
        </Popover>
        <Input
          id={id}
          type="text"
          value={hexColor}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1"
        />
      </div>
    </div>
  )
}
