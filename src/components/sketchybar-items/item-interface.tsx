import type { SketchybarConfig, SketchybarItem } from "@/components/sketchybar-editor"

export interface SketchybarItemProps {
  config: SketchybarConfig
}

export interface SketchybarItemComponentProps extends SketchybarItemProps {
  className?: string
}

