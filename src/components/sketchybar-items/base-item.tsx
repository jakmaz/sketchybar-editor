import { argbToRgba } from "@/lib/convert-color";
import { DefaultsSettings } from "../sketchybar-editor";
import React from "react";


interface BaseItemProps {
  itemSettings: Required<DefaultsSettings>;
  icon?: React.ReactNode;
  label?: React.ReactNode;
}

export function BaseItem({ itemSettings, icon, label }: BaseItemProps) {
  return (
    <div
      style={{
        backgroundColor: argbToRgba(itemSettings.backgroundColor),
        borderRadius: `${itemSettings.backgroundCornerRadius}px`,
        height: `${itemSettings.backgroundHeight}px`,
        display: "flex",
        alignItems: "center",
        marginLeft: `${itemSettings.paddingLeft}px`,
        marginRight: `${itemSettings.paddingRight}px`,
        justifyContent: "center",
      }}
    >
      {icon && (
        <span
          style={{
            color: argbToRgba(itemSettings.iconColor),
            fontFamily: itemSettings.iconFont,
            fontSize: 20,
            paddingLeft: `${itemSettings.iconPaddingLeft}px`,
            paddingRight: `${itemSettings.iconPaddingRight}px`,
          }}
        >
          {icon}
        </span>
      )}
      {label && (
        <span
          style={{
            color: argbToRgba(itemSettings.labelColor),
            fontFamily: itemSettings.labelFont,
            paddingLeft: `${itemSettings.labelPaddingLeft}px`,
            paddingRight: `${itemSettings.labelPaddingRight}px`,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
