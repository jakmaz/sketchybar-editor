import { type Dispatch, type SetStateAction } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ItemPosition, ItemType, Config, Item } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"

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
  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  const addItem = (type: ItemType, position: ItemPosition) => {
    const newItem = {
      id: `${type}_${Date.now()}`,
      type: type,
      position: position,
    }

    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
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
          <div className="flex gap-2">
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

function ItemCard({ item, removeItem }: ItemCardProps) {
  return (
    <Card className="py-0 px-0">
      <CardContent className="px-0 pl-4 pr-1">
        <div className="flex justify-between items-center">
          <div>
            <h4>{item.type}</h4>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
            <Trash2 className="h-4 w-4" color="grey" />
          </Button>
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
