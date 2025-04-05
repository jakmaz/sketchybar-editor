"use client"

import { useState } from "react"
import { PreviewPane } from "./preview-pane"

export type ItemType = "apple" | "spaces" | "clock" | "battery" | "calendar"
export type ItemPosition = "left" | "center" | "right"

import Navbar from "./navbar"
import { ItemsPane } from "./items-pane"
import { SidebarPane } from "./sidebar-pane"

export interface Item {
  id: string
  type: ItemType
  position: ItemPosition
  color?: string
  icon?: string
  text?: string
}

export interface DefaultsSettings {
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

export interface Config {
  bar: BarSettings
  defaults: DefaultsSettings
  items: Item[]
}

export interface BarSettings {
  color: string
  position: "top" | "bottom"
  height: number
  padding: number
  cornerRadius: number
}

export function SketchybarEditor() {
  const [config, setConfig] = useState<Config>({
    bar: {
      color: "#121212",
      position: "top",
      height: 40,
      padding: 8,
      cornerRadius: 8,
    },
    defaults: {
      backgroundColor: "0x3f3f3f",
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

        <SidebarPane config={config} setConfig={setConfig} />
        <div className="flex flex-col w-full gap-4">
          <PreviewPane config={config} />
          <ItemsPane config={config} setConfig={setConfig} />
        </div>
      </div>
    </div >
  )
}
