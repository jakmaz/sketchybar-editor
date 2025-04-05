"use client"

import { useEffect, useState } from "react"
import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function CalendarItem({ config }: SketchybarItemComponentProps) {
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
    <BaseItem config={config} icon="C" label={date} />
  )
}

