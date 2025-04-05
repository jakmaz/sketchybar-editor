import type { SketchybarItemComponentProps } from "./item-interface"

export function AppleItem({ item, config }: SketchybarItemComponentProps) {
  return (
    <div
      style={{
        backgroundColor: `#${config.defaults.backgroundColor.slice(2)}`,
        color: `#${config.defaults.iconColor.slice(2)}`,
        paddingLeft: `${config.defaults.iconPaddingLeft}px`,
        paddingRight: `${config.defaults.iconPaddingRight}px`,
        height: `${config.defaults.backgroundHeight}px`,
        borderRadius: `${config.defaults.backgroundCornerRadius}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      A
    </div>
  )
}

