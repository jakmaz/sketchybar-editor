import type { SketchybarItemComponentProps } from "./item-interface"

export function SpacesItem({ item, config, className }: SketchybarItemComponentProps) {
  return (
    <div
      className={className}
      style={{
        color: item.color || "#ffffff",
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
      }}
    >
      1 2 3
    </div>
  )
}

