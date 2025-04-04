import type { SketchybarConfig, SketchybarItem } from "@/components/sketchybar-editor"

export interface SketchybarItemProps {
  item: SketchybarItem
  config: SketchybarConfig
}

export interface SketchybarItemComponentProps extends SketchybarItemProps {
  className?: string
}

