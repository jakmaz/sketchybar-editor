import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllItemDefinitions, getItemsByTag, searchItems, type ItemDefinition } from "@/lib/item-registry"
import { Search, Tag } from "lucide-react"
import React, { useMemo, useState } from "react"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { ItemDetailsDialog } from "./item-details-dialog"

const allItems = getAllItemDefinitions()

// Get all unique tags
const allTags = Array.from(
  new Set(allItems.flatMap(item => item.tags || []))
).sort()

interface ItemCardProps {
  item: ItemDefinition
  onAddItem: (type: string, position: ItemPosition) => void
}

function ItemCard({ item, onAddItem }: ItemCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 gap-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-hack-mono">{item.displayIcon || ''}</span>
            <div>
              <CardTitle className="text-base">{item.displayName}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                {item.description}
              </CardDescription>
            </div>
          </div>
          <ItemDetailsDialog selectedItem={item} onAddItem={onAddItem} />
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

interface AddItemsSectionProps {
  onAddItem: (type: string, position: ItemPosition) => void
}

export function AddItemsSection({ onAddItem }: AddItemsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all")

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.type}
            item={item}
            onAddItem={onAddItem}
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
  )
}
