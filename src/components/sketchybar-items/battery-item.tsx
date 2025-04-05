"use client"

import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function BatteryItem({ config }: SketchybarItemComponentProps) {
  return <BaseItem config={config} icon={"B"} label={"85%"} />
}
