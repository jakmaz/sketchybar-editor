import type { SketchybarItemComponentProps } from "./item-interface"

export function BatteryItem({ item, config }: SketchybarItemComponentProps) {
  return (
    <div
      style={{
        backgroundColor: `#${config.defaults.backgroundColor.slice(2)}`,
        borderRadius: `${config.defaults.backgroundCornerRadius}px`,
        height: `${config.defaults.backgroundHeight}px`,
        display: "flex",
        alignItems: "center",
        paddingLeft: `${config.defaults.paddingLeft}px`,
        paddingRight: `${config.defaults.paddingRight}px`,
      }}
    >
      <span
        style={{
          color: `#${config.defaults.iconColor.slice(2)}`,
          fontFamily: config.defaults.iconFont,
          paddingLeft: `${config.defaults.iconPaddingLeft}px`,
          paddingRight: `${config.defaults.iconPaddingRight}px`,
        }}
      >
        
      </span>
      <span
        style={{
          color: `#${config.defaults.labelColor.slice(2)}`,
          fontFamily: config.defaults.labelFont,
          paddingLeft: `${config.defaults.labelPaddingLeft}px`,
          paddingRight: `${config.defaults.labelPaddingRight}px`,
        }}
      >
        85%
      </span>
    </div>
  )
}
