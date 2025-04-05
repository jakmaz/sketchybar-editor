import type { Config } from "@/components/sketchybar-editor"

export interface SketchybarItemProps {
  config: Config
}

export interface SketchybarItemComponentProps extends SketchybarItemProps {
  className?: string
}

