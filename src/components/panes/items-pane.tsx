import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useConfig } from "@/lib/config-context"
import { type ItemDefinition } from "@/lib/item-registry"
import DraggableCardsList from "../draggable-cards"
import React, { useCallback, useState } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddItemsSection } from "../add-items-section"
import { Avatar, AvatarImage } from "../ui/avatar"

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

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-3xl font-hack-mono">{selectedItem.defaultIcon || ''}</span>
                  {selectedItem.displayName}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={`https://github.com/${selectedItem.authorGithubUsername}.png`} alt="@shadcn" />
                  </Avatar>
                  <span className="text-sm font-medium">Author:</span>
                  <a
                    href={`https://github.com/${selectedItem.authorGithubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {selectedItem.authorGithubUsername}
                  </a>
                </div>

                <div>
                  <div className="flex flex-row items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 mx-2" />
                    <span className="text-sm font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedItem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedItem.updateFrequency && (
                    <div>
                      <span className="font-medium">Update Frequency:</span>
                      <span className="ml-2">{selectedItem.updateFrequency}s</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Add to Position:</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        addItem(selectedItem.type, "left")
                        setSelectedItem(null)
                      }}
                      className="flex-1"
                    >
                      Left Side
                    </Button>
                    <Button
                      onClick={() => {
                        addItem(selectedItem.type, "center")
                        setSelectedItem(null)
                      }}
                      className="flex-1"
                    >
                      Center
                    </Button>
                    <Button
                      onClick={() => {
                        addItem(selectedItem.type, "right")
                        setSelectedItem(null)
                      }}
                      className="flex-1"
                    >
                      Right Side
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
