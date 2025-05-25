"use client"

import { Card } from "@/components/ui/card"

import { useConfig } from "@/lib/config-context"
import { Config } from "../sketchybar-editor"
import { ItemFactory } from "../../lib/item-factory"
import { argbToRgba } from "@/lib/convert-color"


export function PreviewPane() {
  const { config } = useConfig()

  // Organize items by position
  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  // Convert bar color from ARGB to RGBA if needed
  const barColor = argbToRgba(config.bar.color)

  return (
    <Card className="flex-1 p-2 max-h-fit gap-2">
      <div
        className="relative w-full flex justify-between items-center font-hack-mono-bold"
        style={{
          height: `${config.bar.height}px`,
          backgroundColor: barColor,
          borderRadius: `${config.bar.cornerRadius}px`,
          paddingLeft: `${config.bar.padding}px`,
          paddingRight: `${config.bar.padding}px`,
        }}
      >
        {/* Left Items (pushed left by justify-between) */}
        <RenderItems items={leftItems} />

        {/* Center Items Container (Absolutely Positioned) */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
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
