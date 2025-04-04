import type { SketchybarItemProps } from "./item-interface"
import { AppleItem } from "./apple-item"
import { SpacesItem } from "./spaces-item"
import { ClockItem } from "./clock-item"
import { BatteryItem } from "./battery-item"
import { CalendarItem } from "./calendar-item"

export function ItemFactory({ item, config }: SketchybarItemProps) {
  const className = "px-2 py-1 text-xs rounded"

  switch (item.type) {
    case "apple":
      return <AppleItem item={item} config={config} className={className} />
    case "spaces":
      return <SpacesItem item={item} config={config} className={className} />
    case "clock":
      return <ClockItem item={item} config={config} className={className} />
    case "battery":
      return <BatteryItem item={item} config={config} className={className} />
    case "calendar":
      return <CalendarItem item={item} config={config} className={className} />
    default:
      return <div className={className}>{item.type}</div>
  }
}

