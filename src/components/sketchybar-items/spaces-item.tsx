import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function SpacesItem({ itemSettings }: SketchybarItemComponentProps) {
  return (
    <BaseItem itemSettings={itemSettings} label="1 2 3" />
  )
}

