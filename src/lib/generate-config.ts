import { SketchybarConfig } from "@/components/sketchybar-editor";

export function generateSketchybarCode(config: SketchybarConfig): string {
  return `#!/bin/bash

# Sketchybar configuration
# Generated with Sketchybar Editor

##### Colors #####
BAR_COLOR=${config.bar.color}
ITEM_BG_COLOR=0xff262626
ITEM_LABEL_COLOR=0xffffffff
ITEM_ICON_COLOR=0xffffffff


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
  padding_left=5
  padding_right=5
  icon.font="Hack Nerd Font:Bold:17.0"
  label.font="Hack Nerd Font:Bold:14.0"
  background.corner_radius=5
  background.height=26
  icon.padding_left=10
  icon.padding_right=4
  label.padding_left=4
  label.padding_right=10
)

sketchybar --default "\${default[@]}"

# Finalizing setup
sketchybar --update
`;
}
