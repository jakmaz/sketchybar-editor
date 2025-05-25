import { SketchybarItemComponentProps } from '@/lib/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { BaseItem } from './base-item';

function AppleItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰀵"} />;
}

export const appleItemDefinition: ItemDefinition = {
  type: 'apple',
  displayName: 'Apple Logo',
  description: 'Shows the Apple logo',
  authorGithubUsername: 'jakmaz',
  tags: ['logo', 'system'],
  component: AppleItem,
  requiresPlugin: false,
  defaultIcon: "󰀵",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=󰀵\n`
}
