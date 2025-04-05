import { AppleItem } from "./apple-item"
import { SpacesItem } from "./spaces-item"
import { ClockItem } from "./clock-item"
import { BatteryItem } from "./battery-item"
import { CalendarItem } from "./calendar-item"
import { Config, Item } from "../sketchybar-editor"

export function ItemFactory({ item, config }: { item: Item, config: Config }) {
  const className = "px-2 py-1 text-xs rounded"

  switch (item.type) {
    case "apple":
      return <AppleItem config={config} />
    case "spaces":
      return <SpacesItem config={config} />
    case "clock":
      return <ClockItem config={config} />
    case "battery":
      return <BatteryItem config={config} />
    case "calendar":
      return <CalendarItem config={config} />
    default:
      return <div className={className}>{item.type}</div>
  }
}

