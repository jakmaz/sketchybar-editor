import React from "react"
import { AppleItem } from "@/components/sketchybar-items/apple-item"
import { ClockItem } from "@/components/sketchybar-items/clock-item"
import { BatteryItem } from "@/components/sketchybar-items/battery-item"
import { CalendarItem } from "@/components/sketchybar-items/calendar-item"
import { CpuItem } from "@/components/sketchybar-items/cpu-item"
import { MediaItem } from "@/components/sketchybar-items/media-item"
import type { SketchybarItemComponentProps } from "@/components/sketchybar-items/item-interface"
import type { Item } from "@/components/sketchybar-editor"

export interface ItemDefinition {
  // Basic metadata
  type: string
  displayName: string
  description?: string

  // Component to render in the preview
  component: React.ComponentType<SketchybarItemComponentProps>

  // Configuration for generating sketchybar config
  defaultIcon?: string
  defaultLabel?: string
  updateFrequency?: number
  requiresPlugin?: boolean

  // Plugin generation info
  pluginScript?: string

  // Item-specific configuration
  generateItemConfig?: (itemName: string) => string
}

// The registry of all available item types
const itemRegistry: Record<string, ItemDefinition> = {
  apple: {
    type: "apple",
    displayName: "Apple Logo",
    description: "Shows the Apple logo",
    component: AppleItem,
    defaultIcon: "􀣺",
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=􀣺\n`,
  },

  clock: {
    type: "clock",
    displayName: "Clock",
    description: "Shows the current time",
    component: ClockItem,
    updateFrequency: 1,
    requiresPlugin: true,
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=1 script="$PLUGIN_DIR/clock.sh"\n`,
    pluginScript: `#!/bin/bash

# Clock plugin for sketchybar
TIME=$(date +"%H:%M")
sketchybar --set "$NAME" label="$TIME"
`,
  },

  battery: {
    type: "battery",
    displayName: "Battery",
    description: "Shows battery status",
    component: BatteryItem,
    updateFrequency: 120,
    requiresPlugin: true,
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=120 script="$PLUGIN_DIR/battery.sh"\n`,
    pluginScript: `#!/bin/bash

# Battery plugin for sketchybar
PERCENTAGE=$(pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1)
CHARGING=$(pmset -g batt | grep 'AC Power')

if [ $PERCENTAGE = "" ]; then
  exit 0
fi

case {PERCENTAGE} in
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

sketchybar --set $NAME icon="$ICON" label="{PERCENTAGE}%"
`,
  },

  calendar: {
    type: "calendar",
    displayName: "Calendar",
    description: "Shows the current date",
    component: CalendarItem,
    updateFrequency: 60,
    requiresPlugin: true,
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=60 script="$PLUGIN_DIR/calendar.sh"\n`,
    pluginScript: `#!/bin/bash

# Calendar plugin for sketchybar
DATE=$(date +"%a %b %d")
sketchybar --set "$NAME" label="$DATE"
`,
  },

  cpu: {
    type: "cpu",
    displayName: "CPU",
    description: "Shows CPU usage",
    component: CpuItem,
    updateFrequency: 2,
    requiresPlugin: true,
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=2 script="$PLUGIN_DIR/cpu.sh"\n`,
    pluginScript: `#!/bin/bash

# CPU plugin for sketchybar
CPU=$(top -l 2 | grep -E "^CPU" | tail -1 | awk '{ print $3 + $5 }')
CPU_PERCENT=$(printf "%.0f" $CPU)

sketchybar --set $NAME label="{CPU_PERCENT}%"
`,
  },

  media: {
    type: "media",
    displayName: "Media",
    description: "Shows currently playing media",
    component: MediaItem,
    defaultIcon: "􀑪",
    requiresPlugin: true,
    generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=􀑪 script="$PLUGIN_DIR/media.sh"\n`,
    pluginScript: `#!/bin/bash

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
`,
  },
}

// Helper functions to work with the registry
export function getItemTypes(): string[] {
  return Object.keys(itemRegistry)
}

export function getItemDefinition(type: string): ItemDefinition | undefined {
  return itemRegistry[type]
}

export function getAllItemDefinitions(): ItemDefinition[] {
  return Object.values(itemRegistry)
}

export function getRequiredPlugins(items: Item[]): string[] {
  const uniqueTypes = new Set(items.map(item => item.type))
  return Object.values(itemRegistry)
    .filter(def => uniqueTypes.has(def.type) && def.requiresPlugin && def.pluginScript)
    .map(def => def.type)
}

export default itemRegistry
