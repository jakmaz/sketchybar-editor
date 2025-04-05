import type { Config, Item } from "@/components/sketchybar-editor"

export interface SketchybarItemProps {
  config: Config
}

export interface SketchybarItemComponentProps extends SketchybarItemProps {
  className?: string
}

