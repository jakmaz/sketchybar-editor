import type { SketchybarItemComponentProps } from "./item-interface"

export function AppleItem({ item, config, className }: SketchybarItemComponentProps) {
  return (
    <div
      className={className}
      style={{
        color: item.color || "#ffffff",
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
      }}
    >
      􀣺
    </div>
  )
}

