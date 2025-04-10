"use client"

import { Card } from "@/components/ui/card"

import { useConfig } from "@/lib/config-context"
import { Config } from "../sketchybar-editor"
import { ItemFactory } from "../sketchybar-items/item-factory"

export function PreviewPane() {
  const { config } = useConfig()

  // Organize items by position
  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  return (
    <Card className="flex-1 p-4 max-h-fit">
      <h2 className="text-xl font-semibold">Preview</h2>
      <div
        className="relative w-full flex justify-between items-center font-hack-mono" // Added relative positioning
        style={{
          height: `${config.bar.height}px`,
          backgroundColor: config.bar.color,
          borderRadius: `${config.bar.cornerRadius}px`,
          paddingLeft: `${config.bar.padding}px`,
          paddingRight: `${config.bar.padding}px`,
        }}
      >
        {/* Left Items (pushed left by justify-between) */}
        <RenderItems items={leftItems} />

        {/* Center Items Container (Absolutely Positioned) */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center" // Absolute centering classes
        >
          <RenderItems items={centerItems} />
        </div>

        {/* Right Items (pushed right by justify-between) */}
        <RenderItems items={rightItems} />
      </div>
    </Card>
  )
}

function RenderItems({
  items,
}: {
  items: Config["items"]
}) {
  if (items.length === 0) {
    return null // Return null if no items
  }

  return (
    <div className="flex items-center">
      {items.map((item) => (
        <ItemFactory key={item.id} item={item} />
      ))}
    </div>
  )
}
