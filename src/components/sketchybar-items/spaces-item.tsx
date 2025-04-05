import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function SpacesItem({ config }: SketchybarItemComponentProps) {
  return (
    <BaseItem config={config} label="1 2 3" />
  )
}

