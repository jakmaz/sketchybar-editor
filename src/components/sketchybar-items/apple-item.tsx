"use client";

import type { SketchybarItemComponentProps } from "./item-interface";
import { BaseItem } from "./base-item";

export function AppleItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰀵"} />;
}
