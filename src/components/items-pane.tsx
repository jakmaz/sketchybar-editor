// components/items-pane.tsx
"use client"

import { type Dispatch, type SetStateAction, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ItemPosition, ItemType, Config, Item } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"

interface ItemsTabProps {
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}

const ITEM_TYPES = [
  { value: "apple", label: "Apple Logo" },
  { value: "spaces", label: "Spaces" },
  { value: "clock", label: "Clock" },
  { value: "battery", label: "Battery" },
  { value: "calendar", label: "Calendar" },
  { value: "cpu", label: "Cpu Usage" },
]

const POSITIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
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
              />
              <ItemsColumn
                position="center"
                items={centerItems}
                config={config}
                setConfig={setConfig}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
              />
              <ItemsColumn
                position="right"
                items={rightItems}
                config={config}
                setConfig={setConfig}
                removeItem={removeItem}
                updateItemPosition={updateItemPosition}
              />
            </div>
          </div>
          <h3 className="text-lg font-medium">Add New Item</h3>
          <div className="space-y-2">
            <Select value={newItemType} onValueChange={setNewItemType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent>
                {ITEM_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newItemPosition} onValueChange={setNewItemPosition}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((pos) => (
                  <SelectItem key={pos.value} value={pos.value}>
                    {pos.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={addItem} disabled={!newItemType} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
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
}

function ItemsColumn({
  position,
  items,
  config,
  removeItem,
  updateItemPosition,
}: ItemsColumnProps) {
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
                updateItemPosition={updateItemPosition}
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
  updateItemPosition: (id: string, position: ItemPosition) => void
}

function ItemCard({
  item,
  removeItem,
}: ItemCardProps) {
  return (
    <Card className="py-2">
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium capitalize">{item.type}</h4>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
