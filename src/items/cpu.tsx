import { SketchybarItemComponentProps } from '@/components/sketchybar-items/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { useState, useEffect } from 'react';
import { BaseItem } from './base-item';

function CpuItem({ itemSettings }: SketchybarItemComponentProps) {
  const [cpuUsage, setCpuUsage] = useState<number>(20); // Start at 20%

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random change between -5 and +5
      const randomChange = Math.floor(Math.random() * 11) - 5; // -5 to 5

      // Calculate the new CPU usage, ensuring it stays within 0-100
      const newCpuUsage = Math.max(
        0,
        Math.min(100, cpuUsage + randomChange)
      );

      setCpuUsage(newCpuUsage);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [cpuUsage]); // Add cpuUsage as a dependency

  return <BaseItem itemSettings={itemSettings} icon={""} label={`${cpuUsage}%`} />;
}

export const cpuItemDefinition: ItemDefinition = {
  type: 'cpu',
  displayName: 'CPU',
  description: 'Shows CPU usage',
  tags: ['system', 'performance'],
  component: CpuItem,
  updateFrequency: 2,
  requiresPlugin: true,
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=2 script="$PLUGIN_DIR/cpu.sh"\n`,
  pluginScript: `#!/bin/bash

CPU=$(top -l 2 | grep -E "^CPU" | tail -1 | awk '{ print $3 + $5 }')
CPU_PERCENT=$(printf "%.0f" $CPU)

sketchybar --set $NAME label="$CPU_PERCENT%"
`
}
