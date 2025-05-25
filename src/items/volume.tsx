import { SketchybarItemComponentProps } from '@/lib/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { BaseItem } from './base-item';

function VolumeIcon({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰕾"} label='35%' />;
}

export const volumeItemDefinition: ItemDefinition = {
  type: 'volume',
  displayName: 'Volume',
  description: 'Shows the current volume',
  authorGithubUsername: 'jakmaz',
  tags: ['system', 'media'],
  component: VolumeIcon,
  requiresPlugin: false,
  defaultIcon: "󰕾",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=󰕾\n`
}
