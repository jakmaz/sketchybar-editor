"use client"

import { PreviewPane } from "./panes/preview-pane"

export type ItemType = "apple" | "spaces" | "clock" | "battery" | "calendar" | "cpu" | "media"
export type ItemPosition = "left" | "center" | "right"

import TopPane from "./panes/top-pane"
import { ItemsPane } from "./panes/items-pane"
import { SidebarPane } from "./panes/sidebar-pane"
import { ConfigProvider } from "@/lib/config-context"

export interface Item {
  id: string;
  type: ItemType;
  position: ItemPosition;
  overrides?: Overrides;
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

export interface Overrides {
  backgroundColor?: string;
  iconColor?: string;
  labelColor?: string;
  paddingLeft?: number;
  paddingRight?: number;
  iconFont?: string;
  labelFont?: string;
  backgroundCornerRadius?: number;
  backgroundHeight?: number;
  iconPaddingLeft?: number;
  iconPaddingRight?: number;
  labelPaddingLeft?: number;
  labelPaddingRight?: number;
}

export function SketchybarEditor() {
  return (
    <ConfigProvider>
      <div className="flex flex-col min-h-screen p-4 gap-4">
        <TopPane />

        <div className="flex flex-col lg:flex-row flex-1 gap-4">

          <SidebarPane />
          <div className="flex flex-col w-full gap-4">
            <PreviewPane />
            <ItemsPane />
          </div>
        </div>
      </div >
    </ConfigProvider>
  )
}
