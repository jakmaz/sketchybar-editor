"use client"

import { useEffect, useState } from "react"
import type { SketchybarItemComponentProps } from "./item-interface"
import { BaseItem } from "./base-item"

export function ClockItem({ config }: SketchybarItemComponentProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <BaseItem config={config} icon="C" label={time} />
  )
}

