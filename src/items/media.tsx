import { SketchybarItemComponentProps } from '@/lib/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { BaseItem } from './base-item';

function MediaItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰝚"} label={"Michael Giacchino - The Batman"} />
}

export const mediaItemDefinition: ItemDefinition = {
  type: 'media',
  displayName: 'Media',
  description: 'Shows currently playing media',
  tags: ['media', 'music'],
  component: MediaItem,
  defaultIcon: '󰝚',
  requiresPlugin: true,
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=󰝚 script="$PLUGIN_DIR/media.sh"\n`,
  pluginScript: `#!/bin/bash

STATE="$(echo "$INFO" | jq -r '.state')"
if [ "$STATE" = "playing" ]; then
  MEDIA="$(echo "$INFO" | jq -r '.title + " - " + .artist')"
  sketchybar --set $NAME label="$MEDIA" drawing=on
else
  sketchybar --set $NAME drawing=off
fi
`
}
