"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
// Import the version from package.json
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
          <DialogTitle className="text-xl">Sketchybar Editor <span className="text-sm text-muted-foreground">v{version}</span></DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4 flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">About</h3>
              <p className="text-sm text-muted-foreground">
                Sketchybar Editor is a user-friendly, web-based tool designed to simplify the creation of basic
                Sketchybar configurations. It provides a visual interface to customize your status bar, making it easier
                for both new and experienced users to generate .sketchybarrc files without needing to write code
                directly.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">How to Use</h3>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Use the editor to customize your Sketchybar</li>
                <li>Click the &quot;View Config&quot; button to download the generated .sketchybarrc file</li>
                <li>Move the downloaded file to your Sketchybar configuration directory (usually ~/.sketchybarrc)</li>
                <li>Restart Sketchybar to apply the new configuration</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Key Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Real-time Preview of Changes</li>
                <li>Visual Configuration with Sliders, Color Pickers, and Dropdown Menus</li>
                <li>Ready-to-use Pre-made Components</li>
                <li>Popular Color Themes for Quick Styling</li>
                <li>Downloadable Configuration File Structure</li>
                <li>Sketchybar Editor Configuration Import and Export</li>
                <li>Dark/Light Mode Toggle for System Preference Matching</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upcoming Enhancements</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Template Library with Starter Configurations</li>
                <li>Configuration Sharing within the Community</li>
                <li>Custom Component and Plugin Support with Sharing Capabilities</li>
                <li>Automated sketchybar config download to your device</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="changelog" className="space-y-4 mt-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Version History</h3>

              <div className="border-l-2 border-muted pl-4 space-y-4">

                {/* <div> */}
                {/*   <h4 className="text-sm font-semibold">v1.1.0 - February 2025</h4> */}
                {/*   <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside"> */}
                {/*     <li>Added real-time preview functionality</li> */}
                {/*     <li>Improved UI responsiveness</li> */}
                {/*     <li>Fixed configuration download issues</li> */}
                {/*     <li>Added more font family options</li> */}
                {/*   </ul> */}
                {/* </div> */}

                <div>
                  <h4 className="text-sm font-semibold">v1.0.0 - April 2025</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                    <li>Initial release</li>
                    <li>Basic customization options</li>
                    <li>Configuration file generation</li>
                    <li>Simple user interface</li>
                  </ul>
                </div>

              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            asChild
            className="w-full"
          >
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
