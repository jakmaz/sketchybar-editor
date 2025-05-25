import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { type ItemDefinition } from "@/lib/item-registry"
import type { ItemPosition } from "@/components/sketchybar-editor"
import { Info, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface ItemDetailsDialogProps {
  selectedItem: ItemDefinition
  onAddItem: (type: string, position: ItemPosition) => void
}

export function ItemDetailsDialog({ selectedItem, onAddItem }: ItemDetailsDialogProps) {
  // Create a state to control the dialog
  const [open, setOpen] = useState(false)

  const handleAddItem = (position: ItemPosition) => {
    if (selectedItem) {
      onAddItem(selectedItem.type, position)
      // Close the dialog after adding the item
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Info className="h-4 w-4" />
        </Button>

      </DialogTrigger>
      <DialogContent className="max-w-2xl">
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
                onClick={() => handleAddItem("left")}
                className="flex-1"
              >
                Left Side
              </Button>
              <Button
                onClick={() => handleAddItem("center")}
                className="flex-1"
              >
                Center
              </Button>
              <Button
                onClick={() => handleAddItem("right")}
                className="flex-1"
              >
                Right Side
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
