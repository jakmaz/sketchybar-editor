"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "./ui/button"
import { Settings, Trash2 } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { Overrides } from "./sketchybar-editor"

// Define the types for our items
type DragType = "item" | "divider"

interface DraggableItem {
  id: string
  dragType: DragType
  name: string | null
  position: "left" | "center" | "right"
  overrides?: Overrides
}

// Component for a draggable card
const DraggableCard = ({ item }: { item: DraggableItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${item.dragType === "divider" ? "bg-gray-300 w-4 h-12 rouned-full" : "w-full h-12"
        } flex items-center justify-center mx-1 cursor-grab`}
      {...attributes}
      {...listeners}
    >
      {item.dragType === "item" ? (
        <Card className="w-full h-full flex justify-center">
          <CardContent className="flex justify-between">
            <h4 className="font-medium">{item.name}</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="p-0 h-auto w-auto min-h-0 min-w-0">
                <Settings className="h-4 w-4" color="grey" />
              </Button>
              <Button variant="ghost" size="icon" className="p-0 h-auto w-auto min-h-0 min-w-0">
                <Trash2 className="h-4 w-4" color="grey" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

// Component for the card when being dragged
const DragOverlayCard = ({ item }: { item: DraggableItem }) => {
  if (!item) return null

  return (
    <div
      className={`${item.dragType === "divider" ? "bg-gray-300 w-1 h-12 rouned-full" : "w-full h-12"
        } flex items-center justify-center mx-1`}
    >
      {item.dragType === "item" ? (
        <Card className="w-full h-full flex justify-center">
          <CardContent className="flex justify-between">
            <h4 className="font-medium">{item.name}</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="p-0 h-auto w-auto min-h-0 min-w-0">
                <Settings className="h-4 w-4" color="grey" />
              </Button>
              <Button variant="ghost" size="icon" className="p-0 h-auto w-auto min-h-0 min-w-0">
                <Trash2 className="h-4 w-4" color="grey" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

// Main component
export default function DraggableCardsList() {
  const { config, setConfig } = useConfig();

  const configItems = config.items;
  // Initialize items with cards and dividers
  const [items, setItems] = useState<DraggableItem[]>([
    {
      "id": "apple",
      dragType: "item",
      "name": "apple",
      "position": "left",
      "overrides": {
        "iconPaddingRight": 10
      }
    },
    {
      "id": "divider-1",
      dragType: "divider",
      "name": "apple",
      "position": "left",
    },
    {
      "id": "media",
      dragType: "item",
      "name": "media",
      "position": "center",
      "overrides": {
        "backgroundColor": "#121212"
      }
    },
    {
      "id": "divider-2",
      dragType: "divider",
      "name": "apple",
      "position": "center",
    },
    {
      "id": "cpu",
      dragType: "item",
      "name": "cpu",
      "position": "right"
    },
    {
      "id": "battery",
      dragType: "item",
      "name": "battery",
      "position": "right"
    },
    {
      "id": "clock",
      dragType: "item",
      "name": "clock",
      "position": "right"
    }
  ])

  const [activeItem, setActiveItem] = useState<DraggableItem | null>(null)

  // Set up sensors for drag and drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeItem = items.find((item) => item.id === active.id)
    setActiveItem(activeItem || null)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        // Update the section of the moved item based on where it's dropped
        const updatedItems = arrayMove(items, oldIndex, newIndex)

        // Recalculate sections based on divider positions
        const divider1Index = updatedItems.findIndex((item) => item.id === "divider-1")
        const divider2Index = updatedItems.findIndex((item) => item.id === "divider-2")

        return updatedItems.map((item, index) => {
          if (index < divider1Index) {
            return { ...item, section: "left" }
          } else if (index < divider2Index) {
            return { ...item, section: "center" }
          } else {
            return { ...item, section: "right" }
          }
        })
      })
    }

    setActiveItem(null)
  }

  // Get all item IDs for the sortable context
  const itemIds = items.map((item) => item.id)

  return (
    <div >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-center">
          <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
            {items.map((item) => (
              <DraggableCard key={item.id} item={item} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>{activeItem ? <DragOverlayCard item={activeItem} /> : null}</DragOverlay>
      </DndContext>

      <div className="mt-6 text-sm text-gray-500">
        <p>Drag cards to reorder them within a section or move them between sections.</p>
      </div>
    </div>
  )
}
