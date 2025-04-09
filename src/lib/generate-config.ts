import type { Config, Item } from "@/components/sketchybar-editor"

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
  const pluginTypes = ["battery", "cpu", "media"]
  for (const type of pluginTypes) {
    if (config.items.some((item) => item.type === type)) {
      const pluginFile: ConfigFile = {
        name: `${type}.sh`,
        path: `plugins/${type}.sh`,
        content: generatePluginFile(type),
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

# Sketchybar configuration
# Generated with Sketchybar Editor

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
`
}

function generateItemFile(type: string, items: Item[]): string {
  let content = `#!/bin/bash

# ${type.toUpperCase()} item configuration
`

  items.forEach((item) => {
    const itemName = `${item.type}_${item.id.split("_")[1] || "1"}`

    content += `\n# ${itemName}\n`
    content += `sketchybar --add item ${itemName} ${item.position}\n`

    // Add type-specific configuration
    switch (item.type) {
      case "apple":
        content += `sketchybar --set ${itemName} icon=􀣺\n`
        break
      case "spaces":
        content += `sketchybar --set ${itemName} label="1 2 3"\n`
        break
      case "clock":
        content += `sketchybar --set ${itemName} update_freq=1 script="$PLUGIN_DIR/clock.sh"\n`
        break
      case "battery":
        content += `sketchybar --set ${itemName} update_freq=120 script="$PLUGIN_DIR/battery.sh"\n`
        break
      case "calendar":
        content += `sketchybar --set ${itemName} update_freq=60 script="$PLUGIN_DIR/calendar.sh"\n`
        break
      case "cpu":
        content += `sketchybar --set ${itemName} update_freq=2 script="$PLUGIN_DIR/cpu.sh"\n`
        break
      case "media":
        content += `sketchybar --set ${itemName} icon=􀑪 script="$PLUGIN_DIR/media.sh"\n`
        break
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

function generatePluginFile(type: string): string {
  switch (type) {
    case "battery":
      return `#!/bin/bash

# Battery plugin for sketchybar
PERCENTAGE=$(pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1)
CHARGING=$(pmset -g batt | grep 'AC Power')

if [ $PERCENTAGE = "" ]; then
  exit 0
fi


  9[0-9]|100) ICON="􀛨"
    ;;
  [6-8][0-9]) ICON="􀺸"
    ;;
  [3-5][0-9]) ICON="􀺶"
    ;;
  [1-2][0-9]) ICON="􀛩"
    ;;
  *) ICON="􀛪"
    ;;
esac

if [[ $CHARGING != "" ]]; then
  ICON="􀢋"
fi

sketchybar --set $NAME icon="$ICON
`
    case "cpu":
      return `#!/bin/bash

# CPU plugin for sketchybar
CPU=$(top -l 2 | grep -E "^CPU" | tail -1 | awk '{ print $3 + $5 }')
CPU_PERCENT=$(printf "%.0f" $CPU)

sketchybar --set $NAME l
`
    case "media":
      return `#!/bin/bash

# Media plugin for sketchybar
PLAYER_STATE=$(osascript -e 'tell application "Music" to player state as string')
if [[ "$PLAYER_STATE" == "playing" ]]; then
  TRACK=$(osascript -e 'tell application "Music" to name of current track as string')
  ARTIST=$(osascript -e 'tell application "Music" to artist of current track as string')
  
  if [[ "$TRACK" == "" ]]; then
    TRACK="Unknown"
  fi
  
  if [[ "$ARTIST" == "" ]]; then
    ARTIST="Unknown"
  fi
  
  MEDIA="$ARTIST - $TRACK"
  sketchybar --set $NAME label="$MEDIA" icon=􀊄
else
  sketchybar --set $NAME label="" icon=􀊄
fi
`
    default:
      return `#!/bin/bash

# ${type} plugin for sketchybar
echo "Plugin for ${type}"
`
  }
}

// Legacy function for backward compatibility
export function generateSketchybarCode(config: Config): string {
  return generateMainConfig(config)
}
