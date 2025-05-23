import { ColorInput } from "@/components/color-input"
import { useConfig } from "@/lib/config-context"
import { ConfigSlider } from "@/components/config-slider" // ← import here
import { DefaultsSettings } from "@/components/sketchybar-editor"

export function DefaultsTab() {
  const { config, setConfig } = useConfig()

  const handleDefaultChange = <K extends keyof DefaultsSettings>(
    key: K,
    value: DefaultsSettings[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      defaults: {
        ...prev.defaults,
        [key]: value,
      },
    }))
  }

  return (
    <div className="flex flex-col justify-around space-y-6">
      <div className="space-y-4">
        <ColorInput
          id="background-color"
          label="Background Color"
          value={config.defaults.backgroundColor}
          onChange={(val) => handleDefaultChange("backgroundColor", val)}
        />

        <ColorInput
          id="icon-color"
          label="Icon Color"
          value={config.defaults.iconColor}
          onChange={(val) => handleDefaultChange("iconColor", val)}
        />

        <ColorInput
          id="label-color"
          label="Label Color"
          value={config.defaults.labelColor}
          onChange={(val) => handleDefaultChange("labelColor", val)}
        />
      </div>

      <div className="space-y-6">
        <ConfigSlider
          id="padding-left"
          label="Padding Left"
          value={config.defaults.paddingLeft}
          onChange={(val) => handleDefaultChange("paddingLeft", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="padding-right"
          label="Padding Right"
          value={config.defaults.paddingRight}
          onChange={(val) => handleDefaultChange("paddingRight", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="icon-padding-left"
          label="Icon Padding Left"
          value={config.defaults.iconPaddingLeft}
          onChange={(val) => handleDefaultChange("iconPaddingLeft", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="icon-padding-right"
          label="Icon Padding Right"
          value={config.defaults.iconPaddingRight}
          onChange={(val) => handleDefaultChange("iconPaddingRight", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="label-padding-left"
          label="Label Padding Left"
          value={config.defaults.labelPaddingLeft}
          onChange={(val) => handleDefaultChange("labelPaddingLeft", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="label-padding-right"
          label="Label Padding Right"
          value={config.defaults.labelPaddingRight}
          onChange={(val) => handleDefaultChange("labelPaddingRight", val)}
          min={0}
          max={32}
        />

        <ConfigSlider
          id="background-corner-radius"
          label="Background Corner Radius"
          value={config.defaults.backgroundCornerRadius}
          onChange={(val) => handleDefaultChange("backgroundCornerRadius", val)}
          min={0}
          max={20}
        />

        <ConfigSlider
          id="background-height"
          label="Background Height"
          value={config.defaults.backgroundHeight}
          onChange={(val) => handleDefaultChange("backgroundHeight", val)}
          min={16}
          max={64}
        />
      </div>
    </div>
  )
}
