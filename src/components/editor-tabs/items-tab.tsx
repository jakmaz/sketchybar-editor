// components/editor-tabs/items-tab.tsx
"use client"

import { type Dispatch, type SetStateAction, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ItemPosition, ItemType, SketchybarConfig } from "@/components/sketchybar-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ItemsTabProps {
  config: SketchybarConfig
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>
}

const ITEM_TYPES = [
  { value: "apple", label: "Apple Logo" },
  { value: "spaces", label: "Spaces" },
  { value: "clock", label: "Clock" },
  { value: "battery", label: "Battery" },
  { value: "calendar", label: "Calendar" },
]

const POSITIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
]

export function ItemsTab({ config, setConfig }: ItemsTabProps) {
  const [newItemType, setNewItemType] = useState<string>("")
  const [newItemPosition, setNewItemPosition] = useState<string>("left")

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Items</h3>
        {config.items.length === 0 ? (
          <p className="text-muted-foreground">No items added yet.</p>
        ) : (
          <div className="grid gap-4">
            {config.items.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium capitalize">{item.type}</h4>
                      <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select
                        value={item.position}
                        onValueChange={(value) => updateItemPosition(item.id, value as ItemPosition)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {POSITIONS.map((pos) => (
                            <SelectItem key={pos.value} value={pos.value}>
                              {pos.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div >
  )
}
