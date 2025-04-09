"use client"

import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function BatteryItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={""} label={"85%"} />
}
