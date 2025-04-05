"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BarTab } from "./editor-tabs/bar-tab"
import { DefaultsTab } from "./editor-tabs/defaults-tab"
import { SketchybarPreview } from "./sketchybar-preview"

export type ItemType = "apple" | "spaces" | "clock" | "battery" | "calendar"
export type ItemPosition = "left" | "center" | "right"

import Navbar from "./navbar"
import { ItemsPane } from "./items-pane"

export interface SketchybarItem {
  id: string
  type: ItemType
  position: ItemPosition
  color?: string
  icon?: string
  text?: string
}

export interface SketchybarDefaults {
  backgroundColor: string
  iconColor: string
  labelColor: string
  paddingLeft: number
  paddingRight: number
  iconFont: string
  labelFont: string
  backgroundCornerRadius: number
  backgroundHeight: number
  iconPaddingLeft: number
  iconPaddingRight: number
  labelPaddingLeft: number
  labelPaddingRight: number
}

export interface SketchybarConfig {
  bar: SketcybarBar
  defaults: SketchybarDefaults
  items: SketchybarItem[]
}

export interface SketcybarBar {
  color: string
  position: "top" | "bottom"
  height: number
  padding: number
  cornerRadius: number
}

export function SketchybarEditor() {
  const [config, setConfig] = useState<SketchybarConfig>({
    bar: {
      color: "#121212",
      position: "top",
      height: 40,
      padding: 8,
      cornerRadius: 8,
    },
    defaults: {
      backgroundColor: "0xff0000",
      iconColor: "0xffffff",
      labelColor: "0xffffff",
      paddingLeft: 5,
      paddingRight: 5,
      iconFont: "Hack Nerd Font:Bold:17.0",
      labelFont: "Hack Nerd Font:Bold:14.0",
      backgroundCornerRadius: 5,
      backgroundHeight: 26,
      iconPaddingLeft: 10,
      iconPaddingRight: 4,
      labelPaddingLeft: 4,
      labelPaddingRight: 10,
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
      },
    ],
  })

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4">
      <Navbar config={config} />

      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        <Card className="lg:w-80 p-4">
          <Tabs defaultValue="bar">
            <TabsList className="grid grid-cols-2 mb-4 w-full">
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="defaults">Defaults</TabsTrigger>
            </TabsList>

            <TabsContent value="bar">
              <BarTab config={config} setConfig={setConfig} />
            </TabsContent>

            <TabsContent value="defaults">
              <DefaultsTab config={config} setConfig={setConfig} />
            </TabsContent>
          </Tabs>
        </Card>

        <div className="flex flex-col w-full gap-4">
          <Card className="flex-1 p-4 max-h-fit">
            <h2 className="text-xl font-semibold">Preview</h2>
            <SketchybarPreview config={config} />
          </Card>
          <Card className="flex-1 p-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <ItemsPane config={config} setConfig={setConfig} />
          </Card>
        </div>
      </div>
    </div>
  )
}
