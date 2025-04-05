"use client"

import type { SketchybarItemComponentProps } from "./item-interface"
import React from "react"

interface BaseItemProps extends SketchybarItemComponentProps {
  icon?: React.ReactNode
  label?: React.ReactNode
}

export function BaseItem({ config, icon, label }: BaseItemProps) {
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
        justifyContent: "center",
      }}
    >
      {icon && (
        <span
          style={{
            color: `#${config.defaults.iconColor.slice(2)}`,
            fontFamily: config.defaults.iconFont,
            fontSize: 20,
            paddingLeft: `${config.defaults.iconPaddingLeft}px`,
            paddingRight: `${config.defaults.iconPaddingRight}px`,
          }}
        >
          {icon}
        </span>
      )}
      {label && (
        <span
          style={{
            color: `#${config.defaults.labelColor.slice(2)}`,
            fontFamily: config.defaults.labelFont,
            paddingLeft: `${config.defaults.labelPaddingLeft}px`,
            paddingRight: `${config.defaults.labelPaddingRight}px`,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
