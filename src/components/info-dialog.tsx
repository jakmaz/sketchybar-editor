import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { version } from "../../package.json"

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
          <span className="sr-only">App Information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Sketchybar Editor <span className="ml-1 text-sm text-muted-foreground">v{version}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto mt-4 flex-1 text-sm ">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">About</h3>
            <p>
              Sketchybar Editor is a web-based tool that helps you create a solid starting configuration for Sketchybar.
              It generates a clean, well-structured config that you can download, explore, and build upon—making it easier
              to understand how Sketchybar works before diving into code. It&apos;s perfect for newcomers and a fast starting point for developers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">How to Use</h3>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Open the editor and start adding items to your status bar</li>
              <li>Customize the layout and behavior using the visual interface</li>
              <li>Click the <strong>“View Config”</strong> button to download the <code>sketchybar.zip</code> file</li>
              <li>Extract the contents into your Sketchybar config directory: <code>~/.config/sketchybar/</code></li>
              <li>Restart Sketchybar to apply the configuration: <code>sketchybar --restart</code></li>
            </ol>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" asChild className="w-full">
            <a
              href="https://roadwiseapp.com/app/sketchybar-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suggest features and provide feedback here!
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
