import { SketchybarConfig } from "@/components/sketchybar-editor"

export function generateSketchybarCode(config: SketchybarConfig): string {
  return `#!/bin/bash

      # Sketchybar configuration
      # Generated with Sketchybar Editor

      # Bar appearance
      sketchybar --bar height=${config.bar.height} \\
      position=${config.bar.position} \\
      padding_left=${config.bar.padding} \\
      padding_right=${config.bar.padding} \\
      color=${config.bar.color} \\
      corner_radius=${config.bar.cornerRadius}

      # Default item settings
      sketchybar --default icon.font="${config.bar.fontFamily}" \\
      icon.color=0xffffffff \\
      label.font="${config.bar.fontFamily}" \\
      label.color=0xffffffff \\
      label.font.size=${config.bar.fontSize} \\
      padding_left=5 \\
      padding_right=5

      ${config.items
      .map((item) => {
        let itemConfig = `# ${item.type} item\n`

        switch (item.type) {
          case "apple":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} icon=􀣺 \\
           icon.color=${item.color || "0xffffffff"}`
            break
          case "spaces":
            itemConfig += `sketchybar --add space space_1 ${item.position} \\
           --set space_1 label="1"`
            break
          case "clock":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=1 \\
           script="date '+%H:%M'" \\
           label.color=${item.color || "0xffffffff"}`
            break
          case "battery":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=120 \\
           script="pmset -g batt | grep -o '[0-9]*%'" \\
           icon=􀛨 \\
           icon.color=${item.color || "0xffffffff"}`
            break
          case "calendar":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=60 \\
           script="date '+%a %b %d'" \\
           label.color=${item.color || "0xffffffff"}`
            break
        }

        return itemConfig
      })
      .join("\n\n")}

      # Finalizing setup
      sketchybar --update
      `
}

