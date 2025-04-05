"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BarTab } from "./editor-tabs/bar-tab"
import { ItemsTab } from "./editor-tabs/items-tab"
import { DefaultsTab } from "./editor-tabs/defaults-tab"
import { SketchybarPreview } from "./sketchybar-preview"

export type ItemType = "apple" | "spaces" | "clock" | "battery" | "calendar"
export type ItemPosition = "left" | "center" | "right"

import Navbar from "./navbar"


export interface SketchybarItem {
  id: string
  type: ItemType
  position: ItemPosition
  color?: string
  icon?: string
  text?: string
}

export interface SketchybarConfig {
  bar: SketcybarBar
  items: SketchybarItem[]
}

export interface SketcybarBar {
  color: string
  position: "top" | "bottom"
  height: number
  padding: number
  cornerRadius: number
  fontSize: number
  fontFamily: string
}

export function SketchybarEditor() {
  const [config, setConfig] = useState<SketchybarConfig>({
    bar: {
      color: "#121212",
      position: "top",
      height: 40,
      padding: 8,
      cornerRadius: 8,
      fontSize: 14,
      fontFamily: "Menlo",
    },
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


  return (
    <div className="flex flex-col min-h-screen p-4 gap-4">
      <Navbar config={config} />

      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        <Card className="lg:w-80 p-4">
          <Tabs defaultValue="bar">
            <TabsList className="grid grid-cols-3 mb-4 w-full">
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="defaults">Defaults</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
            </TabsList>

            <TabsContent value="bar">
              <BarTab config={config} setConfig={setConfig} />
            </TabsContent>

            <TabsContent value="defaults">
              <DefaultsTab config={config} setConfig={setConfig} />
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

