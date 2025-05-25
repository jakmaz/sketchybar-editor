import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useConfig } from "@/lib/config-context"
import { type ItemDefinition } from "@/lib/item-registry"
import DraggableCardsList from "../draggable-cards"
import React, { useCallback, useState } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { AddItemsSection } from "../add-items-section"
import { ItemDetailsDialog } from "../item-details-dialog"

export function ItemsPane() {
  const { setConfig } = useConfig()
  const [selectedItem, setSelectedItem] = useState<ItemDefinition | null>(null)

  const addItem = useCallback((type: string, position: ItemPosition) => {
    if (!type) return

    const newItem = {
      id: `${type}_${Date.now()}`,
      type,
      position,
    }

    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }, [setConfig])

  const handleCloseDialog = () => {
    setSelectedItem(null)
  }

  return (
    <Card className="flex-1 p-6">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-2xl font-bold">Items</CardTitle>
        <CardDescription>
          Manage your Sketchybar items. Drag to reorder existing items or add new ones below.
        </CardDescription>
      </CardHeader>

      <div className="mb-6">
        <DraggableCardsList />
      </div>

      <AddItemsSection
        onAddItem={addItem}
        onShowItemDetails={setSelectedItem}
      />

      <ItemDetailsDialog
        selectedItem={selectedItem}
        onClose={handleCloseDialog}
        onAddItem={addItem}
      />
    </Card>
  )
}
