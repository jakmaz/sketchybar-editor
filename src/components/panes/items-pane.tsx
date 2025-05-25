import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useConfig } from "@/lib/config-context"
import DraggableCardsList from "../draggable-cards"
import React, { useCallback } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { AddItemsSection } from "../add-items-section"

export function ItemsPane() {
  const { config, setConfig } = useConfig()

  const addItem = useCallback((type: string, position: ItemPosition) => {
    if (!type) return

    // Find existing items of the same type
    const existingItems = config.items.filter(item => item.type === type)
    
    // Generate a new ID with sequential numbering
    let newId = type
    
    // If there are existing items of this type, add a numerical suffix
    if (existingItems.length > 0) {
      // Find the highest existing number suffix
      const suffixes = existingItems
        .map(item => {
          const match = item.id.match(new RegExp(`^${type}_(\\d+)$`))
          return match ? parseInt(match[1], 10) : 0
        })
        .filter(num => !isNaN(num))
      
      const highestSuffix = suffixes.length > 0 ? Math.max(...suffixes) : 0
      newId = `${type}_${highestSuffix + 1}`
    }

    const newItem = {
      id: newId,
      type,
      position,
    }

    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }, [config.items, setConfig])

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
