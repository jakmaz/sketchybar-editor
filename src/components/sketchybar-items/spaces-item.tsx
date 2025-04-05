import type { SketchybarItemComponentProps } from "./item-interface"

export function SpacesItem({ item, config, className }: SketchybarItemComponentProps) {
  return (
    <div
      className={className}
      style={{
        color: item.color || "#ffffff",
      }}
    >
      1 2 3
    </div>
  )
}

