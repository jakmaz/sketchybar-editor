import { Config } from "@/components/sketchybar-editor"

function toSketchybarColor(hex: string): string {
  return `0xff${hex.replace(/^#/, '')}`
}

export function generateSketchybarCode(config: Config): string {
  return `#!/bin/bash

PLUGIN_DIR="$CONFIG_DIR/plugins"
ITEM_DIR="$CONFIG_DIR/items"

# Sketchybar configuration
# Generated with Sketchybar Editor

##### Colors #####
BAR_COLOR=${toSketchybarColor(config.bar.color)}
ITEM_BG_COLOR=${toSketchybarColor(config.defaults.backgroundColor)}
ITEM_LABEL_COLOR=${toSketchybarColor(config.defaults.labelColor)}
ITEM_ICON_COLOR=${toSketchybarColor(config.defaults.iconColor)}

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
  background.color=$ITEM_BG_COLOR
  icon.color=$ITEM_ICON_COLOR
  label.color=$ITEM_LABEL_COLOR
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
