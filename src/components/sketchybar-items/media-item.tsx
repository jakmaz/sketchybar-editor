"use client"

import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function MediaItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰝚"} label={"Michael Giacchino - The Batman"} />
}
