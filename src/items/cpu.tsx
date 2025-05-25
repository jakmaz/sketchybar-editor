import { SketchybarItemComponentProps } from '@/lib/item-interface';
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

const pluginScript = `CORE_COUNT=$(sysctl -n machdep.cpu.thread_count)
CPU_INFO=$(ps -eo pcpu,user)
CPU_SYS=$(echo "$CPU_INFO" | grep -v $(whoami) | sed "s/[^ 0-9\\.]//g" | awk "{sum+=\\$1} END {print sum/(100.0 * $CORE_COUNT)}")
CPU_USER=$(echo "$CPU_INFO" | grep $(whoami) | sed "s/[^ 0-9\\.]//g" | awk "{sum+=\\$1} END {print sum/(100.0 * $CORE_COUNT)}")

CPU_PERCENT="$(echo "$CPU_SYS $CPU_USER" | awk '{printf "%.0f\\n", ($1 + $2)*100}')"

sketchybar --set $NAME label="$CPU_PERCENT%"`

export const cpuItemDefinition: ItemDefinition = {
  type: 'cpu',
  displayName: 'CPU',
  description: 'Shows CPU usage',
  authorGithubUsername: 'jakmaz',
  tags: ['system', 'performance'],
  component: CpuItem,
  displayIcon: "",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon= update_freq=2 script="$PLUGIN_DIR/cpu.sh"\n`,
  pluginScript: pluginScript,
}
