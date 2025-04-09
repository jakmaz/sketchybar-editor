import { DefaultsSettings, Item, Overrides } from "@/components/sketchybar-editor";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mergeItemWithDefaults = (
  item: Item,
  defaults: DefaultsSettings
): Required<DefaultsSettings> => {
  const overrides: Overrides = item.overrides || {};

  return {
    backgroundColor: overrides.backgroundColor ?? defaults.backgroundColor,
    iconColor: overrides.iconColor ?? defaults.iconColor,
    labelColor: overrides.labelColor ?? defaults.labelColor,
    paddingLeft: overrides.paddingLeft ?? defaults.paddingLeft,
    paddingRight: overrides.paddingRight ?? defaults.paddingRight,
    iconFont: overrides.iconFont ?? defaults.iconFont,
    labelFont: overrides.labelFont ?? defaults.labelFont,
    backgroundCornerRadius: overrides.backgroundCornerRadius ?? defaults.backgroundCornerRadius,
    backgroundHeight: overrides.backgroundHeight ?? defaults.backgroundHeight,
    iconPaddingLeft: overrides.iconPaddingLeft ?? defaults.iconPaddingLeft,
    iconPaddingRight: overrides.iconPaddingRight ?? defaults.iconPaddingRight,
    labelPaddingLeft: overrides.labelPaddingLeft ?? defaults.labelPaddingLeft,
    labelPaddingRight: overrides.labelPaddingRight ?? defaults.labelPaddingRight,
  };
};
