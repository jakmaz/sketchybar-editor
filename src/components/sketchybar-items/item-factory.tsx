import { AppleItem } from "./apple-item";
import { SpacesItem } from "./spaces-item";
import { ClockItem } from "./clock-item";
import { BatteryItem } from "./battery-item";
import { CalendarItem } from "./calendar-item";
import { CpuItem } from "./cpu-item";
import { Config, Item } from "../sketchybar-editor";
import { mergeItemWithDefaults } from "@/lib/utils";
import { MediaItem } from "./media-item";

export function ItemFactory({ item, config }: { item: Item; config: Config }) {
  const className = "px-2 py-1 text-xs rounded";
  const itemSettings = mergeItemWithDefaults(item, config.defaults); // Merge settings


  switch (item.type) {
    case "apple":
      return <AppleItem itemSettings={itemSettings} />;
    case "spaces":
      return <SpacesItem itemSettings={itemSettings} />;
    case "clock":
      return <ClockItem itemSettings={itemSettings} />;
    case "battery":
      return <BatteryItem itemSettings={itemSettings} />;
    case "calendar":
      return <CalendarItem itemSettings={itemSettings} />;
    case "cpu":
      return <CpuItem itemSettings={itemSettings} />;
    case "media":
      return <MediaItem itemSettings={itemSettings} />;
    default:
      return <div className={className}>{item.type}</div>;
  }
}
