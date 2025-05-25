import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useConfig } from "@/lib/config-context"
import DraggableCardsList from "../draggable-cards"
import React, { useCallback } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { AddItemsSection } from "../add-items-section"

export function ItemsPane() {
  const { setConfig } = useConfig()

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

  return (
    <Card className="flex-1 p-4 gap-2">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-2xl font-bold">Items</CardTitle>
        <CardDescription>
          Manage your Sketchybar items. Drag to reorder existing items or add new ones below.
        </CardDescription>
      </CardHeader>

      <div className="flex flex-col gap-6">
        <DraggableCardsList />
        <AddItemsSection
          onAddItem={addItem}
        /></div>
    </Card>
  )
}
