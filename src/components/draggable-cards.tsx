"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import { Settings, Trash2 } from "lucide-react";
import { useConfig } from "@/lib/config-context";
import { Overrides } from "./sketchybar-editor";

// Define types for our draggable items.
type DragType = "item" | "divider";

interface DraggableItem {
  id: string;
  dragType: DragType;
  // For items, “name” (here used for display) comes from config’s “type”
  name: string | null;
  position: "left" | "center" | "right";
  overrides?: Overrides;
}

// Component for an individual draggable card.
const DraggableCard = ({
  item,
  removeItem,
}: {
  item: DraggableItem;
  removeItem: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${item.dragType === "divider"
        ? "bg-gray-300 w-4 h-12 rounded-full"
        : "w-full h-12"
        } flex items-center justify-center mx-1 cursor-grab`}
      {...attributes}
      {...listeners}
    >
      {item.dragType === "item" ? (
        <Card className="w-full h-full flex justify-center">
          <CardContent className="flex justify-between">
            <h4 className="font-medium">{item.name}</h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 h-auto w-auto min-h-0 min-w-0"
              >
                <Settings className="h-4 w-4" color="grey" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 h-auto w-auto min-h-0 min-w-0"
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on pointer down
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
              >
                <Trash2 className="h-4 w-4" color="grey" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

// Component used as the drag overlay.
const DragOverlayCard = ({ item }: { item: DraggableItem }) => {
  if (!item) return null;

  return (
    <div
      className={`${item.dragType === "divider"
        ? "bg-gray-300 w-4 h-12 rounded-full"
        : "w-full h-12"
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
  );
};

// Main component using the config data to create the draggable cards list.
export default function DraggableCardsList() {
  const { config, setConfig } = useConfig();

  // A helper to convert config items to DraggableItem.
  const convertConfigItem = (item: {
    id: string;
    type: string;
    position: "left" | "center" | "right";
    overrides?: Overrides;
  }): DraggableItem => ({
    id: item.id,
    dragType: "item",
    name: item.type, // Display the type as name; change if needed.
    position: item.position,
    overrides: item.overrides,
  });

  const removeItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateItemOverrides = (id: string, overrides: Overrides) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, overrides: { ...item.overrides, ...overrides } } : item,
      ),
    }))
  }

  // Build the draggable list (including divider items) based on the config groups.
  const buildDraggableItems = () => {
    // Convert all config items.
    const baseItems = config.items.map(convertConfigItem);
    // Group by the specified positions.
    const leftItems = baseItems.filter((item) => item.position === "left");
    const centerItems = baseItems.filter((item) => item.position === "center");
    const rightItems = baseItems.filter((item) => item.position === "right");

    let newItems: DraggableItem[] = [];
    if (leftItems.length > 0) {
      newItems = newItems.concat(leftItems);
    }
    // Add divider if there are center items.
    if (centerItems.length > 0) {
      newItems.push({
        id: "divider-1",
        dragType: "divider",
        name: null,
        position: "left",
      });
      newItems = newItems.concat(centerItems);
    }
    // Add divider if there are right items.
    if (rightItems.length > 0) {
      newItems.push({
        id: "divider-2",
        dragType: "divider",
        name: null,
        position: "center",
      });
      newItems = newItems.concat(rightItems);
    }
    return newItems;
  };

  // Local state for draggable items.
  const [items, setItems] = useState<DraggableItem[]>(buildDraggableItems());
  const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);

  // Rebuild the items list if config changes.
  useEffect(() => {
    setItems(buildDraggableItems());
  }, [config.items]);

  // Set up sensors with an activation constraint.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // On drag start, record the active item.
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeCard = items.find((item) => item.id === active.id);
    setActiveItem(activeCard || null);
  };

  // On drag end, update the ordering and modify the config accordingly.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex);

      setItems(updatedItems);

      // Determine divider indices.
      const divider1Index = updatedItems.findIndex((item) => item.id === "divider-1");
      const divider2Index = updatedItems.findIndex((item) => item.id === "divider-2");

      // Recompute positions for non-divider items.
      const newConfigItems = updatedItems
        .filter((item) => item.dragType === "item")
        .map((item, index) => {
          let newPosition: "left" | "center" | "right" = "left";
          if (divider1Index !== -1 && index < divider1Index) {
            newPosition = "left";
          } else if (divider1Index !== -1 && (divider2Index === -1 || index < divider2Index - 1)) {
            newPosition = "center";
          } else if (divider2Index !== -1) {
            newPosition = "right";
          }
          return {
            id: item.id,
            type: item.name || "",
            position: newPosition,
            overrides: item.overrides,
          };
        });

      setConfig((prevConfig) => ({
        ...prevConfig,
        items: newConfigItems,
      }));
    }

    setActiveItem(null);
  };

  // Gather all item IDs for the SortableContext.
  const itemIds = items.map((item) => item.id);

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-center">
          <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
            {items.map((item) => (
              <DraggableCard key={item.id} item={item} removeItem={removeItem} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeItem ? <DragOverlayCard item={activeItem} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-6 text-sm text-gray-500">
        <p>Drag cards to reorder them within a section or move them between sections.</p>
      </div>
    </div>
  );
}
