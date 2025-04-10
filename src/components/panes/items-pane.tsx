import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ItemPosition, ItemType, Item } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"
import { useConfig } from "@/lib/config-context"
import { ItemEditPopover } from "../item-edit-popover"

// To change using getItemTypes()
const itemTypes: ItemType[] = [
  "apple",
  "spaces",
  "clock",
  "battery",
  "calendar",
  "cpu",
  "media",
]

export function ItemsPane() {
  const { config, setConfig } = useConfig()

  const [newItemType, setNewItemType] = useState<string>("")
  const [newItemPosition] = useState<string>("left")

  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  const addItem = () => {
    if (!newItemType) return

    const newItem = {
      id: `${newItemType}_${Date.now()}`,
      type: newItemType as ItemType,
      position: newItemPosition as ItemPosition,
    }

    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))

    setNewItemType("")
  }

  const removeItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const updateItemPosition = (id: string, position: ItemPosition) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, position } : item)),
    }))
  }

  const updateItemOverrides = (id: string, overrides: Record<string, any>) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, overrides: { ...item.overrides, ...overrides } } : item,
      ),
    }))
  }

  return (
    <Card className="flex-1 p-4">
      <h2 className="text-xl font-semibold">Items</h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <ItemsColumn
                position="left"
                items={leftItems}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
              <ItemsColumn
                position="center"
                items={centerItems}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
              <ItemsColumn
                position="right"
                items={rightItems}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
            </div>
          </div>
          <h3 className="text-lg font-medium">Add New Item</h3>
          <div className="flex gap-2">
            <div className="flex flex-wrap gap-4">
              {itemTypes.map((type) => (
                <ItemTypeCard key={type} type={type} addItem={addItem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

interface ItemsColumnProps {
  position: ItemPosition
  items: Item[]
  removeItem: (id: string) => void
  updateItemPosition: (id: string, position: ItemPosition) => void
  updateItemOverrides: (id: string, overrides: Record<string, any>) => void
}


function ItemsColumn({ position, items, removeItem, updateItemOverrides }: ItemsColumnProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <h4 className="font-medium capitalize">{position}</h4>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items in {position}.</p>
        ) : (
          <div className="flex gap-2">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                removeItem={removeItem}
                updateItemOverrides={updateItemOverrides}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


interface ItemCardProps {
  item: Item
  removeItem: (id: string) => void
  updateItemOverrides: (id: string, overrides: Record<string, any>) => void
}

function ItemCard({ item, removeItem, updateItemOverrides }: ItemCardProps) {
  return (
    <Card className="py-2 px-4">
      <CardContent className="px-0">
        <div className="flex justify-between gap-6 items-center">
          <div>
            <h4 className="font-medium">{item.type}</h4>
          </div>
          <div className="flex items-center gap-2">
            <ItemEditPopover item={item} updateItemOverrides={updateItemOverrides} />
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="p-0 h-auto w-auto min-h-0 min-w-0">
              <Trash2 className="h-4 w-4" color="grey" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ItemTypeCardProps {
  type: ItemType,
  addItem: (type: ItemType, position: ItemPosition) => void
}

function ItemTypeCard({ type, addItem }: ItemTypeCardProps) {
  return (
    <Card className="w-64 py-4">
      <CardContent className="flex gap-2 items-center justify-around px-0">
        <h4 className="text-center font-medium">{type}</h4>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => addItem(type, "left")}>
            L
          </Button>
          <Button variant="outline" size="icon" onClick={() => addItem(type, "center")}>
            C
          </Button>
          <Button variant="outline" size="icon" onClick={() => addItem(type, "right")}>
            R
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
