import type { Config, DefaultsSettings } from "@/components/sketchybar-editor"

export interface SketchybarItemProps {
  config: Config
}

export interface SketchybarItemComponentProps {
  itemSettings: Required<DefaultsSettings>;
}

