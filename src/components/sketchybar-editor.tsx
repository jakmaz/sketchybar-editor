"use client"

import { useState } from "react"
import { Download, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AppearanceTab } from "./editor-tabs/appearance-tab"
import { ItemsTab } from "./editor-tabs/items-tab"
import { PositionTab } from "./editor-tabs/position-tab"
import { SketchybarPreview } from "./sketchybar-preview"

export type ItemType = "apple" | "spaces" | "clock" | "battery" | "calendar"
export type ItemPosition = "left" | "center" | "right"

import { toast } from "sonner"


export interface SketchybarItem {
  id: string
  type: ItemType
  position: ItemPosition
  color?: string
  icon?: string
  text?: string
}

export interface SketchybarConfig {
  height: number
  padding: number
  position: "top" | "bottom"
  color: string
  cornerRadius: number
  fontSize: number
  fontFamily: string
  items: SketchybarItem[]
}

export function SketchybarEditor() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [config, setConfig] = useState<SketchybarConfig>({
    height: 40,
    padding: 8,
    position: "top",
    color: "#121212",
    cornerRadius: 8,
    fontSize: 14,
    fontFamily: "Menlo",
    items: [
      {
        id: "apple",
        type: "apple",
        position: "left",
        color: "#ffffff",
      },
      {
        id: "battery",
        type: "battery",
        position: "right",
        color: "#ffffff",
      },
      {
        id: "clock",
        type: "clock",
        position: "right",
        color: "#ffffff",
      }
    ],
  })

  const handleDownload = () => {
    // Generate sketchybarrc code based on config
    const code = generateSketchybarCode(config)

    // Create a blob and download it
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = ".sketchybarrc"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast("Configuration downloaded", {
      description: "Your sketchybar configuration has been downloaded.",
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`flex flex-col min-h-screen`}>
      <header className="border-b bg-background p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sketchybar Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Config
          </Button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 gap-4 p-4">
        <Card className="lg:w-80 p-4">
          <Tabs defaultValue="appearance">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="position">Position</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance">
              <AppearanceTab config={config} setConfig={setConfig} />
            </TabsContent>

            <TabsContent value="position">
              <PositionTab config={config} setConfig={setConfig} />
            </TabsContent>

            <TabsContent value="items">
              <ItemsTab config={config} setConfig={setConfig} />
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <SketchybarPreview config={config} />
        </Card>
      </div>
    </div>
  )
}

function generateSketchybarCode(config: SketchybarConfig): string {
  return `#!/bin/bash

# Sketchybar configuration
# Generated with Sketchybar Editor

# Bar appearance
sketchybar --bar height=${config.height} \\
                 position=${config.position} \\
                 padding_left=${config.padding} \\
                 padding_right=${config.padding} \\
                 color=${config.color} \\
                 corner_radius=${config.cornerRadius}

# Default item settings
sketchybar --default icon.font="${config.fontFamily}" \\
                     icon.color=0xffffffff \\
                     label.font="${config.fontFamily}" \\
                     label.color=0xffffffff \\
                     label.font.size=${config.fontSize} \\
                     padding_left=5 \\
                     padding_right=5

${config.items
      .map((item) => {
        let itemConfig = `# ${item.type} item\n`

        switch (item.type) {
          case "apple":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} icon=􀣺 \\
           icon.color=${item.color || "0xffffffff"}`
            break
          case "spaces":
            itemConfig += `sketchybar --add space space_1 ${item.position} \\
           --set space_1 label="1"`
            break
          case "clock":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=1 \\
           script="date '+%H:%M'" \\
           label.color=${item.color || "0xffffffff"}`
            break
          case "battery":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=120 \\
           script="pmset -g batt | grep -o '[0-9]*%'" \\
           icon=􀛨 \\
           icon.color=${item.color || "0xffffffff"}`
            break
          case "calendar":
            itemConfig += `sketchybar --add item ${item.id} ${item.position} \\
           --set ${item.id} update_freq=60 \\
           script="date '+%a %b %d'" \\
           label.color=${item.color || "0xffffffff"}`
            break
        }

        return itemConfig
      })
      .join("\n\n")}

# Finalizing setup
sketchybar --update
`
}

