"use client"

import { useEffect, useState } from "react"
import type { SketchybarItemComponentProps } from "./item-interface"

export function ClockItem({ item, config, className }: SketchybarItemComponentProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={className}
      style={{
        color: item.color || "#ffffff",
      }}
    >
      {time}
    </div>
  )
}

