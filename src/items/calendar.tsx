import { SketchybarItemComponentProps } from '@/components/sketchybar-items/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { useEffect, useState } from 'react';
import { BaseItem } from './base-item';

function CalendarItem({ itemSettings }: SketchybarItemComponentProps) {
  const [date, setDate] = useState(
    new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <BaseItem itemSettings={itemSettings} icon="󰃭" label={date} />
  )
}

export const calendarItemDefinition: ItemDefinition = {
  type: 'calendar',
  displayName: 'Calendar',
  description: 'Shows the current date',
  tags: ['time', 'date'],
  component: CalendarItem,
  updateFrequency: 60,
  requiresPlugin: true,
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=60 script="$PLUGIN_DIR/calendar.sh"\n`,
  pluginScript: `#!/bin/bash

DATE=$(date +"%a %b %d")
sketchybar --set "$NAME" label="$DATE"
`
}
