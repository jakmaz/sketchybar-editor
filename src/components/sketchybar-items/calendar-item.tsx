"use client"

import { useEffect, useState } from "react"
import type { SketchybarItemComponentProps } from "./item-interface"

export function CalendarItem({ item, config, className }: SketchybarItemComponentProps) {
  const [date, setDate] = useState(
    new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={className}
      style={{
        color: item.color || "#ffffff",
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
      }}
    >
      {date}
    </div>
  )
}

