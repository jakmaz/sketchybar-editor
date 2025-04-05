"use client"

import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function AppleItem({ config }: SketchybarItemComponentProps) {
  return <BaseItem config={config} icon={"󰀵"} />
}
