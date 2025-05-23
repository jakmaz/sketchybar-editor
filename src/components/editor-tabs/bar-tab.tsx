import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ColorInput } from "../color-input"
import { ConfigSlider } from "@/components/config-slider"
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
    }))
  }

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
          onValueChange={(val) =>
            handleBarChange("position", val as "top" | "bottom")
          }
          className="flex gap-4"
        >
          {["top", "bottom"].map((pos) => (
            <div className="flex items-center space-x-2" key={pos}>
              <RadioGroupItem value={pos} id={`position-${pos}`} />
              <Label htmlFor={`position-${pos}`}>
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <ConfigSlider
        id="bar-height"
        label="Height"
        value={config.bar.height}
        onChange={(val) => handleBarChange("height", val)}
        min={16}
        max={64}
      />

      <ConfigSlider
        id="bar-padding"
        label="Padding"
        value={config.bar.padding}
        onChange={(val) => handleBarChange("padding", val)}
        min={0}
        max={32}
      />

      <ConfigSlider
        id="corner-radius"
        label="Corner Radius"
        value={config.bar.cornerRadius}
        onChange={(val) => handleBarChange("cornerRadius", val)}
        min={0}
        max={20}
      />
    </div>
  )
}
