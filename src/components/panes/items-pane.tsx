import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useConfig } from "@/lib/config-context"
import { getAllItemDefinitions, getItemsByTag, searchItems, type ItemDefinition } from "@/lib/item-registry"
import DraggableCardsList from "../draggable-cards"
import React, { useCallback, useState, useMemo } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { Search, Plus, Info, User, Tag } from "lucide-react"

const allItems = getAllItemDefinitions()

// Get all unique tags
const allTags = Array.from(
  new Set(allItems.flatMap(item => item.tags || []))
).sort()

export function ItemsPane() {
  const { setConfig } = useConfig()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all")
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

  // Filter items based on search and tag
  const filteredItems = useMemo(() => {
    let items = allItems

    // Filter by tag
    if (selectedTag !== "all") {
      items = getItemsByTag(selectedTag)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      items = searchItems(searchQuery).filter(item =>
        selectedTag === "all" || item.tags?.includes(selectedTag)
      )
    }

    return items
  }, [searchQuery, selectedTag])

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Item
          </h3>
          <Badge variant="secondary">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
          </Badge>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-48">
              <Tag className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.type}
              item={item}
              onAddItem={addItem}
              onShowDetails={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No items found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-2xl font-hack-mono">{selectedItem.defaultIcon || ''}</span>
                  {selectedItem.displayName}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedItem.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Author:</span>
                    <span className="text-sm">{selectedItem.author}</span>
                  </div>
                )}

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm font-medium">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedItem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

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

interface ItemCardProps {
  item: ItemDefinition
  onAddItem: (type: string, position: ItemPosition) => void
  onShowDetails: () => void
}

function ItemCard({ item, onAddItem, onShowDetails }: ItemCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-hack-mono">{item.defaultIcon || ''}</span>
            <div>
              <CardTitle className="text-base">{item.displayName}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                {item.description}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onShowDetails()
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onAddItem(item.type, "left")
            }}
            className="flex-1 text-xs"
          >
            Left
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onAddItem(item.type, "center")
            }}
            className="flex-1 text-xs"
          >
            Center
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onAddItem(item.type, "right")
            }}
            className="flex-1 text-xs"
          >
            Right
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
