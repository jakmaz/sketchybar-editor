import { DefaultsSettings } from "../sketchybar-editor";
import React from "react";

// Helper function to convert 0xAARRGGBB hex to CSS rgba
function argbToRgba(argbHex: string): string {
  if (!argbHex || typeof argbHex !== 'string') {
    return 'rgba(0, 0, 0, 0)'; // Default transparent color
  }
  
  try {
    // Handle 0xAARRGGBB format
    if (argbHex.startsWith('0x') && argbHex.length === 10) {
      const hex = argbHex.substring(2); // Remove '0x' prefix
      const a = parseInt(hex.slice(0, 2), 16) / 255;
      const r = parseInt(hex.slice(2, 4), 16);
      const g = parseInt(hex.slice(4, 6), 16);
      const b = parseInt(hex.slice(6, 8), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    // Return the original value if it doesn't match expected formats
    return argbHex;
  } catch (e) {
    console.error("Error parsing color:", e);
    return argbHex; // Return original on error
  }
}

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
