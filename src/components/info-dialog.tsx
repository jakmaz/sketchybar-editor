import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sketchybar Editor</DialogTitle>
          <DialogDescription>
            Sketchybar Editor is a simple web interface to get you started with configuring your very own rice!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}
