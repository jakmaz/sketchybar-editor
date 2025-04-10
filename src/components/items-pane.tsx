import { useState, type Dispatch, type SetStateAction } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ItemPosition, ItemType, Config, Item } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"
import { ItemEditPopover } from "./item-edit-popover"

interface ItemsTabProps {
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}

const itemTypes: ItemType[] = [
  "apple",
  "spaces",
  "clock",
  "battery",
  "calendar",
  "cpu",
  "media",
]

export function ItemsPane({ config, setConfig }: ItemsTabProps) {
  const [newItemType, setNewItemType] = useState<string>("")
  const [newItemPosition, setNewItemPosition] = useState<string>("left")

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
                config={config}
                setConfig={setConfig}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
              <ItemsColumn
                position="center"
                items={centerItems}
                config={config}
                setConfig={setConfig}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
              <ItemsColumn
                position="right"
                items={rightItems}
                config={config}
                setConfig={setConfig}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
                updateItemOverrides={updateItemOverrides}
              />
            </div>
          </div>
          <h3 className="text-lg font-medium">Add New Item</h3>
          <div className="space-y-2">
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
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
  removeItem: (id: string) => void
  updateItemPosition: (id: string, position: ItemPosition) => void
  updateItemOverrides: (id: string, overrides: Record<string, any>) => void
}


function ItemsColumn({ position, items, config, removeItem, updateItemOverrides }: ItemsColumnProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <h4 className="font-medium capitalize">{position}</h4>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items in {position}.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                config={config}
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
  config: Config
  removeItem: (id: string) => void
  updateItemOverrides: (id: string, overrides: Record<string, any>) => void
}

function ItemCard({ item, config, removeItem, updateItemOverrides }: ItemCardProps) {
  return (
    <Card className="py-2">
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium capitalize">{item.type}</h4>
          </div>
          <div className="flex items-center gap-1">
            <ItemEditPopover item={item} defaults={config.defaults} updateItemOverrides={updateItemOverrides} />
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
              <Trash2 className="h-4 w-4" />
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
