import type { Config, Item } from "@/components/sketchybar-editor"
import { getItemDefinition, getRequiredPlugins } from "./item-registry"

function toSketchybarColor(hex: string): string {
  return `0xff${hex.replace(/^#/, "")}`
}

export interface ConfigFile {
  name: string
  path: string
  content: string
  type: "file" | "directory"
  children?: ConfigFile[]
}

export function generateConfigFiles(config: Config): ConfigFile[] {
  const files: ConfigFile[] = []

  // Main .sketchybarrc file
  files.push({
    name: ".sketchybarrc",
    path: ".sketchybarrc",
    content: generateMainConfig(config),
    type: "file",
  })

  // Create items directory
  const itemsDir: ConfigFile = {
    name: "items",
    path: "items",
    content: "",
    type: "directory",
    children: [],
  }

  // Create plugins directory
  const pluginsDir: ConfigFile = {
    name: "plugins",
    path: "plugins",
    content: "",
    type: "directory",
    children: [],
  }

  // Group items by type
  const itemsByType = config.items.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, typeof config.items>,
  )

  // Generate item files
  for (const [type, items] of Object.entries(itemsByType)) {
    const itemFile: ConfigFile = {
      name: `${type}.sh`,
      path: `items/${type}.sh`,
      content: generateItemFile(type, items),
      type: "file",
    }
    itemsDir.children?.push(itemFile)
  }

  // Generate plugin files
  const requiredPlugins = getRequiredPlugins(config.items)

  for (const type of requiredPlugins) {
    const itemDef = getItemDefinition(type)
    if (itemDef && itemDef.pluginScript) {
      const pluginFile: ConfigFile = {
        name: `${type}.sh`,
        path: `plugins/${type}.sh`,
        content: itemDef.pluginScript,
        type: "file",
      }
      pluginsDir.children?.push(pluginFile)
    }
  }

  files.push(itemsDir)
  files.push(pluginsDir)

  return files
}

function generateMainConfig(config: Config): string {
  return `#!/bin/bash

# Define directories
PLUGIN_DIR="$CONFIG_DIR/plugins"
ITEM_DIR="$CONFIG_DIR/items"

# Colors
BAR_COLOR=${toSketchybarColor(config.bar.color)}
ITEM_BG_COLOR=${toSketchybarColor(config.defaults.backgroundColor)}
ITEM_LABEL_COLOR=${toSketchybarColor(config.defaults.labelColor)}
ITEM_ICON_COLOR=${toSketchybarColor(config.defaults.iconColor)}

# Bar Appearance
bar=(
  color=$BAR_COLOR
  position=${config.bar.position}
  height=${config.bar.height}
  padding_left=${config.bar.padding}
  padding_right=${config.bar.padding}
  corner_radius=${config.bar.cornerRadius}
)

sketchybar --bar "\${bar[@]}"

# Defaults
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

# Source all item configs
for item in "$ITEM_DIR"/*.sh; do
  source "$item"
done

# Finalizing setup
sketchybar --update

# Generated with Sketchybar Editor #
`
}

function generateItemFile(type: string, items: Item[]): string {
  let content = `#!/bin/bash

# ${type.toUpperCase()} item configuration
`

  items.forEach((item) => {
    const itemName = `${item.type}_${item.id.split("_")[1] || "1"}`
    const itemDef = getItemDefinition(item.type)

    content += `\n# ${itemName}\n`
    content += `sketchybar --add item ${itemName} ${item.position}\n`

    // Use the item definition to generate config if available
    if (itemDef && itemDef.generateItemConfig) {
      content += itemDef.generateItemConfig(itemName)
    }

    // Add overrides if they exist
    if (item.overrides) {
      const overrides = []

      if (item.overrides.backgroundColor) {
        overrides.push(`background.color=${toSketchybarColor(item.overrides.backgroundColor)}`)
      }
      if (item.overrides.iconColor) {
        overrides.push(`icon.color=${toSketchybarColor(item.overrides.iconColor)}`)
      }
      if (item.overrides.labelColor) {
        overrides.push(`label.color=${toSketchybarColor(item.overrides.labelColor)}`)
      }
      if (item.overrides.paddingLeft !== undefined) {
        overrides.push(`padding_left=${item.overrides.paddingLeft}`)
      }
      if (item.overrides.paddingRight !== undefined) {
        overrides.push(`padding_right=${item.overrides.paddingRight}`)
      }
      if (item.overrides.iconPaddingLeft !== undefined) {
        overrides.push(`icon.padding_left=${item.overrides.iconPaddingLeft}`)
      }
      if (item.overrides.iconPaddingRight !== undefined) {
        overrides.push(`icon.padding_right=${item.overrides.iconPaddingRight}`)
      }
      if (item.overrides.labelPaddingLeft !== undefined) {
        overrides.push(`label.padding_left=${item.overrides.labelPaddingLeft}`)
      }
      if (item.overrides.labelPaddingRight !== undefined) {
        overrides.push(`label.padding_right=${item.overrides.labelPaddingRight}`)
      }
      if (item.overrides.backgroundCornerRadius !== undefined) {
        overrides.push(`background.corner_radius=${item.overrides.backgroundCornerRadius}`)
      }
      if (item.overrides.backgroundHeight !== undefined) {
        overrides.push(`background.height=${item.overrides.backgroundHeight}`)
      }

      if (overrides.length > 0) {
        content += `sketchybar --set ${itemName} ${overrides.join(" ")}\n`
      }
    }
  })

  return content
}
