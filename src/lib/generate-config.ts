import { SketchybarConfig } from "@/components/sketchybar-editor"

export function generateSketchybarCode(config: SketchybarConfig): string {
  return `#!/bin/bash

# Sketchybar configuration
# Generated with Sketchybar Editor

##### Colors #####
BAR_COLOR=${config.bar.color}

##### Bar Appearance #####
bar=(
  color=$BAR_COLOR
  position=${config.bar.position}
  height=${config.bar.height}
  padding_left=${config.bar.padding}
  padding_right=${config.bar.padding}
  corner_radius=${config.bar.cornerRadius}
)

sketchybar --bar "\${bar[@]}"

#### Defaults #####
default=(
  background.color=${config.defaults.backgroundColor}
  icon.color=${config.defaults.iconColor}
  label.color=${config.defaults.labelColor}
  padding_left=${config.defaults.paddingLeft}
  padding_right=${config.defaults.paddingRight}
  icon.font="${config.defaults.iconFont}"
  label.font="${config.defaults.labelFont}"
  background.corner_radius=${config.defaults.backgroundCornerRadius}
  background.height=${config.defaults.backgroundHeight}
  icon.padding_left=${config.defaults.iconPaddingLeft}
  icon.padding_right=${config.defaults.iconPaddingRight}
  label.padding_left=${config.defaults.labelPaddingLeft}
  label.padding_right=${config.defaults.labelPaddingRight}
)

sketchybar --default "\${default[@]}"

# Finalizing setup
sketchybar --update
`
}
