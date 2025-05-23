import { Button } from "@/components/ui/button"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"
import { useConfig } from "@/lib/config-context"
import { getItemTypes } from "@/lib/item-registry"
import DraggableCardsList from "../draggable-cards"

const itemTypes = getItemTypes()

export function ItemsPane() {
  const { setConfig } = useConfig()

  const addItem = (type: string, position: ItemPosition) => {
    if (!type) return

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

  return (
    <Card className="flex-1 p-4">
      <h2 className="text-xl font-semibold">Items</h2>
      <DraggableCardsList />
      <h3 className="text-lg font-medium">Add New Item</h3>
      <div className="flex gap-2">
        <div className="flex flex-wrap gap-4">
          {itemTypes.map((type) => (
            <ItemTypeCard key={type} type={type} addItem={addItem} />
          ))}
        </div>
      </div>
    </Card>
  )
}

interface ItemTypeCardProps {
  type: string,
  addItem: (type: string, position: ItemPosition) => void
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
