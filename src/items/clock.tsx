import { SketchybarItemComponentProps } from '@/components/sketchybar-items/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { useEffect, useState } from 'react';
import { BaseItem } from './base-item';

function ClockItem({ itemSettings }: SketchybarItemComponentProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <BaseItem itemSettings={itemSettings} icon="" label={time} />
  )
}

export const clockItemDefinition: ItemDefinition = {
  type: 'clock',
  displayName: 'Clock',
  description: 'Shows the current time',
  tags: ['time'],
  component: ClockItem,
  updateFrequency: 1,
  requiresPlugin: true,
  defaultIcon: "",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=1 script="$PLUGIN_DIR/clock.sh"\n`,
  pluginScript: `#!/bin/bash

TIME=$(date +"%H:%M")
sketchybar --set "$NAME" label="$TIME"
`
}
