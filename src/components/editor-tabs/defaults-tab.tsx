"use client"

import type { Dispatch, SetStateAction } from "react"

import type { SketchybarConfig } from "@/components/sketchybar-editor"

interface DefaultsTabProps {
  config: SketchybarConfig
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>
}

export function DefaultsTab({ config, setConfig }: DefaultsTabProps) {
  const handleHeightChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, height: value[0] }))
  }

  const handlePaddingChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, padding: value[0] }))
  }

  return (
    <div className="space-y-6">

    </div>
  )
}

