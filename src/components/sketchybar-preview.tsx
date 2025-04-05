"use client"

import type { SketchybarConfig } from "./sketchybar-editor"
import { ItemFactory } from "./sketchybar-items/item-factory"

interface SketchybarPreviewProps {
  config: SketchybarConfig
}

export function SketchybarPreview({ config }: SketchybarPreviewProps) {
  // Organize items by position
  const leftItems = config.items.filter((item) => item.position === "left")
  const centerItems = config.items.filter((item) => item.position === "center")
  const rightItems = config.items.filter((item) => item.position === "right")

  return (
    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-background rounded-sm overflow-hidden border">
      {/* Desktop mockup */}
      <div className="absolute inset-0 flex flex-col">
        {config.bar.position === "top" && (
          <div
            className="w-full flex justify-between items-center"
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
        )}

        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <p>Desktop Content</p>
        </div>

        {config.bar.position === "bottom" && (
          <div
            className="w-full flex justify-between items-center"
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
        )}
      </div>
    </div>
  )
}

function RenderItems({ items, config }: { items: SketchybarConfig["items"]; config: SketchybarConfig }) {
  if (items.length === 0) return <div className="flex-1" />

  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <ItemFactory key={item.id} item={item} config={config} />
      ))}
    </div>
  )
}

