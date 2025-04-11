"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
          <span className="sr-only">App Information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:h-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Sketchybar Editor</DialogTitle>
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
                <li>Click the "Download Config" button to download the generated .sketchybarrc file</li>
                <li>Move the downloaded file to your Sketchybar configuration directory (usually ~/.sketchybarrc)</li>
                <li>Restart Sketchybar to apply the new configuration</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Current Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Visual Configuration with sliders, color pickers, and dropdown menus</li>
                <li>Real-time Preview of your changes</li>
                <li>Downloadable Config file generation</li>
                <li>Basic Customization Options:</li>
                <ul className="pl-6 mt-1 space-y-1 list-disc list-inside">
                  <li>Color: Set the bar's background color</li>
                  <li>Position: Choose top or bottom screen placement</li>
                  <li>Height: Adjust the bar's height</li>
                  <li>Padding: Control spacing around elements</li>
                  <li>Corner Radius: Round the corners of the bar</li>
                  <li>Font Size: Set default text size</li>
                  <li>Font Family: Select from various font options</li>
                </ul>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upcoming Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Advanced Item Configuration: Create and customize individual items</li>
                <li>Plugin Integration: Support for popular Sketchybar plugins</li>
                <li>Template Library: Pre-made configurations to use as starting points</li>
                <li>Configuration Sharing: Share your designs with the community</li>
                <li>Dark/Light Mode Toggle: Adapt to your system preferences</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="changelog" className="space-y-4 mt-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Version History</h3>

              <div className="border-l-2 border-muted pl-4 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold">v1.2.0 - April 2025</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                    <li>Added font preview functionality</li>
                    <li>Improved color picker with opacity control</li>
                    <li>Fixed position toggle issues on certain displays</li>
                    <li>Added export options for different Sketchybar versions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold">v1.1.0 - February 2025</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                    <li>Added real-time preview functionality</li>
                    <li>Improved UI responsiveness</li>
                    <li>Fixed configuration download issues</li>
                    <li>Added more font family options</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold">v1.0.0 - December 2024</h4>
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

        <div className="mt-4 text-xs text-center text-muted-foreground">
          Sketchybar Editor is open source under the MIT License
        </div>
      </DialogContent>
    </Dialog>
  )
}
