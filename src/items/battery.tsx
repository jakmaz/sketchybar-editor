import { SketchybarItemComponentProps } from '@/components/sketchybar-items/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { BaseItem } from './base-item';

function BatteryItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={""} label={"85%"} />
}

export const batteryItemDefinition: ItemDefinition = {
  type: 'battery',
  displayName: 'Battery',
  description: 'Shows battery status',
  tags: ['system', 'power'],
  component: BatteryItem,
  updateFrequency: 120,
  requiresPlugin: true,
  defaultIcon: "",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} update_freq=120 script="$PLUGIN_DIR/battery.sh"\n`,
  pluginScript: `#!/bin/bash

PERCENTAGE=$(pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1)
CHARGING=$(pmset -g batt | grep 'AC Power')

if [ $PERCENTAGE = "" ]; then
  exit 0
fi

case $PERCENTAGE in
  9[0-9]|100) ICON=""
    ;;
  [6-8][0-9]) ICON=""
    ;;
  [3-5][0-9]) ICON=""
    ;;
  [1-2][0-9]) ICON=""
    ;;
  *) ICON=""
    ;;
esac

if [[ $CHARGING != "" ]]; then
  ICON=""
fi

sketchybar --set $NAME icon="$ICON" label="$PERCENTAGE%"
`
}
