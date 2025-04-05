"use client"

import { Card } from "@/components/ui/card"

import type { Config } from "./sketchybar-editor"
import { ItemFactory } from "./sketchybar-items/item-factory"

interface SketchybarPreviewProps {
  config: Config
}

export function PreviewPane({ config }: SketchybarPreviewProps) {
  // Organize items by position
  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  return (
    <Card className="flex-1 p-4 max-h-fit">
      <h2 className="text-xl font-semibold">Preview</h2>
      <div
        className="w-full flex justify-between items-center font-hack-mono"
        style={{
          height: `${config.bar.height}px`,
          backgroundColor: config.bar.color,
          borderRadius: `${config.bar.cornerRadius}px`,
          paddingLeft: `${config.bar.padding}px`,
          paddingRight: `${config.bar.padding}px`,
        }}
      >
        <RenderItems items={leftItems} config={config} />
        <RenderItems items={centerItems} config={config} />
        <RenderItems items={rightItems} config={config} />
      </div>
    </Card>
  )
}

function RenderItems({ items, config }: { items: Config["items"]; config: Config }) {
  if (items.length === 0) return <div className="flex-1" />

  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <ItemFactory key={item.id} item={item} config={config} />
      ))}
    </div>
  )
}
