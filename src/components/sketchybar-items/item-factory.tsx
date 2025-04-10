import type { Item } from "../sketchybar-editor"
import { mergeItemWithDefaults } from "@/lib/utils"
import { useConfig } from "@/lib/config-context"
import { getItemDefinition } from "@/lib/item-registry"

export function ItemFactory({ item }: { item: Item }) {
  const { config } = useConfig()
  const itemSettings = mergeItemWithDefaults(item, config.defaults)

  // Get the item definition from the registry
  const itemDef = getItemDefinition(item.type)

  if (itemDef) {
    // If we have a registered component for this type, use it
    const ItemComponent = itemDef.component
    return <ItemComponent itemSettings={itemSettings} />
  }

  // Fallback for unknown item types
  return <div className="px-2 py-1 text-xs rounded">{item.type}</div>
}
